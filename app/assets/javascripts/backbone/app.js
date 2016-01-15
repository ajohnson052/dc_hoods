App = {
  Collections: {},
  Models: {},
  Views: {},
  Routers: {}
};

$(document).ready(function(){
  new App.Routers.DCHoods();
  Backbone.history.start();
  $("body").delay(5000).animate({
    scrollTop: $(".logo").height()
  }, 500);
});
