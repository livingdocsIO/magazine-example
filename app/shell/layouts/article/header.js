/* eslint max-len: 0 */
const dedent = require('dedent')

module.exports = ({menu, location}) => dedent`
  <style>
    .navigation {
      padding: 3em 0;
      display: flex;
      flex-direction: row;
      align-item: center;
      justify-content: center;
      border:
    }
    .navigation__item {
      padding: 3em;
    }
    .navigation__item.selected > .navigation__item--link {
      padding: 1em;
      color: #ffffff;
      background-color: #2aba6f;
    }
    .navigation__item--link {
      color: #2aba6f;
    }
  </style>
  <div class="navigation">
    ${menu.nodes.map(node => dedent`
      <div class="navigation__item ${isCurrentLocation(node, location) ? 'selected' : ''}">
        <a class="navigation__item--link" target="${getTarget(node)}" href="${getHref(node)}">${node.label || ''}</a>
      </div>
    `).join('')}
  </div>
`

function isCurrentLocation (node, location) {
  switch (node.type) {
    case 'id':
      return location === `/articles/${node.documentId}`
    case 'uri':
      return location === node.uri
    default:
      return false
  }
}

function getTarget (node) {
  if (node.type === 'uri' && isAbsolute(node.uri)) return '_blank'
  return '_self'
}

function getHref (node) {
  switch (node.type) {
    case 'id':
      return `/articles/${node.documentId}`
    case 'uri':
      return node.uri
    default:
      return '#'
  }
}

function isAbsolute (uri) {
  const regexp = new RegExp('^([a-z]+://|//)', 'i')
  return regexp.test(uri)
}
