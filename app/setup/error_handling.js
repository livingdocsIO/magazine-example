module.exports = function setupErrorHandling (app) {
  app.use((err, req, res, next) => {
    const jsonServerNotReady = err.message === 'json server not ready'
    if (jsonServerNotReady) return jsonServerNotReadyResponse(res)
    const notFound = err.message === 'page not found'
    if (notFound) return pageNotFoundResponse(res)
    console.error(err)
    return internalErrorResponse(res, err)
  })
}

function jsonServerNotReadyResponse (res) {
  const context = {
    title: 'Mock server not ready',
    description: 'Could not fetch homepage... Will retry in 500ms...',
    scripts: '<script>setTimeout(function() { window.location.reload(); }, 500)</script>'
  }
  return renderErrorPageWith(context, res, 200)
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
