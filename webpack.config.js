var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    './client/components/webIndex.js'
  ],
  output: {
    path: __dirname,
    filename: './client/dist/bundle.js'
  },

  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  // ],

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
