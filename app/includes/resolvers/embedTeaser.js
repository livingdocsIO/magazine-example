async function resolveEmbedTeaserIncludes (includes, liClient, renderEmbedTeaserInclude) {
  const dataFetchTasks = startDataFetchTasks(includes, liClient)
  for (const task of dataFetchTasks) {
    const {include, request} = task
    try {
      // TODO: the json server responds with an array (DI)
      const [publication] = await request
      const {params} = include.getContent()
      const html = renderEmbedTeaserInclude({...publication, params})
      include.resolve(html)
    } catch (err) {
      throw new Error('Could not resolve data', err)
    }
  }
}

function startDataFetchTasks (includes, liClient) {
  return includes.map(include => {
    const {params} = include.getContent()
    const request = liClient.getPublication({documentId: params.mediaId})
    return {include, request}
  })
}

module.exports = resolveEmbedTeaserIncludes
