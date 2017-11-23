const liSDK = require('@livingdocs/sdk')

module.exports = function handleGalleryTeaser (component, content) {
  const design = require('../../../design/dist/design.json')
  const galleryLivingdoc = liSDK.document.create({design, content})
  const tree = galleryLivingdoc.componentTree

  const sourceImages = tree.find('image')
  sourceImages.each((imageComponent) => {
    component.append('images', imageComponent)
  })
}
