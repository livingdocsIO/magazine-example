/* eslint max-len: 0 */
const dedent = require('dedent')
const renderHead = require('./head')
const renderScripts = require('./scripts')

module.exports = ({metadata = {}, contentHtml}) => dedent`
  <!DOCTYPE html>
  <html lang="en">
    <body lang="en">
      ${renderHead({metadata})}
      ${contentHtml}
      ${renderScripts()}
    </body>
  </html>
`
