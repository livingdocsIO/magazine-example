const liSDK = require('@livingdocs/sdk')

const resolveIncludes = require('../includes')
const conf = require('../../conf')
const design = require('../../design/dist/design.json')
const renderLayout = require('../rendering/layout')

const defaultDocumentType = conf.get('defaultDocumentType')
const documentTypes = conf.get('documentTypes')
const includesConfig = conf.get('includes')

// constants
const isDev = process.env.NODE_ENV === 'development'
const cssLink = `<link href="/styles.css" media="screen" rel="stylesheet" type="text/css" />`

function generateHTML ({title, description, bodyContent}) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="Content-Language" content="en">
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <meta name="Description" content="${description}" />
      ${isDev ? '' : cssLink}
    </head>
    <body lang="en">
      ${bodyContent}
      <script src="/scripts.js"></script>
      ${isDev ? `<script src="/helpers.js"></script>` : ''}
      <script
        src="https://code.jquery.com/jquery-2.2.4.min.js"
        integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
        crossorigin="anonymous">
      </script>
    </body>
  </html>
  `
}

async function renderPage ({menu, location, publication, liClient}) {
  const livingdoc = liSDK.document.create({
    design,
    content: publication.content
  })
  // what does this do? Fetch the extra data? related content / embeds?
  await resolveIncludes(livingdoc, liClient, includesConfig)

  const documentType = publication.systemdata.documentType
  const currentDocumentType = documentTypes && documentTypes[documentType]
  const targetDocumentType = currentDocumentType || defaultDocumentType

  const layoutComponents = targetDocumentType.layoutComponents
  const bodyContent = renderLayout(design, livingdoc, layoutComponents, {
    menu,
    location
  })

  return generateHTML({
    title: publication.metadata.title,
    description: publication.metadata.description,
    bodyContent
  })
}

function renderError (error) {
  // TODO should use error.statusCode for identification
  const is404 = error.statusCode === 404

  const title = is404
    ? 'Not found'
    : 'Internal Error'
  const description = is404
    ? 'The page you are looking for could not be found...'
    : error.message

  return generateHTML({
    title,
    description,
    bodyContent: `
      <div class="wrapper page">
        <h1>${title}</h1>
        <p>${description}</p>
      </div>
    `
  })
}

module.exports = {
  renderPage,
  renderError
}
