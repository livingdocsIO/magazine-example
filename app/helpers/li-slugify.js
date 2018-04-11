const slugify = require('combined-slugify')

module.exports = (title, documentId) => {
  return `/${slugify(title, {lower: true})}-${documentId}`
}
