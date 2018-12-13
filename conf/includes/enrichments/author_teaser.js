const slugify = require('../../../app/helpers/li-slugify')
const getAuthorName = require('../helpers/get_author_name')
const getAuthorPublication = require('../helpers/get_author_publication')

module.exports = async function enrichAuthorTeaserContent ({liClient, publication} = {}) {
  const authorPublication = await getAuthorPublication({liClient, publication})
  if (!authorPublication) return fallbackTeaserContent()

  const {metadata, systemdata} = authorPublication
  if (!systemdata || !systemdata.documentId) return fallbackTeaserContent()

  const title = getAuthorName(metadata)
  const enrichment = {
    title,
    authorLink: slugify(title, systemdata.documentId)
  }
  if (metadata.authorImage) {
    enrichment.image = metadata.authorImage
  }
  return enrichment
}

function fallbackTeaserContent () {
  return {title: 'No author', authorLink: '#'}
}
