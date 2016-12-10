angular.module('formulas')
.controller('PlanesCtrl', PlanesCtrl);
function PlanesCtrl($scope, $meteor, $reactive, $state, toastr, $stateParams) {
	let rc = $reactive(this).attach($scope);

	this.plan = {}
	this.plan.costos = [];
	this.plan.factorRecuperacion = 1/(1-((100/(100 -(10 + this.plan.isr)))*(this.plan.trema2/100)))


	this.plan.ingresos = ((rc.totalFinalCostosDirectos)+((rc.totalFinalCostosDirectos * rc.cargoAdicional)/ 100) + ((rc.totalFinalCostosDirectos *
	  rc.costoIndirecto)/ 100)+ ((rc.totalFinalCostosDirectos * rc.costoFinanciamento)/ 100)) *
	   (1/(1-((100/(100 -(10 + rc.plan.isr)))*(rc.plan.trema2/100))))

	   this.plan.totalFinalCostosDirectos = rc.totalFinalCostosDirectos;

	this.totalCosto = 0;
	this.totalFinalCostosDirectos = 0.00;
	this.costoTotalTotal = [];
	this.costoTotalPres = [];

  


  this.subscribe('planes',()=>{
		return [{obra_id : $stateParams.id,estatus:true}] 
  });
  this.subscribe('obra', () => {
  	return [{ _id : $stateParams.id, estatus : true}]
  });
  this.subscribe('GI',()=>{
		return [{obra_id : $stateParams.id,estatus:true}] 
  });
    this.subscribe('gastosOficina',()=>{
	 return [{estatus:true}] 
     });
   this.subscribe('costos',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
    this.subscribe('cobros',()=>{
	return [{estatus:true}] 
    });
    this.subscribe('meses',()=>{
	return [{estatus:true}] 
    });
    this.subscribe('conceptos',()=>{
	return [{obra_id : $stateParams.id,partida_id: this.getReactively('partida_id'),estatus:true}] 
    });
    this.subscribe('partidas',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
    this.subscribe('presupuestos',()=>{
	return [{obra_id: this.getReactively('obra_id'),estatus:true}] 
    });
       this.subscribe('presupuestosCosas',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
  });

    this.subscribe('pagosProveedores',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
  });

    this.subscribe('periodos',()=>{
	return [{estatus:true}] 
  });



  this.action = true;  
  this.nuevo = true;
  
 // console.log($stateParams);
  this.helpers({
	  planes : () => {
		  return Planes.find();
	  },
	   meses : () => {
		  return Meses.find();
	  },
	  cobros : () => {
		  return Cobros.find({obra_id : $stateParams.id});
	  },
	   todosCobros : () => {
		  return Cobros.find();
	  },
	  cobrosAbono : () => {
			return Cobros.find({cargo:"cargoAbono",modo:true});
		},
		cobrosParaCobrar : () => {
			return Cobros.find({modo:false,cargo:"cobroCargo"});
		},
	  cobrosPorCobrar : () => {
			return Cobros.find({obra_id : $stateParams.id,modo:true});
		},
	   gastosOficina : () => {
		  return GastosOficina.find();
	  },
	  todosOficinas : () => {
		  return GastosOficina.find();
	  },
	  conceptos : () => {
		  return Conceptos.find();
	  },
	   partidas : () => {
		  return Partidas.find();
	  },
	   presupuestos : () => {
		  return Presupuestos.find();
	  },
	  cosas : () => {
	  
	  	cargoAdicional = 0
	  	costoFinanciamento = 0
	  	costoIndirecto = 0
	  	 variable = PresupuestosCosas.find().fetch();
	  	 _.each(variable,function(cosa){

	  	cargoAdicional = cosa.cargoAdicional/100;
	  	costoFinanciamento = cosa.costoFinanciamento/100;
	  	costoIndirecto = cosa.costoIndirecto/100;


	  	 });
	 

	  	 		_.each(variable,function(cosa){

	  	rc.cargoAdicional = cosa.cargoAdicional;
	  	rc.costoFinanciamento = cosa.costoFinanciamento;
	  	rc.costoIndirecto = cosa.costoIndirecto;


	  	 });


	  	 		
	  	 		console.log("cosas",variable);


			return variable;
		},
	  obra : () => {
		  return Obras.findOne($stateParams.id);
	  },
	  obras : () => {
		  return Obras.find();
	  },
	  gi : ()=> {
		  return GI.find();
	  },
		pagosTodos : () => {
			return PagosProveedores.find();
		},
	  periodos : () => {
		  return Periodos.find({obra_id : $stateParams.id});
	  },
	  periodosTodos : () => {
		  return Periodos.find();
	  },
	  periodosPorObra : () => {
		  return Periodos.find({obra_id : $stateParams.id});
	  },

	  periodosCampo : () => {
	  	return Periodos.find({tipo : "gasto"});
	  },
	  periodosGasto : () => {
	  	return Periodos.find({tipo : "costo",obra_id : $stateParams.id});
	  },
	

	  gastos : () => {
		  return GastosOficina.find();
	  },

	 indirectosEmpresas : () => {
		var gastosIndirectoEmpresa = [];

		  	//GASTOS OFICINA;
		  	var totalGastosOficinas = 0;
		  	
		  	//var totalGastosCampo = 0;
		  	var gastosOF = GastosOficina.find().fetch();
		  	var plan_ingresos = 0;
		  	_.each(rc.getReactively("planes"),function(plan){
		  		 plan_ingresos = plan.ingresos;
 				_.each(rc.gastosOficina,function(gasto){
 					totalGastosOficinas += gasto.importeFijo + gasto.importeVar
 					gasto.gastoOficina = totalGastosOficinas;
	  		  });
 		  });

		  	var totalIngresos = 0;
		  	_.each(rc.getReactively("cobros"),function(cobro){
 						totalIngresos += cobro.cSinIva + cobro.cIva/1.16	
 					
 					});


 				var totalGastosCampo = 0;
 				var periodos = Periodos.find({tipo:"gasto"}).fetch();
 				_.each(periodos,function(campo){
 				  totalGastosCampo += campo.comprasSinIva + (campo.comprasIva / 1.16)
 				  + campo.contadoSinIva + (campo.contadoIva / 1.16)
 				 // campo.gastosCampo = parseInt(totalGastosCampo);
 				  
				});

         var finalDirectos = 0;
				_.each(rc.costosTotales, function(costoTotal){
					finalDirectos = costoTotal.finalesDirectos;
	   				})

				var indirecto = ((parseFloat(totalGastosCampo.toFixed(2))+ parseFloat(totalGastosOficinas.toFixed(2)))/parseFloat(totalIngresos.toFixed(2)))


			gastosIndirectoEmpresa.push({totalGastos : totalGastosOficinas, totalCobros : parseFloat(totalIngresos.toFixed(2)),
			 totalGastosCampo : totalGastosCampo, planIngresos : plan_ingresos,indirecto:parseFloat(indirecto.toFixed(4))*100});
 	  

               var cantidadesSumadas = plan_ingresos * ((totalGastosOficinas  + totalGastosCampo) / (totalIngresos));
               var oficinaMasCampo = (totalGastosOficinas  / (totalGastosOficinas + totalGastosCampo) * 100);
               var GastoIndiCampo = totalGastosCampo / (totalGastosOficinas + totalGastosCampo ) * 100;
               var oficinaCampoIngresos= ((totalGastosOficinas +  totalGastosCampo) / totalIngresos * 100);




              gastosIndirectoEmpresa.push({total : cantidadesSumadas, cantidades : parseFloat(oficinaCampoIngresos.toFixed(2))* finalDirectos /100    ,
              	GasIndiCampo : cantidadesSumadas * GastoIndiCampo/100, estadisticos :  cantidadesSumadas - (cantidadesSumadas * GastoIndiCampo/100)})



       console.log("gastos", gastosIndirectoEmpresa);
	//	console.log("final", final);

		return gastosIndirectoEmpresa;
	},

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////// ARREGLO DE GASTOS INDIRECTOS ////////////////////////////////////////////////////////////





	    indirectoMes2 : () => {
	  	var arreglin = [];
 		  var pago = 0;
 		   var ingresosMesTotales = 0
 		   // var totalIngresos=0;
 		   // var ingresosMes = 0


 		  _.each(rc.getReactively("obras"), function(obra){ 
 			 _.each(rc.getReactively("meses"), function(mes){ 
 			 	
				var totalGastoOficinaPorMes = 0;
				var totalPorObra = 0;
				var oficinas = GastosOficina.find({mes_id: mes._id,}).fetch(); 
 				_.each(oficinas, function(gasto){
 					totalGastoOficinaPorMes += gasto.importeFijo + gasto.importeVar;
 				});

 				var ingresosMes = 0
				var obr = Cobros.find({mes_id: mes._id,obra_id : obra._id,modo:true}).fetch();
 				_.each(obr,function(cobro){
				if(obra._id == cobro.obra_id && cobro.mes_id == mes._id)
				ingresosMes += cobro.cIva/1.16 + cobro.cSinIva
				})

                var ingresosMesTotales = 0
 				var cobros = Cobros.find({mes_id: mes._id,obra_id : obra._id,modo:true}).fetch();
 				_.each(cobros, function(ingresos){
 					
 					ingresosMesTotales += ingresos.cSinIva + ingresos.cIva/1.16; 
 				}); 

 				var cobrosM = Cobros.find({mes_id: mes._id}).fetch();
 				_.each(cobrosM, function(ingresos){

 					totalPorObra += ingresos.cSinIva + ingresos.cIva/1.16; 
 				});
 	
 				var gastosCampoObra = 0;
 				var periodisa = Periodos.find({obra_id : obra._id}).fetch();
 				_.each(periodisa, function(gc){
 					if (obra._id == gc.obra_id)
 					gastosCampoObra += gc.comprasSinIva + (gc.comprasIva / 1.16)
 				  + gc.contadoSinIva + (gc.contadoIva / 1.16)
 				});
 				var totalGastosCampo = 0;
 				var period = Periodos.find({mes_id : mes._id}).fetch();
 				_.each(period, function(campo){
 					totalGastosCampo += campo.comprasSinIva + (campo.comprasIva / 1.16)
 				  + campo.contadoSinIva + (campo.contadoIva / 1.16)
 				});

 				var totalIngresos=0;
					var cobros = Cobros.find({}).fetch();
					_.each(cobros,function(cobro){
						var obra_id=obra._id;
						//console.log( mes.mes, obra.nombre, cobro)
						if( mes._id == cobro.mes_id)
							totalIngresos += cobro.cIva/1.16 + cobro.cSinIva
					});

 				var porcentaje = ingresosMes / totalIngresos * 100;
 				var pago =  totalGastoOficinaPorMes * porcentaje/100

 				console.log(mes.mes,ingresosMes,totalIngresos)
 				


				arreglin.push({obra:obra.nombre,obra_id:obra._id,mes:mes.mes,gastosDeOficinaMes:totalGastoOficinaPorMes,ingresosMes:ingresosMesTotales, gastoDeCampo:gastosCampoObra,
				gastosCampoTotales:parseFloat(totalGastosCampo.toFixed(2)), ingresosObraMes:ingresosMes,porcentaje:parseFloat(porcentaje.toFixed(2)),pago:parseFloat(pago.toFixed(2)),
			    ingresisa:parseFloat(totalPorObra.toFixed(2)),ingresoTotal:parseFloat(totalIngresos.toFixed(2)) })

			    porcentaje = 0;
			    pago = 0;
					});
				
				});



            totalPago = {};
			_.each(arreglin, function(arreglo){
				
				//console.log("arreglo", arreglo);
				
				if("undefined" == typeof totalPago[arreglo.obra_id]){
					//console.log("if");
					totalPago[arreglo.obra_id] = {};

					if (arreglo.pago > 0) {
						totalPago[arreglo.obra_id].pago = arreglo.pago;
					}
					else{
						totalPago[arreglo.obra_id].pago = 0;
					}
					totalPago[arreglo.obra_id].obra_id = arreglo.obra_id;
					
				}else{
					if (arreglo.pago > 0) {
						//console.log("else")
						totalPago[arreglo.obra_id].pago += arreglo.pago;
					}
				}
				//console.log(totalPago);
			});
			//console.log("tatal pago", totalPago);
			//console.log("arreglo total", arreglin);
			_.each(arreglin, function(arreglo){
					if (isNaN(arreglo.porcentaje)) {
							arreglo.porcentaje = 0;
	 					}		

			});

			console.log(totalPago);
 			_.each(totalPago, function(pago){
 				_.each(arreglin, function(arreglo){

 					if (pago.obra_id == arreglo.obra_id) {
 						//if(arreglo.pagoEmpresa != undefined)
 							arreglo.pagoEmpresa = pago.pago
 						//else
 							//arreglo.pagoEmpresa = 0;
 						arreglo.indirecto = ((arreglo.pagoEmpresa + arreglo.gastoDeCampo) / arreglo.ingresoTotal) * 100;
 					}
 					if (arreglo.pagoEmpresa !=undefined) {

 					}else{
 						arreglo.pagoEmpresa = 0;
 					}

 				});
 			 });

 		_.each(arreglin, function(arreglo){
				if (isNaN(arreglo.pagoEmpresa)) {
						arreglo.pagoEmpresa = arreglo.pago;
 					}

			});
 			_.each(arreglin, function(arreglo){
				if (isNaN(arreglo.indirecto)) {
						arreglo.indirecto = ((arreglo.pagoEmpresa + arreglo.gastoDeCampo) / arreglo.ingresoTotal) * 100;
 					}

			});
            
 				console.log("calculo",arreglin);
 				return arreglin;
	  },




	  //////////////////////////////////////////////////////////////////////////////////////////

	  	  indirectoMes : () => {
	  	var arreglin = [];

	  		var meses = Meses.find().fetch();
 				
 				_.each(rc.obras, function(obra){ 
 					var totalPorObra = 0; 	
 					var totalGastosCampo = 0;
 					var gastosCampoObra = 0; 

 	
 				_.each(rc.getReactively("cobros"), function(ingresos){
 					
 					totalPorObra += ingresos.cSinIva + ingresos.cIva/1.16; 
 				});

 				//var per = Periodos.find({mes_id : mes._id,obra_id : obra_id, tipo : "gasto"}).fetch();
 				_.each(rc.getReactively("periodos"), function(campo){
 					totalGastosCampo += campo.comprasSinIva + (campo.comprasIva / 1.16)
 				  + campo.contadoSinIva + (campo.contadoIva / 1.16)
 				});

				var periodisa = Periodos.find({obra_id : obra._id}).fetch();
 				_.each(periodisa, function(gc){
 					if (obra._id == gc.obra_id)
 					gastosCampoObra += gc.comprasSinIva + (gc.comprasIva / 1.16)
 				  + gc.contadoSinIva + (gc.contadoIva / 1.16)
 				}); 				
 				var totalGastoOficinaPorMes = 0; 
 				_.each(rc.getReactively("gastosOficinas"), function(gasto){
 					totalGastoOficinaPorMes += gasto.importeFijo + gasto.importeVar;
 				});

				var obr = Cobros.find({mes_id: rc.getReactively('mes_id'),obra_id : obra._id,modo:true}).fetch();
 				var ingresosMes = 0;
 				_.each(obr,function(cobro){
				if(obra._id == cobro.obra_id)
				ingresosMes += cobro.cIva/1.16 + cobro.cSinIva
				});
				var totalIngresos=0;
					var cobros = Cobros.find().fetch();
					_.each(cobros,function(cobro){
						var obra_id=obra._id;
						
						if(obra_id == cobro.obra_id)
							totalIngresos += cobro.cIva/1.16 + cobro.cSinIva
					});
                var ingresoObras = 0;
				ingresoObras = parseFloat(ingresosMes.toFixed(2)) / parseFloat(totalPorObra.toFixed(2)) * 100 ;
				var importe = 0;
				importe = parseFloat(totalGastoOficinaPorMes.toFixed(2)) * parseFloat(ingresoObras.toFixed(2));
				var suma = 0;
				suma = parseFloat(importe.toFixed(2))/100 +  parseFloat(gastosCampoObra.toFixed(2));
				var indirecto=0;
				indirecto = parseFloat(suma.toFixed(2)) / parseFloat(totalIngresos.toFixed(2));

 				arreglin.push({obra_id:obra._id, obra: obra.nombre,  ingresosMensuales : parseFloat(totalPorObra.toFixed(2)), gastosCampo: parseFloat(totalGastosCampo.toFixed(2)),
 				 gastosCampoObra: parseFloat(gastosCampoObra.toFixed(2)), oficinas: parseFloat(totalGastoOficinaPorMes.toFixed(2)),  indirectoMensual: (parseFloat(totalGastosCampo.toFixed(2))+ totalGastoOficinaPorMes) / 
 				 parseFloat(totalPorObra.toFixed(2))*100, ingresoPorObra : parseFloat(ingresoObras.toFixed(2)),pagoPorObra: parseFloat(importe.toFixed(2))/100,
 				sumaDeGastos: parseFloat(suma.toFixed(2)), ingresisa:parseFloat(totalIngresos.toFixed(2)),indirectoPorcentaje : parseFloat(indirecto.toFixed(2))*100
 				,kaka:parseFloat(ingresosMes.toFixed(2))});
 				
 			}); 
 				 	_.each(rc.indirectoMes2, function(indi){
 						 _.each(arreglin, function(arreglo){
 						 	//console.log("indi", indi)
 				 		if (arreglo.obra_id == indi.obra_id) {
 				 			arreglo.ingresoTotal += indi.ingresoTotal;
 				 			arreglo.pago = indi.pago;
 				 			arreglo.pagoEmpresa = indi.pagoEmpresa
 				 			arreglo.gastoDeCampo = indi.gastoDeCampo;
 				 			arreglo.indirecto = (((arreglo.pagoEmpresa + arreglo.gastoDeCampo) / arreglo.ingresoTotal) * 100).toFixed(2)
 				 			
 				 			

 				 		}
 				 		
						if (isNaN(arreglo.indirecto)) {
							arreglo.indirecto = 0;
 					    }

 				 }); 
 				}); 

 				 var arregliZama = {};
 				_.each(rc.indirectoMes2, function(indi){
	   			//_.each(rc.getReactively("conceptos"), function(concepto){
	   				//_.each(arreglin, function(arreglo){
	   					var ingresoTotal = 0.00;
	   					//if(indi.obra_id == arreglo.obra_id ){

   							if("undefined" == typeof arregliZama[indi.obra]){
   								arregliZama[indi.obra] = {};	   								
   								arregliZama[indi.obra].ingresoTotal = indi.ingresosMes;
   								arregliZama[indi.obra].pagoEmpresa = indi.pagoEmpresa;
   								arregliZama[indi.obra].gastoDeCampo = indi.gastoDeCampo;
   								arregliZama[indi.obra].obra = indi.obra;

   							}else{
   								arregliZama[indi.obra].ingresoTotal += indi.ingresosMes;
   								arregliZama[indi.obra].gastoDeCampo += indi.gastoDeCampo;
   								if(indi.pagoEmpresa > 0){
   									arregliZama[indi.obra].pagoEmpresa = indi.pagoEmpresa;
   								}
   								
   							}
	   						
	   					//}
	   				//})
	   			});

	   			_.each(arregliZama, function(arreglo){
	   				 arreglo.indirecto = (((arreglo.pagoEmpresa + arreglo.gastoDeCampo) / arreglo.ingresoTotal) * 100).toFixed(2)
	   			})


		 	// if(obj.gastos != undefined){
				// 	//operación
				// }else{
				// 	obj.gastos = 0;
				// }
 		
            
 				console.log("el arreglin zama",arregliZama);
 				return arregliZama;
	  },


	  ///////////////////////////////////////////////////////////////////////////////////////////
	  ///////////////////////////////////////////////////////////////////////////////////////////
	  ///////////////////////////////ARREGLO////////////////////////////////////////////////////////////
	    jaime : () => {
		var obras = Obras.find().fetch();
		var ingresosTotalesPorObra = [];
		
 			_.each(obras, function(obra){ 				
 				var ingresos = 0; 
 				var totalCobro = 0;
 				var ingresosObras = Cobros.find({modo : false}).fetch(); 				
 				_.each(ingresosObras, function(ingresoObra){
 					ingresos += ingresoObra.cSinIva + ingresoObra.cIva/1.16;
 				});


                 
                 var per= Periodos.find({obra_id : obra._id, tipo : "costo"}).fetch();
 				_.each(per, function(cobro){
 					totalCobro += cobro.comprasSinIva + cobro.comprasIva
 				  + cobro.contadoSinIva + cobro.contadoIva;
 				});

 				var totalGastoOficinaPorMes = 0; 
 				_.each(rc.getReactively("gastosOficina"), function(gasto){
 					totalGastoOficinaPorMes += gasto.importeFijo + gasto.importeVar;
 				});

 				var totalIngresos=0;
					var cobros = Cobros.find({modo:"true",cargo:"cargoAbono"}).fetch();
					_.each(rc.getReactively("cobrosAbono"),function(cobro){
						var obra_id=obra._id;
						
						if(obra_id == cobro.obra_id)
							totalIngresos += cobro.cIva + cobro.cSinIva
					});

					var totalIngresos2=0;
					var cobros = Cobros.find({modo:"false",cargo:"cobroCargo"}).fetch();
					_.each(rc.getReactively("cobrosParaCobrar"),function(cobro){
						var obra_id=obra._id;
						
						if(obra_id == cobro.obra_id)
							totalIngresos2 += cobro.cIva + cobro.cSinIva
					});


						var totalCampo = 0;
						_.each(rc.getReactively("periodosCampo"),function(periodo){
							var obra_id=obra._id;
							if(obra_id == periodo.obra_id)
							totalCampo += (periodo.comprasIva / 1.16) + periodo.comprasSinIva
						 + (periodo.contadoIva / 1.16) + periodo.contadoSinIva
						});


					var x = 0;
					x= parseFloat(totalIngresos.toFixed(2)) / parseFloat(ingresos.toFixed(2));
					var y = 0;
					y = parseFloat(totalGastoOficinaPorMes.toFixed(2)) * parseFloat(x);
					var z = 0;
					z = parseFloat(totalCampo.toFixed(2)) + parseFloat(y.toFixed(2))


 				
 				ingresosTotalesPorObra.push({ obra_id : obra._id, obra_nombre : obra.nombre,oficinas:parseFloat(totalGastoOficinaPorMes.toFixed(2)), total : parseFloat(ingresos.toFixed(2))
 					,costo: parseFloat(totalCobro.toFixed(2)),ingresosObra:parseFloat(totalIngresos.toFixed(2)),
 					calculo:parseFloat(x), gasto:parseFloat(y.toFixed(2)),campo:parseFloat(totalCampo.toFixed(2)),
 					gastosEstado:parseFloat(x.toFixed(2)),ingresosObraCargo:parseFloat(totalIngresos2.toFixed(2)) });
 			});


 		console.log("probando", ingresosTotalesPorObra);
 		//console.log("resultado", ingresosPorObraConPorcentaje);
 		return ingresosTotalesPorObra; 
	},

	 costosTotales2 : () => {	
	        //var presupuestosPartidas = Presupuestos.find({partida_id : rc.getReactively("partida_id")});
			//var conceptos = Conceptos.find().fetch();
			//var planes = Planes.find().fetch();
			var costosTotales = {};
			var partidas = Partidas.find().fetch();

	   		_.each(rc.getReactively("partidas"), function(partida){
	   			//_.each(rc.getReactively("conceptos"), function(concepto){
	   				_.each(rc.getReactively("presupuestos"), function(presupuesto){
	   					var totalFinal = 0.00;
	   					if(presupuesto.partida_id == partida._id ){
	   						_.each(presupuesto.costos, function(costoPresupuesto){
	   							if("undefined" == typeof costosTotales[partida.nombre + " - " + costoPresupuesto.nombre]){
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre] = {};
	   								//costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].value = costoPresupuesto.value;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].cantidad = presupuesto.cantidad;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].partida = partida.nombre;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].partida_id = partida._id;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].costo_id =  costoPresupuesto._id;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].costo =  costoPresupuesto.nombre;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].total = costoPresupuesto.value * presupuesto.cantidad;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].direct = costoPresupuesto.value * presupuesto.cantidad;
	   								
	   							}else{
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].total += costoPresupuesto.value * presupuesto.cantidad;
	   							}
	   						});
	   					}
	   				})
	   			//})
	   		});
	   
	   		var costosTotalesArreglos2 = _.toArray(costosTotales);
	   		//var totalPer=0.00;
	   	
	   		_.each(rc.getReactively("planes"), function(plan){
	   			//console.log("este es el plan",plan);
	   			_.each(plan.costos, function(costosPlan){
	   				//console.log("costos plan",costosPlan);
	   				_.each(costosTotalesArreglos2, function(costoReal){
	   				//	console.log("costos reales",costoReal);

	   					if(costoReal.costo_id == costosPlan._id){
	   						costoReal.factor = costosPlan.factor;
	   						//console.log("costos de if",costoReal);
	   					}
	   					//console.log(costoReal);
	   				});
	   			});
	   		});
	   		var costosPeriodos = Periodos.find({tipo:"costo"}).fetch();
   			_.each(costosPeriodos, function(costoPeriodo){
			  	_.each(costosTotalesArreglos2, function(kaka){
		  			var totalPer=0.00;
		  			var directoReales = 0.00;
		  			if (kaka.costo_id == costoPeriodo.costo_id && kaka.partida_id == costoPeriodo.partida_id){
		  				totalPer += costoPeriodo.comprasSinIva + (costoPeriodo.comprasIva / 1.16) + costoPeriodo.contadoSinIva + (costoPeriodo.contadoIva / 1.16)
		  				kaka.periodo = totalPer;
		  				directoReales += kaka.periodo;
		  				kaka.directoReal = directoReales;
		  			}else{
		  			  if(kaka.periodo == undefined)
		  			  	kaka.periodo = 0.00;
		  			}
		  		});	
		  	});
	   		//console.log("esto tengo", costosTotalesArreglos);
	   		var costosDirectosTotales = {};
	   		
	   		//console.log();
	   		var zamaPresupuesto = 0.00;
	   		_.each(costosTotalesArreglos2, function(costoTotal){
	   			//console.log("entré") 
	   			var totalPresupuestos = 0.00;

	   			
	   			if("undefined" == typeof costosDirectosTotales[costoTotal.partida]){
	   			//	console.log("entré acá");
	   				costosDirectosTotales[costoTotal.partida] = {};

	   				costosDirectosTotales[costoTotal.partida].partida = costoTotal.partida;
	   				costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad;
	   				costosDirectosTotales[costoTotal.partida].factor = costoTotal.factor;
	   				 costosDirectosTotales[costoTotal.partida].real = costoTotal.periodo;
	   				 costosDirectosTotales[costoTotal.partida].ajustePresu = (costoTotal.total * costoTotal.factor)/100;
	   				 costosDirectosTotales[costoTotal.partida].ajuste = costoTotal.total - costosDirectosTotales[costoTotal.partida].ajustePresu;
	   				costosDirectosTotales[costoTotal.partida].costos = [];
	   				costosDirectosTotales[costoTotal.partida].costos.push({
	   					costo_id : costoTotal.costo_id,
	   					costo : costoTotal.costo,
	   					presupuesto : costoTotal.total,
	   					partida : costoTotal.partida,
	   					factor : costoTotal.factor,
	   					realPeriodo : costosDirectosTotales[costoTotal.partida].real,
	   					ajuste : costosDirectosTotales[costoTotal.partida].ajuste,
	   					diferencia : costoTotal.total - costosDirectosTotales[costoTotal.partida].real,
	   					value :  costosDirectosTotales[costoTotal.partida].value = costoTotal.direct,
	   					cantidad : costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad,
	   				});
	   				zamaPresupuesto += costoTotal.total;
	   			}else{
	   			    costosDirectosTotales[costoTotal.partida].partida = costoTotal.partida;
	   			    costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad;
	   			    costosDirectosTotales[costoTotal.partida].factor = costoTotal.factor;
	   			     costosDirectosTotales[costoTotal.partida].real = costoTotal.periodo;
	   			     costosDirectosTotales[costoTotal.partida].ajustePresu = (costoTotal.total * costoTotal.factor)/100;
	   				 costosDirectosTotales[costoTotal.partida].ajuste = costoTotal.total - costosDirectosTotales[costoTotal.partida].ajustePresu;
	   		
	   				
	   				totalPresupuestos += costoTotal.total; 
	   				costosDirectosTotales[costoTotal.partida].costos.push({
	   					costo_id : costoTotal.costo_id,
	   					costo : costoTotal.costo,
	   					presupuesto : costoTotal.total,
	   					partida : costoTotal.partida,
	   					factor : costoTotal.factor,
	   					realPeriodo : costosDirectosTotales[costoTotal.partida].real,
	   					ajuste : costosDirectosTotales[costoTotal.partida].ajuste,
	   					diferencia : costoTotal.total - costosDirectosTotales[costoTotal.partida].real,
	   					value :  costosDirectosTotales[costoTotal.partida].value = costoTotal.direct,
	   					cantidad : costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad,

	   					
	   				});
	   				zamaPresupuesto += costoTotal.total;
	   			}

	   		});
	 

var totalP = 0.00;
			

	   				_.each(rc.getReactively("presupuestos"), function(presupuesto){

	   					_.each(presupuesto.costos, function(costo){
	   						costo.direct = costo.value * presupuesto.cantidad;

	
	   						_.each(costosDirectosTotales, function(costoTotal){
	   							totalP += costo.value;
	   							costoTotal.directo = totalP;



	   						});
	   					});
	   				});
	   				var totalSuma = 0.00;

 					_.each(rc.getReactively("cosas"), function(cosa){
		   				_.each(rc.getReactively("presupuestos"), function(presupuesto){

		   					_.each(presupuesto.costos, function(costo){
		   						totalSuma += costo.direct;
		   						//costo.directSumados = totalSuma;

		
		   						
		   					});
		   					presupuesto.totalOtro = totalSuma;
		   					presupuesto.costoIndi = (presupuesto.totalOtro * cosa.costoIndirecto) / 100;
		   					presupuesto.financiamiento = (presupuesto.totalOtro + presupuesto.costoIndi) * cosa.costoFinanciamento / 100;
		   					presupuesto.utilidad = (presupuesto.totalOtro + presupuesto.costoIndi + presupuesto.financiamiento) * cosa.cargoUtilidad / 100;
		   					presupuesto.adicional = (presupuesto.totalOtro + presupuesto.costoIndi + presupuesto.financiamiento + presupuesto.utilidad) * cosa.cargoAdicional / 100;
		   					presupuesto.precioUnitario = (presupuesto.totalOtro + presupuesto.costoIndi + presupuesto.financiamiento + presupuesto.utilidad + presupuesto.adicional);
		   					totalSuma = 0.00;
		   				});
	   			});



 			_.each(partidas, function(partida){
 				 rc.totalPrecioUnitario = 0.00;
 				_.each(rc.getReactively("presupuestos"), function(presupuesto){
		   					
		   				   rc.totalPrecioUnitario += presupuesto.precioUnitario
		   				   
		   				   
		 	      	});

	   			});
 				console.log("DOS",_.toArray(costosDirectosTotales));
	   		return costosDirectosTotales;
		},

		///////////////////////////////////////////////////////////////////////////////////////////////
		////////////////////////////////////////////////////////////////////////////////////

	 		costosTotales : () => {
			var costosTotales = {};
			var partidas = Partidas.find().fetch();
			var obras = Obras.find().fetch();
			var presupuestos = Presupuestos.find().fetch();
			var conceptos = Conceptos.find().fetch();
			var planes = Planes.find().fetch();
		   		_.each(rc.getReactively("partidas"), function(partida){
		   			_.each(rc.getReactively("conceptos"), function(concepto){
		   				_.each(rc.getReactively("presupuestos"), function(presupuesto){
		   					var totalFinal = 0.00;
		   					if(presupuesto.partida_id == partida._id && presupuesto.concepto_id == concepto._id){
		   						_.each(presupuesto.costos, function(costoPresupuesto){
		   							if("undefined" == typeof costosTotales[costoPresupuesto.nombre]){
		   								costosTotales[costoPresupuesto.nombre] = {};
		   								costosTotales[costoPresupuesto.nombre].partida = partida.nombre;
		   								costosTotales[costoPresupuesto.nombre].costo_id =  costoPresupuesto._id;
		   								costosTotales[costoPresupuesto.nombre].costo =  costoPresupuesto.nombre;
		   								costosTotales[costoPresupuesto.nombre].total = costoPresupuesto.value * presupuesto.cantidad;
		   								
		   							}else{
		   								costosTotales[costoPresupuesto.nombre].total += costoPresupuesto.value * presupuesto.cantidad;
		   								
		   							};
		   							
		   						});
		   					};

		   				});
		   			});
		   		});
	   		var costosTotalesArreglos = _.toArray(costosTotales);
	   		var totalCosto = 0;
	   		var factorPlan = 0;
	   		var totalPresupuestoTotal  = 0;
	   		this.totalFinalCostosDirectos = 0.00;
	   		_.each(rc.getReactively("planes"), function(plan){
	   			//console.log("entro al plan",plan);
	   			_.each(plan.costos, function(costosPlan){
	   				//console.log("entro papa",costosPlan);
	   				_.each(costosTotalesArreglos, function(costoTotal){
	   					//console.log("entro al arreglo",costoTotal);
	   					if(costoTotal.costo_id == costosPlan._id)
	   					{
	   						costoTotal.factor = costosPlan.factor;
	   						costoTotal.presupuestoTotal = (costoTotal.total) - ((costoTotal.total * costosPlan.factor)/100);

	   						//console.log("entro final", costoTotal);
	   					}
	   				})
	   			})
	   		})
	   		_.each(costosTotalesArreglos, function(costoTotal){
	   			rc.totalFinalCostosDirectos += costoTotal.total;
	   			costoTotal.finalesDirectos = rc.totalFinalCostosDirectos;
	   			costoTotal.totalDePorcentaje = costoTotal.total / costoTotal.finalesDirectos * 100;
	   			totalPresupuestoTotal += costoTotal.presupuestoTotal;
	   			costoTotal.totalPresupuestos += totalPresupuestoTotal;
	   		});

totalPresupuestoTotal = 0.00;
	   		_.each(costosTotalesArreglos, function(costoTotal){
	   					//console.log("entro al arreglo",costoTotal);
	   					//if(costoTotal.costo_id == costosPlan._id)
	   					//{
	   						totalPresupuestoTotal += costoTotal.presupuestoTotal
	   						costoTotal.totalpreFinal =  totalPresupuestoTotal

	   						//console.log("entro final", costoTotal);
	   					//}
	   				})


	   		_.each(rc.presupuestosCosas, function(cosas){
	   					
	   				})


// rc.costosTotales[rc.costosTotales.length - 1].totalpre
	   		rc.costoTotalTotal = costosTotalesArreglos[0]
	   		
	   		costosTotalesArreglos.push({final : totalCosto, totalpre: totalPresupuestoTotal});
	   		rc.costoTotalPres = costosTotalesArreglos[costosTotalesArreglos.length - 1].totalpre
	   		//console.log("arreglo",costosTotalesArreglos);
	   		console.log("arreglo",_.toArray(costosTotalesArreglos));
	   		return costosTotales;
		},


///////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////)



	  
	  costos : () => {
	  // 	var cost = Costos.find().fetch();
			// for (var i = 0; i < cost.length; i++) {
			// 	if(!cost[i].factor)
			// 		cost[i].factor=0;
			// }
			// return cost;

  	    var costos = Costos.find().fetch();
  	    for (var i = 0; i < costos.length; i++) {
				if(!costos[i].factor)
					costos[i].factor=0;
			}
  		  // _.each(costos,function(costo){
    		// rc.plan.costos.push({_id : costo._id, nombre : costo.nombre, factor : 0});
    		// //costo.presupuesto = costo.valor * costo.factor - costo.valor;
   		 // });
  	   //  console.log("costos", costos);
  	   //  console.log("plan costos",rc.plan);
  	    return costos;
		 
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


	  totalIngresos :  () => {
	  	var ingresos = [];

 				var totalIngresos = 0;
 				var cobros = Cobros.find().fetch();
 				_.each(cobros,function(cobro){
 					totalIngresos += cobro.cSinIva || cobro.cIva;
 					cobro.ingresos = parseInt(totalIngresos);
 				});
 				ingresos.push({total : totalIngresos })
 				//
 				//console.log(ingresos);
 				return  ingresos;
	  },





	  //////////////////////////////////////////  GASTOS DE OFICINA /////////////////////////////////////////////////
	  
	




	//////////////////////////////////////////////////////////////////////////////////////////////////////////

  });
 
  this.nuevoPlan = function()
  {
	  this.action = true;
    this.nuevo = !this.nuevo;
    //this.plan = {};

};

  
 this.guardar = function(costos)
	{

		console.log(costos);
		this.plan.totalFinalCostosDirectos = rc.totalFinalCostosDirectos;
		   rc.plan.estatus = true;
		   rc.plan.obra_id = $stateParams.id;
		   rc.plan.fechaCreacion = new Date();
	   _.each(costos, function(costo){
		 	delete costo.$$hashKey;
		 });
	   rc.plan.costos = costos;
		console.log("objeto insertado en plan", rc.plan);
		Planes.insert(rc.plan);		

		toastr.success('Plan guardado.')
		this.costo = {};
		this.plan = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		
	};

	this.guardarPresupuesto = function(costos)
	{
		console.log(costos);	 
		//this.presupuesto.costo.value = 0.00;
		this.presupuesto.estatus = true;
		this.presupuesto.obra_id = this.obra_id;
		this.presupuesto.mes_id = this.mes_id;
		this.presupuesto.partida_id = this.partida_id;
		//this.presupuesto.concepto_id = $stateParams.id;
		_.each(costos, function(costo){
			delete costo.$$hashKey;
		});
		this.presupuesto.costos = costos;
		console.log(this.presupuesto);
		Presupuestos.insert(this.presupuesto);
		toastr.success('presupuesto Agregado.');
		this.presupuesto = {};
		this.costo = {};
		this.presupuesto.costo = {};
		this.presupuesto.cantidad = 0.00;
	};
	
	
	this.editar = function(id)
	{
		this.plan = Planes.findOne({_id:id});
	    this.action = false;
	    $('.collapse').collapse('show');
	    this.nuevo = false;
		
		//_.each(rc.costosTotales, function(costo){
			//rc.totalPor = costo.valor / rc.totalCosto ;
		//});
		//console.log("arreglo", rc.costosTotales)
	};	
	
	this.actualizar = function(plan,costos)
	{
		console.log(costos);
		this.plan.totalFinalCostosDirectos = rc.totalFinalCostosDirectos;
		rc.plan.costos = costos;
		var idTemp = plan._id;
		delete plan._id;
		_.each(rc.plan.costos, function(costo){
			delete costo.$$hashKey;
		});		
		Planes.update({_id:idTemp},{$set:plan});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		console.log(rc.plan);
	};
