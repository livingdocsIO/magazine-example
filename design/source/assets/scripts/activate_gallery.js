var slider;
var renderOrUpdateSlider = function(){
  if(slider) {
    slider.reloadSlider();
  } else {
    slider = $('.media-gallery-slides').slippry({auto: false, adaptiveHeight: false});
  }
}

if(window.liEditor) {
  window.liEditor.ready(function(editorInfo){
    if(editorInfo.interactive) {
      // do nothing
    } else {
      renderOrUpdateSlider()
      // listen to resize of preview pane
      window.addEventListener('resize', function(){
        renderOrUpdateSlider()
      });
    }
  });
} else {
  $('.media-gallery-slides').slippry({auto: false, adaptiveHeight: false});
}
