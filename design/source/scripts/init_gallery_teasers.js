const Photoswipe = require('photoswipe')
const PhotoSwipeUiDefault = require('photoswipe/dist/photoswipe-ui-default.js')

module.exports = function initGalleryTeasers (window, document) {
  if (window.liEditor) {
    window.liEditor.ready(function () {
      setTimeout(function () {
        const galleryTeasers = document.querySelectorAll('.teaser-gallery')
        registerClickListeners(galleryTeasers)
      }, 1000)
    })
  } else {
    const galleryTeasers = document.querySelectorAll('.teaser-gallery')
    document.addEventListener('DOMContentLoaded', function () {
      registerClickListeners(galleryTeasers)
    })
  }

  function registerClickListeners (galleryTeasers) {
    for (const galleryTeaserEl of galleryTeasers) {
      const teaserHeroEl = galleryTeaserEl.querySelector('.teaser-hero')
      const teaserHeroImageEl = galleryTeaserEl.querySelector('.teaser-hero__header')
      const teaserCardEl = galleryTeaserEl.querySelector('.teaser-card')
      const teaserImageEl = galleryTeaserEl.querySelector('.teaser-card__image')

      const target = teaserHeroEl || teaserCardEl
      const imageEl = teaserHeroImageEl || teaserImageEl
      target && target.addEventListener('click', function (e) {
        e = e || window.event
        e.preventDefault ? e.preventDefault() : e.returnValue = false
        openGallery(galleryTeaserEl, imageEl)
      })
    }
  }

  function openGallery (galleryTeaserEl, teaserImageEl) {
    const imageContainerEl = galleryTeaserEl.querySelector('.teaser-gallery__images')
    const pswpEl = galleryTeaserEl.querySelector('.pswp')

    const items = extractImageItems(imageContainerEl)
    if (!items.length) return

    const options = getGalleryOptions(galleryTeaserEl, teaserImageEl)
    const gallery = new Photoswipe(pswpEl, PhotoSwipeUiDefault, items, options)
    gallery.listen('close', function () {
      if (gallery.getCurrentIndex() !== 0) {
        gallery.goTo(0)
      }
    })
    gallery.init()
  }

  function extractImageItems (imageContainerEl) {
    const items = []
    if (!imageContainerEl) return items

    const children = imageContainerEl.childNodes
    for (const imageDiv of children) {
      const imageEl = imageDiv.querySelectorAll('.m-asset-image__image > img')[0]
      const captionEl = imageDiv.querySelectorAll('.a-asset-input').length > 1 && imageDiv.querySelectorAll('.a-asset-input')[0]
      const item = {
        src: imageEl ? imageEl.getAttribute('src') : '',
        w: imageEl.naturalWidth,
        h: imageEl.naturalHeight,
        title: captionEl ? captionEl.innerHTML : ''
      }
      items.push(item)
    }

    return items
  }

  function getGalleryOptions (galleryTeaserEl, teaserImageEl) {
    const options = {
      history: false,
      index: 0,
      // galleryUID: galleryTeaserEl.getAttribute('data-uuid'),
      getThumbBoundsFn: function (index) {
        if (!teaserImageEl) return {}
        const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
        const rect = teaserImageEl.getBoundingClientRect()
        return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
      }
    }
    return options
  }

}
