/* eslint max-len: 0 */
const dedent = require('dedent')
const renderHeader = require('./header')
const renderFooter = require('./footer')

module.exports = ({menu, location, documentHtml}) => dedent`
  ${renderHeader({menu, location})}
  <div class="article wrapper">${documentHtml || ''}</div>
  ${renderFooter()}
`
