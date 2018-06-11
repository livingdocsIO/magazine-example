const chokidar = require('chokidar')
const getDesign = require('./design_getter')

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
