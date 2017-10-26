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

// routes
app.get('/', require('./routes/home')({liClient}))
app.get('/articles/:id', require('./routes/articles')({liClient}))
app.get('*', require('./routes/common')({liClient, design}))

// error handler
app.use((err, req, res, next) => {
  res.set('content-type', 'text/html')
  // json server listens after this server hence the reload
  const jsonServerNotReady = err.message === 'json server not ready'
  const reloadScript = `
    <script>setTimeout(function() { window.location.reload(); }, 500)</script>`
  if (jsonServerNotReady) {
    return res.status(404)
      .send(`Could not fetch homepage... Will retry in 500ms...${reloadScript}`)
  }
  const notFound = err.message === 'page not found'
  if (notFound) return res.status(404).send('page not found')
  console.error(err)
  return res.status(500).send(err.message)
})

// go
app.listen(port, '0.0.0.0', (err) => {
  if (err) console.error(err)
  console.info('==> magazine started at http://0.0.0.0:%s/', port)
})
