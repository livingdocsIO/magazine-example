const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')

module.exports = function setupRendering (app) {
  const isDev = process.env.NODE_ENV === 'development'
  app.engine('html', function (filePath, context, callback) {
    fs.readFile(filePath, 'utf8', function (err, template) {
      if (err) return callback(err)

      const renderTemplate = handlebars.compile(template)
      const rendered = renderTemplate({...context, isDev})
      return callback(null, rendered)
    })
  })
  app.set('view engine', 'html')
  app.set('view cache', !isDev)
  app.set('views', path.join(__dirname, '../rendering/templates'))
}
