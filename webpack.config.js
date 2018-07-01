const CopyWebpackPlugin = require('copy-webpack-plugin');

const arch = process.env.ARCH || process.arch;
const platform = process.env.PLATFORM || process.platform;

console.log(arch, platform);

module.exports = {
  module: {
    rules: [
      {
        test: /\.node$/,
        use: 'node-loader'
      }
    ]
  },
  plugins: [
    // new CopyWebpackPlugin([
    //   {
    //     context: '.',
    //     from: 'app.package.json',
    //     to: 'package.json'
    //   },
    //   {
    //     context: "native-artifacts/precompiled-libraries/" + arch + "/" + platform,
    //     to: "native-artifacts/precompiled-libraries",
    //     from: {
    //       glob: "*",
    //       dot: true
    //     }
    //   },
    //   {
    //     context: ".",
    //     to: "",
    //     from: {
    //       glob: "native-artifacts/native-addons/*.node",
    //       dot: true
    //     }
    //   }
    // ], {
    //   ignore: [
    //     ".gitkeep",
    //     "**/.DS_Store",
    //     "**/Thumbs.db"
    //   ],
    //   debug: "warning"
    // })
]
};
