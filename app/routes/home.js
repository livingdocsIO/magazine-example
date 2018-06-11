const conf = require('../../conf')
const liClient = require('../helpers/li-client')
const {renderPage, renderError} = require('../rendering')

module.exports = async (req, res) => {
  try {
    const headerMenuHandle = conf.get('navigation:headerMenuHandle')

    const homePublications = await liClient.getPublications({homepage: true})
    if (!homePublications || !homePublications.length) throw homepageNotFoundError()

    const headerMenus = await liClient.getMenus({handle: headerMenuHandle})
    if (!headerMenus || !headerMenus.length) throw headerMenuNotFoundError()

    const [menu] = headerMenus
    const [publication] = homePublications
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

function homepageNotFoundError () {
  const msg = 'Homepage not found'
  return notFoundError(msg)
}

function headerMenuNotFoundError () {
  const msg = 'Header menu not found'
  return notFoundError(msg)
}

function notFoundError (msg) {
  const error = new Error(msg)
  error.statusCode = 404
  return error
}
