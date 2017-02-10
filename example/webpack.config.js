'use strict';

var webpack = require('webpack');

// Webpack config for building the demo file
module.exports = {
  module: {
    loaders: [
      // Load javascript files as ES6
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
        },
      }
    ],
  },
  context: __dirname,
  entry: {
    app: './app.js'
  },
  output: {
    path: __dirname + '/static',
    filename: '[name].js'
  }
};
