/* eslint no-console: 0 */
const path = require('path')
const express = require('express')
const liSDK = require('@livingdocs/sdk')
const conf = require('../conf')
const publicationHref = require('./util/publication_href')

const port = process.env.PORT || 3000
const distPath = path.join(__dirname, '../design/dist')

// get a livingdocs api client instance
const liClientConfig = conf.get('client')
const liClient = new liSDK.Client(liClientConfig)

const app = express()
app.use(express.static(distPath))

// setup app configurations
require('./setup/configuration')(app)

// favicon handler
app.use((req, res, next) => {
  if (req.url === '/favicon.ico') return res.end()
  return next()
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

// setup rendering
require('./setup/rendering')(app)

// routes
app.get('/', require('./routes/home')({liClient}))
app.get(publicationHref.getPathRegex(), require('./routes/publications')({liClient}))
app.get('*', require('./routes/common')({liClient, conf}))

// setup error handling
require('./setup/error_handling')(app)

// go
app.listen(port, '0.0.0.0', (err) => {
  if (err) console.error(err)
  console.info('==> magazine started at http://0.0.0.0:%s/', port)
})
