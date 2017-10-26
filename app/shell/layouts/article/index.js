/* eslint max-len: 0 */
const dedent = require('dedent')
const renderHeader = require('./header')
const renderFooter = require('./footer')

module.exports = ({contentHtml}) => dedent`
  ${renderHeader()}
  <div class="article wrapper">${contentHtml || ''}</div>
  ${renderFooter()}
`
