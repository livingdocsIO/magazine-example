const liSDK = require('@livingdocs/sdk')
const resolveIncludes = require('../includes')
const renderLayout = require('../rendering/layout')

module.exports = function commonRouteHandlerFactory ({liClient, design}) {
  return async (req, res, next) => {
    // our retrieved publication
    const publication = req.publication
    // not found
    if (!publication) return next(new Error('Page not found'))

    // create a Livingdoc instance using the serialized content & built design
    let livingdoc = {}
    try {
      const content = publication.content
      livingdoc = liSDK.document.create({design, content})
    } catch (e) {
      return next(new Error(`Couldn't create the livingdoc ${e}`))
    }

    // resolve includes
    try {
      await resolveIncludes(livingdoc, liClient)
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

    // - render Livingdoc instance to html
    // - render it into layout & shell
    try {
      const documentHtml = liSDK.document.render(livingdoc)
      const layout = publication.systemdata.documentType
      const renderingContext = {layout, menu, location, documentHtml}
      const renderedLayout = renderLayout(livingdoc, renderingContext)
      res.render('shell', {...publication, content: renderedLayout})
    } catch (e) {
      next(new Error(`Rendering failed with ${e}`))
    }
  }
}
