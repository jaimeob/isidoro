angular.module("formulas")
.controller("MesCtrl", MesCtrl);  
function MesCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);
	this.mes_id = '';
	this.action = true;
	this.panelId = "";
	this.tipoPeriodo = 'costo';

	this.subscribe('meses',()=>{
		return [{estatus:true}]
	});

	this.subscribe('obras',()=>{
		return [{estatus:true}]
	});

	this.subscribe('periodos',()=>{
		return [{estatus:true}]
	});

	this.helpers({	
	  meses : () => {
	  	return Meses.find();
	  },
	   obras : () => {
	  	return Obras.find();
	  },	
	    periodos : () => {
	  	return Periodos.find();
	  },	
  });

	this.panelColor = false;	
	this.mostrarMes = true;
	this.accionMes = false;
	this.accionPresupuesto = true;
	this.accionPeriodo = false;
	this.nuevo = true;
	

  this.nuevoMes = function()
  {
  	this.accionMes = true;
    this.nuevo = !this.nuevo;
  };

   this.nuevoPresupuesto = function()
  {
    this.accionMes = true;
    this.mostrarMes = !this.mostrarMes;
    //this.presupuesto.costo.value = 0.00;
  };

  this.guardar = function(mes)
	{
		moment.locale("es"); 
		this.mes.estatus = true;
		this.mes.mes = moment(mes.fecha).format('MMMM-YYYY')
		console.log(this.mes);
		Meses.insert(this.mes);
		toastr.success('Mes Agregado.');
		this.accionMes = false;
		this.mes = {};		
	};


	this.editar = function(id)
	{
    this.obra = Meses.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(obra)
	{
		var idTemp = obra._id;
		delete obra._id;		
		Meses.update({_id:idTemp},{$set:obra});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
	    var mes;
	    var r = confirm("Esta seguro de borrar esta fecha");
	    if (r == true) {
	        txt = mes = Meses.findOne({_id:id});
		if(mes.estatus == true)
			mes.estatus = false;
		else
			mes.estatus = true;
		
		Meses.update({_id: id},{$set :  {estatus : mes.estatus}});

	    } else {
	        mes.estatus = true;
	    }
    };


    this.cobroTotalFinalPeriodo = function(){
		total = 0;
		_.each(this.periodos,function(periodo){total += periodo.comprasIva + periodo.comprasSinIva + periodo.contadoIva + periodo.contadoSinIva});
		return total
	}

	};

