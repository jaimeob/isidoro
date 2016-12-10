Meteor.publish("partidas",function(params){
  	return Partidas.find(params);
});


Meteor.publish("partida",function(params){
  	return Partidas.find(params);
});