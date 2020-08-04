/*
 * @Author: wuxh
 * @Date: 2020-08-03 18:20:06
 * @LastEditTime: 2020-08-04 10:12:47
 * @LastEditors: wuxh
 * @Description:
 * @FilePath: /qiankun/examples/main/webpack.config.js
 */
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { name } = require('./package')

module.exports = {
  entry: process.env.MODE === 'multiple' ? './multiple.js' : './index.js',
  output: {
    path: __dirname + '/common', // 打包后的文件存放的地方
    filename: 'index.js', // 打包后输出文件的文件名
  },
  devtool: 'source-map',
  devServer: {
    port: '7099',
    clientLogLevel: 'warning',
    disableHostCheck: true,
    compress: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    historyApiFallback: true,
    overlay: { warnings: false, errors: true },
  },
  // mode: 'development',
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-react-jsx'],
          },
        },
      },
      {
        test: /\.(le|c)ss$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: process.env.MODE === 'multiple' ? './multiple' : './index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
    }),
  ],
}