this.actCam = true;
	this.actualizarCambios = function(plan,costos,id)
	{
		console.log(costos);
		rc.plan.costos = costos;
		var idTemp = plan._id;
		delete plan._id;
		_.each(rc.plan.costos, function(costo){
			delete costo.$$hashKey;
		});		
		Planes.update({_id:idTemp},{$set:plan});
		this.plan = Planes.findOne({_id:id});
	
		console.log(rc.plan);
	};

	this.editarCambios = function(id)
	{
		this.plan = Planes.findOne({_id:id});
		this.editCam = false;
		this.actCam = true;
	   
		
		//_.each(rc.costosTotales, function(costo){
			//rc.totalPor = costo.valor / rc.totalCosto ;
		//});
		//console.log("arreglo", rc.costosTotales)
	};	
		
	this.cambiarEstatus = function(id)
	{
		var plan = Planes.findOne({_id:id});
		if(plan.estatus == true)
			plan.estatus = false;
		else
			plan.estatus = true;
		
		Planes.update({_id:id}, {$set : {estatus : plan.estatus}});
		};

// Funciones de precio proyecto                                                 
                           													
// 		

			this.TotalFinalGO = function()
			{
				total = 0;
				_.each(this.gastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
				return total
			}

			$(document).ready(function(){
  			  $('[data-toggle="popover"]').popover();
		});

			    this.getConcepto= function(concepto_id)
	{
		var concepto = Conceptos.findOne(concepto_id);
		if(concepto)
		return concepto.nombre;
	};

	this.gastosMasCostos = function()
	{
		total = 0;
		var periodos = Periodos.find().fetch();
		_.each(rc.getReactively("periodosPorObra"),function(periodo)
		  {total += periodo.contadoIva + periodo.contadoSinIva});
			//console.log(total);
		return total
	};
	this.gastosMasCostosTotales = function()
	{
		total = 0;
		_.each(rc.getReactively("periodos"),function(periodo)
		  {total += (periodo.comprasIva) + periodo.comprasSinIva});
		return total
	};

this.cobrosTotales = function()
	{
		total = 0;
		var cobros = Cobros.find({cargo:"cobroCargo"}).fetch;
		_.each(rc.getReactively("cobrosPorCobrar"),function(cobro)
		  {total += cobro.cIva + cobro.cSinIva});
		rc.abono = total

		
		return total
	};

	
	this.cobrosPorCobrarTotales = function()
	{
		total = 0;
		var cobros = Cobros.find({cargo:"cobroCargo"}).fetch;
		_.each(rc.getReactively("cobrosParaCobrar"),function(cobro)
		  {total += cobro.cIva + cobro.cSinIva});
		rc.cargo = total
//console.log(total)
		return total
	};
	this.pagosProveedoresTotales = function()
	{
		total = 0;
		_.each(rc.getReactively("pagosTodos"),function(pago)
		  {total += pago.pIva + pago.pSinIva});
			//console.log(total);
		return total
	};


	this.todosGastosOficinas = function(){
		total = 0;
		oficinas = GastosOficina.find().fetch()
		_.each(oficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		//console.log(total)
		return total
	};
	this.camposTotales2=function(){
		var totalCobros=0;
			var periodos = Periodos.find({tipo:"gasto"}).fetch();
			_.each(periodos,function(periodo){
			
					totalCobros += (periodo.comprasIva) + periodo.comprasSinIva
				 			+ (periodo.contadoIva) + periodo.contadoSinIva
			})

	

		//console.log(totalCobros)
		return totalCobros
	};

	this.camposTotales3=function(){
		var totalCobros=0;
		
			_.each(rc.getReactively("obras"),function(obra){
					var periodos = Periodos.find({tipo:"costo",estatus:true,obra_id:obra._id}).fetch();
			_.each(rc.getReactively("periodosGasto"),function(periodo){
				if (periodo.obra_id == obra._id) 
			
					totalCobros += ((periodo.comprasIva + periodo.contadoIva)/1.16) + (periodo.comprasSinIva
				 			+ periodo.contadoSinIva)
			});
		});

	//console.log(totalCobros)

		//console.log(totalCobros)
		return totalCobros
	};

		this.gastosCampo=function(){
		var totalCobros=0;
		
			_.each(rc.getReactively("obras"),function(obra){
					var periodos = Periodos.find({tipo:"gasto",estatus:true,obra_id:obra._id}).fetch();
			_.each(rc.getReactively("periodosCampo"),function(periodo){
				if (periodo.obra_id == obra._id) 
			
					totalCobros += ((periodo.comprasIva + periodo.contadoIva)/1.16) + (periodo.comprasSinIva
				 			+ periodo.contadoSinIva)
			});
		});

	//console.log(totalCobros)

		//console.log(totalCobros)
		return totalCobros
	};

	this.ingresosTotales2=function(){
		var totalIngresos=0;
		var obras = Obras.find().fetch()
			var cobros = Cobros.find({modo:true ,}).fetch();
			_.each(cobros,function(cobro){
					totalIngresos += cobro.cIva + cobro.cSinIva
			})
		//console.log(totalIngresos)
		return totalIngresos
 	};

 	this.abonos=function(){
		var totalIngresos=0;
		var obras = Obras.findOne({obra_id : $stateParams.id})
			var cobros = Cobros.find({modo:true , cargo:"cargoAbono",obra_id : $stateParams.id}).fetch();
	
			_.each(cobros,function(cobro){
				
					totalIngresos += cobro.cIva + cobro.cSinIva
			
			});
		//console.log(totalIngresos)
		return totalIngresos
 	};

 		this.cargosObra=function(){
		var totalIngresos=0;
		var obras = Obras.findOne({obra_id : $stateParams.id})
			var cobros = Cobros.find({modo:false , cargo:"cobroCargo",obra_id : $stateParams.id}).fetch();
	
			_.each(cobros,function(cobro){
				
					totalIngresos += cobro.cIva + cobro.cSinIva
			
			});
		//console.log(totalIngresos)
		return totalIngresos
 	};

		

		

};