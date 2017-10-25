function homeRouteHandlerFactory ({liClient}) {
  return async (req, res, next) => {
    // fetch home page through metadata filter
    let publications = []
    try {
      publications = await liClient.getPublications({homepage: true})
    } catch (e) {
      return next(new Error('json server not ready'))
    }
    if (!publications.length) return next(new Error('Homepage not found'))

    // assign publication for the common route handler
    const homepagePublication = publications[0]
    req.publication = homepagePublication

    // proceed with common route handler
    next()
  }
}

module.exports = homeRouteHandlerFactory
