Meteor.publish("presupuestos",function(params){
  	return Presupuestos.find(params);
});

Meteor.publish("presupuestosCosas",function(params){
  	return PresupuestosCosas.find(params);
});