require(['jquery', 'bootstrap'], function ($) {
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
});
