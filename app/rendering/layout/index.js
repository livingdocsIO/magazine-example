const liSDK = require('@livingdocs/node-sdk')
const conf = require('../../../conf')
const getHeaderComponent = require('./header')

module.exports = function renderLayout (design, livingdoc,
  {layout, header, headerItem, footer}, {menu, location}
) {
  const imageServicesConfig = conf.get('imageServices', {})
  const config = {}
  if (Object.keys(imageServicesConfig).length) config.imageServices = imageServicesConfig

  const wrapperLivingdoc = liSDK.document.create({design, content: {}, config})
  const tree = wrapperLivingdoc.componentTree

  const layoutComponent = tree.createComponent(layout)

  if (header !== null && headerItem !== null) {
    const headerComponent = getHeaderComponent(tree, {header, headerItem}, {menu, location})
    layoutComponent.append('header', headerComponent)
  }

  const contentContainer = layoutComponent.containers.get('content')
  contentContainer.appendTree(livingdoc.componentTree)

  if (footer !== null) {
    const footerComponent = tree.createComponent(footer)
    layoutComponent.append('footer', footerComponent)
  }

  tree.append(layoutComponent)
  return liSDK.document.render(wrapperLivingdoc)
}
