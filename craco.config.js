const path = require("path");
const webpack = require("webpack");

module.exports = {
  style: {},
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
    },
    configure: {
      resolve: {
        fallback: {
          // assert: require.resolve('assert'),
          // buffer: require.resolve('buffer'),
          // crypto: require.resolve('crypto-browserify'),
          // http: require.resolve('stream-http'),
          // https: require.resolve('https-browserify'),
          // os: require.resolve('os-browserify/browser'),
          // process: require.resolve('process/browser'),
          // stream: require.resolve('stream-browserify'),
          // url: require.resolve('url'),
          // util: require.resolve('util'),
          // zlib: require.resolve('browserify-zlib'),
        },
      },
      ignoreWarnings: [
        function ignoreSourcemapsloaderWarnings(warning) {
          return (
            warning.module &&
            warning.module.resource.includes("node_modules") &&
            warning.details &&
            warning.details.includes("source-map-loader")
          );
        },
      ],
      plugins: [
        new webpack.ProvidePlugin({
          process: "process/browser",
          Buffer: ["buffer", "Buffer"],
        }),
      ],
    },
  },
  babel: {
    Plugin: [
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      ["@babel/plugin-transform-react-jsx", { pragma: "PenZ.createElement" }],
    ],
  },
};
