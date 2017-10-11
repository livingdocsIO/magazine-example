!function(){
  // hack to make sure Iframe Resizer is already loaded
  setTimeout(function(){

    // definitions
    var styleTag;
    var setStyleTag = function(height, units) {
      styleTag = document.createElement('style')
      styleTag.textContent = '.full-height {min-height: ' + height + units + '}'
      styleTag.textContent += '.half-height {min-height: ' + height / 2 + units + '}'
      document.head.appendChild(styleTag)
    }
    var getViewportHeight = function(cb){
      cb(null)
    }

    // in an Iframe with Iframe Resizer loaded
    if(window.parentIFrame !== undefined) {
      getViewportHeight = function(cb) {
        window.parentIFrame.getPageInfo(function(data){
          cb(data.clientHeight, 'px')
        })
      }
    }
    // in a general Iframe
    else if(window.top != window.self) {
      getViewportHeight = function(cb) {
        cb(100, 'vh')
      }
    }
    // not in an Iframe
    else {
      getViewportHeight = function(cb) {
        cb(window.innerHeight, 'px')
      }
    }

    // initial setting of the height
    getViewportHeight(function(viewportHeight, units){
      setStyleTag(viewportHeight, units)
    })

    // setting on each resize event
    window.addEventListener('resize', function(){
      getViewportHeight(function(viewportHeight, units){
        styleTag.remove()
        setStyleTag(viewportHeight, units)
      })
    })

  }, 10)
}()
