const conf = require('../../conf')
const liClient = require('../helpers/li-client')
const {renderPage, renderError} = require('../helpers/rendering')

module.exports = async (req, res) => {
  try {
    const headerMenuHandle = conf.get('navigation:headerMenuHandle')
    const [publication] = await liClient.getPublications({homepage: true})
    const [menu] = await liClient.getMenus({handle: headerMenuHandle})

    const html = await renderPage({
      menu,
      location: req.url,
      publication,
      liClient
    })

    return res.send(html)
  } catch (error) {
    error.statusCode = error.statusCode || 500
    console.error(error)
    const html = renderError(error)

    res.status(error.statusCode)
    return res.send(html)
  }
}
