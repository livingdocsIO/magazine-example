const fs = require('fs')
const path = require('path')
const chokidar = require('chokidar')

module.exports = function watchDesign (hotMiddleware, distPath) {
  let design = null
  const designPath = path.join(distPath, 'design.json')
  const designWatcher = chokidar.watch(designPath, {awaitWriteFinish: true})

  designWatcher.on('add', (filePath) => {
    getDesign(filePath, (err, initialDesign) => {
      if (err) return console.error('Couldn\'t read the design initially', err)
      // get the initial design for later comparison
      design = initialDesign
    })
  })

  designWatcher.on('change', (filePath) => {
    getDesign(filePath, (err, changedDesign) => {
      if (err) return console.error('Couldn\'t update the design', err)
      // publish design changes to client
      if (!design || !isEqualDesign(design, changedDesign)) {
        design = changedDesign
        hotMiddleware.publish({
          type: 'design-changed',
          design: changedDesign
        })
      }
    })
  })
}

function getDesign (filePath, cb) {
  fs.readFile(filePath, 'utf8', function (err, rawDesign) {
    if (err) return cb(err)

    let parsingError = null
    let parsedDesign = null
    try {
      parsedDesign = JSON.parse(rawDesign)
    } catch (e) {
      parsingError = new Error('Couldn\'t parse the design', e)
    }

    if (parsingError) return cb(parsingError)
    return cb(null, parsedDesign)
  })
}

function isEqualDesign (oldDesign, newDesign) {
  const d1 = JSON.stringify(withSortedComponents(oldDesign))
  const d2 = JSON.stringify(withSortedComponents(newDesign))
  return d1 === d2
}

function withSortedComponents (design) {
  return Object.assign({}, design, {
    components: Array.from(design.components).sort((c1, c2) => {
      if (c1.name < c2.name) return -1
      if (c1.name > c2.name) return 1
      return 0
    })
  })
}
