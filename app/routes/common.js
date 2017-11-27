const liSDK = require('@livingdocs/sdk')
const resolveIncludes = require('../includes')
const renderLayout = require('../rendering/layout')

module.exports = function commonRouteHandlerFactory ({liClient, conf}) {
  const headerMenuHandle = conf.get('navigation:headerMenuHandle')
  const includesConfig = conf.get('includes')
  const defaultDocumentType = conf.get('defaultDocumentType')
  const documentTypes = conf.get('documentTypes')

  return async (req, res, next) => {
    // our retrieved publication
    const publication = req.publication
    // not found
    if (!publication) return next(new Error('Page not found'))

    // get the design
    const design = require('../../design/dist/design.json')

    // create a Livingdoc instance using the serialized content & built design
    let livingdoc = {}
    try {
      const content = publication.content
      livingdoc = liSDK.document.create({design, content})
    } catch (e) {
      return next(e)
    }

    // get the location & menu for navigation purposes
    const location = req.url
    let menu = {}
    try {
      [menu] = await liClient.getMenus({handle: headerMenuHandle})
    } catch (e) {
      console.error('Couldn\'t get the header menus', e)
    }

    // resolve includes
    try {
      await resolveIncludes(livingdoc, liClient, includesConfig)
    } catch (e) {
      console.error(e)
    }

    // compose layout with the publication livingdoc
    // and render it into the shell
    try {
      const documentType = publication.systemdata.documentType
      const currentDocumentType = documentTypes && documentTypes[documentType]
      const targetDocumentType = currentDocumentType || defaultDocumentType

      const data = {menu, location}
      const layoutComponents = targetDocumentType.layoutComponents
      const renderedLayout = renderLayout(design, livingdoc, layoutComponents, data)
      res.render('shell', {
        ...publication,
        content: renderedLayout
      })
    } catch (e) {
      next(e)
    }
  }
}
