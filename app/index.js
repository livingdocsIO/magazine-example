/* eslint no-console: 0 */
const path = require('path')
const express = require('express')
const compression = require('compression')
const webpackConfig = require('../webpack.config')

const port = process.env.PORT || 3000
const isDev = process.env.NODE_ENV !== 'production'
const distPath = path.join(__dirname, '../design/dist')

const app = express()

app.use(compression())
app.use(express.static(distPath))

if (isDev) {
  require('../lib/setup_webpack_dev')(app, webpackConfig, distPath)
} else {
  /* TODO: The following points:
   *  - get an instance of the sdk
   *  - pass the design
   *  - get the root page
   *  - render it to html inside an appropriate shell
   */
}

app.listen(port, '0.0.0.0', function (err) {
  if (err) console.error(err)
  console.info('==> Open up http://0.0.0.0:%s/ in your browser.', port)
})
