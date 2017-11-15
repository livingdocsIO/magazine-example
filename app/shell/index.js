module.exports = function render ({
  layout = 'default', menu = {}, location = '', documentHtml = '', ...rest
}) {
  const renderShell = require('./main')
  const renderLayout = require(`./layouts/${coerceToValidLayout(layout)}`)

  const shellContentHtml = renderLayout({...rest, menu, location, documentHtml})
  return renderShell({...rest, contentHtml: shellContentHtml})
}

function coerceToValidLayout (layout) {
  const supportedLayouts = ['default', 'article', 'page']
  if (supportedLayouts.includes(layout)) return layout
  return 'default'
}
