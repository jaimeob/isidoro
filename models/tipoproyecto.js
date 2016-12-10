TipoProyecto 						= new Mongo.Collection("tipoproyecto");
TipoProyecto.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});