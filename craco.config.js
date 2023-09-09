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
        // {
        //   pragma: "PenZ.createElement", //  Babel 在转换 JSX 时使用哪个函数来创建虚拟 DOM 元素的
        // },
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
