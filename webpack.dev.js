const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: {
    common: ['jquery','jquery.cookie','underscore'],
    index: './src/index.js'
  },
  module: {
    rules: [
      {
        test: require.resolve('jquery'),
        use: [
          {
            loader: 'expose-loader',
            options: '$'
          },
          {
            loader: 'expose-loader',
            options: 'jQuery'
          },
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'dist'
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'src/index.ejs',
      inject: 'body'
    }),
    new webpack.ProvidePlugin({
      '_': 'underscore',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: Infinity,
    })
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}