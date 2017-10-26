const fs = require('fs')

const DIR = './json_server/publications'

module.exports = () => {
  const filenames = fs.readdirSync(DIR)
  const paths = filenames.map(filename => `${DIR}/${filename}`)
  const files = paths.map(path => fs.readFileSync(path))
  const publications = files.map(file => JSON.parse(file))
  return {
    latestPublications: publications
  }
}
