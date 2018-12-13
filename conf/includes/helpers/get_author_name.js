module.exports = function getAuthorName (metadata = {}) {
  if (metadata.prename && metadata.surname) return `${metadata.prename} ${metadata.surname}`
  if (metadata.prename) return metadata.prename
  if (metadata.surname) return metadata.surname
  return ''
}
