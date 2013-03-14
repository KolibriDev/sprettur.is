require(['domready!', 'jquery', 'affix', 'scrollspy', 'tab'], function (doc, $) {
    'use strict';

    var $nav = $('nav');
    $nav.affix({ offset: $nav.offset().top });
    $nav.scrollspy({ offset: 80 });

    /*
    * Tabs
    */

    $('a[data-toggle="tab"]').on('shown', function (e) {
        console.log(e);
    });
});
