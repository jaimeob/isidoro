Meteor.publish("coordinacion",function(params){
  	return Coordinacion.find(params);
});
Meteor.publish("comerciales",function(params){
  	return Comerciales.find(params);
});
Meteor.publish("tecnicas",function(params){
  	return Tecnicas.find(params);
});
Meteor.publish("administracion",function(params){
  	return Administracion.find(params);
});
Meteor.publish("comercialSeccion",function(params){
  	return ComercialSeccion.find(params);
});
Meteor.publish("tecnicaSeccion",function(params){
  	return TecnicaSeccion.find(params);
});

Meteor.publish("areas",function(params){
  	return Areas.find(params);
});
