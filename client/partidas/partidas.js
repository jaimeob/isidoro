angular.module("formulas")
.controller("PartidasCtrl", PartidasCtrl);  
function PartidasCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);

	this.subscribe('partidas',()=>{
	return [{obra_id : $stateParams.id, estatus : true}] 
    });

	this.subscribe('obra', () => {
  	return [{ _id : $stateParams.id, estatus : true}]
    });


	this.subscribe('empresas');

  this.action = true;
  
	this.helpers({
	  partidas : () => {
		  return Partidas.find();
	  },
	  empresas : () => {
		  return Empresas.find();
	  },
	  obra : () => {
		  return Obras.findOne($stateParams.id);
		},
  });
  
	this.nuevo = true;  	  
  this.nuevoPartida = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.partida = {};		
  };
  
  this.guardar = function(partida)
	{
		this.partida.estatus = true;
		partida.obra_id = $stateParams.id; 
		console.log(this.partida);
		Partidas.insert(this.partida);
		toastr.success('Obra guardada.');
		this.partida = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	
	this.editar = function(id)
	{
    this.partida = Partidas.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(partida)
	{
		var idTemp = partida._id;
		delete partida._id;		
		Partidas.update({_id:idTemp},{$set:partida});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var partida = Partidas.findOne({_id:id});
		if(partida.estatus == true)
			partida.estatus = false;
		else
			partida.estatus = true;
		
		Partidas.update({_id: id},{$set :  {estatus : partida.estatus}});
    };
		
};
