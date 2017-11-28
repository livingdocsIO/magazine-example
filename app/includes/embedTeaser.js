const liSDK = require('@livingdocs/sdk')

module.exports = async function resolveEmbedTeaserIncludes (
  livingdoc, liClient, includes, includeConfig
) {
  const defaultTemplate = includeConfig && includeConfig.defaultTemplate
  if (!defaultTemplate) {
    throw new Error('Default template component name is missing in includes configuration')
  }
  const templates = includeConfig.templates

  const dataFetchTasks = startDataFetchTasks(includes, liClient)
  for (const task of dataFetchTasks) {
    const {include, request} = task
    const {params} = include.getContent()
    const layout = params.layout
    if (!hasValidConfig(layout, templates)) {
      const msg =
        `Template component for layout "${layout}" not found in "templates" configuration`
      throw new Error(msg)
    }

    const [publication] = await request

    const templateComponent = templates[layout] || defaultTemplate
    const html = renderEmbedTeaserInclude(livingdoc, templateComponent, layout, publication)
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

function renderEmbedTeaserInclude (livingdoc, templateComponent, layout, {systemdata, metadata}) {
  const component = livingdoc.createComponent(templateComponent)
  const content = getIncludeContent(layout, {systemdata, metadata})
  component.setContent(content)
  return liSDK.document.renderComponent(component)
}

function hasValidConfig (layout, templates) {
  if (!layout) return true
  return typeof templates[layout] === 'string'
}

function getIncludeContent (layout, {systemdata, metadata}) {
  const link = getLink(systemdata)
  const base = {
    link,
    title: getTitle(metadata),
    text: getDescription(metadata),
    image: getImage(metadata),
    author: getAuthor(metadata),
    date: getPublishDate(metadata)
  }
  if (layout === 'hero') return base
  else if (layout === 'card') return {...base, link2: link}
  else return {}
}

function getLink (systemdata = {}) {
  return `/articles/${systemdata.documentId}` || ''
}

function getTitle (metadata = {}) {
  return metadata.title || ''
}

function getDescription (metadata = {}) {
  return metadata.description || ''
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
