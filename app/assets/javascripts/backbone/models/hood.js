App.Models.Hood = Backbone.Model.extend({
  urlRoot: "http://localhost:3000/hoods",

  assets: ["metros", "libraries", "grocers"],

  initialize: function(){
    this.getAssets();
  },

  getAssets: function(){
    var self = this
    this.assets.forEach(function(asset){
      $.getJSON("http://localhost:3000/hoods/" + self.attributes.id + "/" + asset)
        .done(function(response){
          self.set(asset, response)
        })
    })
  }
})
