module.exports = {
  client: {
    url: 'http://localhost:3001',
    accessToken: 'your access token'
  },
  navigation: {
    headerMenuHandle: 'main'
  },
  includes: {
    'embed-teaser': {
      desiredImageCrop: '16:9',
      defaultTemplate: 'embed-teaser-template',
      templates: {
        hero: 'teaser-hero-template',
        card: 'teaser-card-template',
        gallery: 'teaser-gallery-template',
        'gallery-hero': 'teaser-gallery-template',
        video: 'teaser-video-template',
        'video-hero': 'teaser-video-template'
      }
    }
  },
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
