Procesos 						= new Mongo.Collection("procesos");
Procesos.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});