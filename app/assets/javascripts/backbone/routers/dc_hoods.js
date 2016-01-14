App.Routers.DCHoods = Backbone.Router.extend({
  routes: {
    "": "index",
    "hoods/:id": "showHood",
  },

  initialize: function(){
    App.Collections.hoods = new App.Collections.Hoods;
    App.Views.hoods = new App.Views.Hoods({collection: App.Collections.hoods});
  },

  index: function(){
    App.Collections.hoods.fetch({reset: true});
  },

  showHood: function(id){
    App.Collections.hoods.each(function(hood){
      if(hood.attributes.id === id){
        new App.Views.Hood ({model: hood})
      }
    })
  }
})
