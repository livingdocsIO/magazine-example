module.exports = async function resolveListIncludes (includes, liClient, renderListInclude) {
  const dataFetchTasks = startDataFetchTasks(includes, liClient)
  for (const task of dataFetchTasks) {
    const {include, request} = task
    try {
      const documentList = await request
      const {params} = include.getContent()
      const html = renderListInclude({...documentList, params})
      include.resolve(html)
    } catch (err) {
      throw new Error('Could not resolve data', err)
    }
  }
}

function startDataFetchTasks (includes, liClient) {
  return includes.map(include => {
    const {params} = include.getContent()
    const limit = params.count
    // TODO: find out how to handle the offset (DI)
    // const offset = params.offset
    const request = liClient.getDocumentList({listId: params.listId, limit})
    return {include, request}
  })
}
