var path = require('path');

module.exports = {
  entry: {
    client: './client/components/webIndex.js',
    extension: './extension/loader.js'
  },
  output: {
    path: __dirname,
    filename: '[name]/dist/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};