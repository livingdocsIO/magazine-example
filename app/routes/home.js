module.exports = function homeRouteHandler ({liClient}) {
  return async (req, res, next) => {
    // fetch home page through metadata filter
    let publications = []
    try {
      publications = await liClient.getPublications({homepage: true})
    } catch (e) {
      return next(e)
    }
    if (!publications.length) return next()

    // assign publication for the common route handler
    const homepagePublication = publications[0]
    req.publication = homepagePublication

    // proceed with common route handler
    next()
  }
}
