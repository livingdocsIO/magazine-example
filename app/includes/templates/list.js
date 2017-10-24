/* eslint max-len: 0 */

module.exports = ({params, ...data}) => {
  if (params.layout && params.layout === 'teaserRowHigh') return renderSkyscraperTeaserList(data)
  return renderNormalTeaserList(data)
}

const renderSkyscraperTeaserList = ({documents}) => `
<div class="teaser-row placeholder--teaser-row-high doc-component doc-component-highlight" doc-include="list" doc-component="teaser-row-high">
${documents.map(({id, title, owner, metadata}) => `
  <a
    href="/articles/${id}"
    class="teaser-row__item teaser-row__item--high teaser-row__item--bg"
    style="background-image: url(${(metadata.teaserImage && metadata.teaserImage.url) || ''});"
  >
    <div class="teaser-row__inside">
      <div class="teaser-row__headline">
        <div class="teaser-row__headline-inner">${title || ''}</div>
      </div>
      <div class="teaser-author teaser-author--dark">
        By <span class="teaser-author__name">${owner.last_name || ''}</span></div>
    </div>
  </a>
`).join('')}
</div>
`

const renderNormalTeaserList = ({documents}) => `
<div class="teaser-row placeholder--teaser-row doc-component" doc-include="list" doc-component="teaser-row">
${documents.map(({id, title, owner, metadata}) => `
  <a href="/articles/${id}" class="teaser-row__item">
    <div class="teaser-tag-wrap">
      <img src="${(metadata.teaserImage && metadata.teaserImage.url) || ''}">
    </div>
    <div class="teaser-row__headline teaser-row__headline--outside">
      <div class="teaser-row__headline-inner">${title || ''}</div>
    </div>
    <div class="teaser-author">
      By <span class="teaser-author__name">${owner.last_name || ''}</span>
    </div>
  </a>
`).join('')}
</div>
`
