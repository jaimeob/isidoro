Periodos 						= new Mongo.Collection("periodos");
Periodos.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});



PresupuestosCampo 						= new Mongo.Collection("presupuestosCampo");
PresupuestosCampo.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});