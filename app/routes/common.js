const liSDK = require('@livingdocs/sdk')
const renderShell = require('../shell')
const resolveIncludes = require('../includes')

function commonRouteHandlerFactory ({liClient, design}) {
  return async (req, res, next) => {
    // our retrieved publication
    const publication = req.publication
    // not found
    if (!publication) return next(new Error('Page not found'))

    // create a Livingdoc instance using the serialized content & built design
    const content = publication.content
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
    const includes = liSDK.document.getIncludes(document)
    try {
      await resolveIncludes(includes, liClient)
    } catch (e) {
      console.error('Couldn\'t resolve includes', e)
    }

    // get the location & menu for navigation purposes
    const location = req.url
    let menu = {}
    try {
      [menu] = await liClient.getMenus({handle: 'main'})
    } catch (e) {
      console.error('Couldn\'t get the header menus', e)
    }

    // render Livingdoc instance to html
    const documentHtml = liSDK.document.render(document)

    // render livingdoc html into layout & shell
    const layout = publication.systemdata.documentType
    const renderingContext = {
      ...publication,
      layout,
      menu,
      location,
      documentHtml
    }
    try {
      const shell = renderShell(renderingContext)
      res.set('content-type', 'text/html')
      res.send(shell)
    } catch (e) {
      next(e)
    }
  }
}

module.exports = commonRouteHandlerFactory
