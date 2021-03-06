const base = require('./webpack.base.js');
const merge = require('webpack-merge');
const path = require('path');

/** DIRECTORIES */
const output = path.resolve( __dirname, '../_bundleFront' );

module.exports = merge(base, {
  devtool: 'inline-source-map',
  output: {
    path: output,
    publicPath: '/',
    filename: '[name].js'
  }
});
