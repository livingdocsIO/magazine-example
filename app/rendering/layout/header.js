module.exports = function getHeaderComponent (tree, {menu, location}, {header, headerItem}) {
  const headerComponent = tree.createComponent(header)
  const headerItemContainer = headerComponent.containers.get('header-item')

  const menuNodes = menu.nodes || []
  for (const node of menuNodes) {
    const headerItemComponent = tree.createComponent(headerItem)

    const headerItemContent = getHeaderItemContent(node)
    headerItemComponent.setContent(headerItemContent)

    const isCurrent = isCurrentLocation(node, location)
    if (isCurrent) {
      headerItemComponent.setStyle('selected-menu', 'selected')
    }

    headerItemContainer.append(headerItemComponent)
  }

  return headerComponent
}

function getHeaderItemContent (node) {
  return {
    link: getHref(node),
    text: node.label || ''
  }
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
