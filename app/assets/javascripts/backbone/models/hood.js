App.Models.Hood = Backbone.Model.extend({
  urlRoot: "/hoods",

  assets: ["bike_shares", "charter_schools", "childcare_facilities", "embassies", "grocers", "libraries", "metros", "nightclubs", "pharmacies", "place_of_worships",  "police_stations"],

  initialize: function(){
    this.getAssets();
  },

  getAssets: function(asset){
    var self = this;
    $.getJSON("/hoods/" + self.attributes.id)
      .done(function(response){
        self.assets.forEach(function(asset){
          self.set(asset, response[asset]);
        });
      });
  }
});
