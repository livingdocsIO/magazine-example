/* eslint no-console: 0 */
const path = require('path')
const express = require('express')
const compression = require('compression')
const liSDK = require('@livingdocs/sdk')
const renderShell = require('./templates')

const port = process.env.PORT || 3000
const distPath = path.join(__dirname, '../design/dist')

const app = express()

app.use(compression())
app.use(express.static(distPath))

app.get('/', async (req, res, next) => {
  // get livingdocs api client instance
  const liClient = new liSDK.Client({
    url: 'http://localhost:3001',
    accessToken: 'my-awesome-token'
  })

  // fetch home page through metadata filter
  let publications = []
  try {
    publications = await liClient.getPublications({homepage: true})
  } catch (e) {
    return next(new Error('json server not ready'))
  }
  if (!publications.length) return next(new Error('Homepage not found'))

  // create a Livingdoc instance using the serialized content & built design
  const homepagePublication = publications[0]
  const content = homepagePublication.content
  const design = require('../design/dist/design.json')
  const document = liSDK.document.create({design, content})

  /* EXAMPLE: filter paragraphs out
  function removeExceptParagraphs (component) {
    if (component.componentName !== 'p') {
      component.remove()
    }
  }
  const filteredDocument = liSDK.document
    .visit(document, {nodeType: 'component'}, removeExceptParagraphs)
  */

  // resolve includes
  function includeResolver ({service, params}) {
    return new Promise((resolve) =>
      setTimeout(() =>
        resolve(JSON.stringify({service, params}, null, 2)),
      100)
    )
  }
  await liSDK.document.resolveIncludes(document, includeResolver)

  // render Livingdoc instance to html
  const homepageHtml = liSDK.document.render(document)

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

app.listen(port, '0.0.0.0', (err) => {
  if (err) console.error(err)
  console.info('==> magazine started at http://0.0.0.0:%s/', port)
})
