const slugify = require('combined-slugify')

module.exports = {
  getPathRegex,
  generate
}

function getPathRegex () {
  return '/:title(\\S{0,})-:id(\\d+)'
}

function generate (title, documentId) {
  return `${slugify(title, {lower: true})}-${documentId}`
}
