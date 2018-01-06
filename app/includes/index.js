const liSDK = require('@livingdocs/sdk')

module.exports = async function resolveIncludes (livingdoc, liClient, includesConfig) {
  const resolverTasks = startResolverTasks(livingdoc, liClient, includesConfig)
  for (const task of resolverTasks) {
    const {serviceName, resolver} = task
    try {
      await resolver
    } catch (err) {
      err.message = `Include resolver for "${serviceName}" failed with: ${err.message}`
      throw err
    }
  }
}

function startResolverTasks (livingdoc, liClient, includesConfig) {
  const includeMap = liSDK.document.getIncludes(livingdoc)
  return Object.keys(includeMap).map(serviceName => {
    switch (serviceName) {

      case 'embed-teaser':
        return {
          serviceName: 'embed-teaser',
          resolver: require('./embed_teaser')({
            liClient,
            livingdoc,
            includes: includeMap['embed-teaser'],
            includeConfig: includesConfig['embed-teaser']
          })
        }

      default:
        const message =
          `There is no include resolver for service "${serviceName}"`
        throw new Error(message)

    }
  })
}
