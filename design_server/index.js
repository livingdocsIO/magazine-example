/* eslint no-console: 0 */
const path = require('path')
const express = require('express')
const compression = require('compression')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('../webpack.config')
const watchDesign = require('./design_watcher')

const distPath = path.join(__dirname, '../design/dist')
const port = process.env.PORT || 3333

const app = express()

app.use(compression())
app.use(express.static(distPath))

const compiler = webpack(webpackConfig)
const hotMiddleware = webpackHotMiddleware(compiler)
const devMiddleware = webpackDevMiddleware(compiler, {
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

// watch for changes in the design and publish
// them to the client via hot Middleware
watchDesign(hotMiddleware, distPath)

app.get('*', function (req, res, next) {
  const targetTemplate = 'index.html'
  const filename = path.join(compiler.outputPath, targetTemplate)
  compiler.outputFileSystem.readFile(filename, function (err, result) {
    if (err) return next(err)
    res.set('content-type', 'text/html')
    res.send(result)
    return res.end()
  })
})

app.listen(port, '0.0.0.0', (err) => {
  if (err) console.error(err)
  console.info('==> design server started at http://0.0.0.0:%s/', port)
})
