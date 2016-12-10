Meteor.publish("planes",function(params){
  	return Planes.find(params);
});