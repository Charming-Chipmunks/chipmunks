var path = require('path');

module.exports = {
  entry: {
    web: './client/components/web.js',
    ext: './client/components/ext.js'
  },
  output: {
    path: path.resolve(__dirname, 'client/dist'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
    ]
  }
};