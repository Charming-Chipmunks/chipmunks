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
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css?$/,
      loader: 'css-loader' // This are the loaders
    }]
  }
    //***********  SAVE
  //  rules: [
  //    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
  //    { test: /\.css$/, exclude: /node_modules/, loader: 'css-loader' }
  //  ]

};
