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

const imageRule = {
  test: /\.(png|jpg|svg)$/,
  type: "asset",
  parser: {
    dataUrlCondition: {
      maxSize: 10 * 1024,
    },
  },
  generator: {
    filename: "./images/[name].[contenthash:12][ext]",
  },
  use: [
    {
      loader: "image-webpack-loader",
      options: {
        mozjpeg: {
          quality: 40,
        },
        pngquant: {
          quality: [0.65, 0.9],
          speed: 4,
        },
      },
    },
  ],
};

module.exports = {
  cssRule,
  cssModuleRule,
  lessRule,
  sassRule,
  imageRule,
};
