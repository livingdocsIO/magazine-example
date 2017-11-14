const liSDK = require('@livingdocs/sdk')

module.exports = async function resolveIncludes (livingdoc, liClient) {
  const resolverTasks = startResolverTasks(livingdoc, liClient)
  for (const task of resolverTasks) {
    const {serviceName, resolver} = task
    try {
      await resolver
    } catch (err) {
      throw new Error(`Include resolver for "${serviceName}" failed with ${err}`)
    }
  }
}

function startResolverTasks (livingdoc, liClient) {
  const includeMap = liSDK.document.getIncludes(livingdoc)
  return Object.keys(includeMap).map(serviceName => {
    switch (serviceName) {

      case 'embed-teaser':
        return {
          serviceName: 'embed-teaser',
          resolver: resolveEmbedTeaserIncludes({
            liClient,
            livingdoc,
            includes: includeMap['embed-teaser']
          })
        }

      default:
        const message =
          `There is no include resolver for service "${serviceName}"`
        throw new Error(message)

    }
  })
}

function resolveEmbedTeaserIncludes ({livingdoc, includes, liClient}) {
  const embedTeaserResolver = require('./embedTeaser')
  return embedTeaserResolver(livingdoc, includes, liClient)
}
