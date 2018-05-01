const renderInclude = require('./render_include')

module.exports = async function resolveEmbedTeaserIncludes ({
  livingdoc, liClient, includes, includeConfig
}) {
  const dataFetchTasks = startDataFetchTasks(includes, liClient)
  for (const task of dataFetchTasks) {
    const {include, request} = task
    const {params} = include.getContent()

    const layout = params.layout
    validateConfig(layout, includeConfig.layouts)

    const publication = await request
    if (!publication) throw new Error(`Article embed with id "${params.mediaId}" not found`)

    const renderArgs = [liClient, livingdoc, layout, includeConfig, publication]
    const html = await renderInclude(...renderArgs)
    include.resolve(html)
  }
}

function startDataFetchTasks (includes, liClient) {
  return includes
    .filter(include => {
      const {params} = include.getContent()
      return !!params.mediaId
    })
    .map(include => {
      const {params} = include.getContent()

      const request = liClient.getPublication({documentId: params.mediaId})
      return {include, request}
    })
}

function validateConfig (layout, layoutsConfig) {
  const layoutConfig = layoutsConfig[layout]
  if (!layoutConfig.template) {
    const msg =
      `Template component ("template") for layout "${layout}" not specified in layout configuration`
    throw new Error(msg)
  }
  if (!layoutConfig.contentSpec) {
    const msg =
      `Content spec ("contentSpec") for layout "${layout}" not specified in layout configuration`
    throw new Error(msg)
  }
}
