App.Routers.DCHoods = Backbone.Router.extend({
  routes: {
    "": "index"
  },

  initialize: function(){
    App.Collections.hoods = new App.Collections.Hoods;
    App.Views.hoods = new App.Views.Hoods({collection: App.Collections.hoods});
  },

  index: function(){
    App.Collections.hoods.fetch({reset: true});
  }
})
