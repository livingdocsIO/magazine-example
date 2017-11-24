const liSDK = require('@livingdocs/sdk')

module.exports = async function resolveEmbedTeaserIncludes (
  livingdoc, liClient, includes, includeConfig
) {
  if (!includeConfig || !includeConfig.template) {
    throw new Error('Template component name is missing in includes configuration')
  }

  const dataFetchTasks = startDataFetchTasks(includes, liClient)
  for (const task of dataFetchTasks) {
    const {include, request} = task

    const [publication] = await request
    const {params} = include.getContent()
    const templateComponent = includeConfig.template
    const html = renderEmbedTeaserInclude(livingdoc, templateComponent, {...publication, params})
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

function renderEmbedTeaserInclude (livingdoc, templateComponent, {params, systemdata, metadata}) {
  const component = livingdoc.createComponent(templateComponent)

  component.setContent('link', getLink(systemdata))
  component.setContent('title', getTitle(metadata))
  component.setContent('image', getImage(metadata))
  component.setContent('author', getAuthor(metadata))
  component.setContent('date', getPublishDate(metadata))

  return liSDK.document.renderComponent(component)
}

function getLink (systemdata = {}) {
  return `/articles/${systemdata.documentId}` || ''
}

function getTitle (metadata = {}) {
  return metadata.title || ''
}

function getImage (metadata = {}) {
  const teaserImage = metadata.teaserImage
  const desiredCrop = teaserImage.crops.find(crop => crop.name === '16:9')
  if (desiredCrop) return {...teaserImage, url: desiredCrop.url}
  return teaserImage
}

function getAuthor (metadata = {}) {
  return metadata.author || ''
}

function getPublishDate (metadata = {}) {
  return metadata.publishDate || ''
}
