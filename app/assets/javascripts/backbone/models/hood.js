App.Models.Hood = Backbone.Model.extend({
  urlRoot: "http://localhost:3000/hoods",

  initialize: function(){
    this.getMetros();
  },

  getMetros: function(){
    var self = this
    $.getJSON("http://localhost:3000/hoods/" + this.attributes.id + "/metros")
      .done(function(response){
        self.set("metros", response)
      })
  }
})
