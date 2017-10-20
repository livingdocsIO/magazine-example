/* eslint no-console: 0 */
const path = require('path')
const express = require('express')
const compression = require('compression')
const liSDK = require('@livingdocs/sdk')
const webpackConfig = require('../webpack.config')
const renderShell = require('./templates')

const port = process.env.PORT || 3000
const isDev = process.env.NODE_ENV !== 'production'
const distPath = path.join(__dirname, '../design/dist')

const app = express()

app.use(compression())
app.use(express.static(distPath))

if (isDev) {
  require('../lib/setup_webpack_dev')(app, webpackConfig, distPath)
} else {
  app.get('/', async (req, res, next) => {
    // get livingdocs api client instance
    const liClient = new liSDK.Client({
      url: 'http://localhost:3001',
      accessToken: 'my-awesome-token'
    })

    // fetch home page through metadata filter
    let publications = []
    try {
      publications = await liClient.getPublications({'metadata.homepage': true, limit: 1})
    } catch (e) {
      // json server listens after this server hence the reload
      const reloadScript = `
        <script>setTimeout(function() { window.location.reload(); }, 500)</script>`
      return next(new Error(`Could not fetch homepage... Will retry in 500ms...${reloadScript}`, e))
    }
    if (!publications.length) return next(new Error('Homepage not found'))

    // load livingdoc instance using serialized content & built design
    const homepagePublication = publications[0]
    const content = homepagePublication.content
    const design = require('../design/dist/design.json')
    async function resolveReference ({type, id} = {}) {
      try {
        return await liClient.getPublication({documentId: id})
      } catch (e) {
        return {
          metadata: {},
          systemdata: {}
        }
      }
    }
    const document = liSDK.loadDocument({content, design, resolveReference})

    // filter some components out
    const filteredDocument = liSDK.filterComponents(document, (component) => {
      return component.componentName !== 'p'
    })

    // render the livingdoc instance to html
    const homepageHtml = liSDK.render({document: filteredDocument})

    // render livingdoc html into layout & shell
    const layout = homepagePublication.systemdata.documentType
    const renderingContext = {...homepagePublication, layout, contentHtml: homepageHtml}
    try {
      const shell = renderShell(renderingContext)
      res.set('content-type', 'text/html')
      res.send(shell)
    } catch (e) {
      next(e)
    }
  })

  app.get('*', (req, res, next) => {
    return next(new Error('page not found'))
  })

  app.use((err, req, res, next) => {
    res.set('content-type', 'text/html')
    const notFound = err.message === 'page not found'
    if (notFound) return res.status(404).send('page not found')
    console.error(err)
    return res.status(500).send(err.message)
  })
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) console.error(err)
  console.info('==> Open up http://0.0.0.0:%s/ in your browser.', port)
})
