App.Models.Hood = Backbone.Model.extend({
  urlRoot: "http://localhost:3000/hoods",

  assets: ["metros", "libraries", "grocers"],

  initialize: function(){
    this.getAssets();
  },

  getAssets: function(asset){
    var self = this
    $.getJSON("http://localhost:3000/hoods/" + self.attributes.id)
      .done(function(response){
        self.assets.forEach(function(asset){
          self.set(asset, response[asset])
        })
      })
  }
})
