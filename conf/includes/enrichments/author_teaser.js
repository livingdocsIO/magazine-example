const liSDK = require('@livingdocs/sdk')

module.exports = async function enrichAuthorTeaserContent ({liClient, publication} = {}) {
  const design = require('../../../design/dist/design.json')
  const {content} = publication
  const articleLivingdoc = liSDK.document.create({design, content})
  const tree = articleLivingdoc.componentTree

  const authorEmbeds = tree.find('embed-teaser-author')
  if (!authorEmbeds.length) return

  const authorEmbed = authorEmbeds[0]
  const embedIncludeDirective = authorEmbed.directives.get('embed')
  const {params} = embedIncludeDirective.getContent()

  const authorPublication = await liClient.getPublication({documentId: params.mediaId})
  if (!authorPublication) return

  const {metadata} = authorPublication
  return {
    title: metadata.title,
    image: metadata.teaserImage
  }
}
