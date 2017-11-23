function articlesRouteHandlerFactory ({liClient}) {
  return async (req, res, next) => {
    // get route param that represents the documentId
    const documentId = Number(req.params.id)

    // fetch the publication using the documentId
    let publication = null
    try {
      [publication] = await liClient.getPublication({documentId})
    } catch (e) {
      return next(e)
    }

    // assign publication for the common route handler
    req.publication = publication

    // proceed with common route handler
    next()
  }
}

module.exports = articlesRouteHandlerFactory
