(function () {
  setTimeout(() => {
    const pickerOptions = document.querySelectorAll('.a-asset-picker-option')
    pickerOptions.forEach(function (pickerOption, index) {
      pickerOption.addEventListener('click', event => {
        const siblings = document.querySelectorAll('.a-asset-picker-option')
        siblings.forEach(function (sibling) {
          sibling.classList.remove('is-active')
        })
        pickerOption.classList.add('is-active')

        const images = document.querySelectorAll('.m-asset-image')
        images.forEach(function (image) {
          if (index === 0) {
            image.classList.add('m-asset-image--compact')
          } else {
            image.classList.remove('m-asset-image--compact')
          }
        })
      })
    })
  }, 3000)
})()
