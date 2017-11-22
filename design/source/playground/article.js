/* eslint max-len: 0 */
module.exports = function createArticle (doc, design) {
  const article = doc.createLivingdoc({
    content: [
    {
      'component': 'head',
      'content': {
        'flag': 'Magazine',
        'title': '“Suburbicon” and “Last Flag Flying”',
        'text': 'George Clooney’s mid-century dystopia, starring Matt Damon and Julianne Moore, and Richard Linklater’s ode to military comradeship.',
        'meta': 'by Peter Toobin'
      }
    },

    {
      'component': 'image',
      'content': {
        'image': 'assets/images/clooney.jpg',
        'caption': 'George Clooney’s new film sees malevolence in mid-century suburbia. Illustration by Ryan Heshka'
      }
    },

    {
      'component': 'paragraph',
      'content': {
        'text': 'Two films in one sounds like a bargain. Philip Kaufman could have made a movie about Chuck Yeager and the race to snap the sound barrier, and another movie about the Mercury space program and the hot-dog fellows who signed up for it. Instead, the two projects were mashed together to form “The Right Stuff” (1983). For Kaufman, as for George Clooney and his latest film, “Suburbicon,” which he directs but does not act in, what counts is the quality of the mashing.'
      }
    },

    {
      'component': 'paragraph',
      'content': {
        'text': 'The principal chunk of the movie comes from a script by Joel and Ethan Coen which had reportedly been sitting around, unclaimed, since the late nineteen-nineties, before being rescued by Clooney. (He and the Coens share the screenwriting credit with Grant Heslov, who collaborated with Clooney on “Good Night, and Good Luck” (2005), “The Ides of March” (2011), and other projects.) This consists of a sour little parable about man’s inhumanity to man. The year is 1959, and the man in question is Gardner Lodge (Matt Damon), whose name sounds like a motel. He has a wife called Rose, who has a sister called Margaret, and both of them—one blond, the other brunet—are played by Julianne Moore. Rose and Gardner live with their young son, Nicky (Noah Jupe), in Suburbicon, a haven so upbeat and sun-blessed that, in spirit, at least, it surely abuts Lumberton, North Carolina, the setting for “Blue Velvet” (1986). Even the waving fireman, from the start of David Lynch’s film, is mirrored in Clooney’s prologue, a cheery faux commercial for Suburbicon.'
      }
    },

    {
      'component': 'subtitle',
      'content': {
        'title': 'Last Flag Flying'
      }
    },

    {
      'component': 'image',
      'styles': {
        'image-position': 'c-image--left'
      },
      'content': {
        'image': 'assets/images/last-flag-flying-movie.jpg',
        'caption': 'Last Flag Flying movie poster'
      }
    },

    {
      'component': 'paragraph',
      'content': {
        'text': 'As a seasoned moviegoer, you know what to expect. Whenever your gaze is led down ranks of immaculate houses, from lawn to shining lawn, you brace yourself for a glimpse of the dark underbelly of middle-class America. (Anybody wishing to see the belly itself, or clinging to the now scandalous notion that some folks who dwell in the belly lead decent and untraumatized lives, will have to rely on a secret stash of sitcoms.) And here comes the darkness. “Nicky, there are men in the house,” Gardner whispers one night, adding, “They’re going to take what they want, and leave.” Wrong. They’re going to chloroform the whole family, and, in Rose’s case, overdo the dosage. The next thing you know, she is out of the picture, and Margaret, who must have gone to see “Vertigo” the year before, steps smoothly into her shoes.'
      }
    },

    {
      'component': 'quote',
      'content': {
        'text': 'As a seasoned moviegoer, you know what to expect.',
        'author': 'Alan Turing'
      }
    },

    {
      'component': 'paragraph',
      'content': {
        'text': 'And so to the second chunk of story, which concerns another married couple, the Mayerses (Leith M. Burke and Karimah Westbrook), who happen to be black, and who move in, with their son, Andy (Tony Espinosa), alongside the Lodges. (The movie is grounded in part on a real-life case, that of the Myers family, who arrived in Levittown, Pennsylvania, in 1957.) The mailman is astounded. The street is appalled. The whole community is in an uproar, and, before you know it, a rabble gathers outside the Mayers house, and the nighttime sky is lit by furious fires. Suburbicon might as well be populated exclusively by Klansmen; not a voice is raised in the Mayerses’ favor, although the two kids, Nicky and Andy, unschooled in hostility, make friends across the fence.'
      }
    },

    {
      'component': 'paragraph',
      'content': {
        'text': 'Taking a wild guess, I get the feeling that, in Clooney’s opinion, the United States, in the epoch of Eisenhower, had a problem with racism. Jeez, who knew? The film’s indignation is clearly fuelled by the rancor that has persisted into the epoch of Trump, but there’s a hitch. So repelled is Clooney by the response of white suburbia to African-Americans, and so keen is he to insure that we share his outrage at what they endured, that he quite forgets to be interested in them. We learn next to nothing about Mr. and Mrs. Mayers (their first names are a mystery), nor do we listen to their conversations. The wife is charged twenty dollars for a carton of milk by the manager of a supermarket, and she hangs up her washing outside with a bevy of protesters banging drums and crowing, only feet away, but, while her dignity in the face of such taunts is noble, that’s all we know of her. It’s purely in relation to white contempt, in other words, that she is granted dramatic presence. To say that she and her husband are a backdrop would be going too far, but the black plot and the white plot scarcely touch. Is that what Clooney intended?'
      }
    },

    {
      'component': 'tweet'
    },

    {
      'component': 'iframe'
    },

    {
      'component': 'free-html'
    },

    {
      'component': 'embed-teaser'
    },

    {
      'component': 'list'
    },

    {
      'component': 'separator'
    },

    {
      'component': 'bullet-list',
      'styles': {
        'list-type': 'lower-latin'
      },
      {
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
