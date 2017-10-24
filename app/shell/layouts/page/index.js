/* eslint max-len: 0 */
const renderHeader = require('./header')
const renderFooter = require('./footer')

module.exports = ({contentHtml}) => `
${renderHeader()}
<div class="page wrapper">${contentHtml || ''}</div>
${renderFooter()}
`
