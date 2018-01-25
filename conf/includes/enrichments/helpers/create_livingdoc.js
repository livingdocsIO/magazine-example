const liSDK = require('@livingdocs/sdk')

module.exports = function createLivingdoc (publication) {
  const design = require('../../../../design/dist/design.json')
  const {content} = publication
  return liSDK.document.create({design, content})
}
