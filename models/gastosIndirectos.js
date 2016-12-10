GastosIndirectos 						= new Mongo.Collection("gastosIndirectos");
GastosIndirectos.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});



GI 						= new Mongo.Collection("GI");
GI.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});