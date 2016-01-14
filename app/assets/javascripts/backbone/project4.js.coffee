#= require_self
#= require_tree ./templates
#= require_tree ./models
#= require_tree ./views
#= require_tree ./routers

window.App =
  Models: {}
  Collections: {}
  Routers: {}
  Views: {}

$(document).ready(function(){
  new App.Routers.DCHoods;
  Backbone.history.start();
  $(".logo").delay(200).fadeOut(800);
  window.setTimeout(function(){
    $("main").css("visibility", "visible")
  }, 200)
});
