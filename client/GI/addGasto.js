angular.module("formulas")
.controller("AddGasto", AddGasto);  
function AddGasto($scope, $meteor, $reactive, $state, $stateParams, toastr){
$reactive(this).attach($scope);

this.mes_id = '';
this.gasto = {};
this.gasto.importeFijo = 0.00;
this.gasto.importeVar = 0.00;


this.subscribe('users',()=>{
	return Meteor.users.findOne[{ _id: Meteor.userId() }];
    });

    	this.subscribe('meses',()=>{
		return [{estatus:true,usuarioMes: Meteor.userId()}]
	});


     this.subscribe('gastosOficina',()=>{
	 return [{mes_id: this.getReactively('mes_id'), estatus:true,usuario_id:Meteor.userId()}] 
     });

      this.subscribe('cobros',()=>{
	return [{mes_id: this.getReactively('mes_id'),estatus:true}] 
  });
  
	this.helpers({
	  meses : () => {
		  return Meses.find();
	  },
	  gastos : () => {
		  return GastosOficina.find();
	  },
	    });
    
    this.action = true;
	this.nuevo = true; 
	this.accionAgregar = false;	 
	this.accionImporte = true; 
  this.nuevoMes = function()
  {
    this.accionAgregar = true;
    this.nuevo = !this.nuevo;
    this.mes= {};	
  };
  
  this.guardar = function(mes)
	{
		moment.locale("es"); 
		this.periodo.usuario_id = Meteor.userId()
		this.mes.estatus = true;
		this.mes.mes = moment(mes.fecha).format('MMMM-YYYY')
		//this.mes.mes_id = this.mes_id;
		console.log(this.mes);
		Meses.insert(this.mes);
		toastr.success('Mes Agregado.');
		this.accionAgregar = false;
		this.mes = {};	
		
	};
	
	this.editar = function(id)
	{
    this.gasto = GastosOficina.findOne({_id:id});
    this.action = false;
    this.nuevo = false;
	};
	
	this.actualizar = function(gasto)
	{
		var idTemp = gasto._id;
		delete gasto._id;		
		GastosOficina.update({_id:idTemp},{$set:gasto});
		console.log(this.gasto);
		this.action = true;
	};

	this.cambiarEstatus = function(id)
	{
	    var mes;
	    var r = confirm("Esta seguro de borrar esta fecha");
	    if (r == true) {
	        txt = mes = GastosOficina.findOne({_id:id});
		if(mes.estatus == true)
			mes.estatus = false;
		else
			mes.estatus = true;
		
		GastosOficina.update({_id: id},{$set :  {estatus : mes.estatus}});

	    } else {
	        mes.estatus = true;
	    }
    };


    this.mostrarListas= function(mes_id)
	{
		
		this.panelId =  mes_id;
		this.mes_id = mes_id;
		this.panelColor = true;
		this.accionImporte = false;
	};

	this.guardarImporte = function(gasto)
	{
	
		this.gasto.estatus = true;
		this.gasto.usuario_id = Meteor.userId()
		this.gasto.mes_id = this.mes_id;
		console.log(this.gasto);
		GastosOficina.insert(this.gasto);
		toastr.success('Importe Guardado.');
		this.gasto = {};	
		this.var = true;
	    this.fijo = true;
	    this.gasto.importeFijo = 0.00;
        this.gasto.importeVar = 0.00;		
	};

	this.var = true;
	this.fijo = true;
	this.variable = function()
	{
		this.var = true;
		this.fijo = false;
		
	};

	this.fijo = function()
	{
		this.gasto.var = false;
		this.gasto.fijo = true;
		
	};

	this.TotalFinal = function(){
		total = 0;
		_.each(this.gastos,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	}



	
		
};
