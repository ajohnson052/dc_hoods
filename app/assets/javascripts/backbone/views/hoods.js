App.Views.Hoods = Backbone.View.extend({
  el: "main",
  polygons: {},
  colors: ["#181B6A", "#4D79B2", "#70226A", "#FD774F", "#71AF3B"],

  events: {
    "click .category": "makeSelection"
  },

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
    var color = this.colors[0];
    new App.Views.Hood({model: model});
    var flipped = this.flipLatLng(model.attributes.coordinates);
    var neighborhood = L.polygon(flipped).addTo(this.map);
    neighborhood.bindPopup(model.attributes.name);
    neighborhood.setStyle({weight: 3, color: color, fillColor: color, opacity: 1, fillOpacity: .2});
    return neighborhood;
  },

  renderAll: function(){
    var self = this;
    this.collection.each(function(model){
      self.polygons[model.id] = self.renderOne(model)
    })
  },

  makeSelection: function(e){
    var category = $(e.currentTarget).attr("id")
    console.log(typeof category)
    var self = this;
    if(category == "none"){
      this.collection.each(function(model){
        var polygon = App.Views.hoods.polygons[model.attributes.id]
        var color = self.colors[0]
        polygon.setStyle({color: color, fillColor: color, opacity: 1, fillOpacity: .2});
      })
      $(".chart").empty()
    }else{
      var color = this.colors[Math.ceil(Math.random()*4)];
      this.shadeMap(category, color);
      this.drawChart(category, color);
    }
  },

  shadeMap: function(category, color){
    var array = []
    this.collection.each(function(model){
      array.push(model["attributes"][category].length)
    })
    var max = Math.max(...array)

    this.collection.each(function(model){
      var polygon = App.Views.hoods.polygons[model.attributes.id]
      var value = model["attributes"][category].length / (max * .5)
      polygon.setStyle({color: color, fillColor: color, opacity: value, fillOpacity: value});
    })
  },

  drawChart: function(category, color){
    $(".chart").empty()
    var data = [];
    this.collection.each(function(model){
      data.push({name: model["attributes"]["name"], number: model["attributes"][category].length});
    });
    data.sort(function(a,b){
      if(a.number > b.number){
        return -1;
      }else if(a.number < b.number){
        return 1;
      }else{
        return 0;
      }
    });
    var max = data[0]["number"];
    var width = $(".chart").width();
    var multiplier = width/max;
    d3.select(".chart")
      .selectAll("div")
      .data(data.slice(0, 10))
      .enter()
      .append("div")
      .attr("class", "bar")
      .text(function(d){
        return d.name + " - " + d.number
      })
      .style("background", color)
      .style("width", function(d){
        var barLength = d.number * multiplier
        return barLength + "px";
      })
  }

})
