const liSDK = require('@livingdocs/sdk')

module.exports = async function resolveEmbedTeaserIncludes (livingdoc, includes, liClient) {
  const dataFetchTasks = startDataFetchTasks(includes, liClient)
  for (const task of dataFetchTasks) {
    const {include, request} = task

    const [publication] = await request
    const {params} = include.getContent()
    const html = renderEmbedTeaserInclude(livingdoc, {...publication, params})
    include.resolve(html)
  }
}

function startDataFetchTasks (includes, liClient) {
  return includes.map(include => {
    const {params} = include.getContent()
    const request = liClient.getPublication({documentId: params.mediaId})
    return {include, request}
  })
}

function renderEmbedTeaserInclude (livingdoc, {params, systemdata, metadata}) {
  const componentName = determineComponentName(params)
  const component = livingdoc.createComponent(componentName)

  component.setContent('link', getLink(systemdata))
  component.setContent('title', getTitle(metadata))
  component.setContent('image', getImage(metadata))
  component.setContent('author', getAuthor(metadata))
  if (componentName === 'embed-teaser-template') {
    component.setContent('date', getPublishDate(metadata))
  }

  return liSDK.document.renderComponent(component)
}

function determineComponentName (params = {}) {
  if (params.style === 'full-width') return 'teaser-full-width-template'
  return 'embed-teaser-template'
}

function getLink (systemdata = {}) {
  return `/articles/${systemdata.documentId}` || ''
}

function getTitle (metadata = {}) {
  return metadata.title || ''
}

function getImage (metadata = {}) {
  return metadata.teaserImage || {}
}

function getAuthor (metadata = {}) {
  return metadata.author || ''
}

function getPublishDate (metadata = {}) {
  return metadata.publishDate || ''
}
