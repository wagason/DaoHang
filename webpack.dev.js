const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports = {
  entry: {
    index: './src/views/index/main.js',
    chennal: './src/views/chennal/main.js',
    common: ['jquery','jquery.cookie','underscore']
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
      },
      {
        test: /\.ejs$/,
        use: [
          {
            loader: 'ejs-loader'
          }
        ]
      }
    ]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: 'dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/views/index/render.js',
      chunks: ['common','index']
    }),
    new HtmlWebpackPlugin({
      filename: 'chennal.html',
      template: 'src/views/chennal/render.js',
      chunks: ['common','chennal']
    }),
    // 将所有css文件打包成单独文件引入
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      minChunks: Infinity,
    }),
    // 生成公共库的全局变量
    new webpack.ProvidePlugin({
      '_': 'underscore',
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      'window.$': 'jquery'
    }),
    new CleanWebpackPlugin(['dist'])
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  }
}