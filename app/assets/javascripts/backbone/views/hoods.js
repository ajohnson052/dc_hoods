App.Views.Hoods = Backbone.View.extend({
  // el: "#map",

  initialize: function(){
    this.listenTo(this.collection, "reset", this.renderAll);
    this.createMap();
  },

  createMap: function(){
    this.map = L.map('map').setView([38.906, -77.012], 12);
    L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
    	maxZoom: 18,
    	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);
  },

  flipLatLng: function(array){
    array.forEach(function(each){
      each.reverse();
    });
    return array;
  },

  renderOne: function(hoodModel){
    new App.Views.Hood({model: hoodModel});
    var flipped = this.flipLatLng(hoodModel.attributes.coordinates);
    var neighborhood = L.polygon(flipped).addTo(this.map);
    neighborhood.bindPopup(hoodModel.attributes.name);
    neighborhood.setStyle({fillColor: "#FFFFFF"});
    neighborhood.setStyle({weight: 3, color: "#181B6A"});

  },

  renderAll: function(){
    this.collection.each(this.renderOne.bind(this));
  }
})
