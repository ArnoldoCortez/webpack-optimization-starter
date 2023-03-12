const path = require("path");

const config = {
  mode: "production",
  entry: "./src",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
};

module.exports = config;
