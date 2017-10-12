/* eslint max-len: 0 */

module.exports = function createPage (doc, design) {
  const page = doc.createLivingdoc({
    content: [{
      'component': 'teaser-full-width'
    }, {
      'component': 'teaser-full-width-resolved'
    }, {
      'component': 'top-row'
    }, {
      'component': 'top-row-resolved'
    }, {
      'component': 'teaser-row'
    }, {
      'component': 'teaser-row-resolved'
    }, {
      'component': 'teaser-row-text'
    }, {
      'component': 'teaser-row-text-resolved'
    }, {
      'component': 'teaser-row-high'
    }, {
      'component': 'section-title'
    }, {
      'component': 'teaser-row-high-resolved'
    }],
    design: {
      name: design.name,
      version: design.version
    },
    layout: 'page'
  })
  return page
}
