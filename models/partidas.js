Partidas 						= new Mongo.Collection("partidas");
Partidas.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});