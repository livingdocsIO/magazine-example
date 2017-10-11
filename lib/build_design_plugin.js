const Design = require('livingdocs-manager')

module.exports = function BuildDesignPlugin (options) {
  this.apply = function (compiler) {
    compiler.plugin('after-emit', function (compilation, callback) {
      Design.build(options)
        .on('warn', function onWarning (warning) {
          console.warn(warning) // eslint-disable-line
        })
        .on('error', function onError (err) {
          callback(err)
        })
        .on('end', function onEnd () {
          callback(null)
        })
    })
  }
}
