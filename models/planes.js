Planes 						= new Mongo.Collection("planes");
Planes.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});