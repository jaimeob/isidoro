angular.module("formulas")
.controller("PresupuestosCtrl", PresupuestosCtrl);  
function PresupuestosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);

	//this.subscribe('presupuestos',()=>{
	//return [{estatus:true}] 
    //});
     
     this.subscribe('presupuestos',()=>{
		return [{ obra_id : $stateParams.id, estatus:true}]
	});

	this.subscribe('obra', () => {
		
		return [{
			_id : $stateParams.id, estatus : true
		}]
	});

    

	this.subscribe('conceptos',()=>{
	return [{estatus:true}] 
    });

  this.action = true;
  
	this.helpers({
	  presupuestos : () => {
		  return Presupuestos.find();
	  },
	  conceptos : () => {
		  return Conceptos.find();
	  },
	  obra : () => {
		  return Obras.findOne();
	  }
  });
  
	this.nuevo = true;  	  
  this.nuevoPresupuesto = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.presupuesto = {};		
  };
  
  this.guardar = function(presupuesto)
	{
		this.presupuesto.estatus = true;
		console.log(this.presupuesto);
		Presupuestos.insert(this.presupuesto);
		toastr.success('presupuesto guardado.');
		this.presupuesto = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.presupuestos')
	};
	
	this.editar = function(id)
	{
    this.presupuesto = presupuestos.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(presupuesto)
	{
		var idTemp = presupuesto._id;
		delete presupuesto._id;		
		Presupuestos.update({_id:idTemp},{$set:presupuesto});
		$('.collapse').collapsge('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var presupuesto = Presupuestos.findOne({_id:id});
		if(presupuesto.estatus == true)
			presupuesto.estatus = false;
		else
			presupuesto.estatus = true;
		
		Presupuestos.update({_id: id},{$set :  {estatus : presupuesto.estatus}});
    };
		
};
