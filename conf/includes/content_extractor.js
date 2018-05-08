const slugify = require('../../app/helpers/li-slugify')
const moment = require('moment')
const _ = require('lodash')

module.exports = {
  link,
  title,
  description,
  image,
  flag,
  author,
  publishDate,
  profile
}

function link ({metadata = {}, systemdata = {}} = {}) {
  return slugify(metadata.title, systemdata.documentId)
}

function title ({metadata = {}} = {}) {
  return metadata.title || ''
}

function description ({metadata = {}} = {}) {
  return metadata.description || ''
}

function profile ({metadata = {}} = {}) {
  return metadata.profile || ''
}

function image (imageExtractionConfig = {}) {
  const desiredImageCrop = imageExtractionConfig.crop
  const metadataTarget = imageExtractionConfig.target || 'teaserImage'

  return function ({metadata = {}} = {}) {
    const teaserImage = metadata[metadataTarget]
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

function publishDate ({metadata = {}, first_publication: firstPublication = {}} = {}) {
  if (_.isDate(metadata.publishDate)) return moment(metadata.publishDate).calendar()
  if (_.isDate(firstPublication.created_at)) return moment(firstPublication.created_at).calendar()
  return ''
}
