require.config({
    paths: {
        domready: '../components/requirejs-domready/domReady',
        jquery: '../components/jquery/jquery',
        affix: '../components/bootstrap/js/bootstrap-affix',
        scrollspy: '../components/bootstrap/js/bootstrap-scrollspy',
        tab: '../components/bootstrap/js/bootstrap-tab'
    },
    shim: {
        affix: {
            deps: ['jquery'],
            exports: 'jQuery.fn.affix'
        },
        scrollspy: {
            deps: ['jquery'],
            exports: 'jQuery.fn.scrollspy'
        },
        tab: {
            deps: ['jquery'],
            exports: 'jQuery.fn.tab'
        }
    }
});

require(['app', 'jquery', 'map'], function (app, $) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
});
