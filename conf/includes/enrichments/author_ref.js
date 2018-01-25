const publicationHref = require('../../../app/util/publication_href')
const getAuthorPublication = require('./helpers/get_author_publication')

module.exports = async function enrichTeaserContentWithAuthor ({liClient, publication} = {}) {
  const authorPublication = await getAuthorPublication({liClient, publication})
  if (!authorPublication) return

  const {systemdata, metadata} = authorPublication
  return {
    author: metadata.title,
    authorLink: publicationHref.generate(metadata.title, systemdata.documentId)
  }
}
