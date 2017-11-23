module.exports = function setupErrorHandling (app) {
  app.use((err, req, res, next) => {
    const notFound = err.message === 'page not found'
    if (notFound) return pageNotFoundResponse(res)
    console.error(err)
    return internalErrorResponse(res, err)
  })
}

function pageNotFoundResponse (res) {
  const context = {
    title: 'Not found',
    description: 'The page you are looking for could not be found...'
  }
  return renderErrorPageWith(context, res, 404)
}

function internalErrorResponse (res, err) {
  const context = {
    title: 'Internal Error',
    description: err.message
  }
  return renderErrorPageWith(context, res, 500)
}

function renderErrorPageWith (context, res, status) {
  return res.status(status).render('error', context, function (err, html) {
    if (err) return res.status(500).send(err.message)
    return res.send(html)
  })
}
