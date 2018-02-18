const fs = require('fs');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const rxPaths = require('rxjs/_esm5/path-mapping');
const autoprefixer = require('autoprefixer');
const postcssUrl = require('postcss-url');
const cssnano = require('cssnano');
const postcssImports = require('postcss-import');

const {NoEmitOnErrorsPlugin, SourceMapDevToolPlugin, NamedModulesPlugin} = require('webpack');
const {NamedLazyChunksWebpackPlugin, BaseHrefWebpackPlugin} = require('@angular/cli/plugins/webpack');
const {CommonsChunkPlugin} = require('webpack').optimize;
const {AngularCompilerPlugin} = require('@ngtools/webpack');

const nodeModules = path.join(process.cwd(), 'node_modules');
const realNodeModules = fs.realpathSync(nodeModules);
const genDirNodeModules = path.join(process.cwd(), 'src', '$$_gendir', 'node_modules');
const entryPoints = ["inline", "polyfills", "sw-register", "styles", "vendor", "main"];
const minimizeCss = false;
const baseHref = "";
const deployUrl = "";
const projectRoot = process.cwd();
const maximumInlineSize = 10;
const postcssPlugins = function (loader) {
  // safe settings based on: https://github.com/ben-eb/cssnano/issues/358#issuecomment-283696193
  const importantCommentRe = /@preserve|@licen[cs]e|[@#]\s*source(?:Mapping)?URL|^!/i;
  const minimizeOptions = {
    autoprefixer: false,
    safe: true,
    mergeLonghand: false,
    discardComments: {remove: (comment) => !importantCommentRe.test(comment)}
  };
  return [
    postcssImports({
      resolve: (url, context) => {
        return new Promise((resolve, reject) => {
          let hadTilde = false;
          if (url && url.startsWith('~')) {
            url = url.substr(1);
            hadTilde = true;
          }
          loader.resolve(context, (hadTilde ? '' : './') + url, (err, result) => {
            if (err) {
              if (hadTilde) {
                reject(err);
                return;
              }
              loader.resolve(context, url, (err, result) => {
                if (err) {
                  reject(err);
                }
                else {
                  resolve(result);
                }
              });
            }
            else {
              resolve(result);
            }
          });
        });
      },
      load: (filename) => {
        return new Promise((resolve, reject) => {
          loader.fs.readFile(filename, (err, data) => {
            if (err) {
              reject(err);
              return;
            }
            const content = data.toString();
            resolve(content);
          });
        });
      }
    }),
    postcssUrl({
      filter: ({url}) => url.startsWith('~'),
      url: ({url}) => {
        const fullPath = path.join(projectRoot, 'node_modules', url.substr(1));
        return path.relative(loader.context, fullPath).replace(/\\/g, '/');
      }
    }),
    postcssUrl([
      {
        // Only convert root relative URLs, which CSS-Loader won't process into require().
        filter: ({url}) => url.startsWith('/') && !url.startsWith('//'),
        url: ({url}) => {
          if (deployUrl.match(/:\/\//) || deployUrl.startsWith('/')) {
            // If deployUrl is absolute or root relative, ignore baseHref & use deployUrl as is.
            return `${deployUrl.replace(/\/$/, '')}${url}`;
          }
          else if (baseHref.match(/:\/\//)) {
            // If baseHref contains a scheme, include it as is.
            return baseHref.replace(/\/$/, '') +
              `/${deployUrl}/${url}`.replace(/\/\/+/g, '/');
          }
          else {
            // Join together base-href, deploy-url and the original URL.
            // Also dedupe multiple slashes into single ones.
            return `/${baseHref}/${deployUrl}/${url}`.replace(/\/\/+/g, '/');
          }
        }
      },
      {
        // TODO: inline .cur if not supporting IE (use browserslist to check)
        filter: (asset) => {
          return maximumInlineSize > 0 && !asset.hash && !asset.absolutePath.endsWith('.cur');
        },
        url: 'inline',
        // NOTE: maxSize is in KB
        maxSize: maximumInlineSize,
        fallback: 'rebase',
      },
      {url: 'rebase'},
    ]),
    autoprefixer({grid: true}),
  ].concat(minimizeCss ? [cssnano(minimizeOptions)] : []);
};


const arch = process.env.ARCH || process.arch;
const platform = process.env.PLATFORM || process.platform;

console.log(arch, platform);

module.exports = {
  externals: {
    electron: "require('electron')",
    buffer: "require('buffer')",
    child_process: "require('child_process')",
    crypto: "require('crypto')",
    events: "require('events')",
    fs: "require('fs')",
    http: "require('http')",
    https: "require('https')",
    assert: "require('assert')",
    dns: "require('dns')",
    net: "require('net')",
    os: "require('os')",
    path: "require('path')",
    querystring: "require('querystring')",
    readline: "require('readline')",
    repl: "require('repl')",
    stream: "require('stream')",
    string_decoder: "require('string_decoder')",
    url: "require('url')",
    util: "require('util')",
    zlib: "require('zlib')",
    ffi: "require('ffi')"
  },
  resolve: {
    extensions: [
      ".ts",
      ".js"
    ],
    modules: [
      "./node_modules",
      "./node_modules"
    ],
    symlinks: true,
    alias: rxPaths(),
    mainFields: [
      "browser",
      "module",
      "main"
    ]
  },
  resolveLoader: {
    modules: [
      "./node_modules",
      "./node_modules"
    ],
    alias: rxPaths()
  },
  entry: {
    main: [
      "./src/main.ts"
    ],
    polyfills: [
      "./src/polyfills.ts"
    ],
    styles: [
      "./src/styles.css"
    ]
  },
  output: {
    path: path.join(process.cwd(), "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[id].chunk.js",
    crossOriginLoading: false
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader'
      },
      {
        test: /\.html$/,
        loader: "raw-loader"
      },
      {
        test: /\.(eot|svg|cur)$/,
        loader: "file-loader",
        options: {
          name: "[name].[hash:20].[ext]",
          limit: 10000
        }
      },
      {
        test: /\.(jpg|png|webp|gif|otf|ttf|woff|woff2|ani)$/,
        loader: "url-loader",
        options: {
          name: "[name].[hash:20].[ext]",
          limit: 10000
        }
      },
      {
        exclude: [
          path.join(process.cwd(), "src/styles.css")
        ],
        test: /\.css$/,
        use: [
          "exports-loader?module.exports.toString()",
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              import: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: postcssPlugins,
              sourceMap: false
            }
          }
        ]
      },
      {
        exclude: [
          path.join(process.cwd(), "src/styles.css")
        ],
        test: /\.scss$|\.sass$/,
        use: [
          "exports-loader?module.exports.toString()",
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              import: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: postcssPlugins,
              sourceMap: false
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
              precision: 8,
              includePaths: []
            }
          }
        ]
      },
      {
        exclude: [
          path.join(process.cwd(), "src/styles.css")
        ],
        test: /\.less$/,
        use: [
          "exports-loader?module.exports.toString()",
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              import: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: postcssPlugins,
              sourceMap: false
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        exclude: [
          path.join(process.cwd(), "src/styles.css")
        ],
        test: /\.styl$/,
        use: [
          "exports-loader?module.exports.toString()",
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              import: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: postcssPlugins,
              sourceMap: false
            }
          },
          {
            loader: "stylus-loader",
            options: {
              sourceMap: false,
              paths: []
            }
          }
        ]
      },
      {
        include: [
          path.join(process.cwd(), "src/styles.css")
        ],
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              import: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: postcssPlugins,
              sourceMap: false
            }
          }
        ]
      },
      {
        include: [
          path.join(process.cwd(), "src/styles.css")
        ],
        test: /\.scss$|\.sass$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              import: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: postcssPlugins,
              sourceMap: false
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: false,
              precision: 8,
              includePaths: []
            }
          }
        ]
      },
      {
        include: [
          path.join(process.cwd(), "src/styles.css")
        ],
        test: /\.less$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              import: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: postcssPlugins,
              sourceMap: false
            }
          },
          {
            loader: "less-loader",
            options: {
              sourceMap: false
            }
          }
        ]
      },
      {
        include: [
          path.join(process.cwd(), "src/styles.css")
        ],
        test: /\.styl$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: false,
              import: false
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: postcssPlugins,
              sourceMap: false
            }
          },
          {
            loader: "stylus-loader",
            options: {
              sourceMap: false,
              paths: []
            }
          }
        ]
      },
      {
        test: /\.ts$/,
        loader: "@ngtools/webpack"
      }
    ]
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new CopyWebpackPlugin([
      {
        context: '.',
        from: 'app.package.json',
        to: 'package.json'
      },
      {
        context: "native-artifacts/precompiled-libraries/" + arch + "/" + platform,
        to: "native-artifacts/precompiled-libraries",
        from: {
          glob: "*",
          dot: true
        }
      },
      {
        context: ".",
        to: "",
        from: {
          glob: "native-artifacts/native-addons/*.node",
          dot: true
        }
      },
      {
        context: "src",
        to: "",
        from: {
          glob: "assets/**/*",
          dot: true
        }
      },
      {
        context: "src",
        to: "",
        from: {
          glob: "favicon.png",
          dot: true
        }
      }
    ], {
      ignore: [
        ".gitkeep",
        "**/.DS_Store",
        "**/Thumbs.db"
      ],
      debug: "warning"
    }),
    new CircularDependencyPlugin({
      exclude: /(\\|\/)node_modules(\\|\/)/,
      failOnError: false,
      onDetected: false,
      cwd: projectRoot
    }),
    new NamedLazyChunksWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      hash: false,
      inject: true,
      compile: true,
      favicon: false,
      minify: false,
      cache: true,
      showErrors: true,
      chunks: "all",
      excludeChunks: [],
      title: "Webpack App",
      xhtml: true,
      chunksSortMode: function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
          return 1;
        }
        else if (leftIndex < rightindex) {
          return -1;
        }
        else {
          return 0;
        }
      }
    }),
    new BaseHrefWebpackPlugin({}),
    new CommonsChunkPlugin({
      name: [
        "inline"
      ],
      minChunks: null
    }),
    new CommonsChunkPlugin({
      name: [
        "vendor"
      ],
      minChunks: (module) => {
        return module.resource
          && (module.resource.startsWith(nodeModules)
            || module.resource.startsWith(genDirNodeModules)
            || module.resource.startsWith(realNodeModules));
      },
      chunks: [
        "main"
      ]
    }),
    new SourceMapDevToolPlugin({
      filename: "[file].map[query]",
      moduleFilenameTemplate: "[resource-path]",
      fallbackModuleFilenameTemplate: "[resource-path]?[hash]",
      sourceRoot: "webpack:///"
    }),
    new CommonsChunkPlugin({
      name: [
        "main"
      ],
      minChunks: 2,
      async: "common"
    }),
    new NamedModulesPlugin({}),
    new AngularCompilerPlugin({
      mainPath: "main.ts",
      platform: 0,
      hostReplacementPaths: {
        "environments/environment.ts": "environments/environment.ts"
      },
      sourceMap: true,
      tsConfigPath: "src/tsconfig.app.json",
      skipCodeGeneration: true,
      compilerOptions: {}
    })
  ],
  node: {
    __dirname: false,
    __filename: false,
    fs: "empty",
    global: true,
    crypto: "empty",
    tls: "empty",
    net: "empty",
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
  devServer: {
    historyApiFallback: true
  }
};
