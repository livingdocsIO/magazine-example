const liSDK = require('@livingdocs/sdk')
const getHeaderComponent = require('./header')

module.exports = function renderLayout (design, livingdoc,
  {layout, header, headerItem, footer}, {menu, location}
) {
  const wrapperLivingdoc = liSDK.document.create({design, content: {}})
  const tree = wrapperLivingdoc.componentTree

  const layoutComponent = tree.createComponent(layout)

  const headerComponent = getHeaderComponent(tree, {header, headerItem}, {menu, location})
  layoutComponent.append('header', headerComponent)

  const contentContainer = layoutComponent.containers.get('content')
  contentContainer.appendTree(livingdoc.componentTree)

  const footerComponent = tree.createComponent(footer)
  layoutComponent.append('footer', footerComponent)

  tree.append(layoutComponent)
  return liSDK.document.render(wrapperLivingdoc)
}
