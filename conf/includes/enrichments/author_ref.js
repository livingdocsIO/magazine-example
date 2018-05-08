const slugify = require('../../../app/helpers/li-slugify')
const _ = require('lodash')

module.exports = async function enrichTeaserContentWithAuthor ({liClient, publication} = {}) {
  const firstAuthor = _.get(publication, 'metadata.authors[0]')
  if (!firstAuthor) return

  return {
    author: firstAuthor.name,
    authorLink: slugify(firstAuthor.name, firstAuthor.id)
  }
}
