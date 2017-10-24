async function resolveListIncludes (includes, liClient, renderListInclude) {
  for (const include of includes) {
    const content = include.getContent()
    const html = renderListInclude(content)
    include.resolve(html)
  }
}

module.exports = resolveListIncludes
