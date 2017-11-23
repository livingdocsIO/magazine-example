const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BuildDesignPlugin = require('./lib/build_design_plugin')
const OpenPackPlugin = require('openpack')

const isDev = process.env.NODE_ENV !== 'production'
const distPath = path.resolve('./design/dist')

module.exports = {
  context: path.resolve('./design/source'),
  devtool: isDev ? 'source-map' : 'nosources-source-map',
  entry: Object.assign({}, {
    scripts: [
      './scripts/index.js',
      'webpack-hot-middleware/client?reload=true'
    ]
  }, isDev ? {
    helpers: [
      './helpers/index.js',
      'webpack-hot-middleware/client?reload=true'
    ]
  } : {}),
  output: {
    path: distPath,
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.(png|jpe?g|svg|gif)$/,
      loader: 'url-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /timeline\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [isDev && {
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }, {
          loader: 'resolve-url-loader',
          options: {
            root: path.resolve('./design/source/stylesheets')
          }
        }, {
          loader: 'postcss-loader',
          options: {
            plugins: function () {
              return [
                autoprefixer()
              ]
            }
          }
        }, {
          loader: 'sass-loader'
        }].filter(Boolean)
      })
    }]
  },
  resolve: {
    extensions: [
      '.scss',
      '.js'
    ]
  },
  plugins: [
    new CleanWebpackPlugin([distPath]),
    new BuildDesignPlugin({
      src: path.resolve('./design/source'),
      dest: distPath
    }),
    new ExtractTextPlugin({
      filename: 'timeline.css',
      disable: isDev
    }),
    new CopyWebpackPlugin([{
      context: 'design/source',
      from: 'assets/@(images|stylesheets)/**',
      to: distPath
    }]),
    new webpack.optimize.OccurrenceOrderPlugin(true)
  ].concat(
    isDev ? [
      new webpack.HotModuleReplacementPlugin(),
      new OpenPackPlugin({
        host: '0.0.0.0',
        port: '3000',
        path: '/'
      })
    ] : [
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        warnings: true,
        minimize: true
      })
    ]
  )
}
