const fs = require('fs')
const chokidar = require('chokidar')

module.exports = function watchDesign ({designPath, onDesignChanged}) {
  let design = null
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
      // publish design changes
      if (!design || !isEqualDesign(design, changedDesign)) {
        design = changedDesign
        if (typeof onDesignChanged === 'function') {
          onDesignChanged(changedDesign)
        }
      }
    })
  })
}

function getDesign (filePath, cb) {
  fs.readFile(filePath, 'utf8', function (err, rawDesign) {
    if (err) return cb(err)

    const parseResult = Parse(rawDesign)
    if (parseResult.err) return cb(parseResult.err)
    return cb(null, parseResult.value)
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

function Parse (data) {
  if (!(this instanceof Parse)) {
    return new Parse(data)
  }
  this.err = null
  this.value = null
  try {
    this.value = JSON.parse(data)
  } catch (err) {
    this.err = err
  }
}
