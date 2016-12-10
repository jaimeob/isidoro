Meteor.publish("costos",function(params){
  	return Costos.find(params);
});