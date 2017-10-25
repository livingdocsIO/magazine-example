/* eslint max-len: 0 */
const dedent = require('dedent')

module.exports = ({params, ...data}) => {
  if (params.style && params.style === 'full-width') return renderFullWidthTeaser(data)
  return renderNormalTeaser(data)
}

const renderFullWidthTeaser = ({systemdata, metadata}) => dedent`
  <div class="placeholder--teaser-full-width doc-component" doc-include="teaser" doc-component="teaser-full-width">
    <a href="/articles/${systemdata.documentId}" class="teaser-full-width" style="background-image: url(${metadata.teaserImage.url})">
      <div class="teaser-full-width__inner">
        <div class="teaser-full-width__headline">${metadata.title || ''}</div>
        <div class="teaser-author">By <span class="teaser-author__name">${metadata.author || ''}</span></div>
      </div>
    </a>
  </div>
`

const renderNormalTeaser = ({systemdata, metadata}) => dedent`
  <div class="embed-container" doc-component="embed-teaser">
    <div doc-include="embed-teaser">
      <div class="teaser">
        <a internal="" href="/articles/${systemdata.documentId}">
          <div class="teaser__image container image-container resrc" style="background-image: url(${metadata.teaserImage.url})">
            <div class="image--overlay"></div>
          </div>
          <div class="teaser__text">
            <div>
              <h3>
                <span>${metadata.author || ''}</span>
                <span class="source"> ${metadata.publishDate || ''}</span>
              </h3>
            </div>
            <h2>${metadata.title || ''}</h2>
          </div>
        </a>
      </div>
    </div>
  </div>
`
