const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BuildDesignPlugin = require('./lib/build_design_plugin')

const isDev = process.env.NODE_ENV !== 'production'
const distPath = path.resolve('./design/dist')

module.exports = {
  context: __dirname,
  devtool: isDev ? 'source-map' : 'nosources-source-map',
  entry: Object.assign({}, {
    timeline: [
      './design/source/stylesheets/timeline.scss'
    ].concat(isDev ? [
      'webpack-hot-middleware/client?reload=true'
    ] : [])
  }, isDev ? {
    playground: [
      './design/source/playground',
      'webpack-hot-middleware/client?reload=true'
    ]
  } : {}),
  output: {
    path: distPath,
    filename: '[name].js'
  },
  externals: Object.assign({}, isDev ? {
    'jquery': 'jQuery',
    'doc': 'doc',
    'design': 'design'
  } : {}),
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
      filename: '[name].css',
      disable: isDev
    }),
    new HtmlWebpackPlugin({
      template: 'design/source/index.ejs',
      filename: 'index.html',
      inject: false,
      isDev: isDev
    }),
    new HtmlWebpackPlugin({
      template: 'design/source/iframe.ejs',
      filename: 'iframe.html',
      inject: false,
      isDev: isDev
    }),
    new CopyWebpackPlugin([{
      context: 'design/source',
      from: 'assets/@(images|scripts|stylesheets)/**',
      to: distPath
    }, {
      context: 'design/source',
      from: '*.html',
      to: distPath
    }, {
      context: 'design/source/vendor',
      from: `{${[
        'livingdocs-framework-6.4.1.min.js',
        'livingdocs-framework-6.4.1.min.css',
        'editable-1.2.1.min.js'
      ].join(',')}}`,
      to: path.resolve('./design/dist/vendor')
    }]),
    new webpack.optimize.OccurrenceOrderPlugin(true)
  ].concat(
    isDev ? [
      new webpack.HotModuleReplacementPlugin()
    ] : [
      new webpack.optimize.UglifyJsPlugin({sourceMap: true, warnings: true, minimize: true})
    ]
  )
}
