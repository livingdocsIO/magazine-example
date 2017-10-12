// watch for changes in components
require('../components')

const webpackHotMiddlewareClient = require('webpack-hot-middleware/client')

// globals
const $ = require('jquery')
const framework = require('doc')
const initialDesign = require('design')

let createPage = require('./page')
let createArticle = require('./article')
// handle hot reloading for content definitions
if (module.hot) {
  module.hot.accept('./page', function () {
    createPage = require('./page')
  })
  module.hot.accept('./article', function () {
    createArticle = require('./article')
  })
  module.hot.accept() // self
}

function loadDesign (design) {
  // reset the design cache
  framework.design.resetCache()
  // Load the design
  framework.design.load(design, {basePath: '/'})
}

function renderPage (design) {
  // mount the page related playground
  const page = createPage(framework, design)
  return page.createView({
    host: '.page',
    interactive: true,
    loadResources: false,
    iframe: false,
    layoutName: 'page'
  })
}

function renderArticle (design) {
  // mount the article related playground
  const article = createArticle(framework, design)
  return article.createView({
    host: '.article',
    interactive: true,
    loadResources: false,
    iframe: false
  })
}

function mount (changedDesign) {
  // determine the design
  const design = changedDesign || initialDesign.timeline

  // load the design
  loadDesign(design)

  // mount page, article and handle scrolling
  const scrollX = window.scrollX
  const scrollY = window.scrollY
  renderPage(design)
    .then(function () {
      return renderArticle(design)
    })
    .then(function () {
      setTimeout(function () {
        window.scrollTo(scrollX, scrollY)
      })
    })
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
      setTimeout(function () { mount(updatedEvent.design) })
    }
  })
})
