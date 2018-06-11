const fs = require('fs')

module.exports = function getDesign (filePath, cb) {
  fs.readFile(filePath, 'utf8', function (err, rawDesign) {
    if (err) return cb(err)

    const parseResult = Parse(rawDesign)
    if (parseResult.err) return cb(parseResult.err)
    return cb(null, parseResult.value)
  })
}

function Parse (data) {
  if (!(this instanceof Parse)) {
    return new Parse(data)
  }
  this.err = null
  this.value = null
  try {
    this.value = JSON.parse(data)
  } catch (err) {
    this.err = err
  }
}
