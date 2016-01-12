App.Collections.Hoods = Backbone.Collection.extend({
  url: "http://localhost:3000/hoods",

  model: App.Models.Hood,

  initialize: function(){
    console.log("Collection created")
  }
})
