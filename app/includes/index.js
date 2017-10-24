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
  for (const serviceName in includeMap) {
    const includes = includeMap[serviceName]
    if (serviceName in includeResolverConfig) {
      const resolverConfig = includeResolverConfig[serviceName]
      const resolver = resolverConfig.resolver
      const template = resolverConfig.template
      await resolver(includes, liClient, template)
    }
  }
}
