Meteor.publish("meses",function(params){
  	return Meses.find(params);
});

Meteor.publish("mesesGastos",function(params){
  	return MesesGastos.find(params);
});

Meteor.publish("mes",function(params){
  	return Meses.find(params);
});