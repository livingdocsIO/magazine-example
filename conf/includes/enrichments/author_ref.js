const liSDK = require('@livingdocs/sdk')
const publicationHref = require('../../../app/util/publication_href')

module.exports = async function enrichTeaserContentWithAuthor ({liClient, publication} = {}) {
  const design = require('../../../design/dist/design.json')
  const {content} = publication
  const articleLivingdoc = liSDK.document.create({design, content})
  const tree = articleLivingdoc.componentTree

  const authorEmbeds = tree.find('embed-teaser-author')
  if (!authorEmbeds.length) return

  const authorEmbed = authorEmbeds[0]
  const embedIncludeDirective = authorEmbed.directives.get('embed')
  const {params} = embedIncludeDirective.getContent()

  const [{systemdata, metadata}] = await liClient.getPublication({documentId: params.mediaId})

  return {
    author: metadata.title,
    authorLink: publicationHref.generate(metadata.title, systemdata.documentId)
  }
}
