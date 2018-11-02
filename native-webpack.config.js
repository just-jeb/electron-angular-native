const CopyWebpackPlugin = require('copy-webpack-plugin');

const arch = process.env.ARCH || process.arch;
const platform = process.env.PLATFORM || process.platform;

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
    'ffi-napi': "require('ffi-napi')"
  },
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },
  plugins: [
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
      }
    ], {
      ignore: [
        ".gitkeep",
        "**/.DS_Store",
        "**/Thumbs.db"
      ],
      debug: "warning"
    })
]
};
