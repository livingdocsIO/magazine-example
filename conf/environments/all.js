const includesConfig = require('./includes')

module.exports = {
  client: {
    url: 'http://localhost:3001',
    accessToken: 'your access token'
  },
  navigation: {
    headerMenuHandle: 'main'
  },
  includes: includesConfig,
  defaultDocumentType: {
    layoutComponents: {
      layout: 'default-layout',
      header: 'default-layout-header',
      headerItem: 'default-layout-header-item',
      footer: 'default-layout-footer'
    }
  },
  documentTypes: {
    page: {
      layoutComponents: {
        layout: 'page-layout',
        header: 'page-layout-header',
        headerItem: 'page-layout-header-item',
        footer: 'page-layout-footer'
      }
    },
    article: {
      layoutComponents: {
        layout: 'article-layout',
        header: 'article-layout-header',
        headerItem: 'article-layout-header-item',
        footer: 'article-layout-footer'
      }
    }
  }
}
