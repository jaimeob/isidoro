Coordinacion 						= new Mongo.Collection("coordinacion");
Coordinacion.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Comerciales 						= new Mongo.Collection("comerciales");
Comerciales.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

Tecnicas 						= new Mongo.Collection("tecnicas");
Tecnicas.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
Administracion 						= new Mongo.Collection("administracion");
Administracion.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
ComercialSeccion 						= new Mongo.Collection("comercialSeccion");
ComercialSeccion.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
TecnicaSeccion 						= new Mongo.Collection("tecnicaSeccion");
TecnicaSeccion.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});