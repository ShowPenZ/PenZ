const path = require("path");
const webpack = require("webpack");
const rewireBabelLoader = require("craco-babel-loader-plugin");

module.exports = {
  style: {},
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    configure: {
      resolve: {},

      plugins: [
        new webpack.ProvidePlugin({
          process: "process/browser",
          Buffer: ["buffer", "Buffer"],
        }),
      ],
      optimization: {
        minimize: false,
      },
    },
  },
  babel: {
    presets: [
      [
        "@babel/preset-react",
        {
          pragma: "PenZ.createElement", // default pragma is React.createElement (only in classic runtime)
        },
      ],
    ],
  },
  plugins: [
    {
      plugin: rewireBabelLoader,
      options: {},
    },
  ],
};
