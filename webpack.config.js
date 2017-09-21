const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
require('dotenv').config();

const sourcePath = path.join(__dirname, './src');
const buildPath = path.join(__dirname, './_build');


const extractSass = new ExtractTextPlugin({
  filename: '../styles/[name].main.css',
  disable: process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test'
});


module.exports = {
  devtool: 'source-map',
  context: sourcePath,
  entry: {
    app:[
      path.join(__dirname, 'src/client/entry')
    ]
  },
  output: {
    filename: '[name].bundle.js',
    path: buildPath + '/script',
    publicPath: '/'
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx'
    ],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath
    ]
  },
  module: {
    loaders : [
      {
        test: /\.jsx?$/,
        loaders: ['babel', 'eslint'],
        exclude: /node_modules/,
        include: path.join(__dirname, '/src')
      }
    ],
    rules: [
        {
          test: /\.css$|\.scss$/,
          loader: extractSass.extract({
            fallback: "style-loader",
            use: [
              { loader: 'css-loader' },
              { loader: 'postcss-loader' },
              { loader: 'sass-loader', options: {} }
            ]
          })
        },
        {
           test: /\.(js|jsx)$/,
           exclude: /node_modules/,
           use: [
             'babel-loader'
           ]
       }
      ]
  },
  plugins: [
    extractSass,
    new HtmlWebpackPlugin({
      title: 'My App',
      filename: '../index.html',
      template:'client/index.html'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: false,
      sourcemap: true,
      compress: false,
      comments:false
    }),
    new webpack.EnvironmentPlugin([
      'NODE_ENV',
      'API_PATH',
      'API_PATH_AUTH'
    ])
  ]
};
