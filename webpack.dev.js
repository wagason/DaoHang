const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: {
    index: './src/scripts/main.js',
    vendor: './src/scripts/vendor.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader?sourceMap!less-loader?sourceMap"
        })
      }
    ]
  },
  plugins: [
    // 清空生成目录
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/sogou.html'
    }),
    // 将所有css文件打包成单独文件引入
    new ExtractTextPlugin("styles.css"),
    // 打包公共依赖库
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
    // 生成公共库的全局变量
    new webpack.ProvidePlugin({
      _: 'underscore',
      $: 'jquery',
      'window.jQuery': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  resolve: {
    alias: {
      'src': path.join(__dirname, 'src')
    }
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9009
  }
}