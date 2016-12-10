Costos 						= new Mongo.Collection("costos");
Costos.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});


CostosDirectos						= new Mongo.Collection("costosDirectos");
CostosDirectos.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});