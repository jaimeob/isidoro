Meteor.publish("tipoproyecto", function(){
	return TipoProyecto.find({estatus:true});
});