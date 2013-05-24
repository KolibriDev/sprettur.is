$(function () {
    'use strict';

    var $nav = $('nav');
    $nav.affix({ offset: $nav.offset().top });

    /*
     * Smooth scroll
     */
    $('.scrollTo').localScroll({
        duration: 500
    });

    /*
     * Map
     */
    mapbox.load('gudmundur.map-t1y2fg6f', function (o) {
        var map = mapbox.map('map', [o.layer, o.markers], null, [MM.DragHandler()]);
        map.centerzoom(o.center, o.zoom);

        if (window.devicePixelRatio > 1) {
            map.tileSize = { x: 128, y: 128 };
        }
    });

    /*
     * Profile expansion
     */
    var source = $("#profile-template").html();
    var template = Handlebars.compile(source, {noEscape: true});
    $('#starfsfolk .profile').click(function(e) {
        var $this = $(this);
        var $parent = $this.parent();
        var $prevProfile = $('#expanded-profile');

        // remove expanded profile if clicked on same box
        if ($this.hasClass('active')) {
            $prevProfile.remove();
            $this.removeClass('active');
            return;
        }

        // make the current element active
        $parent.parent().find('.active').removeClass('active');
        $this.addClass('active');

        // and trigger profile expansion
        $this.trigger('expand-profile');
    });

    var size,
        MOBILE = 1,
        TABLET = 2,
        DESKTOP = 3;
    $(window).resize(function(e) {
        var width = $(window).width();
        var oldSize = size;
        if (width <= 767) {
            size = MOBILE
        } else if (width <= 1025) {
            size = TABLET;
        } else {
            size = DESKTOP;
        }

        if (oldSize !== size) {
            $('#starfsfolk .profile.active').trigger('expand-profile');
        }
    });
    $(window).trigger('resize');

    $('#starfsfolk').on('expand-profile', '.profile.active', function(e) {
        var $this = $(this);
        var $parent = $this.parent();
        var $prevProfile = $('#expanded-profile');

        // disable on mobile
        if (size === MOBILE) {
            $prevProfile.remove();
            $this.removeClass('active');
            return;
        }

        var context = $this.data('profile');
        if (context.width === undefined) { context.width = 50; }
        if (context.push === undefined) { context.push = 45; }

        // by convention, use the same name for the expanded profile image
        var img = $this.find('img').attr('src');
        var profileImg = img.substring(img.lastIndexOf('/')+1);
        context.img = profileImg;

        var html = $(template(context));

        // if we're in full desktop-mode, insert after mod4 element
        var insertPosition = size === TABLET ? 3 : 4;
        var pos = (Math.floor($parent.index()/insertPosition) + 1) * insertPosition;

        // if we're replacing expanded in same position, replace existing container
        var prevPos = $prevProfile.index();
        if (pos == prevPos) {
            $prevProfile.replaceWith(html);
        } else {
            // otherwise, remove old expanded and add to correct place
            $prevProfile.remove();
            $($parent.parent().children()[pos-1]).after(html);

            // todo: are we sure we want to scroll?
            var pad = size === TABLET ? 110 : 120;
            $.scrollTo($this.offset().top + pad);
        }
    });
});
