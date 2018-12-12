const path = require('path')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const BuildDesignPlugin = require('./lib/build_design_plugin')

const isDev = process.env.NODE_ENV !== 'production'
const distPath = path.resolve('./design/dist')
const hmrPath = (folder, filename) => ([
  isDev && 'webpack-hot-middleware/client?reload=true',
  `./design/source/${folder}/${filename}`
].filter(Boolean))

module.exports = {
  context: __dirname,
  mode: isDev ? 'development' : 'production',
  devtool: isDev ? 'source-map' : 'nosources-source-map',
  entry: Object.assign({}, {
    scripts: hmrPath('scripts', 'index.js')
  }, isDev ? {
    helpers: hmrPath('helpers', 'index.js')
  } : {}),
  output: {
    path: distPath,
    publicPath: '/',
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [[require.resolve('babel-preset-env'), {
            targets: {
              browsers: ['chrome>=40', 'safari>=6', 'firefox>=24', 'ie>=11', 'opera>=19']
            }
          }]]
        }
      }]
    }, {
      test: /\.(png|jpe?g|svg|gif|eot|svg|ttf|woff|woff2)$/,
      loader: 'url-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader'
    }, {
      test: /\.css$/,
      use: getStyleLoaders({sass: false})
    }, {
      test: /\.(sa|sc)ss$/,
      use: getStyleLoaders({sass: true})
    }]
  },
  resolve: {
    extensions: [
      '.scss',
      '.css',
      '.js'
    ]
  },
  plugins: [
    new CleanWebpackPlugin([distPath]),
    new BuildDesignPlugin({
      src: path.resolve('./design/source'),
      dest: distPath
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.css'
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
      new OpenBrowserPlugin({
        url: `http://0.0.0.0:${process.env.PORT || 3000}`,
        ignoreErrors: true
      })
    ] : []
  )
}

function getStyleLoaders ({sass}) {
  const loaders = []
  if (isDev) {
    loaders.push({loader: 'style-loader', options: {hmr: true}})
  } else {
    loaders.push({loader: MiniCssExtractPlugin.loader})
  }
  loaders.push(...[{
    loader: 'css-loader',
    options: {
      minimize: !isDev
    }
  }, {
    loader: 'resolve-url-loader',
    options: sass ? {
      root: path.resolve('./design/source/stylesheets')
    } : {}
  }, {
    loader: 'postcss-loader',
    options: {
      plugins: function () {
        return [autoprefixer]
      }
    }
  }])
  if (sass) loaders.push({loader: 'sass-loader'})
  return loaders
}
