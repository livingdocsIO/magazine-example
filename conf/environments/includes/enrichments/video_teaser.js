const liSDK = require('@livingdocs/sdk')

module.exports = function enrichVideoTeaserContent ({component, publication} = {}) {
  const design = require('../../../../design/dist/design.json')
  const {content} = publication
  const videoLivingdoc = liSDK.document.create({design, content})
  const tree = videoLivingdoc.componentTree

  const freeHtml = tree.find('free-html')
  const iframe = tree.find('iframe')
  component.append('video',
    getFirstEscaped(freeHtml, 'free-html') || getFirstEscaped(iframe, 'iframe')
  )
}

function getFirstEscaped (componentModels, directiveName) {
  if (!componentModels.length) return null

  const componentModel = componentModels[0]
  const htmlDirective = componentModel.directives.get(directiveName)
  const htmlContent = htmlDirective.getContent()
  htmlDirective.setContent(escape(htmlContent))

  return componentModel
}
