/* eslint-disable max-len */
const includesConfig = require('../includes')

module.exports = {
  client: {
    url: 'http://localhost:3001',
    accessToken: 'your access token'
  },
  imageServices: {
    imgix: {
      host: 'https://livingdocs-dev.imgix.net',
      preferWebp: true,
      backgroundImage: {
        maxWidth: 2048
      },
      srcSet: {
        defaultWidth: 1024,
        widths: [
          2048,
          1024,
          620,
          320
        ],
        sizes: ['100vw']
      }
    },
    liImageProxy: {
      host: 'https://server.livingdocs.io',
      proxyEndpoint: 'api/v1/images',
      preferWebp: true,
      backgroundImage: {
        maxWidth: 2048
      },
      srcSet: {
        defaultWidth: 1024,
        widths: [2048, 1024, 620, 320],
        sizes: ['100vw']
      }
    }
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
