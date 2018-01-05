const liSDK = require('@livingdocs/sdk')
const publicationHref = require('../../util/publication_href')
const handleVideoTeaser = require('./enrichments/video_teaser')
const handleAuthorTeaser = require('./enrichments/author_teaser')
const handleGalleryTeaser = require('./enrichments/gallery_teaser')

module.exports = async function resolveEmbedTeaserIncludes (
  livingdoc, liClient, includes, includeConfig
) {
  const defaultTemplate = includeConfig && includeConfig.defaultTemplate
  if (!defaultTemplate) {
    throw new Error('Default template component name is missing in includes configuration')
  }

  const dataFetchTasks = startDataFetchTasks(includes, liClient)
  for (const task of dataFetchTasks) {
    const {include, request} = task
    const {params} = include.getContent()
    const layout = params.layout
    if (!hasValidConfig(layout, includeConfig.templates)) {
      const msg =
        `Template component for layout "${layout}" not found in "templates" configuration`
      throw new Error(msg)
    }

    const [publication] = await request
    if (!publication) throw new Error(`Article embed with id "${params.mediaId}" not found`)

    const renderArgs = [liClient, livingdoc, layout, includeConfig, publication]
    const html = await renderEmbedTeaserInclude(...renderArgs)
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

async function renderEmbedTeaserInclude (
  liClient, livingdoc, layout,
  {templates, defaultTemplate, desiredImageCrop},
  {systemdata, metadata, content}
) {
  const templateComponent = templates[layout] || defaultTemplate
  const component = livingdoc.createComponent(templateComponent)

  const includeContent = getIncludeContent(layout, desiredImageCrop, {systemdata, metadata})
  const enrichment = await getEnrichment(liClient, layout, component, content) || {}

  component.setContent({...includeContent, ...enrichment})
  return liSDK.document.renderComponent(component)
}

function hasValidConfig (layout, templates) {
  if (!layout) return true
  return typeof templates[layout] === 'string'
}

function getEnrichment (liClient, layout, component, content) {
  if (layout === 'card-author') return handleAuthorTeaser(liClient, component, content)
  if (['video', 'video-hero'].includes(layout)) return handleVideoTeaser(component, content)
  if (['gallery', 'gallery-hero'].includes(layout)) return handleGalleryTeaser(component, content)
}

function getIncludeContent (layout, desiredImageCrop, {systemdata, metadata}) {
  const title = getTitle(metadata)
  const link = getLink(title, systemdata)
  const image = getImage(metadata, desiredImageCrop)
  const text = getDescription(metadata)
  const flag = getFlag(metadata)
  const author = getAuthor(metadata)
  const date = getPublishDate(metadata)
  const base = {title}
  if (['gallery', 'video'].includes(layout)) {
    return {...base, image}
  } else if (['gallery-hero', 'video-hero'].includes(layout)) {
    return {...base, image, text}
  } else if (layout === 'author-embed') {
    return {link, image, text}
  } else if (layout === 'sidebar-embed') {
    return {...base, link, flag, author, date}
  } else if (layout === 'card-author') {
    return {...base, link, image, text, link2: link}
  } else if (layout === 'numbered') {
    return {...base, link, flag, author, date}
  } else if (layout === 'card-no-image') {
    return {...base, link, flag, text, author, date}
  } else if (layout === 'hero') {
    return {...base, link, image, flag, text, author, date}
  } else if (layout === 'card') {
    return {...base, link, image, flag, text, author, date, link2: link}
  } else {
    return {}
  }
}

function getLink (title, systemdata = {}) {
  return publicationHref.generate(title, systemdata.documentId)
}

function getTitle (metadata = {}) {
  return metadata.title || ''
}

function getDescription (metadata = {}) {
  return metadata.description || ''
}

function getImage (metadata = {}, desiredImageCrop) {
  const teaserImage = metadata.teaserImage
  const crops = teaserImage.crops
  const desiredCrop = crops && crops.find(crop => crop.name === desiredImageCrop)
  if (desiredCrop) {
    return {
      ...teaserImage,
      url: desiredCrop.url,
      width: desiredCrop.width,
      height: desiredCrop.height
    }
  }
  return teaserImage
}

function getFlag (metadata = {}) {
  return metadata.flag
}

function getAuthor (metadata = {}) {
  return metadata.author || ''
}

function getPublishDate (metadata = {}) {
  return metadata.publishDate || ''
}
