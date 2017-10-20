/* eslint max-len: 0 */
module.exports = function createPage (doc, design) {
  const page = doc.createLivingdoc({
    content: [{
      'component': 'teaser-hero'
    },
    {
      'component': 'halves',
      'containers': {
        'column-one': [
          {
            'component': 'teaser-card'
          }
        ],
        'column-two': [
          {
            'component': 'teaser-card-no-text-image'
          },
          {
            'component': 'teaser-card-no-text-image'
          },
          {
            'component': 'teaser-card-no-text-image'
          }
        ]
      }
    },
    {
      'component': 'thirds',
      'containers': {
        'column-one': [
          {
            'component': 'teaser-card'
          }
        ],
        'column-two': [
          {
            'component': 'teaser-card'
          }
        ],
        'column-three': [
          {
            'component': 'teaser-list'
          },
          {
            'component': 'teaser-list'
          },
          {
            'component': 'teaser-list'
          },
          {
            'component': 'teaser-list'
          },
          {
            'component': 'teaser-list'
          },
          {
            'component': 'teaser-list'
          },
          {
            'component': 'teaser-list'
          }
        ]
      }
    },
    {
      'component': 'quarter',
      'containers': {
        'column-one': [
          {
            'component': 'teaser-card-no-text-no-image'
          },
          {
            'component': 'teaser-card-no-text-no-image'
          },
          {
            'component': 'teaser-card-no-text-no-image'
          },
          {
            'component': 'teaser-card-no-text-no-image'
          },
          {
            'component': 'teaser-card-no-text-no-image'
          }
        ],
        'column-two': [
          {
            'component': 'teaser-card'
          }
        ],
        'column-three': [
          {
            'component': 'teaser-card'
          }
        ],
        'column-four': [
          {
            'component': 'teaser-card-no-text-no-image'
          },
          {
            'component': 'teaser-card-no-text-no-image'
          },
          {
            'component': 'teaser-card-no-text-no-image'
          },
          {
            'component': 'teaser-card-no-text-no-image'
          },
          {
            'component': 'teaser-card-no-text-no-image'
          }
        ]
      }
    }
  ],
    design: {
      name: design.name,
      version: design.version
    },
    layout: 'page'
  })
  return page
}
