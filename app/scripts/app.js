require(['jquery'], function ($) {
    'use strict';

  /*
   * Affix
   */

    var $nav = $('nav');
    $nav.affix({ offset: $nav.offset().top });

  /*
   * Tabs
   */

    $('a[data-toggle="tab"]').on('shown', function (e) {
        console.log(e);
    });

  /*
   * Map
   */
  /*mapbox.load('gudmundur.map-t1y2fg6f', function(o) {
    var map = mapbox.map('map', [o.layer, o.markers], null, [MM.DragHandler()]);
    map.centerzoom(o.center, o.zoom);

    if (window.devicePixelRatio > 1)
      map.tileSize = { x: 128, y: 128 };
  });*/
});
