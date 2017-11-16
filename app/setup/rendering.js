const fs = require('fs')
const path = require('path')

module.exports = function setupRendering (app) {
  app.engine('html', function (filePath, context, callback) {
    fs.readFile(filePath, 'utf8', function (err, template) {
      if (err) return callback(err)

      const rendered = render(template, context)
      return callback(null, rendered)
    })
  })
  app.set('views', path.join(__dirname, '../rendering/templates'))
  app.set('view engine', 'html')
}

function render (content, context = {}) {
  return content.replace(/{{(.*)}}/g, function (str, keys) {
    if (keys) keys = keys.trim()
    return getProp(context, keys, '')
  })
}

function getProp (object, keys, defaultVal) {
  keys = Array.isArray(keys) ? keys : keys.split('.')
  object = object[keys[0]]
  if (object && keys.length > 1) {
    return getProp(object, keys.slice(1), defaultVal)
  }
  return object || defaultVal
}
