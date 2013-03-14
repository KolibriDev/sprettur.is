require.config({
    paths: {
        jquery: '../components/jquery/jquery'
        //bootstrap: '../components/bootstrap/bootstrap'
    },
/*    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }*/
});

require(['app', 'jquery'], function (app, $) {
    'use strict';
    // use app here
    console.log(app);
    console.log('Running jQuery %s', $().jquery);
});
