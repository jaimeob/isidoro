GastosOficina 						= new Mongo.Collection("gastosOficina");
GastosOficina.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});



GastosIngresos						= new Mongo.Collection("gastosIngresos");
GastosIngresos.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});