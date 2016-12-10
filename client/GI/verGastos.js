angular.module("formulas")
.controller("verGastosCtrl", verGastosCtrl);  
function verGastosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
let rc = $reactive(this).attach($scope);


this.mes_id = '';
this.tipoPeriodo = 'gasto';


this.subscribe('users',()=>{
	return Meteor.users.findOne[{ _id: Meteor.userId() }];
    });

	this.subscribe('GI',()=>{
	return [{mes_id: this.getReactively('mes_id'),estatus:true}] 
    });

     this.subscribe('gastosOficina',()=>{
	 return [{estatus:true}] 
     });

    this.subscribe('planes',()=>{
	return [{estatus:true}] 
    });
    this.subscribe('obras',()=>{
	return [{empresa_id : Meteor.user().profile.empresa_id,estatus:true}] 
    });

    this.subscribe('meses',()=>{
	return [{estatus:true}] 
    });

    this.subscribe('pagosProveedores',()=>{
	return [{estatus:true}] 
  });
    this.subscribe('cobros',()=>{
	return [{estatus:true,modo:false}] 
  });
	this.subscribe('periodos',()=>{
	return [{tipo: this.getReactively('tipoPeriodo'),estatus:true}] 
  });

  this.action = true;
  
	this.helpers({
	  meses : () => {
		  return Meses.find();
	  },
	  obras : () => {
		  return Obras.find();
	  },
	  gastos : () => {
		  return GI.find();
	  },
	  gastosOficinas : () => {
		  return GastosOficina.find();
	  },
	  pagos : () => {
		  return PagosProveedores.find();
	  },
	  cobros : () => {
		  return Cobros.find();
	  },
	  periodos : () => {
	  	return Periodos.find();
	  },
	  totalAnual : () => {
	  	var obrasCalculadas = [];
	  	if(this.getReactively("obras") != undefined){
	  		_.each(this.obras,function(obra){
	  			//console.log("entré");
				var totalA=0;
				var cobros = Cobros.find({obra_id: obra._id, modo:false}).fetch();
				_.each(cobros,function(cobro){
					totalA += cobro.cIva + cobro.cIva;
				});
				obrasCalculadas.push({nombre : obra.nombre, total : totalA});
			});
			//console.log(obrasCalculadas)
	  	}		
		return obrasCalculadas;
	  },
	

	  totalFinalCalculo :() => {
		var arreglo = [];
		total = 0;
		var meses = Meses.find().fetch();
		if(this.meses){
			_.each(this.meses,function(mes){
				//var gastosOficina = GastosOficina.find({ mes_id : mes._id});
				var totalGastoOficina = 0.00;
				_.each(rc.gastosOficinas, function(gastoOficina){
					if(gastoOficina.mes_id == mes._id){
						totalGastoOficina += gastoOficina.importeFijo + gastoOficina.importeVar;
					}
				});
				arreglo.push({mes : mes.mes, totalGastosOficina : totalGastoOficina});

			});
			return arreglo;

		}
	},

	  totalGastosAnual : () => {
	  	var obrasGastos = [];
	  	if(this.getReactively("obras") != undefined){
	  		_.each(this.obras,function(obra){
	  			//console.log("ESTAAAAA");
				var totalAn=0;
				var gastosCampo = Periodos.find({obra_id: obra._id}).fetch();
				_.each(gastosCampo,function(gasto){
					totalAn += gasto.comprasIva + gasto.contadoIva 
				});
				obrasGastos.push({nombre : obra.nombre, total : totalAn});
			});
			//console.log(obrasGastos)
	  	}		
		return obrasGastos;
	  },


 	/*this.totalCantidadApagar = function(){
		total = 0;
		_.each(this.gastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	}*/



 		indirectosEmpresas : () => {
		var gastosIndirectoEmpresa = [];
		var gastosOficinas = [];
		var campo = [];
		var ingresos = [];
          
		  	//GASTOS OFICINA;
		  	var totalGastosOficinas = 0;
		  	var gastosOF = GastosOficina.find().fetch();
 				_.each(gastosOF,function(gasto){
 					totalGastosOficinas += gasto.importeFijo + gasto.importeVar
 					gasto.gastoOficina = parseInt(totalGastosOficinas);
 					
 				});

 				gastosIndirectoEmpresa.push({total : totalGastosOficinas});

 				
 	            
 				var totalIngresos = 0;
 				var cobros = Cobros.find().fetch();
 				_.each(cobros,function(cobro){
 					totalIngresos += cobro.cSinIva || cobro.cIva;
 					cobro.ingresos = parseInt(totalIngresos);
 				
 				});

 				gastosIndirectoEmpresa.push({total : totalIngresos});
				
 				
 	           
 				var totalGastosCampo = 0;
 				var periodos = Periodos.find().fetch();
 				_.each(periodos,function(campo){
 				  totalGastosCampo += campo.comprasSinIva + (campo.comprasIva / 1.16)
 				  + campo.contadoSinIva + (campo.contadoIva / 1.16)
 				  campo.gastosCampo = parseInt(totalGastosCampo);
 				  
				});

				gastosIndirectoEmpresa.push({total : totalGastosCampo});

                
               var cantidadesSumadas = (totalGastosOficinas  + totalGastosCampo) / (totalIngresos) * 100;

              gastosIndirectoEmpresa.push({total : cantidadesSumadas })



        console.log("gastos", gastosIndirectoEmpresa);
	//	console.log("final", final);

		return gastosIndirectoEmpresa;
	},


///////////////////////////////////////////////ARREGLO GIGANTE////////////////////////////////////////////////////////////////////
	jaime : () => {
		var meses = Meses.find().fetch();
		var obras = Obras.find().fetch();
		var ingresosTotalesPorMesPorObra = [];
		var ingresosTotalesPorMes = [];
		var gastosTotalesDeOficinaPorMes = [];
	
 		_.each(this.meses, function(mes){ 			
 			_.each(rc.obras, function(obra){ 				
 				//Ingresos por obra por mes (Obra)
 				var totalPorObraPorMes = 0; 
 				var ingresosObrasMes = Cobros.find({mes_id : mes._id, obra_id : obra._id, modo : false}).fetch(); 				
 				_.each(ingresosObrasMes, function(ingresoObraMes){
 					totalPorObraPorMes += ingresoObraMes.cSinIva;
 				});
 				ingresosTotalesPorMesPorObra.push({mes_id : mes._id, mes_nombre : mes.mes, obra_id : obra._id, obra_nombre : obra.nombre, total : totalPorObraPorMes.toFixed(0)});

				//Gastos de Oficina 				
 				var totalGastoOficinaPorMes = 0;
 				_.each(rc.gastosOficinas, function(gastoOficina){
 					if(gastoOficina.mes_id == mes._id){
 						totalGastoOficinaPorMes += gastoOficina.importeFijo + gastoOficina.importeVar;
 					}
 				});
 				gastosTotalesDeOficinaPorMes.push({mes_id : mes._id, mes_nombre: mes.mes, total : totalGastoOficinaPorMes.toFixed(0)});
 			});

 				

 			//Ingresos por mes (General)
			var ingresosPorMes = Cobros.find({mes_id : mes._id, modo : false}).fetch();
			var totalPorMes = 0;
			_.each(ingresosPorMes, function(ingresoMes){
				totalPorMes += ingresoMes.cSinIva;
			});
			ingresosTotalesPorMes.push({mes_id : mes._id, mes_nombre : mes.mes, total : totalPorMes.toFixed(0)});
 			// console.log("gastosTotalesDeOficinaPorMes", gastosTotalesDeOficinaPorMes);
 			// console.log("ingresosTotalesPorMes", ingresosTotalesPorMes);
 			// console.log("ingresosTotalesPorMesPorObra", ingresosTotalesPorMesPorObra);
 		});

 		var ingresosPorMesPorObraConPorcentaje = [];
 		_.each(ingresosTotalesPorMes, function(ingresoTotal){
 			_.each(ingresosTotalesPorMesPorObra, function(ingresoTotalMesObra){
 				if(ingresoTotalMesObra.mes_id == ingresoTotal.mes_id && ingresoTotal.total != 0){
 					var porcentaje = (ingresoTotalMesObra.total / ingresoTotal.total) * 100;
 					ingresosPorMesPorObraConPorcentaje.push({
 						mes_id : ingresoTotal.mes_id,
 						mes : ingresoTotal.mes_nombre,
 						obra_id : ingresoTotalMesObra.obra_id,
 						obra : ingresoTotalMesObra.obra_nombre,
 						porcentaje : parseInt(porcentaje.toFixed(0))
 					});
 				}
 			});
 		});

 
 		
		var cantidadesSumadas = 0;
 		_.each(ingresosPorMesPorObraConPorcentaje,function(ingresoPorMesPorObraConPorcentaje){
 			_.each(gastosTotalesDeOficinaPorMes,function(gastoTotalDeOficinaPorMes){

 				if (ingresoPorMesPorObraConPorcentaje.mes_id == gastoTotalDeOficinaPorMes.mes_id) {

 					//console.log("1", ingresoPorMesPorObraConPorcentaje);
 					// console.log("2", gastoTotalDeOficinaPorMes);
 					ingresoPorMesPorObraConPorcentaje.ingreso = parseInt(gastoTotalDeOficinaPorMes.total);
 					ingresoPorMesPorObraConPorcentaje.aPagar = parseInt(gastoTotalDeOficinaPorMes.total) * (ingresoPorMesPorObraConPorcentaje.porcentaje / 100);
 					

 				}
 			})
 		});

 		ingresosPorMesPorObraConPorcentaje = _.sortBy(ingresosPorMesPorObraConPorcentaje, 'obra_id');

 		//console.log("obra ordenada", ingresosPorMesPorObraConPorcentaje);
 		var resultado = [];
 		var pluck = _.pluck(ingresosPorMesPorObraConPorcentaje, "obra_id");
 		var uniq = _.uniq(pluck);
 		//console.log("uniq", uniq);
 		_.each(uniq, function(u){
 			var totalSumaUniq = 0;
 			var ingresoPrueba = {};
 			_.each(ingresosPorMesPorObraConPorcentaje, function(i){
 				if(u == i.obra_id){
 					totalSumaUniq += i.aPagar;
 					ingresoPrueba = i;
 				}
 			});
 			resultado.push({obra_id : ingresoPrueba.obra_id, obra : ingresoPrueba.obra, total : totalSumaUniq});
 		});



		var cantidadesSumadas = 0;
 		_.each(ingresosPorMesPorObraConPorcentaje,function(ingresoPorMesPorObraConPorcentaje){
 			_.each(gastosTotalesDeOficinaPorMes,function(gastoTotalDeOficinaPorMes){

 				if (ingresoPorMesPorObraConPorcentaje.mes_id == gastoTotalDeOficinaPorMes.mes_id) {

 					//console.log("1", ingresoPorMesPorObraConPorcentaje);
 					// console.log("2", gastoTotalDeOficinaPorMes);
 					ingresoPorMesPorObraConPorcentaje.ingreso = parseInt(gastoTotalDeOficinaPorMes.total);
 					ingresoPorMesPorObraConPorcentaje.aPagar = parseInt(gastoTotalDeOficinaPorMes.total) * (ingresoPorMesPorObraConPorcentaje.porcentaje / 100);
 					

 				}
 			})
 		});


 		var resultadoFinal = [];
 		_.each(resultado,function(result){
 				var totalAn=0;
				_.each(rc.periodos,function(gasto){
					if (result.obra_id == gasto.obra_id ) {
						totalAn += gasto.comprasSinIva + (gasto.comprasIva / 1.16)
						 + gasto.contadoSinIva + (gasto.contadoIva / 1.16)

						result.gastosCampo =  parseInt(totalAn);
						result.totalDeFinalTodo = parseFloat(result.gastosCampo) + parseFloat(result.total);


					}
					 
			});
 		});

 		var IngresosTotalesMasResultados = [];
 		_.each(resultado,function(result){
 				var totalIn=0;
 				var ingresoIndirecto=0;
 				var resultadoFinalIndirecto=0;
				_.each(rc.cobros,function(cobro){
					if (result.obra_id == cobro.obra_id ) {
						totalIn += cobro.cIva + cobro.cSinIva

						result.ingresosTotales =  parseInt(totalIn);
						resultadoFinalIndirecto =  (parseInt(result.totalDeFinalTodo) / parseInt(result.ingresosTotales)) * 100;
						result.ingresoIndirectoFinal =  parseFloat(resultadoFinalIndirecto.toFixed(2));
					}
					 
			});
 		});





 		console.log("probando", resultado);


 		//console.log("resultado", ingresosPorMesPorObraConPorcentaje);
 		return resultado; 
	},


  });

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
	this.nuevo = true; 
	this.accionAgregar = false; 	  
  this.nuevoGastoIndirecto = function()
  {
    this.accionAgregar = true;
    this.nuevo = !this.nuevo;
    this.gastosIndirecto= {};		
  };
  
  this.guardar = function(gastoIndirecto)
	{
		this.GI.estatus = true;
		console.log(this.gastoIndirecto);
		GI.insert(this.gastoIndirecto);
		toastr.success('Obra guardada.');
		this.gastoIndirecto = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.gastoindirectos')
	};
	
	this.editar = function(id)
	{
    this.gastoIndirecto = GI.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(gastoIndirecto)
	{
		var idTemp = gastoIndirecto._id;
		delete gastoIndirecto._id;		
		GI.update({_id:idTemp},{$set:gastoIndirecto});
		$('.collapse').collapse('hide');
		this.nuevo = true;
	};

	this.cambiarEstatus = function(id)
	{
		var gastoIndirecto = GI.findOne({_id:id});
		if(gastoIndirecto.estatus == true)
			gastoIndirecto.estatus = false;
		else
			gastoIndirecto.estatus = true;
		
		GI.update({_id: id},{$set :  {estatus : gastoIndirecto.estatus}});
    };

    this.cambiarEstatusMes = function(id)
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


     this.mostrarMeses= function(mes_id)
	{
		this.panelId = mes_id;
		this.mes_id = mes_id;
		this.panelColor = true;
		this.accionImporte = false;
	};

	this.cobroTotalFinal = function(obra_id){
		var total = 0;
		_.each(this.cobros,function(cobro){
			if(obra_id == cobro.obra_id)
				total += cobro.cIva + cobro.cSinIva
		});
		return total
	}

	this.cobroTotalFinalPeriodo = function(obra_id){
		var total = 0;
		_.each(this.periodos,function(periodo){
			if(obra_id == periodo.obra_id)
			total += periodo.comprasIva + periodo.comprasSinIva
		 + periodo.contadoIva + periodo.contadoSinIva
		});
		return total
	}

	this.ingresosTotales=function(obras){
		var totalIngresos=0;
		_.each(obras, function(obra){
			var cobros = Cobros.find().fetch();
			_.each(cobros,function(cobro){
				var obra_id=obra._id;
				
				if(obra_id == cobro.obra_id)
					totalIngresos += cobro.cIva + cobro.cSinIva
			})

		});
		return totalIngresos
	}


	this.cobrosTotales=function(obras){
		var totalCobros=0;
		_.each(obras, function(obra){
			var periodos = Periodos.find().fetch();
			_.each(periodos,function(periodo){
				var obra_id=obra._id;
				if(obra_id == periodo.obra_id)
					totalCobros += periodo.comprasIva + periodo.comprasSinIva
				 			+ periodo.contadoIva + periodo.contadoSinIva
			})

		});
		return totalCobros
	}

	this.TotalFinal = function(){
		total = 0;
		_.each(this.gastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	};

	this.cobrosTotales=function(obras){
		var totalCobros=0;
		_.each(obras, function(obra){
			var periodos = Periodos.find().fetch();
			_.each(periodos,function(periodo){
				var obra_id=obra._id;
				if(obra_id == periodo.obra_id)
					totalCobros += periodo.comprasIva + periodo.comprasSinIva
				 			+ periodo.contadoIva + periodo.contadoSinIva
			})

		});
		return totalCobros
	};


 

 	this.totalCantidadApagar = function(){
		total = 0;
		_.each(this.gastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	}

	this.TotalFinalGastos = function()
	{
		total = 0;
		_.each(this.periodos,function(periodo)
		  {total += periodo.comprasIva + periodo.comprasSinIva
		 + periodo.contadoIva + periodo.contadoSinIva});
		return total
	}

	this.cobrosTotalesOF =function(obras){
		var totalOF=0;
		_.each(obras, function(obra){
			var gastosOficinas = GastosOficina.find().fetch();
			_.each(gastosOficinas,function(gasto){
				var obra_id=obra._id;
				if(obra_id == gasto.obra_id)
					totalOF += gasto.importeFijo + gasto.importeVar
			})

		});
		return totalOF
	};


	this.cobroTotalFinal = function(obra_id){
		var total = 0;
		_.each(this.cobros,function(cobro){
			if(obra_id == cobro.obra_id)
				total += cobro.cIva + cobro.cSinIva
		});
		return total
	}

	this.ingresosTotales=function(obras){
		var totalIngresos=0;
		_.each(obras, function(obra){
			var cobros = Cobros.find().fetch();
			_.each(cobros,function(cobro){
				var obra_id=obra._id;
				if(obra_id == cobro.obra_id)
					totalIngresos += cobro.cIva + cobro.cSinIva
			})

		});
		return totalIngresos
 	};


 	
};