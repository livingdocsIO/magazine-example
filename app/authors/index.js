const _ = require('lodash')

/*
  The author is a data-record. Data records are metadata-only records and do not have
  a content array thus also no default rendering. We are creating a livingdoc to render
  manually here. You could of course also use any templating language of your choice to
  render data records.
*/
module.exports = async function createAuthorPage (livingdoc, publication, liClient) {

  const tree = livingdoc.componentTree
  const metadata = publication.metadata
  const authorId = publication.systemdata.documentId

  const container = tree.createComponent('author-container')
  tree.append(container)

  const head = tree.createComponent('author-head')
  if (metadata.authorImage) {
    const {url, height, width, size, mimeType, imageService} = metadata.authorImage
    head.setContent('image', {url, height, width, size, mimeType, imageService})
  }
  if (metadata.prename || metadata.surname) {
    head.setContent('name', `${metadata.prename} ${metadata.surname}`)
  }
  if (metadata.biography) head.setContent('biography', metadata.biography)
  container.append('main', head)

  const teaserContainer = tree.createComponent('whole')
  teaserContainer.setContent('title', 'Recent Work')
  teaserContainer.setStyle('container-style-lined', 'container--lined')
  container.append('main', teaserContainer)

  /*
    Note: We are getting recent works here. Initially the plan was to list all work.
    For this to work, we would need a search API on the public API to make a query like:
    Get me all documents where authorId xyz is contained in the metadata array `authors`
    or maybe even
    Get me all documents where authorId xyz is the first entry in the metadata array `authors`
    (e.g. for scientific publications if the first author is more important)
  */

  const publications = await liClient.getPublications({limit: 100, fields: 'metadata,systemdata'})
  for (const recentPublication of publications) {
    const authors = _.get(recentPublication, 'metadata.authors.references')
    if (authors && _.find(authors, (a) => +a.id === +authorId)) {
      const teaser = tree.createComponent('teaser-card')
      const includeDirective = teaser.directives.get('teaser')
      teaser.setStyle('teaser-image-position', 'teaser-card--left-aligned-img')
      includeDirective.setParams({layout: 'card', mediaId: recentPublication.systemdata.documentId})
      teaserContainer.append('column-one', teaser)
    }
  }

  const ad = tree.createComponent('ad-rectangle-resolved')
  container.append('sidebar', ad)

  return livingdoc
}
