async function resolveEmbedTeaserIncludes (includes, liClient, renderEmbedTeaserInclude) {
  const proms = includes.map(include => {
    const {params} = include.getContent()
    return liClient.getPublication({documentId: params.mediaId})
      .then(response => {
        // TODO: the json server responds with an array (DI)
        const [publication] = response
        const html = renderEmbedTeaserInclude({...publication, params})
        include.resolve(html)
      })
  })
  await Promise.all(proms)
}

module.exports = resolveEmbedTeaserIncludes
