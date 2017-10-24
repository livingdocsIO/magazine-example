async function resolveEmbedTeaserIncludes (includes, liClient, renderEmbedTeaserInclude) {
  for (const include of includes) {
    const content = include.getContent()
    const html = renderEmbedTeaserInclude(content)
    include.resolve(html)
  }
}

module.exports = resolveEmbedTeaserIncludes
