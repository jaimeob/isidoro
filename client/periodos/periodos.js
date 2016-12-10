angular.module("formulas")
.controller("PeriodosCtrl", PeriodosCtrl);  
function PeriodosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);
	this.mes_id = '';
	this.partida_id = '';
	this.action = true;
	this.presupuesto = {};
	this.presupuesto.gastos = [];

	this.subscribe('mes', () => {
		return [{
			_id : $stateParams.id, estatus : true
		}]
	});

	this.subscribe('periodos',()=>{
		return [{ mes_id : $stateParams.id, estatus:true}]
	});

	this.subscribe('partidas',()=>{
	return [{estatus:true}] 
  });

  this.subscribe('conceptos',()=>{
	return [{partida_id: this.getReactively('partida_id'), estatus:true}] 
  });

  this.subscribe('costos',()=>{
	return [{estatus:true}] 
  });

  this.subscribe('meses',()=>{
	return [{estatus:true}] 
  });

  this.subscribe('Periodos',()=>{
	return [{estatus:true}] 
  });

  this.subscribe('presupuestos',()=>{
	return [{partida_id: this.getReactively('partida_id'),periodo_id: this.getReactively('periodo_id'),estatus:true}] 
  });

  
  
	this.helpers({
	  meses : () => {
		  return Meses.find();
	  },
	  partidas : () => {
		  return Partidas.find($stateParams.id);
	  },
	  obras : () => {
	  return Obras.findOne();
	  },
	   costos : () => {
	  return Costos.find();
	  },
	  conceptos : () => {
	  return Conceptos.find();
	  },
	  presupuestos : () => {
	  return Presupuestos.find();
	  },
	  Periodos : () => {
	  return Periodos.find();
	  },
  });

		
	this.mostrarPeriodo = true;
	this.accionPeriodo = false;
	

  this.nuevoPeriodo = function()
  {
    this.accionPeriodo = true;
    this.mostrarPeriodo = !this.mostrarPeriodo;
    this.periodo = {}; 
  	
  };

  this.guardar = function(periodo)
	{
		
		this.periodo.estatus = true;
		periodo.periodo_id = $stateParams.id;
		this.mes.mes_id = this.mes_id;
		console.log(this.periodo);
		periodos.insert(this.periodo);
		toastr.success('periodo Agregado.');
		this.accionperiodo = false;
		this.periodo = {}; 
		
	};

	/*this.guardarPresupuesto = function(costos)
	{
		console.log(costos);
		this.presupuesto.estatus = true;
		this.presupuesto.partida_id = this.partida_id;
		this.presupuesto.periodo_id = this.periodo_id;
		//periodo.periodo_id = $stateParams.id;
		//periodo.partida_id = this.partida_id;
		_.each(costos, function(costo){
			delete costo.$$hashKey;
		});
		this.presupuesto.costos = costos;
		console.log(this.presupuesto);
		Presupuestos.insert(this.presupuesto);
		toastr.success('presupuesto Agregado.');
		this.presupuesto = {}; 
		
	};*/
	
	this.editar = function(id)
	{
    this.periodo = Periodos.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(periodo)
	{
		var idTemp = periodo._id;
		delete periodo._id;		
		periodoes.update({_id:idTemp},{$set:periodo});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
	    var periodo;
	    var r = confirm("Esta seguro de borrar esta fecha");
	    if (r == true) {
	        txt = periodo = periodoes.findOne({_id:id});
		if(periodo.estatus == true)
			periodo.estatus = false;
		else
			periodo.estatus = true;
		
		periodoes.update({_id: id},{$set :  {estatus : periodo.estatus}});

	    } else {
	        periodo.estatus = true;
	    }
    };

    this.mostrarArchivos= function(id)
	{
		this.presupuesto = {}; 
		console.log(id);
		//rc.nada = nombre;
		this.periodo_id = id;
	};

	 this.mostrarPresupuestos = function(id)
	{
		this.partida_id = id;
		
		console.log(id);
	};

	this.getConcepto= function(concepto_id)
	{
		var concepto = Conceptos.findOne(concepto_id);
		if(concepto)
		return concepto.nombre;
	};
	this.getCosto= function(costo_id)
	{
		var costo = Costos.findOne(costo_id);
		if(costo)
		return costo.value;
	};		
};
