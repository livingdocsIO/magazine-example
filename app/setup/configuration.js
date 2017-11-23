module.exports = function setupConfiguration (app) {
  app.disable('x-powered-by')

  const hostName = require('os').hostname()
  const compression = require('compression')()
  app.use(function (req, res, next) {
    res.setHeader('X-Served-By', hostName)
    res.setHeader('X-DNS-Prefetch-Control', 'on')
    compression(req, res, next)
  })
}
