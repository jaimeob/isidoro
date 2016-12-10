Meteor.publish("gastosOficina",function(params){
  	return GastosOficina.find(params);
});


Meteor.publish("gastosIngresos",function(params){
  	return GastosOficina.find(params);
});