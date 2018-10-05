const slugify = require('../../../app/helpers/li-slugify')
const getAuthorPublication = require('./helpers/get_author_publication')

module.exports = async function enrichTeaserContentWithAuthor ({liClient, publication} = {}) {
  const authorPublication = await getAuthorPublication({liClient, publication})

  const {metadata, systemdata} = authorPublication
  return {
    author: `${metadata.prename} ${metadata.surname}`,
    authorLink: slugify(metadata.title, systemdata.documentId)
  }
}
