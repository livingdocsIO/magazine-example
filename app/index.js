/* eslint no-console: 0 */
const path = require('path')
const express = require('express')
const compression = require('compression')
const liSDK = require('@livingdocs/sdk')

const port = process.env.PORT || 3000
const distPath = path.join(__dirname, '../design/dist')
const design = require('../design/dist/design.json')

const app = express()

app.use(compression())
app.use(express.static(distPath))

// get a livingdocs api client instance
const liClient = new liSDK.Client({
  url: 'http://localhost:3001',
  accessToken: 'my-awesome-token'
})

// favicon handler
app.use(async (req, res, next) => {
  if (req.url === '/favicon.ico') return res.end()
  next()
})

// setup
require('./setup/rendering')(app)
require('./setup/error_handling')(app)

// routes
app.get('/', require('./routes/home')({liClient}))
app.get('/articles/:id', require('./routes/articles')({liClient}))
app.get('*', require('./routes/common')({liClient, design}))

// go
app.listen(port, '0.0.0.0', (err) => {
  if (err) console.error(err)
  console.info('==> magazine started at http://0.0.0.0:%s/', port)
})
