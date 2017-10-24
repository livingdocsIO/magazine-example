/* eslint max-len: 0 */

module.exports = ({metadata}) => `
<head>
  <meta charset="utf-8" />
  <meta http-equiv="Content-Language" content="en">
  <meta content="width=device-width, initial-scale=1.0" name="viewport" />

  <title>${metadata.title || ''}</title>
  <meta name="Description" content="${metadata.description || ''}" />

  <link href="/assets/stylesheets/slippry.css" media="screen" rel="stylesheet" type="text/css" />
  <link href="/timeline.css" media="screen" rel="stylesheet" type="text/css" />

</head>
`
