const path = require("path");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const glob = require("glob");
const {
  cssRule,
  cssModuleRule,
  lessRule,
  sassRule,
} = require("./rules/webpack-prod-rules.js");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash:12].js",
  },
  optimization: {
    minimize: true,
    minimizer: [
      "...",
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        },
      }),
    ],
  },
  module: {
    rules: [cssRule, cssModuleRule, lessRule, sassRule],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:12].css",
    }),
    new PurgeCSSPlugin({
      paths: glob.sync(`${path.join(__dirname, "../src")}/**/*`, {
        nodir: true,
      }),
    }),
  ],
});
