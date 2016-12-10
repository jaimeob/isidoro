PagosProveedores						= new Mongo.Collection("pagosProveedores");
PagosProveedores.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});