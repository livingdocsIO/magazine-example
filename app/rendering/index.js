const _ = require('lodash')
const liSDK = require('@livingdocs/node-sdk')

const resolveIncludes = require('../includes')
const createAuthorPage = require('../authors')
const conf = require('../../conf')
const renderLayout = require('../rendering/layout')

const defaultDocumentType = conf.get('defaultDocumentType')
const documentTypes = conf.get('documentTypes')
const includesConfig = conf.get('includes')

// constants
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  renderPage,
  renderError
}

async function renderPage ({menu, location, publication, liClient}) {
  const imageServicesConfig = conf.get('imageServices', {})
  const config = {}

  const contentType = _.get(publication, 'systemdata.contentType')
  if (Object.keys(imageServicesConfig).length) config.imageServices = imageServicesConfig

  // NOTE: It is important to require the design every time we use it for rendering
  // to always deliver the latest build when e.g. in dev mode
  const design = require('../../design/dist/design.json')
  const livingdoc = liSDK.document.create({
    design,
    content: contentType === 'author' ? [] : publication.content,
    config
  })
  if (contentType === 'author') await createAuthorPage(livingdoc, publication, liClient)

  // resolve referenced teasers (doc-includes html)
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

function generateHTML ({title, description, bodyContent}) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="utf-8" />
      <meta http-equiv="Content-Language" content="en">
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <title>Livingdocs - Demo Magazine</title>
      <meta property="og:title" content="Livingdocs - Demo Magazine" />
      <meta name="Description" content="Livingdocs offers developers a free, open-source
        Demo Magazine in Node.js to start with. Check it out!" />
      <meta property="og:description" content="Livingdocs offers developers a free, open-source
        Demo Magazine in Node.js to start with. Check it out!" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="http://livingdocs-assets.s3.amazonaws.com/ld_logo_final@2x.png" />
      <meta property="og:image:secure_url" content="https://livingdocs-assets.s3.amazonaws.com/ld_logo_final@2x.png" />
      <meta property="og:image:alt" content="Livingdocs" />
      <meta property="og:site_name" content="www.Livingdocs.io" />
      <meta property="og:url" content="https://github.com/livingdocsIO/magazine-example" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:image" content="http://livingdocs-assets.s3.amazonaws.com/assets/images/ld_signet_128x128.png" />
      <meta name="twitter:image:alt" content="Livingdocs" />
      <meta name="twitter:site" content="@livingdocsIO" />
      <meta name="twitter:description" content="Livingdocs offers developers a free, open-source
        Demo Magazine in Node.js to start with. Check it out!" />
      <link rel="canonical" href="https://living-times.com" />
      ${isDev ? '' : '<link href="/styles.css" media="screen" rel="stylesheet" type="text/css" />'}
    </head>
    <body lang="en">
      ${bodyContent}
      <script src="/scripts.js"></script>
      ${isDev ? '<script src="/helpers.js"></script>' : ''}
      <script
        src="https://code.jquery.com/jquery-2.2.4.min.js"
        integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44="
        crossorigin="anonymous">
      </script>
      <script>
      window.twttr = (function (d, s, id) {
      var t, js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src= "https://platform.twitter.com/widgets.js";
      fjs.parentNode.insertBefore(js, fjs);
      return window.twttr || (t = { _e: [], ready: function (f) { t._e.push(f) } });
      }(document, "script", "twitter-wjs"));
      window.twttr.ready(function(twttr){
      twttr.widgets.load();
      });
      </script>
    </body>
  </html>
  `
}
