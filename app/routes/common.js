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
      return next(e)
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

    // compose layout with the publication livingdoc
    // and render it into the shell
    try {
      const documentType = publication.systemdata.documentType
      res.render('shell', {
        ...publication,
        content: renderLayout(design, livingdoc, {documentType, menu, location})
      })
    } catch (e) {
      next(e)
    }
  }
}
