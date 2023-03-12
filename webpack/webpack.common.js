const path = require("path");

const config = {
  entry: "./src/js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js",
  },
};

module.exports = config;
