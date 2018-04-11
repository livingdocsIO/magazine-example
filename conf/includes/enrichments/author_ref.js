const slugify = require('../../../app/helpers/li-slugify')
const getAuthorPublication = require('./helpers/get_author_publication')

module.exports = async function enrichTeaserContentWithAuthor ({liClient, publication} = {}) {
  const authorPublication = await getAuthorPublication({liClient, publication})
  if (!authorPublication) return

  const {systemdata, metadata} = authorPublication
  return {
    author: metadata.title,
    authorLink: slugify(metadata.title, systemdata.documentId)
  }
}
