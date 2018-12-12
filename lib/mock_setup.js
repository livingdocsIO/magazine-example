const jsonServer = require('json-server')

module.exports = function setupMocks (app) {
  const routes = require('../mocks/routes.json')
  const db = require('../mocks/db.js')()
  app.use(jsonServer.rewriter(routes))
  app.use(jsonServer.router(db))
}
