var path = require('path');
var webpack = require('webpack');
module.exports = {
  entry: {
    'client/dist/': './client/components/webIndex.js'
  },
  output: {
    path: __dirname,
    filename: '[name]bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  // plugins: [new webpack.optimize.UglifyJsPlugin({
  //   compress: {
  //     screw_ie8: true,
  //     warnings: false
  //   }
  // })]
};
