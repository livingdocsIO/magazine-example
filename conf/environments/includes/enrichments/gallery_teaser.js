const liSDK = require('@livingdocs/sdk')

module.exports = function enrichGalleryTeaserContent ({component, publication} = {}) {
  const design = require('../../../../design/dist/design.json')
  const {content} = publication
  const galleryLivingdoc = liSDK.document.create({design, content})
  const tree = galleryLivingdoc.componentTree

  const sourceImages = tree.find('image')
  sourceImages.each((imageComponent) => {
    component.append('images', imageComponent)
  })
}
