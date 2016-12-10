Meteor.publish("pagosProveedores",function(params){
  	return PagosProveedores.find(params);
});