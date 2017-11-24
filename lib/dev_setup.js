const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config')
const watchDesign = require('./design_watcher')

module.exports = function setupDev ({app, designPath, onDesignChanged}) {
  const compiler = webpack(webpackConfig)
  const hotMiddleware = webpackHotMiddleware(compiler, {
    log: console.log, // eslint-disable-line
    path: '/__webpack_hmr'
  })
  const devMiddleware = webpackDevMiddleware(compiler, {
    serverSideRender: true,
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  })
  app.use(devMiddleware)
  app.use(hotMiddleware)

  // watch for changes in the design
  watchDesign({
    designPath,
    onDesignChanged (changedDesign) {
      // notify server handler
      if (typeof onDesignChanged === 'function') {
        onDesignChanged(changedDesign)
      }
      // publish to client through hot middleware
      hotMiddleware.publish({
        type: 'design-changed',
        design: changedDesign
      })
    }
  })
}
