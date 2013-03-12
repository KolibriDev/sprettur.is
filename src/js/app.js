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

    if (classname)
      $nav.find("li").first().attr("class", "on");
    else
      $nav.find("li").attr("class", "");
  })

  Bacon.combineTemplate({
    sectiontops: Bacon.constant($("nav a").map(function() {
      return {parent: $(this).parents("li"), loc: $(this).attr("href")};
    }).map(function(idx, val) {
      return {item: val.parent, top: $(val.loc).offset().top};
    })),
    top: tops
  }).map(function(val) { // mark the sections we've passed
    return val.sectiontops.map(function() {
      return {item: this.item, passed: this.top <= (val.top + 70)};
    });
  }).skipDuplicates(function(old_, new_) {
    var passedP = function() { return this.passed };
    return old_.filter(passedP).length === new_.filter(passedP).length;
  }).onValue(function(val) {
    // no scrollfix in place
    if ($nav.attr("class") != "scrollfix") {
      return;
    }

    // remove all active states
    val.each(function() {
      this.item.attr("class", "");
    });

    // set the active item
    val.filter(function() {
      return this.passed;
    }).last().each(function() {
      this.item.attr("class", "on");
    });
  });

  mapbox.load('gudmundur.map-t1y2fg6f', function(o) {
    console.log(o);
    var map = mapbox.map('map', [o.layer, o.markers], null, [MM.DragHandler()]);
    map.centerzoom(o.center, o.zoom);
    console.log(map);
  });
});
