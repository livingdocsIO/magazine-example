/* eslint no-console: 0 */
const path = require('path')
const express = require('express')

// route handlers
const homeHandler = require('./routes/home')
const publicationHandler = require('./routes/publications')

const port = process.env.PORT || 3000
const distPath = path.join(__dirname, '../design/dist')

const app = express()
app.use(express.static(distPath))

// setup app configurations
const hostName = require('os').hostname()
const compression = require('compression')()
app.disable('x-powered-by')
app.use(function (req, res, next) {
  res.setHeader('X-Served-By', hostName)
  res.setHeader('X-DNS-Prefetch-Control', 'on')
  compression(req, res, next)
})

// setup dev middleware and watchers
if (process.env.NODE_ENV === 'development') {
  require('../lib/dev_setup')({
    app,
    designPath: path.join(distPath, 'design.json'),
    onDesignChanged () {
      Object.keys(require.cache).forEach(id => {
        if (/design\.json$/.test(id)) delete require.cache[id]
      })
    }
  })
}

// routes
app.get('/favicon', (req, res) => res.end())
app.get('/', homeHandler)
app.get('/article/:slug/:id', publicationHandler)

// setup mock json-server middleware
if (process.argv.includes('--mocked')) {
  require('../lib/mock_setup')(app)
}

// go
app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.info(`==> magazine started at http://0.0.0.0:${port}/`)
})
