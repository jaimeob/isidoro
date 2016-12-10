Control 						= new Mongo.Collection("control");
Control.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
ControlForma 						= new Mongo.Collection("controlForma");
ControlForma.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
ControlPlan 						= new Mongo.Collection("controlPlan");
ControlPlan.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
ControlResponsables 						= new Mongo.Collection("controlResponsables");
ControlResponsables.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});
ControlCostos             = new Mongo.Collection("controlCostos");
ControlCostos.allow({
  insert: function () { return true; },
  update: function () { return true; },
  remove: function () { return true; }
});