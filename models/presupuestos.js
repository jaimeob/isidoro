Presupuestos 						= new Mongo.Collection("presupuestos");
Presupuestos.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});


PresupuestosCosas 						= new Mongo.Collection("presupuestosCosas");
PresupuestosCosas.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});