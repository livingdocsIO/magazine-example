const getAuthorPublication = require('./helpers/get_author_publication')

module.exports = async function enrichAuthorTeaserContent ({liClient, publication} = {}) {
  const authorPublication = await getAuthorPublication({liClient, publication})
  if (!authorPublication) return

  const {metadata} = authorPublication
  return {
    title: metadata.title,
    image: metadata.teaserImage
  }
}
