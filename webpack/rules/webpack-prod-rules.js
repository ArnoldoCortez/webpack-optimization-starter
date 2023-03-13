const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cssRule = {
  test: /\.css$/,
  exclude: /\.module\.css$/,
  use: [MiniCssExtractPlugin.loader, "css-loader"],
};

const cssModuleRule = {
  test: /\.css$/,
  include: /\.module\.css$/,
  use: [
    MiniCssExtractPlugin.loader,
    {
      loader: "css-loader",
      options: {
        modules: {
          localIdentName: "[hash:base64]",
        },
      },
    },
  ],
};

const lessRule = {
  test: /\.less$/,
  use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
};

const sassRule = {
  test: /\.scss$/,
  use: [
    MiniCssExtractPlugin.loader,
    "css-loader",
    "postcss-loader",
    "sass-loader",
  ],
};

module.exports = {
  cssRule,
  cssModuleRule,
  lessRule,
  sassRule,
};
