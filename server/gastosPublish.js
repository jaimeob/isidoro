Meteor.publish("gI",function(){
  	return GastosIndirectos.find({estatus:true});
});


Meteor.publish("GI",function(params){
  	return GastosIndirectos.find(params);
});