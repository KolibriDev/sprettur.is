$(function() {
  // A short collection of one liners (sorry) to make the menu nice.
  var $nav = $("nav");
  var tops = $(window).asEventStream("scroll").map(function() {
    return $(document).scrollTop();
  });

  // make the nav bar fixed position when we scroll past its top position
  Bacon.combineTemplate({
    initial: Bacon.constant($nav.offset().top),
    top: tops
  }).map(function(val) {
    return val.top >= val.initial ? "scrollfix" : "";
  }).skipDuplicates().onValue(function(classname) {
    $nav.attr("class", classname);
  })

  /*
   * Tabs
   */

  $('a[data-toggle="tab"]').on('shown', function(e) {
    console.log(e);
  });

  /*
   * Map
   */
  mapbox.load('gudmundur.map-t1y2fg6f', function(o) {
    var map = mapbox.map('map', [o.layer, o.markers], null, [MM.DragHandler()]);
    map.centerzoom(o.center, o.zoom);

    if (window.devicePixelRatio > 1)
      map.tileSize = { x: 128, y: 128 };
  });
});
