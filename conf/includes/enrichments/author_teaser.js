const slugify = require('../../../app/helpers/li-slugify')
const getAuthorPublication = require('./helpers/get_author_publication')

module.exports = async function enrichAuthorTeaserContent ({liClient, publication} = {}) {
  const authorPublication = await getAuthorPublication({liClient, publication})
  if (!authorPublication) return

  const {metadata, systemdata} = authorPublication
  return {
    title: `${metadata.prename} ${metadata.surname}`,
    image: metadata.authorImage,
    authorLink: slugify(metadata.title, systemdata.documentId)
  }
}
