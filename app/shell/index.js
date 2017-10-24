module.exports = function render ({layout = 'page', contentHtml = '', ...opts}) {
  const renderShell = require('./main')
  const renderLayout = require(`./layouts/${layout}`)

  const shellContentHtml = renderLayout({...opts, contentHtml})
  return renderShell({...opts, contentHtml: shellContentHtml})
}