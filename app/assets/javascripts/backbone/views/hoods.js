App.Views.Hoods = Backbone.View.extend({
  el: "main",
  polygons: {},
  colors: ["#1e115d", "#70226A", "#FD774F", "#b0cf20", "#005850"],
  colorCounter: 1,

  events: {
    "click .category": "selectAsset"
  },

  initialize: function(){
    this.listenTo(this.collection, "reset", this.renderAll);
    this.createMap();
  },

  createMap: function(){
    this.map = L.map('map').setView([38.906, -77.012], 12);
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'ajohnson052.oo8808h2',
      accessToken: 'pk.eyJ1IjoiYWpvaG5zb24wNTIiLCJhIjoiY2lqMjl3aGZqMDAwNnVia3BvbzZndTVxcSJ9.lgDF359V9thO7NOh3x_GEQ'
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
    var flipped = this.flipLatLng(model.attributes.coordinates);
    var neighborhood = L.polygon(flipped).addTo(this.map);
    neighborhood.on("click", function(){
      new App.Views.Hood({model: model});
      App.Routers.dcHoods.navigate("hood/" + model.id);
    });
    neighborhood.bindPopup(model.attributes.name);
    neighborhood.setStyle({weight: 3, color: color, fillColor: color, opacity: 1, fillOpacity: 0.2});
    return neighborhood;
  },

  renderAll: function(){
    var self = this;
    this.collection.each(function(model){
      self.polygons[model.id] = self.renderOne(model);
    });
  },

  reset: function(){
    var self = this;
    this.collection.each(function(model){
      var polygon = App.Views.hoods.polygons[model.attributes.id];
      var color = self.colors[0];
      polygon.setStyle({color: color, fillColor: color, opacity: 1, fillOpacity: 0.2});
    });
    $(".chart").empty();
  },

  advanceColorCounter: function(){
    if(this.colorCounter < this.colors.length - 1){
      this.colorCounter +=1;
    }else{
      this.colorCounter = 1;
    }
  },

  getTitle: function(asset){
    if(asset === "place_of_worships"){
      return "places of worship";
    }else{
      return asset.split("_").join(" ");
    }
  },

  selectAsset: function(e){
    var asset = "";
    if(arguments.length > 1){
      asset = arguments[1];
    }
    else{
      asset = $(e.currentTarget).attr("id");
      App.Routers.dcHoods.navigate(asset);
    }
    var title = this.getTitle(asset);
    if(asset == "none"){
      this.reset();
    }
    else{
      var color = this.colors[this.colorCounter];
      this.advanceColorCounter();
      this.shadeMap(asset, color);
      this.drawChart(this.getData(asset), title, color);
    }
  },

  shadeMap: function(asset, color){
    var array = [];
    this.collection.each(function(model){
      array.push(model.attributes[asset].length);
    });
    var max = Math.max.apply(null, array);

    this.collection.each(function(model){
      var polygon = App.Views.hoods.polygons[model.attributes.id];
      var value = model.attributes[asset].length / (max * 0.5);
      polygon.setStyle({color: color, fillColor: color, opacity: value, fillOpacity: value});
    });
  },

  getData: function(asset){
    var data = [];
    this.collection.each(function(model){
      if(model.attributes[asset].length > 0){
        data.push({name: model.attributes.name, number: model.attributes[asset].length});
      }
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
    return data;
  },

  drawChart: function(data, title, color){
    $(".chart").empty().append($("<h2>" + title + "</h2>"));
    var max = data[0].number;
    var width = $(".chart").width();
    var multiplier = (width - 150)/max;
    d3.select(".chart")
      .selectAll("div")
      .data(data.slice(0, 15))
      .enter()
      .append("div")
      .attr("class", "bar")
      .text(function(d){
        if(d.number > 0){
          return d.name + " - " + d.number;
        }
      })
      .transition()
      .style("width", function(d){
        var barLength = 150 +(d.number * multiplier);
        return barLength + "px";
      })
      .duration(1000);
  }

});
