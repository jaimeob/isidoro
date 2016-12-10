angular.module("formulas")
.controller("GastosCtrl", GastosCtrl);  
function GastosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);


this.subscribe('users',()=>{
	return Meteor.users.findOne[{ _id: Meteor.userId() }];
    });

	this.subscribe('gastos',()=>{
	return [{estatus:true}] 
    });

    

	this.subscribe('empresas');

  this.action = true;
  
	this.helpers({
	  gastos : () => {
		  return Gastos.find();
	  },
	  empresas : () => {
		  return Empresas.find();
	  }
  });
  
	this.nuevo = true;  	  
  this.nuevoGasto = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.gasto = {};		
  };
  
  this.guardar = function(obra)
	{
		this.gasto.estatus = true;
		console.log(this.gasto);
		Gastos.insert(this.gasto);
		toastr.success('Costo guardado.');
		this.gasto = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	
	this.editar = function(id)
	{
    this.gasto = Gastos.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(obra)
	{
		var idTemp = obra._id;
		delete obra._id;		
		Gastos.update({_id:idTemp},{$set:obra});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var obra = Gastos.findOne({_id:id});
		if(obra.estatus == true)
			obra.estatus = false;
		else
			obra.estatus = true;
		
		Gastos.update({_id: id},{$set :  {estatus : obra.estatus}});
    };
		
};
