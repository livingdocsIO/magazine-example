module.exports = async function resolveIncludes (includeMap, liClient) {
  const resolverTasks = Object.keys(includeMap).map(serviceName => {
    switch (serviceName) {
      case 'list':
        return {
          serviceName: 'list',
          resolver: resolveListIncludes({
            liClient,
            includes: includeMap['list']
          })
        }

      case 'embed-teaser':
        return {
          serviceName: 'embed-teaser',
          resolver: resolveEmbedTeaserIncludes({
            liClient,
            includes: includeMap['embed-teaser']
          })
        }

      default:
        const message =
          `There is no include resolver for service "${serviceName}"`
        throw new Error(message)
    }
  })

  for (const task of resolverTasks) {
    const {serviceName, resolver} = task
    try {
      await resolver
    } catch (err) {
      throw new Error(`Include resolver for "${serviceName}" failed`, err)
    }
  }
}

function resolveListIncludes ({includes, liClient}) {
  const renderListInclude = require('./templates/list')
  const listResolver = require('./resolvers/list')
  return listResolver(includes, liClient, renderListInclude)
}

function resolveEmbedTeaserIncludes ({includes, liClient}) {
  const renderEmbedTeaserInclude = require('./templates/embedTeaser')
  const embedTeaserResolver = require('./resolvers/embedTeaser')
  return embedTeaserResolver(includes, liClient, renderEmbedTeaserInclude)
}
