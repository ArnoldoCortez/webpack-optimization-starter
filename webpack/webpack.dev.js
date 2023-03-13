const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const path = require("path");
const {
  cssRule,
  cssModuleRule,
  lessRule,
  sassRule,
  assetRule,
} = require("./rules/webpack-dev-rules.js");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "bundle.js",
  },
  devServer: {
    port: 9000,
    static: {
      directory: path.resolve(__dirname, "../dist"),
    },
    devMiddleware: {
      index: "index.html",
      writeToDisk: true,
    },
    client: {
      overlay: true,
    },
    liveReload: false,
  },
  module: {
    rules: [cssRule, cssModuleRule, lessRule, sassRule, assetRule],
  },
});
