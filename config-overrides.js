const { override, addBabelPlugin, addWebpackPlugin } = require("customize-cra");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const rewireReactHotLoader = require('react-app-rewire-hot-loader')

module.exports = override(
  addBabelPlugin(["@babel/plugin-proposal-decorators", { legacy: true }]),
  addWebpackPlugin(
    new ProgressBarPlugin() //项目启动构建进度
  ),
);
