/* eslint no-console: 0 */
const path = require('path')
const express = require('express')
const jsonServer = require('json-server')

// route handlers
const homeHandler = require('./routes/home')
const publicationHandler = require('./routes/publications')

const port = process.env.PORT || 3000
const distPath = path.join(__dirname, '../design/dist')

const app = express()
app.use(express.static(distPath))

// setup app configurations
app.disable('x-powered-by')

const hostName = require('os').hostname()
const compression = require('compression')()
app.use(function (req, res, next) {
  res.setHeader('X-Served-By', hostName)
  res.setHeader('X-DNS-Prefetch-Control', 'on')
  compression(req, res, next)
})

// setup dev middlewares and watchers
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

// setup json-server middleware
const routes = require(path.join(__dirname, '../mocks/routes.json'))
const db = require(path.join(__dirname, '../mocks/db.js'))()
app.use(jsonServer.rewriter(routes))
app.use(jsonServer.router(db))

// go
app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.info(`==> magazine started at http://0.0.0.0:${port}/`)
})
