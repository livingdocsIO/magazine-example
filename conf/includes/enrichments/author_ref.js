const slugify = require('../../../app/helpers/li-slugify')
const getAuthorName = require('../helpers/get_author_name')
const getAuthorPublication = require('../helpers/get_author_publication')

module.exports = async function enrichTeaserContentWithAuthor ({liClient, publication} = {}) {
  const authorPublication = await getAuthorPublication({liClient, publication})
  if (!authorPublication) return fallbackReference()

  const {metadata, systemdata} = authorPublication
  if (!systemdata || !systemdata.documentId) return fallbackReference()

  const author = getAuthorName(metadata)
  return {author, authorLink: slugify(author, systemdata.documentId)}
}

function fallbackReference () {
  return {author: 'No author', authorLink: '#'}
}
