App = {
  Collections: {},
  Models: {},
  Views: {},
  Routers: {}
};

$(document).ready(function(){
  new App.Routers.DCHoods;
  Backbone.history.start();
  $(".logo").fadeOut(1000);
  window.setTimeout(function(){
    $("main").css("visibility", "visible")
  }, 1000)
});
