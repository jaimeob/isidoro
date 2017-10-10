Areas 						= new Mongo.Collection("areas");
Areas.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});

AreasProcesos						= new Mongo.Collection("areasProcesos");
AreasProcesos.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});