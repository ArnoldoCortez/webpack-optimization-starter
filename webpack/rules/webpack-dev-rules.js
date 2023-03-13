const cssRule = {
  test: /\.css$/,
  exclude: /\.module\.css/,
  use: ["style-loader", "css-loader"],
};

const cssModuleRule = {
  test: /\.css$/,
  include: /\.module\.css/,
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        modules: {
          localIdentName: "[local]--[md4:hash:7]",
        },
      },
    },
  ],
};

const lessRule = {
  test: /\.less$/,
  use: ["style-loader", "css-loader", "less-loader"],
};

const sassRule = {
  test: /\.scss$/,
  use: ["style-loader", "css-loader", "sass-loader"],
};

module.exports = {
  cssRule,
  cssModuleRule,
  lessRule,
  sassRule,
};
