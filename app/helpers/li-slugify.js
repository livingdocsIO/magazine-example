const slugify = require('combined-slugify')

module.exports = (title, documentId) => {
  return `/article/${slugify(title, {lower: true})}/${documentId}`
}
