angular.module("formulas")
.controller("ConceptosCtrl", ConceptosCtrl);  
function ConceptosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);

	this.subscribe('conceptos',()=>{
		return [{obra_id: $stateParams.id, partida_id: $stateParams.partida_id, estatus:true}]
	});

      this.subscribe('partida', () => {	
		return [{
		obra_id: $stateParams.id, estatus : true}]
	});




  this.action = true;
  
	this.helpers({
	  partida : () => {
		  return Partidas.findOne($stateParams.partida_id);
	  },
	  conceptos : () => {
		  return Conceptos.find();
	  }
  });
  
	this.nuevo = true;  	  
  this.nuevoConcepto = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.concepto = {};		
  };
  
  this.guardar = function(concepto)
	{
		this.concepto.estatus = true; 
		concepto.obra_id = $stateParams.id;
		concepto.partida_id = $stateParams.partida_id;
		console.log(this.concepto);
		Conceptos.insert(this.concepto);
		toastr.success('concepto guardado.');
		this.concepto = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};
	
	this.editar = function(id)
	{
    this.concepto = Conceptos.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(concepto)
	{
		var idTemp = concepto._id;
		delete concepto._id;		
		Conceptos.update({_id:idTemp},{$set:concepto});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var concepto = Conceptos.findOne({_id:id});
		if(concepto.estatus == true)
			concepto.estatus = false;
		else
			concepto.estatus = true;
		
		Conceptos.update({_id: id},{$set :  {estatus : concepto.estatus}});
    };
		
};
