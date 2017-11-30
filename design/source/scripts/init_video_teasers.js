const Photoswipe = require('photoswipe')
const PhotoSwipeUiDefault = require('photoswipe/dist/photoswipe-ui-default.js')

module.exports = function initGalleryTeasers (window, document) {
  const videoTeasers = document.querySelectorAll('.teaser-video')
  document.addEventListener('DOMContentLoaded', function () {
    registerClickListeners()
  })

  function registerClickListeners () {
    for (const videoTeaserEl of videoTeasers) {
      const teaserTitleEl = videoTeaserEl.querySelector('.teaser-card__title')
      const teaserImageEl = videoTeaserEl.querySelector('.teaser-card__image')
      const onTeaserClick = function (e) {
        e = e || window.event
        e.preventDefault ? e.preventDefault() : e.returnValue = false
        openGallery(videoTeaserEl, teaserImageEl, teaserTitleEl)
      }
      teaserTitleEl.addEventListener('click', onTeaserClick)
      teaserImageEl.addEventListener('click', onTeaserClick)
    }
  }

  function openGallery (videoTeaserEl, teaserImageEl, teaserTitleEl) {
    const pswpEl = videoTeaserEl.querySelector('.pswp')
    const options = getGalleryOptions(videoTeaserEl, teaserImageEl)
    const imageItem = getImageItem(teaserImageEl, teaserTitleEl)

    const gallery = new Photoswipe(pswpEl, PhotoSwipeUiDefault, [imageItem], options)
    gallery.listen('initialZoomInEnd', function () {
      gallery.items.splice(0, 1, {
        html: getVideoHtml(videoTeaserEl),
        title: imageItem.title
      })
      gallery.invalidateCurrItems()
      gallery.updateSize(true)
      adjustVideoStyles(gallery, imageItem)
    })
    gallery.listen('close', function () {
      gallery.items.splice(0, 1, imageItem)
      gallery.invalidateCurrItems()
      gallery.updateSize(true)
    })
    gallery.init()
  }

  function getImageItem (teaserImageEl, teaserTitleEl) {
    const item = {
      src: teaserImageEl.getAttribute('src'),
      w: teaserImageEl.naturalWidth,
      h: teaserImageEl.naturalHeight,
      title: teaserTitleEl ? teaserTitleEl.innerHTML : ''
    }
    return item
  }

  function getGalleryOptions (videoTeaserEl, teaserImageEl) {
    const options = {
      index: 0,
      history: true,
      focus: true,
      zoomEl: false,
      loop: false,
      closeOnScroll: false,
      showAnimationDuration: 333,
      // galleryUID: videoTeaserEl.getAttribute(data-uuid),
      getThumbBoundsFn: function (index) {
        if (!teaserImageEl) return {}
        const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
        const rect = teaserImageEl.getBoundingClientRect()
        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
      }
    }
    return options
  }

  function getVideoHtml (videoTeaserEl) {
    if (!videoTeaserEl) return ''
    const videoMarkupContainer = videoTeaserEl
      .querySelector('.teaser-video__markup > .embed-container > div')
    const videoHtml = (videoMarkupContainer && videoMarkupContainer.innerHTML) || ''
    return unescape(videoHtml)
  }

  function adjustVideoStyles (gallery, initialItem) {
    const currentItem = gallery.items[0]
    if (currentItem) {
      const containerEl = currentItem.container
      if (containerEl) {
        const videoEl = containerEl.children[0]
        if (videoEl) {
          if (videoEl.tagName === 'VIDEO') {
            centerVideo(containerEl)
            videoEl.style.objectFit = 'cover'
            videoEl.poster = initialItem.src
          } else if (videoEl.tagName === 'IFRAME') {
            centerVideo(containerEl)
          } else {
            videoEl.style.marginTop = '56px'
          }
        }
      }
    }
  }

  function centerVideo (containerEl) {
    const flex = 'display:flex;flex-direction:column;'
    const center = 'align-items:center;justify-content:center;'
    containerEl.style = `${flex}${center}`
  }

}
