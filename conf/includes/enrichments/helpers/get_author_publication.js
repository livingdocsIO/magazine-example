const createLivingdoc = require('./create_livingdoc')

module.exports = function getAuthorPublication ({publication, liClient} = {}) {
  const articleLivingdoc = createLivingdoc(publication)
  const tree = articleLivingdoc.componentTree

  const authorEmbeds = tree.find('embed-teaser-author')
  if (!authorEmbeds.length) return

  const authorEmbed = authorEmbeds[0]
  const embedIncludeDirective = authorEmbed.directives.get('embed')
  const {params} = embedIncludeDirective.getContent()

  return liClient.getPublication({documentId: params.mediaId})
}
