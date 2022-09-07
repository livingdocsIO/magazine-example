const moment = require('moment')
const slugify = require('../../app/helpers/li-slugify')
const getAuthorName = require('./helpers/get_author_name')

module.exports = {
  link,
  title,
  description,
  image,
  flag,
  publishDate,
  authorName,
  authorLink,
  profile
}

function link ({metadata = {}, systemdata = {}} = {}) {
  const documentId = systemdata.documentId
  if (!documentId) return '#'
  const slugTitle = metadata.title || 'publication'
  return slugify(slugTitle, documentId)
}

function title ({metadata = {}} = {}) {
  return metadata.title || ''
}

function description ({metadata = {}} = {}) {
  return metadata.description || ''
}

function authorName ({metadata = {}} = {}) {
  return getAuthorName(metadata)
}

function authorLink ({metadata = {}, systemdata = {}} = {}) {
  const documentId = systemdata.documentId
  if (!documentId) return '#'
  const slugTitle = authorName({metadata}) || 'author'
  return slugify(slugTitle, documentId)
}

function profile ({metadata = {}} = {}) {
  return metadata.profile || ''
}

function image (imageExtractionConfig = {}) {
  const desiredImageCrop = imageExtractionConfig.crop
  const metadataTarget = imageExtractionConfig.target || 'teaserImage'

  return function ({metadata = {}} = {}) {
    const teaserImage = metadata[metadataTarget]
    if (!teaserImage) return null
    if (!desiredImageCrop) return teaserImage
    const crops = teaserImage.crops
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

function publishDate ({metadata = {}, last_publication: lastPublication = {}} = {}) {
  try {
    const metadataDate = moment(metadata.publishDate)
    if (metadataDate.isValid()) return metadataDate.calendar()
    const recordDate = moment(lastPublication.created_at)
    if (recordDate.isValid()) return recordDate.calendar()
    return ''
  } catch (e) {
    return ''
  }
}
