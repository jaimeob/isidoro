angular.module("formulas")
.controller("ObrasCtrl", ObrasCtrl);  
function ObrasCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);

this.subscribe('users',()=>{
	var user = Meteor.user();
	var userPro = Meteor.user().profile;
	return Meteor.users.findOne[{ _id: Meteor.userId()}];
    });

	this.subscribe('obras',()=>{
	return [{empresa_id : Meteor.user() != undefined ? Meteor.user().profile.empresa_id : undefined,estatus:true}] 
    });

 //   this.subscribe('usuarios',()=>{
	// return [{empresa_id : Meteor.user() != undefined ? Meteor.user().profile.empresa_id : undefined,}] 
 //    });

//  this.subscribe("users",() {
//   return Meteor.users.findOne({}, {estatus: true});
// });

	this.subscribe('empresas',()=>{
		var user = Meteor.user();
	return [{_id : Meteor.user().profile.empresa_id,estatus:true}] 
    });

  this.action = true;
  
	this.helpers({
	  obras : () => {
		  return Obras.find();
	  },
	  empresas : () => {
		  return Empresas.find();
	  },
	  usuario : () => {
		  return Usuarios.findOne();
	  }
  });
  
	this.nuevo = true;  	  
  this.nuevoObra = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.obra = {};		
  };
  
  this.guardar = function(obra)
	{
		this.obra.usuario_id = Meteor.userId()
		this.obra.estatus = true;
		console.log(this.obra);
		Obras.insert(this.obra);
		toastr.success('Obra guardada.');
		this.obra = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.obras')
	};
	
	this.editar = function(id)
	{
    this.obra = Obras.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(obra)
	{
		var idTemp = obra._id;
		delete obra._id;		
		Obras.update({_id:idTemp},{$set:obra});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		console.log(obra);
	};

	this.cambiarEstatus = function(id)
	{
		var obra = Obras.findOne({_id:id});
		if(obra.estatus == true)
			obra.estatus = false;
		else
			obra.estatus = true;
		
		Obras.update({_id: id},{$set :  {estatus : obra.estatus}});
    };

    
		
};
