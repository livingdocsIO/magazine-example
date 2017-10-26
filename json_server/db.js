const fs = require('fs')

const DIRS = {
  latestPublications: [
    './json_server/publications/articles',
    './json_server/publications/pages'
  ],
  documentLists: [
    './json_server/document_lists'
  ]
}

module.exports = () => ({
  latestPublications: loadJsonData(DIRS.latestPublications),
  documentLists: loadJsonData(DIRS.documentLists)
})

function loadJsonData (dirs = []) {
  return dirs.map(dir => {
    const filenames = fs.readdirSync(dir)
    const paths = filenames.map(filename => `${dir}/${filename}`)
    const files = paths.map(path => fs.readFileSync(path))
    return files.map(file => JSON.parse(file))
  }).reduce((acc, curr) => [...acc, ...curr], [])
}
