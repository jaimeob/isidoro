Meteor.publish("control",function(params){
return Control.find(params)
});
Meteor.publish("controlPlan",function(params){
return ControlPlan.find(params)
});

Meteor.publish("controlForma",function(params){
return ControlForma.find(params)
});

Meteor.publish("controlResponsables",function(params){
return ControlResponsables.find(params)
});

Meteor.publish("controlCostos",function(params){
return ControlCostos.find(params)
});


