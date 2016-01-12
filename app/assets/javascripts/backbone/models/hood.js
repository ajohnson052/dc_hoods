App.Models.Hood = Backbone.Model.extend({
  urlRoot: "http://localhost:3000/hoods",
  
  initialize: function(){
    console.log("model created")
  }
})
