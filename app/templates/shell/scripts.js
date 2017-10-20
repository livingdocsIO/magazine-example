/* eslint max-len: 0 */

module.exports = () => `
<script src="https://d2o08py1e264ss.cloudfront.net/assets/resrc-0.9.0.min.js"></script>
<script src="/assets/scripts/full_height.js"></script>
<script src="/assets/scripts/jquery-2.1.3.min.js" type="text/javascript"></script>
<script src="/assets/scripts/slippry.min.js" type="text/javascript"></script>
<script src="/assets/scripts/activate_gallery.js" type="text/javascript"></script>

<script src="//use.resrc.it/0.9"></script>
<script>
  resrc.configure({ssl: true})
  // hack to make resrc.it work: https://github.com/upfrontIO/livingdocs-server/issues/155
  resrc.ready(function() {
    var matches = $('.resrc')
    for (var i=0; i<matches.length; i++) {
      try {
        resrc.run(matches[i])
      } catch(e) {}
    }
  });
</script>
`
