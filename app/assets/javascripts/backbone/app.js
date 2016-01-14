App = {
  Collections: {},
  Models: {},
  Views: {},
  Routers: {}
};

$(document).ready(function(){
  new App.Routers.DCHoods;
  Backbone.history.start();
  $(".logo").delay(200).fadeOut(5000);
  $("main").css("visibility", "visible")
});
