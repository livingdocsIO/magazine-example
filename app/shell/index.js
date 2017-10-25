function render ({layout = 'page', menu = {}, location = '', documentHtml = '', ...rest}) {
  const renderShell = require('./main')
  const renderLayout = require(`./layouts/${layout}`)

  const shellContentHtml = renderLayout({...rest, menu, location, documentHtml})
  return renderShell({...rest, contentHtml: shellContentHtml})
}

module.exports = render
