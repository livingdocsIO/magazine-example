const publicationHref = require('../../app/util/publication_href')

module.exports = {
  link,
  title,
  description,
  image,
  flag,
  author,
  publishDate
}

function link ({metadata = {}, systemdata = {}} = {}) {
  return publicationHref.generate(metadata.title, systemdata.documentId)
}

function title ({metadata = {}} = {}) {
  return metadata.title || ''
}

function description ({metadata = {}} = {}) {
  return metadata.description || ''
}

function image (imageExtractionConfig = {}) {
  const desiredImageCrop = imageExtractionConfig.crop

  return function ({metadata = {}} = {}) {
    const teaserImage = metadata.teaserImage
    const crops = teaserImage.crops

    if (!desiredImageCrop) return teaserImage
    const imageCrop = crops && crops.find(crop => crop.name === desiredImageCrop)
    if (!imageCrop) return teaserImage
    return {
      ...teaserImage,
      url: imageCrop.url,
      width: imageCrop.width,
      height: imageCrop.height
    }
  }
}

function flag ({metadata = {}} = {}) {
  return metadata.flag
}

function author ({metadata = {}} = {}) {
  return metadata.author || ''
}

function publishDate ({metadata = {}} = {}) {
  return metadata.publishDate || ''
}
