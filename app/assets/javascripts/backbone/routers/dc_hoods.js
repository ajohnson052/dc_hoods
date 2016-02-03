App.Routers.DCHoods = Backbone.Router.extend({
  routes: {
    "": "index",
    "hood/:id": "showHood",
    ":asset": "showAsset"
  },

  initialize: function(){
    App.Collections.hoods = new App.Collections.Hoods();
    App.Views.hoods = new App.Views.Hoods({collection: App.Collections.hoods});
  },

  index: function(){
    App.Collections.hoods.fetch({reset: true});
  },

  showHood: function(id){
    App.Collections.hoods.fetch({
      reset: true,
      success: function(collection, response){
        var model = collection.findWhere({id: parseInt(id)});
        new App.Views.Hood({model: model});
      }
    });
  },

  showAsset: function(asset){
    App.Collections.hoods.fetch({
      reset: true,
      success: function(){
        App.Views.hoods.selectAsset("nil", asset);
      }
    });
  }
});
