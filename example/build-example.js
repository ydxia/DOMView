'use strict';

var config = require('./webpack.config');
var webpack = require('webpack');

webpack(config).run(function(err, stats) {
  console.log(stats.toString({ colors: true }));
});
