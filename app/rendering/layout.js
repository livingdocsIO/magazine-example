const liSDK = require('@livingdocs/sdk')

// TODO (DI)
// - make this configurable
module.exports = function renderLayout (livingdoc, {layout, menu, location, documentHtml}) {
  switch (coerceToValidLayout(layout)) {
    case 'page':
      return renderPageLayout(livingdoc, {menu, location, documentHtml})

    case 'article':
      return renderArticleLayout(livingdoc, {menu, location, documentHtml})

    default:
      return renderDefaultLayout(livingdoc, {menu, location, documentHtml})
  }
}

function coerceToValidLayout (layout) {
  const supportedLayouts = ['default', 'article', 'page']
  if (supportedLayouts.includes(layout)) return layout
  return 'default'
}

function renderPageLayout (livingdoc, renderingContext) {
  const componentName = 'page-layout'
  return renderLayoutComponent(livingdoc, componentName, renderingContext)
}

function renderArticleLayout (livingdoc, renderingContext) {
  const componentName = 'article-layout'
  return renderLayoutComponent(livingdoc, componentName, renderingContext)
}

function renderDefaultLayout (livingdoc, renderingContext) {
  const componentName = 'default-layout'
  return renderLayoutComponent(livingdoc, componentName, renderingContext)
}

function renderLayoutComponent (livingdoc, componentName, {menu, location, documentHtml}) {
  const defaultLayoutComponent = livingdoc.createComponent(componentName)

  const componentContent = getLayoutComponentContent({menu, location, documentHtml})
  defaultLayoutComponent.setContent(componentContent)
  return liSDK.document.renderComponent(defaultLayoutComponent)
}

// TODO: (DI)
// - How to resolve containers contents
//  - header -> header-items
//  - footer
// - How to set data for repeatables
//  - header-items (menu data)
function getLayoutComponentContent ({menu, location, documentHtml}) {
  const headerItems = getHeaderItems(menu, location)
  return {
    // header: { 'header-item': headerItems },
    content: documentHtml
    // footer: should resolve the content automatically through linkage in design
  }
}

function getHeaderItems (menu, location) {
  return menu.nodes.map(node => {
    const isCurrent = isCurrentLocation(node, location)
    return {
      link: getHref(node),
      text: node.label || '',
      ...(isCurrent ? {
        'selected-menu': isCurrent
      } : {})
    }
  })
}

function isCurrentLocation (node, location) {
  switch (node.type) {
    case 'document':
      return location === `/articles/${node.documentId}`
    case 'uri':
      return location === node.uri
    default:
      return false
  }
}

function getHref (node) {
  switch (node.type) {
    case 'document':
      return `/articles/${node.documentId}`
    case 'uri':
      return node.uri
    default:
      return '#'
  }
}
