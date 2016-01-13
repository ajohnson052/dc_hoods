App = {
  Collections: {},
  Models: {},
  Views: {},
  Routers: {}
};

$(document).ready(function(){
  new App.Routers.DCHoods;
  Backbone.history.start();
  $(".logo").delay(200).fadeOut(800);
  window.setTimeout(function(){
    $("main").css("visibility", "visible")
  }, 200)
});
