App.Views.Hoods = Backbone.View.extend({
  el: "main",
  polygons: {},

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

  renderOne: function(model, metros){
    new App.Views.Hood({model: model});
    var flipped = this.flipLatLng(model.attributes.coordinates);
    var neighborhood = L.polygon(flipped).addTo(this.map);
    neighborhood.bindPopup(model.attributes.name);
    neighborhood.setStyle({weight: 3, color: "#181B6A", opacity: 1});
    return neighborhood
  },

  shadeMap: function(category){
    var array = []
    this.collection.each(function(model){
      array.push(model["attributes"][category].length)
    })
    var max = Math.max(...array)
    this.collection.each(function(model){
      var polygon = App.Views.hoods.polygons[model.attributes.id]
      var value = model["attributes"][category].length / (max * .8)
      polygon.setStyle({fillColor: "#181B6A", opacity: value, fillOpacity: value});
    })
  },

  renderAll: function(){
    var self = this;
    this.collection.each(function(model){
      self.polygons[model.id] = self.renderOne(model)
    })
  }
})
