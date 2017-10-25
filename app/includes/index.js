const includeResolverConfig = {
  list: {
    resolver: require('./resolvers/list'),
    template: require('./templates/list')
  },
  'embed-teaser': {
    resolver: require('./resolvers/embedTeaser'),
    template: require('./templates/embedTeaser')
  }
}

module.exports = async function resolveIncludes (includeMap, liClient) {
  const resolverProms = Object.keys(includeMap).map(serviceName => {
    const includes = includeMap[serviceName]
    const resolverConfig = includeResolverConfig[serviceName]
    if (!resolverConfig) {
      // TODO: Evaluate how to treat unregistered services (DI)
      // For now we simply skip them and notify that it's not there
      const message =
        `There is no include resolver for service "${serviceName}", skipping...`
      const err = new Error(message)
      console.error(err)
      return Promise.resolve()
    }

    const resolver = resolverConfig.resolver
    const template = resolverConfig.template
    return resolver(includes, liClient, template)
  })
  await Promise.all(resolverProms)
}
