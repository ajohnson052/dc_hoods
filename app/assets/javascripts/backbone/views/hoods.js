App.Views.Hoods = Backbone.View.extend({
  // el: "#map",

  initialize: function(){
    this.listenTo(this.collection, "reset", this.renderAll);
    this.createMap();
  },

  createMap: function(){
    this.map = L.map('map').setView([38.9038829, -77.01], 12);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'ajohnson052.okcdaa2c',
      accessToken: 'pk.eyJ1IjoiYWpvaG5zb24wNTIiLCJhIjoiY2lqMjl3aGZqMDAwNnVia3BvbzZndTVxcSJ9.lgDF359V9thO7NOh3x_GEQ'
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
    console.log(hoodModel.attributes.name)
    console.log(flipped)
    var neighborhood = L.polygon(flipped).addTo(this.map);
    // neighborhood.bindPopup(hoodModel.name);
  },

  renderAll: function(){
    this.collection.each(this.renderOne.bind(this));
  }
})
