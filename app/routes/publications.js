const conf = require('../../conf')
const liClient = require('../helpers/li-client')
const {renderPage, renderError} = require('../rendering')

module.exports = async (req, res) => {
  // get route param that represents the documentId
  const documentId = Number(req.params.id)

  try {
    const headerMenuHandle = conf.get('navigation:headerMenuHandle')
    const publication = await liClient.getPublication({documentId})
    if (!publication || publication.error) {
      const error = publication && publication.error
      const status = publication && publication.status
      if (status === 404) throw publicationNotFoundError(documentId)
      throw publicationRetrievalError(documentId, error, status)
    }

    const headerMenus = await liClient.getMenus({handle: headerMenuHandle})
    if (!headerMenus || !headerMenus.length) throw headerMenuNotFoundError()

    const [menu] = headerMenus
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

function publicationRetrievalError (id, message, code = 500) {
  const msg = `Could not retrieve publication with id "${id}" ${message || ''}`
  const error = new Error(msg)
  error.statusCode = code
  return error
}

function publicationNotFoundError (id) {
  const msg = `Publication with id "${id}" not found`
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
