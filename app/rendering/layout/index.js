const liSDK = require('@livingdocs/sdk')
const getHeaderComponent = require('./header')

// TODO (DI)
// - make this configurable
module.exports = function renderLayout (design, livingdoc, {documentType, menu, location}) {
  switch (coerceToSupportedDocumentType(documentType)) {
    case 'page':
      return renderLayoutComponent(design, livingdoc, {menu, location}, {
        layout: 'page-layout',
        header: 'page-layout-header',
        headerItem: 'page-layout-header-item',
        footer: 'page-layout-footer'
      })

    case 'article':
      return renderLayoutComponent(design, livingdoc, {menu, location}, {
        layout: 'article-layout',
        header: 'article-layout-header',
        headerItem: 'article-layout-header-item',
        footer: 'article-layout-footer'
      })

    default:
      return renderLayoutComponent(design, livingdoc, {menu, location}, {
        layout: 'default-layout',
        header: 'default-layout-header',
        headerItem: 'default-layout-header-item',
        footer: 'default-layout-footer'
      })
  }
}

function coerceToSupportedDocumentType (documentType) {
  const supported = ['default', 'article', 'page']
  if (supported.includes(documentType)) return documentType
  return 'default'
}

function renderLayoutComponent (design, livingdoc,
  {menu, location}, {layout, header, headerItem, footer}
) {
  const wrapperLivingdoc = liSDK.document.create({design, content: {}})
  const tree = wrapperLivingdoc.componentTree

  const layoutComponent = tree.createComponent(layout)

  const headerComponent = getHeaderComponent(tree, {menu, location}, {header, headerItem})
  layoutComponent.append('header', headerComponent)

  const contentContainer = layoutComponent.containers.get('content')
  contentContainer.appendTree(livingdoc.componentTree)

  const footerComponent = tree.createComponent(footer)
  layoutComponent.append('footer', footerComponent)

  tree.append(layoutComponent)
  return liSDK.document.render(wrapperLivingdoc)
}
