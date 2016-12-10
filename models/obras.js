Obras 						= new Mongo.Collection("obras");
Obras.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});