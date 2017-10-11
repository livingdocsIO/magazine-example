// watch for changes in components
require('../components')

const webpackHotMiddlewareClient = require('webpack-hot-middleware/client')

// globals
const $ = require('jquery')
const doc = require('doc')
const design = require('design')

let createPage = require('./page')
let createArticle = require('./article')
// handle hot reloading for content definitions
if (module.hot) {
  module.hot.accept() // self
  module.hot.accept('./page', function () {
    createPage = require('./page')
  })
  module.hot.accept('./article', function () {
    createArticle = require('./article')
  })
}

function mount (changedDesign) {
  // Load the design
  doc.design.load(changedDesign || design.timeline, {basePath: '/'})

  // mount the page related playground
  const page = createPage(doc, design)
  page.createView({
    host: '.page',
    interactive: true,
    loadResources: false,
    iframe: false,
    layoutName: 'page'
  })

  // mount the article related playground
  const article = createArticle(doc, design)
  article.createView({
    host: '.article',
    interactive: true,
    loadResources: false,
    iframe: false
  })
}

function unmount () {
  // reset the design cache
  doc.design.resetCache()

  // remove nodes
  const page = document.querySelector('.page')
  const article = document.querySelector('.article')
  if (page.children.length > 0) page.removeChild(page.children[0])
  if (article.children.length > 0) article.removeChild(article.children[0])
}

$(document).ready(function () {
  // initial render of the playground
  mount()
  /*
   *  NOTE: The playground index.js is registered with hot-reloading in the webpack-config.
   *  Each change to
   *    - html files in components
   *    - this file (playground index.js)
   *    - page content definition (./page.js)
   *    - article content definition (./article.js)
   *    - timeline scss stylesheets
   *  triggers the compiler's 'after-emit' event, which introduces a rebuild of the
   *  serialized design via `BuildDesignPlugin`. After the design has changed, we publish the
   *  'design-changed' event through server-side 'webpackHotMiddleware' and listen for it using
   *  the client. As soon as we get the matching event, we do a full re-render with
   *  the updated design.
   */
  webpackHotMiddlewareClient.subscribe(function (updatedEvent) {
    // re-render the playground
    if (updatedEvent.type === 'design-changed') {
      unmount()
      mount(updatedEvent.design)
    }
  })
})
