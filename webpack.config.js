var path = require('path');
var webpack = require('webpack');
var ClosureCompilerPlugin = require('webpack-closure-compiler');
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
  // plugins: [
  //   new webpack.DefinePlugin({  // <-- Key to reducing React's size
  //     'process.env': {
  //       'NODE_ENV': JSON.stringify('production')
  //     }
  //   }),
  //    new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       screw_ie8: true,
  //       warnings: false
  //     }
  //   }),
  //   new webpack.optimize.DedupePlugin(),
  //   new webpack.optimize.AggressiveMergingPlugin()  // Merge chunks
  //   ]
};
