App.Views.Hood = Backbone.View.extend({
  el: "#chart",

  assets: ["bike_shares", "charter_schools", "childcare_facilities", "embassies", "grocers", "libraries", "metros", "nightclubs", "pharmacies", "place_of_worships",  "police_stations"],

  initialize: function(){
    $(".chart").empty().append($("<h2>" + this.model.attributes.name + "</h2>"));
    this.render(this.getData());
  },

  getData: function(){
    var self = this;
    var data = [];
    this.assets.forEach(function(asset){
      if(self.model.get(asset).length > 0){
        data.push({asset: asset, number: self.model.attributes[asset].length});
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

  getTitle: function(asset){
    if(asset === "place_of_worships"){
      return "places of worship";
    }else{
      return asset.split("_").join(" ");
    }
  },

  render: function(data){
    var self = this;
    var max = data[0].number;
    var width = $(".chart").width();
    var multiplier = (width - 150)/max;
    d3.select(".chart")
      .selectAll("div")
      .data(data)
      .enter()
      .append("div")
      .attr("class", "bar")
      .text(function(d){
        var title = self.getTitle(d.asset);
        return title + " - " + d.number;
      })
      .transition()
      .style("width", function(d){
        var barLength = 150 + (d.number * multiplier);
        return barLength + "px";
      })
      .duration(1000);
  }
});
