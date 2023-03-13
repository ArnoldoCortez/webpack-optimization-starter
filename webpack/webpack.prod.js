const path = require("path");
const common = require("./webpack.common.js");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
const glob = require("glob");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const {
  cssRule,
  cssModuleRule,
  lessRule,
  sassRule,
  imageRule,
} = require("./rules/webpack-prod-rules.js");

module.exports = merge(common, {
  mode: "production",
  output: {
    filename: "js/[name].[contenthash:12].js",
  },
  devtool: "source-map",
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
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["imagemin-mozjpeg", { quality: 40 }],
              [
                "imagemin-pngquant",
                {
                  quality: [0.65, 0.9],
                  speed: 4,
                },
              ],
              ["imagemin-gifsicle", { interlaced: true }],
              [
                "imagemin-svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                { xmlns: "http://www.w3.org/2000/svg" },
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
        generator: [
          {
            type: "asset",
            preset: "webp-custom-name",
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ["imagemin-webp"],
            },
          },
        ],
      }),
    ],
    // STRATEGY #1 Extracting heavy dependencies
    // splitChunks: {
    //   cacheGroups: {
    //     jquery: {
    //       test: /[\\/]node_modules[\\/]jquery[\\/]/,
    //       chunks: "initial",
    //       name: "jquery",
    //     },
    //     bootstrap: {
    //       test: /[\\/]node_modules[\\/]bootstrap[\\/]/,
    //       chunks: "initial",
    //       name: "bootstrap",
    //     },
    //   },
    // },

    // STRATEGY #2 Specifying Criteria for code splitting
    // splitChunks: {
    //   chunks: "all",
    //   maxSize: 140000,
    //   minSize: 50000,
    //   name(module, _chunks, _cacheGroupKey) {
    //     const filePathAsArray = module.identifier().split(path.sep);

    //     return filePathAsArray[filePathAsArray.length - 1];
    //   },
    // },

    // STRATEGY #3 Putting node_modules into its own bundle
    // splitChunks: {
    //   chunks: "all",
    //   maxSize: Infinity,
    //   minSize: 0,
    //   cacheGroups: {
    //     node_modules: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: "node_modules",
    //     },
    //   },
    // },

    // STRATEGY #4 Create a js bundle for each dependency
    splitChunks: {
      chunks: "all",
      maxSize: Infinity,
      minSize: 0,
      cacheGroups: {
        node_modules: {
          test: /[\\/]node_modules[\\/]/,
          name(module) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/
            )[1];

            return packageName;
          },
        },
      },
    },
  },
  module: {
    rules: [cssRule, cssModuleRule, lessRule, sassRule, imageRule],
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
