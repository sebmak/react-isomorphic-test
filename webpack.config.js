// Webpack configuration to use with the build task.

var webpack = require('webpack');

module.exports = {

  // Create also a "lib" chunk with common libraries, e.g. react.
  entry: {
    client: './client.jsx'
  },

  output: {
    path: './public/js/',
    publicPath: '/js/',
    filename: '[name].js'
  },

  resolve: {
    alias: {
      //Set this for individual environments
      global: __dirname + '/scripts/global'
    },
    extensions: ['', '.js', '.jsx','json']
  },

  module: {
    loaders: [{
      test: /\.jsx$/, loaders: ['jsx']
    },
    {
      test: /\.json$/, loaders: ['json']
    }]
  },

  externals: {}
};
