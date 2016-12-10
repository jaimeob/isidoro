angular.module("formulas")
.controller("PagosCtrl", PagosCtrl);  
function PagosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);

	this.subscribe('pagos',()=>{
	return [{estatus:true}] 
    });

    

  this.action = true;
  
	this.helpers({
	  pagos : () => {
		  return Pagos.find();
	  },
  });
  
	this.nuevo = true;  	  
  this.nuevoPago = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.pago = {};		
  };
  
  this.guardar = function(obra)
	{
		this.pago.estatus = true;
		console.log(this.pago);
		Pagos.insert(this.pago);
		toastr.success('Obra guardada.');
		this.pago = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.pagos')
	};
	
	this.editar = function(id)
	{
    this.pago = Pagos.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(obra)
	{
		var idTemp = obra._id;
		delete obra._id;		
		Pagos.update({_id:idTemp},{$set:obra});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var obra = Pagos.findOne({_id:id});
		if(obra.estatus == true)
			obra.estatus = false;
		else
			obra.estatus = true;
		
		Pagos.update({_id: id},{$set :  {estatus : obra.estatus}});
    };
		
};
