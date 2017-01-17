var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    bundle: './client/components/webIndex.js',
    login: './client/components/RegisterLoginPage.js'
  },
  output: {
    path: __dirname,
    filename: './client/dist/[name].js'
  },

////////////////////////////////////////////////
///////////// DON'T REMOVE THIS ////////////////
////////////////////////////////////////////////
  // plugins: [
  //   new webpack.DefinePlugin({ // <-- Key to reducing React's size
  //     'process.env': {
  //       'NODE_ENV': JSON.stringify('production')
  //     }
  //   }),
  //   new webpack.optimize.DedupePlugin(), // Dedupe similar code
  //   new webpack.optimize.UglifyJsPlugin({
  //     compress: {
  //       screw_ie8: true,
  //       warnings: false
  //     }
  //   }), // Minify everything
  //   new webpack.optimize.AggressiveMergingPlugin() // Merge chunks
  // ],
////////////////////////////////////////////////
////////////////////////////////////////////////

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
