const path = require("path");

const config = {
  entry: "./src/js",
  output: {
    path: path.resolve(__dirname, "../dist"),
    clean: true,
  },
};

module.exports = config;
