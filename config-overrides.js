const webpack = require("webpack");
module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.fallback = {
    crypto: require.resolve("crypto-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify/browser"),
    buffer: require.resolve("buffer"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    fs: false,
    constants: false,
    path: false,
    net: false,
    child_process: false,
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  config.module.rules.push({
    test: /\.m?js/,
    resolve: {
      fullySpecified: false,
    },
  });
  return config;
};
