require([], function () {
    'use strict';

    mapbox.load('gudmundur.map-t1y2fg6f', function (o) {
        var map = mapbox.map('map', [o.layer, o.markers], null, [MM.DragHandler()]);
        map.centerzoom(o.center, o.zoom);

        if (window.devicePixelRatio > 1) {
            map.tileSize = { x: 128, y: 128 };
        }
    });
});
