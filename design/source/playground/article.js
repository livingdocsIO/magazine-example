/* eslint max-len: 0 */
module.exports = function createArticle (doc, design) {
  const article = doc.createLivingdoc({
    content: [{
      'component': 'hero',
      'content': {
        'image': 'assets/images/laputa.jpg'
      }
    }, {
      'component': 'p',
      'content': {
        'text': 'In August 1996, Disney and Tokuma Shoten Publishing agreed that Disney would distribute international Tokuma’s Studio Ghibli animated films.'
      }
    }, {
      'component': 'p',
      'content': {
        'text': 'Many of Ghibli’s works are distributed in Japan by Toho. Internationally, The Walt Disney Company has rights to all of Ghibli’s output that did not have previous international distribution, including the global, non-Japan distribution rights to Princess Mononoke and Spirited Away.[citation needed] As of September 2011, they share North American theatrical rights with GKids while domestic right remain with Disney.'
      }
    }, {
      'component': 'peephole',
      'content': {
        'image': 'assets/images/laputa.jpg'
      }
    }, {
      'component': 'normal'
    }, {
      'component': 'normal',
      'styles': {
        'position': 'left'
      }
    }, {
      'component': 'normal',
      'styles': {
        'position': 'right'
      }
    }, {
      'component': 'p'
    }, {
      'component': 'quote',
      'content': {
        'text': 'If a machine is expected to be infallible, it cannot also be intelligent.',
        'author': 'Alan Turing'
      }
    }, {
      'component': 'teaser',
      'content': {
        'title': "Jeb Bush endorses 'death panels' — and he's right to do so",
        'link': 'http://www.vox.com/2015/4/17/8446647/jeb-bush-endorses-death-panels-and-hes-right-to-do-so',
        'headline': 'Ezra Klein',
        'site': 'Vox',
        'image': 'assets/images/laputa.jpg'
      }
    }, {
      'component': 'teaser',
      'content': {
        'title': "Jeb Bush endorses 'death panels' — and he's right to do so",
        'link': 'http://www.vox.com/2015/4/17/8446647/jeb-bush-endorses-death-panels-and-hes-right-to-do-so',
        'headline': 'Ezra Klein',
        'site': 'Vox',
        'image': 'assets/images/laputa.jpg'
      },
      'styles': {
        'position': 'left',
        'hide-image': 'hide-image'
      }
    }, {
      'component': 'teaser',
      'content': {
        'title': 'A smarter way to look at fitness.',
        'link': 'http://www.apple.com/watch/',
        'headline': 'Steve Jobs',
        'site': 'Apple',
        'image': 'assets/images/applewatch.png'
      },
      'styles': {
        'position': 'right',
        'hide-image': 'hide-image'
      }
    }, {
      'component': 'teaser',
      'content': {
        'title': "Jeb Bush endorses 'death panels' — and he's right to do so",
        'link': 'http://www.vox.com/2015/4/17/8446647/jeb-bush-endorses-death-panels-and-hes-right-to-do-so',
        'headline': 'Ezra Klein',
        'site': 'Vox',
        'image': 'assets/images/laputa.jpg'
      },
      'styles': {
        'position': 'left'
      }
    }, {
      'component': 'teaser',
      'content': {
        'title': 'A smarter way to look at fitness.',
        'link': 'http://www.apple.com/watch/',
        'headline': 'Steve Jobs',
        'site': 'Apple',
        'image': 'assets/images/applewatch.png'
      },
      'styles': {
        'position': 'right'
      }
    }, {
      'component': 'teaser',
      'content': {
        'title': "Jeb Bush endorses 'death panels' — and he's right to do so",
        'link': 'http://www.vox.com/2015/4/17/8446647/jeb-bush-endorses-death-panels-and-hes-right-to-do-so',
        'headline': 'Ezra Klein',
        'site': 'Vox',
        'image': 'assets/images/laputa.jpg'
      },
      'styles': {
        'hide-image': 'hide-image'
      }
    }, {
      'component': 'tweet'
    }, {
      'component': 'iframe'
    }, {
      'component': 'free-html'
    }, {
      'component': 'embed-teaser'
    }, {
      'component': 'list'
    }, {
      'component': 'gallery',
      'content': {
        'title': 'Image Gallery'
      },
      'containers': {
        'slides': [{
          'component': 'image-slide',
          'content': {
            'image': 'assets/images/applewatch.png',
            'caption': 'What a useless device'
          }
        }, {
          'component': 'media-slide',
          'content': {
            'iframe': '<div class="responsiveContainer" style="position: relative; height: 0px; overflow: hidden; max-width: 100%; padding-bottom: 55%;"><iframe src="https://player.vimeo.com/video/157125359" frameborder="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" style="position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;"></iframe></div>'
          }
        }, {
          'component': 'quote-slide',
          'styles': {
            'quote-slide-background-color': 'media-gallery-quote-slide--blue'
          },
          'content': {
            'quote': 'If a machine is expected to be infallible, it cannot also be intelligent.',
            'citation': 'Alan Turing'
          }
        }]
      }
    }, {
      'component': 'head'
    }, {
      'component': 'grid-of-6'
    }, {
      'component': 'title'
    }, {
      'component': 'full-size'
    }, {
      'component': 'aside'
    }, {
      'component': 'separator'
    }, {
      'component': 'subtitle'
    }, {
      'component': 'event'
    }, {
      'component': 'bullet-list',
      'styles': {
        'list-type': 'lower-latin'
      },
      'containers': {
        'list': [{
          'component': 'bullet-list-item'
        }]
      }
    }],
    design: {
      name: design.name,
      version: design.version
    }
  })
  return article
}
