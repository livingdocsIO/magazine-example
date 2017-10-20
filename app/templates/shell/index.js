/* eslint max-len: 0 */
const renderHead = require('./head')
const renderScripts = require('./scripts')

module.exports = ({metadata = {}, contentHtml}) => `
<!DOCTYPE html>
<html lang="en">
  <body lang="en">
    ${renderHead({metadata})}
    ${contentHtml}
    ${renderScripts()}
  </body>
</html>
`
