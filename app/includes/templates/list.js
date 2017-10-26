/* eslint max-len: 0 */
const dedent = require('dedent')

module.exports = ({params, ...data}) => {
  switch (params.layout) {
    case 'news':
      return renderLatestNewsList(data)
    case 'teaserRowText':
      return renderTextTeaserList(data)
    case 'teaserRowHigh':
      return renderSkyscraperTeaserList(data)
    case 'teaserRow':
    default:
      return renderNormalTeaserList(data)
  }
}

const renderLatestNewsList = ({documents = []}) => {
  return documents.map(({systemdata, metadata}) => dedent`
    <a href="/articles/${systemdata.documentId}" class="teaser-latest__item">
      <div class="teaser-row__headline teaser-latest__headline">
        <div class="teaser-row__headline-inner">${metadata.title || ''}</div>
      </div>
      <small class="teaser-latest__time">${metadata.publishDate || ''}</small>
    </a>
  `).join('')
}

const renderTextTeaserList = ({documents = []}) => {
  return documents.map(({systemdata, metadata}) => dedent`
    <a href="/articles/${systemdata.documentId}" class="teaser-row__headline">
      <div class="teaser-row__headline-inner">${metadata.title || ''}</div>
    </a>
  `).join('')
}

const renderSkyscraperTeaserList = ({documents = []}) => {
  return documents.map(({systemdata, metadata}) => dedent`
    <a
      href="/articles/${systemdata.documentId}"
      class="teaser-row__item teaser-row__item--high teaser-row__item--bg"
      style="background-image: url(${(metadata.teaserImage && metadata.teaserImage.url) || ''});"
    >
      <div class="teaser-row__inside">
        ${metadata.flag ? dedent`
          <div class="teaser-tag">${metadata.flag}</div>
        ` : ''}
        <div class="teaser-row__headline">
          <div class="teaser-row__headline-inner">${metadata.title || ''}</div>
        </div>
        <div class="teaser-author teaser-author--dark">
          By <span class="teaser-author__name">${metadata.author || ''}</span>
        </div>
      </div>
    </a>
  `).join('')
}

const renderNormalTeaserList = ({documents = []}) => {
  return documents.map(({systemdata, metadata}) => dedent`
    <a href="/articles/${systemdata.documentId || ''}" class="teaser-row__item">
      <div class="teaser-tag-wrap">
        <img src="${(metadata.teaserImage && metadata.teaserImage.url) || ''}">
        ${metadata.flag ? dedent`
          <div class="teaser-tag">${metadata.flag}</div>
        ` : ''}
      </div>
      <div class="teaser-row__headline teaser-row__headline--outside">
        <div class="teaser-row__headline-inner">${metadata.title || ''}</div>
      </div>
      <div class="teaser-author">
        By <span class="teaser-author__name">${metadata.author || ''}</span>
      </div>
    </a>
  `).join('')
}
