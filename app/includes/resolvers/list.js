async function resolveListIncludes (includes, liClient, renderListInclude) {
  const proms = includes.map(include => {
    const {params} = include.getContent()
    const limit = params.count
    // TODO: find out how to handle the offset (DI)
    // const offset = params.offset
    return liClient.getDocumentList({listId: params.listId, limit})
      .then(documentList => {
        const html = renderListInclude({...documentList, params})
        include.resolve(html)
      })
  })
  await Promise.all(proms)
}

module.exports = resolveListIncludes
