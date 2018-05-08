const _ = require('lodash')

module.exports = function getAuthorPublication ({publication, liClient} = {}) {
  const firstAuthor = _.get(publication, 'metadata.authors[0]')
  if (!firstAuthor) return null
  return liClient.getPublication({documentId: firstAuthor.id})
}
