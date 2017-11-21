const fs = require('fs')

const DIRS = {
  menus: [
    './json_server/menus'
  ],
  latestPublications: [
    './json_server/publications/articles',
    './json_server/publications/pages'
  ]
}

module.exports = () => ({
  menus: loadJsonData(DIRS.menus),
  latestPublications: loadJsonData(DIRS.latestPublications)
})

function loadJsonData (dirs = []) {
  return dirs.map(dir => {
    const filenames = fs.readdirSync(dir)
    const paths = filenames.map(filename => `${dir}/${filename}`)
    const files = paths.map(path => fs.readFileSync(path))
    return files.map(file => JSON.parse(file))
  }).reduce((acc, curr) => [...acc, ...curr], [])
}