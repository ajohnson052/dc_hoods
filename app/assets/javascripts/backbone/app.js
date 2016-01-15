App = {
  Collections: {},
  Models: {},
  Views: {},
  Routers: {}
};

$(document).ready(function(){
  new App.Routers.DCHoods;
  Backbone.history.start();
  $("body").delay(4000).animate({
    scrollTop: $(".logo").height()
  }, 1500)
  // $(".logo").delay(5000).fadeOut(800);
  // $("main").delay(5800).css("visibility", "visibile")
});
