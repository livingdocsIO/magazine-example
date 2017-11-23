require('photoswipe/dist/photoswipe.css')
require('photoswipe/dist/default-skin/default-skin.css')

const Photoswipe = require('photoswipe')
const PhotoSwipeUiDefault = require('photoswipe/dist/photoswipe-ui-default.js')

module.exports = function initGalleryTeasers (document) {
  const galleryTeasers = document.querySelectorAll('.teaser-gallery')

  // ignore resrc for gallery images
  // we need fullsize images for gallery
  for (const galleryTeaserEl of galleryTeasers) {
    const images = galleryTeaserEl.querySelectorAll('.teaser-gallery__images > figure > img')
    for (const imageEl of images) {
      if (imageEl.classList) imageEl.classList.remove('resrc')
      else imageEl.className = imageEl.className.replace('resrc', '')
      const dataSrc = imageEl.getAttribute('data-src')
      if (dataSrc) imageEl.setAttribute('src', dataSrc)
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    registerClickListeners(galleryTeasers)
  })
}

function registerClickListeners (galleryTeasers) {
  for (const galleryTeaserEl of galleryTeasers) {
    const teaserTitleEl = galleryTeaserEl.querySelector('.teaser-card__title')
    const teaserImageEl = galleryTeaserEl.querySelector('.teaser-card__image')
    const onTeaserClick = function (e) {
      e = e || window.event
      e.preventDefault ? e.preventDefault() : e.returnValue = false
      openGallery(galleryTeaserEl, teaserImageEl)
    }
    teaserTitleEl.addEventListener('click', onTeaserClick)
    teaserImageEl.addEventListener('click', onTeaserClick)
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
  for (const figureEl of children) {
    const imageEl = figureEl.children[0]
    const captionEl = figureEl.children.length > 1 && figureEl.children[1]
    const item = {
      src: imageEl.getAttribute('src'),
      w: imageEl.width,
      h: imageEl.height,
      title: captionEl ? captionEl.innerHTML : ''
    }
    items.push(item)
  }

  return items
}

function getGalleryOptions (galleryTeaserEl, teaserImageEl) {
  const options = {
    index: 0,
    // galleryUID: galleryArticleId,
    getThumbBoundsFn: function (index) {
      if (!teaserImageEl) return {}

      const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
      const rect = teaserImageEl.getBoundingClientRect()
      return {x: rect.left, y: rect.top + pageYScroll, w: rect.width}
    }
  }
  return options
}
