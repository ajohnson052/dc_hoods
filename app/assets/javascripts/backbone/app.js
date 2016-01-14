App = {
  Collections: {},
  Models: {},
  Views: {},
  Routers: {}
};

$(document).ready(function(){
  new App.Routers.DCHoods;
  Backbone.history.start();
  $(".logo").delay(5000).fadeOut(800);
});
