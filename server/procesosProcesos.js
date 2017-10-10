Meteor.publish("procesos",function(params){
  	return Procesos.find(params);
});

Meteor.publish("areasProcesos",function(params){
  	return AreasProcesos.find(params);
});