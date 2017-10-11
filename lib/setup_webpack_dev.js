const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

module.exports = function setupWebpackDev (app, config, distPath) {
  const compiler = webpack(config)
  const hotMiddleware = webpackHotMiddleware(compiler)
  const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
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
  app.get('*', function (req, res, next) {
    const targetTemplate = req.url === 'iframe.html' ? 'iframe.html' : 'index.html'
    const filename = path.join(compiler.outputPath, targetTemplate)
    compiler.outputFileSystem.readFile(filename, function (err, result) {
      if (err) return next(err)
      res.set('content-type', 'text/html')
      res.send(result)
      return res.end()
    })
  })

  const designPath = path.join(distPath, 'design.json')
  const designWatcher = chokidar.watch(designPath)
  designWatcher.on('ready', function () {
    designWatcher.on('change', function (filePath) {
      fs.readFile(filePath, 'utf8', function (err, rawDesign) {
        if (err) return console.error('Couldn\'t update the design', err)
        hotMiddleware.publish({
          type: 'design-changed',
          design: JSON.parse(rawDesign)
        })
      })
    })
  })
}
