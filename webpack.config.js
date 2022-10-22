const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // MPA 多页应用
  entry: {
    index: "./src/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    // 设置别名
    alias: {
      "@": path.resolve("src"),
    },
  },
  // 模块匹配和处理 大部分都是做编译处理
  module: {
    rules: [
      {
        test: /\.js$/,
        // use 是 loader的别名
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-react",
                {
                  pragma: "PenZ.createElement", 
                //   throwIfNamespace: false,
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
      //...
    ],
  },
  plugins: [
    // 多页应用则实例多个HtmlWebpackPlugin
    // 创建HTML文件
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./public/index.html",
    }),
    // 引入热更新插件，辅助devServer 使页面刷新更快
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: false,
    port: 8080,
    open: true,
  },
  optimization: {
    // 对动态导入模块做配置
    splitChunks: {
      // 匹配同步和异步模块
      chunks: "all",
      // 模块被复用的最小次数
      minChunks: 2,
      // 生成块的最小大小 bytes为单位
      minSize: 30000,
    },
  },
};
