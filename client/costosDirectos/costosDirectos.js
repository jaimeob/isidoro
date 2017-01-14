angular.module("formulas")
.controller("CostosDirectosCrtl", CostosDirectosCrtl);  
function CostosDirectosCrtl($scope, $meteor, $reactive, $state, $stateParams, toastr){
let rc = $reactive(this).attach($scope);
Array.prototype.diff = function(a) {
		return this.filter(function(i) {return a.indexOf(i)<0;});
	};
window.rc = rc;
//this.tipoPeriodo = 'costo';
//this.tipo = "gasto";

	this.subscribe('CostosDirectos',()=>{
	return [{estatus:true}] 
    });
    this.subscribe('partidas',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
    this.subscribe('costos',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
     this.subscribe('periodos',()=>{
	return [{estatus:true,usuario_id:Meteor.userId()}] 
    });
     this.subscribe('presupuestos',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
       this.subscribe('conceptos',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
      this.subscribe('planes',()=>{
	return [{obra_id : $stateParams.id,estatus:true}] 
    });
    this.subscribe('obra', () => {
    return [{ _id : $stateParams.id,empresa_id : Meteor.user() != undefined ? Meteor.user().profile.empresa_id : undefined,
     estatus : true}]});

    this.subscribe('presupuestosCosas',()=>{
	return [{estatus:true,usuario_id:Meteor.userId()}] 
    });
       this.subscribe('gastosOficina',()=>{
	 return [{estatus:true,usuario_id:Meteor.userId()}] 
     });
    this.subscribe('pagosProveedores',()=>{
	return [{estatus:true,usuario_id:Meteor.userId()}] 
     });
    this.subscribe('cobros',()=>{
	return [{estatus:true,modo:true,usuario_id:Meteor.userId()}] 
    });
    
    	this.subscribe('meses',()=>{
		return [{estatus:true,usuarioMes: Meteor.userId()}]
	});
    this.subscribe('users',()=>{
	return Meteor.users.findOne[{ _id: Meteor.userId() }];
    });


  this.action = true;
  
	this.helpers({
	  costosDirectos : () => {
		  return CostosDirectos.find();
	  },
	   gastosOficinas : () => {
		  return GastosOficina.find({mes_id: this.getReactively('mes_id')});
	  },
	  partidas : () => {
		  return Partidas.find();
	  },
	  meses : () => {
		  return Meses.find();
	  },
	   costos : () => {
	   var strings = [];
	   var costos = Costos.find().fetch();
	   _.each(costos, function(costo){
	   	costo.nombre = costo.nombre;
	

	 strings.push({   _id : costo._id,
	 					nombre: costo.nombre,
	   					presupuestoString : "Presupuesto",
	   					ajusteString: "Ajuste",
	   					realString: "Real",
	   					diferenciaString:"Diferencia"});
	   });
	  

	   // console.log("costisa", strings);
		  return strings;
		  
	  },
	   periodos : () => {
		  return Periodos.find({obra_id : $stateParams.id,});
	  },
	  periodosCampo : () => {
	  	return Periodos.find({tipo : "gasto",obra_id : $stateParams.id})
	  },
	   periodosCostos : () => {
	   	periodos = Periodos.find({tipo : "costo",obra_id : $stateParams.id})

	   	// _.each(periodos, function(periodo){
	   	// 	if (periodo.mes_id == undefined) {
	   	// 		periodo = undefined
	   	// 	}
	   	// }); 




	  	return periodos
	  },
	   planes : () => {
		  return Planes.find();                        
	  },
	  conceptos : () => {
		  return Conceptos.find();
	  },
	  cosas : () => {
			return PresupuestosCosas.find({obra_id : $stateParams.id,});
		},
	   cobros : () => {
			return Cobros.find();
		},
		cobrosValor : () => {
		  return Cobros.find({mes_id: this.getReactively('mes_id'),tipo:"valor"});
	  },
	  obra : () => {
		  return Obras.findOne($stateParams.id);
		},
		obras : () => {
		  return Obras.find();
		},
		

	  presupuestos : () => {
		  return Presupuestos.find().fetch();
	  },
		    indirectoMes2 : () => {
	  	var arreglin = [];
 		  var pago = 0;
 		   var ingresosMesTotales = 0
 		   // var totalIngresos=0;
 		   // var ingresosMes = 0

 		  _.each(rc.getReactively("obras"), function(obra){ 
 		  	 //console.log("entra") 
 			 _.each(rc.getReactively("meses"), function(mes){
 			// console.log("entra meses") 
 			 	
				var totalGastoOficinaPorMes = 0;
				var totalPorObra = 0;
				var oficinas = GastosOficina.find({mes_id: mes._id,}).fetch(); 
 				_.each(oficinas, function(gasto){
 					totalGastoOficinaPorMes += gasto.importeFijo + gasto.importeVar;
 				});

 				var ingresosMes = 0
				var obr = Cobros.find({mes_id: mes._id,obra_id : obra._id,tipo:"valor"}).fetch();
 				_.each(obr,function(cobro){
				if(obra._id == cobro.obra_id && cobro.mes_id == mes._id)
				ingresosMes += cobro.importeCobro
				})

                var ingresosMesTotales = 0
 				var cobros = Cobros.find({mes_id: mes._id,obra_id : obra._id,tipo:"valor"}).fetch();
 				_.each(cobros, function(ingresos){
 					
 					ingresosMesTotales += ingresos.importeCobro; 
 				}); 

 				var cobrosM = Cobros.find({mes_id: mes._id,tipo:"valor"}).fetch();
 				_.each(cobrosM, function(ingresos){

 					totalPorObra += ingresos.importeCobro; 
 				});
 	
 				var gastosCampoObra = 0;
 				var periodisa = Periodos.find({obra_id : obra._id,tipo:"gasto"}).fetch();
 				_.each(periodisa, function(gc){
 					if (obra._id == gc.obra_id)
 					gastosCampoObra += gc.comprasSinIva + (gc.comprasIva / 1.16)
 				  + gc.contadoSinIva + (gc.contadoIva / 1.16)
 				});
 				var totalGastosCampo = 0;
 				var period = Periodos.find({mes_id : mes._id,tipo:"gasto"}).fetch();
 				_.each(period, function(campo){
 					totalGastosCampo += campo.comprasSinIva + (campo.comprasIva / 1.16)
 				  + campo.contadoSinIva + (campo.contadoIva / 1.16)
 				});

 				var totalIngresos=0;
					var cobros = Cobros.find({tipo:"valor"}).fetch();
					_.each(cobros,function(cobro){
						var obra_id=obra._id;
						//console.log( mes.mes, obra.nombre, cobro)
						if( mes._id == cobro.mes_id)
							totalIngresos += cobro.importeCobro
					});

 				var porcentaje = ingresosMes / totalIngresos * 100;
 				var pago =  totalGastoOficinaPorMes * porcentaje/100

 				//console.log(mes.mes,ingresosMes,totalIngresos)
 				


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
				//	console.log("if");
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
				// if (arreglo.pago !=undefined) {

 			// 		}else{
 			// 			arreglo.pago = 0;
 			// 		}
			});
			//console.log("tatal pago", totalPago);
		//	console.log("arreglo total", arreglin);

			_.each(arreglin, function(arreglo){
					if (isNaN(arreglo.porcentaje)) {
							arreglo.porcentaje = 0;
	 					}
	 						
	 					

			});

			_.each(arreglin, function(arreglo){
				if (isNaN(arreglo.pago)) {
						arreglo.pago = 0;
 					}

			});
			//console.log("totalPago", totalPago);
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	  indirectoMes : () => {
	  	var arreglin = [];

	  		var meses = Meses.find().fetch();
 				
 				_.each(rc.obras, function(obra){ 
 					var totalPorObra = 0; 	
 					var totalGastosCampo = 0;
 					var gastosCampoObra = 0; 

 	
 				_.each(rc.getReactively("cobrosValor"), function(ingresos){
 					
 					totalPorObra += ingresos.importeCobro
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

				var obr = Cobros.find({mes_id: rc.getReactively('mes_id'),obra_id : obra._id,tipo:"valor"}).fetch();
 				var ingresosMes = 0;
 				_.each(obr,function(cobro){
				if(obra._id == cobro.obra_id)
				ingresosMes += cobro.importeCobro
				});
				var totalIngresos=0;
					var cobros = Cobros.find({tipo:"valor"}).fetch();
					_.each(cobros,function(cobro){
						var obra_id=obra._id;
						
						if(obra_id == cobro.obra_id)
							totalIngresos += cobro.importeCobro
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
 				 	_.each(rc.getReactively("indirectoMes2"), function(indi){
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
   								arregliZama[indi.obra].gastoDeCampo = indi.gastoDeCampo;
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
	  

	 ////////////////////////////////////  ARREGLO MAS GDRANDE  ///////////////////////////////////////////////
	 ////////////////////////////////////////////////////////////////////////////////////////////////////////////



	  costosTotales : () => {	
	        //var presupuestosPartidas = Presupuestos.find({partida_id : rc.getReactively("partida_id")});
			var costosTotales = {};
			var partidas = Partidas.find().fetch();

	   		_.each(rc.getReactively("partidas"), function(partida){
	   			//_.each(rc.getReactively("conceptos"), function(concepto){
	   				_.each(rc.getReactively("presupuestos"), function(presupuesto){
	   					var totalFinal = 0.00;
	   					if(presupuesto.partida_id == partida._id ){
	   						_.each(presupuesto.costos, function(costoPresupuesto){

	   							var costoNombre = "";
	   							_.each(rc.costos, function(c){
	   								if(c._id == costoPresupuesto._id){
	   									costoNombre = c.nombre;
	   								}
	   							})

	   							if("undefined" == typeof costosTotales[partida.nombre + " - " + costoNombre]){
	   								costosTotales[partida.nombre + " - " + costoNombre] = {};	  
	   								costosTotales[partida.nombre + " - " + costoNombre].cantidad = presupuesto.cantidad;
	   								costosTotales[partida.nombre + " - " + costoNombre].partida = partida.nombre;
	   								costosTotales[partida.nombre + " - " + costoNombre].partida_id = partida._id;
	   								costosTotales[partida.nombre + " - " + costoNombre].costo_id =  costoPresupuesto._id;
	   								costosTotales[partida.nombre + " - " + costoNombre].costo =  costoNombre;
	   								costosTotales[partida.nombre + " - " + costoNombre].total = costoPresupuesto.value * presupuesto.cantidad;
	   								costosTotales[partida.nombre + " - " + costoNombre].direct = costoPresupuesto.value * presupuesto.cantidad;
	   								costosTotales[partida.nombre + " - " + costoNombre].precioUnitario = costoPresupuesto.precioUnitario;
	   								
	   							}else{
	   								costosTotales[partida.nombre + " - " + costoNombre].total += costoPresupuesto.value * presupuesto.cantidad;
	   							}

	   						});
	   					}
	   				});
	   		});

	   	

 	
   
	 ////////////////////////////////////////////////////////////////////////////////////////////////////
	 ////////////////////////////////////////////////////////////////////////////////////////////////////
	   

var costosTotalesArreglos = _.toArray(costosTotales);
	   		// console.log("arreglo pvara periodos",periodosCostosTotales);






	   		//var totalPer=0.00;
	   		_.each(rc.getReactively("planes"), function(plan){
	   			//console.log("este es el plan",plan);
	   			_.each(plan.costos, function(costosPlan){
	   				//console.log("costos plan",costosPlan);
	   				_.each(costosTotalesArreglos, function(costoReal){
	   				//	console.log("costos reales",costoReal);

	   					if(costoReal.costo_id == costosPlan._id){
	   						costoReal.factor = costosPlan.factor;
	   						//console.log("costos de if",costoReal);
	   					}
	   					//console.log(costoReal);
	   				});
	   			});
	   		});

	   		////////////////////////////////////////////////////////////////////////////////////////////////////
	   		////////////////////////////////////////////////////////////////////////////////////////////////////

	   		var costosPeriodos = Periodos.find({tipo:"costo"}).fetch();
   			_.each(rc.getReactively("periodosCostos"), function(costoPeriodo){
   				if (costoPeriodo.mes_id == undefined) {
   					delete costoPeriodo;
   				}
			  	_.each(costosTotalesArreglos, function(kaka){
		  			var totalPer=0.00;
		  			var directoReales = 0.00;
		  			if (kaka.costo_id == costoPeriodo.costo_id && kaka.partida_id == costoPeriodo.partida_id){
		  				totalPer += costoPeriodo.comprasSinIva + (costoPeriodo.comprasIva/1.16) + costoPeriodo.contadoSinIva + (costoPeriodo.contadoIva/1.16)
		  				kaka.periodo = totalPer;
		  				directoReales += kaka.periodo;
		  				kaka.directoReal = directoReales;
		  				//console.log("totalper", kaka.costo_id, kaka.partida_id, totalPer);
		  			}
		  			else{
		  			  if(kaka.periodo == undefined)
		  			  	kaka.periodo = 0.00;
		  			}

		  		});	

		  	});

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////////////////////////////////

	   		//console.log("esto tengo", costosTotalesArreglos);
	   		var costosDirectosTotales = {};
	   		
	   		//console.log();
	   		var zamaPresupuesto = 0.00;
	   		_.each(costosTotalesArreglos, function(costoTotal){
	   			//console.log("costoTotal sabado", costoTotal)
	   			//console.log("entré") 
	   			var totalPresupuestos = 0.00;
	   			//var totalPer = 0.00;
	   			//totalPer += costoPeriodo.comprasSinIva + (costoPeriodo.comprasIva) + costoPeriodo.contadoSinIva + (costoPeriodo.contadoIva)
	   			if("undefined" == typeof costosDirectosTotales[costoTotal.partida]){
	   				console.log("entré acá viernes");
	   				console.log("if ", costoTotal.periodo);
	   				costosDirectosTotales[costoTotal.partida] = {};

	   				costosDirectosTotales[costoTotal.partida].partida = costoTotal.partida;
	   				costosDirectosTotales[costoTotal.partida].partida_id = costoTotal.partida_id;
	   				costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad;
	   				costosDirectosTotales[costoTotal.partida].factor = costoTotal.factor;
	   				 costosDirectosTotales[costoTotal.partida].realPeriodo = costoTotal.periodo
	   				 costosDirectosTotales[costoTotal.partida].ajustePresu = (costoTotal.total * costoTotal.factor)/100;
	   				 costosDirectosTotales[costoTotal.partida].ajuste = costoTotal.total - costosDirectosTotales[costoTotal.partida].ajustePresu;
	   				costosDirectosTotales[costoTotal.partida].costos = [];

	   				costosDirectosTotales[costoTotal.partida].costos.push({
	   					costo_id : costoTotal.costo_id,
	   					costo : costoTotal.costo,
	   					presupuesto : costoTotal.total,
	   					partida : costoTotal.partida,
	   					partida_id : costoTotal.partida_id,
	   					factor : costoTotal.factor,
	   					realPeriodo : costosDirectosTotales[costoTotal.partida].realPeriodo,
	   					ajuste : costosDirectosTotales[costoTotal.partida].ajuste,
	   					//diferencia : costoTotal.total - costosDirectosTotales[costoTotal.partida].realPeriodo,
	   					value :  costosDirectosTotales[costoTotal.partida].value = costoTotal.direct,
	   					cantidad : costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad,
	   				});
	   				zamaPresupuesto += costoTotal.total;
	   			}else{
	   				console.log("entre else viernes")
	   				console.log("else ", costoTotal.periodo);
	   			    costosDirectosTotales[costoTotal.partida].partida = costoTotal.partida;
	   			    costosDirectosTotales[costoTotal.partida].partida_id = costoTotal.partida_id;
	   			    costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad;
	   			    costosDirectosTotales[costoTotal.partida].factor = costoTotal.factor;
	   			     costosDirectosTotales[costoTotal.partida].realPeriodo += costoTotal.periodo;
	   			     costosDirectosTotales[costoTotal.partida].ajustePresu = (costoTotal.total * costoTotal.factor)/100;
	   				 costosDirectosTotales[costoTotal.partida].ajuste = costoTotal.total - costosDirectosTotales[costoTotal.partida].ajustePresu;	   				
	   				totalPresupuestos += costoTotal.total; 
	   				costosDirectosTotales[costoTotal.partida].costos.push({
	   					costo_id : costoTotal.costo_id,
	   					costo : costoTotal.costo,
	   					presupuesto : costoTotal.total,
	   					partida : costoTotal.partida,
	   					partida_id : costoTotal.partida_id,
	   					factor : costoTotal.factor,
	   					realPeriodo : costosDirectosTotales[costoTotal.partida].realPeriodo,
	   					ajuste : costosDirectosTotales[costoTotal.partida].ajuste,
	   					//diferencia : costoTotal.total - costosDirectosTotales[costoTotal.partida].realPeriodo,
	   					value :  costosDirectosTotales[costoTotal.partida].value = costoTotal.direct,
	   					cantidad : costosDirectosTotales[costoTotal.partida].cantidad = costoTotal.cantidad,

	   					
	   				});
	   				zamaPresupuesto += costoTotal.total;
	   			}

	   		});
//console.log(costosTotalesArreglos)
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

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

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


	   				
	   				var cosas = PresupuestosCosas.find().fetch()

					_.each(rc.getReactively("presupuestos"), function(presupuesto){
							var p_ids = _.pluck(presupuesto.costos, "_id");
							var c_ids = _.pluck(rc.costos, "_id");
							//console.log("pids", p_ids);
							//console.log("cids", c_ids);
							var diferentes = c_ids.diff(p_ids)
							_.each(diferentes, function(diferente){
								presupuesto.costos.push({_id: diferente})
							})
							
							//console.log(diferentes);
							
						});

	////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////
					
 								var totalSuma = 0.00;

 					_.each(rc.getReactively("cosas"), function(cosa){
 						//console.log("robben",cosa)	
		   				_.each(rc.getReactively("presupuestos"), function(presupuesto){
		   					_.each(presupuesto.costos, function(costo){
		   						if (isNaN(costo.direct)) {
								costo.direct = 0;
	 						}
		   						totalSuma += costo.direct;
		   						
		   					//console.log("muller",totalSuma)	   						
		   					});
		   					presupuesto.totalOtro = totalSuma;
		   					presupuesto.costoIndi = (presupuesto.totalOtro) * (cosa.costoIndirecto / 100);

		   					
		   					presupuesto.financiamiento = (presupuesto.totalOtro + presupuesto.costoIndi) * (cosa.costoFinanciamento / 100);
		   					presupuesto.adicional = (presupuesto.totalOtro + presupuesto.costoIndi + presupuesto.financiamiento ) * (cosa.cargoAdicional / 100);
		   					//presupuesto.utilidad = (presupuesto.totalOtro + presupuesto.costoIndi + presupuesto.costoFinanciamento) * (cosa.cargoUtilidad / 100);		   					
		   					presupuesto.precioUnitario = (presupuesto.totalOtro + presupuesto.costoIndi + presupuesto.financiamiento  + presupuesto.adicional);
		   					totalSuma = 0.00;
		   					//console.log("presupuestos del arreglo 2",presupuesto)
		   				});
	   			});


 	////////////////////////////////////////////////////////////////////////////////////////////////////
 	////////////////////////////////////////////////////////////////////////////////////////////////////





		_.each(rc.getReactively("obras"),function(obra){
				rc.periodosC = 0.00;
					var periodos = Periodos.find({tipo:"costo",estatus:true,obra_id:obra._id}).fetch();
			_.each(rc.getReactively("periodosCampo"),function(periodo){
				if (periodo.obra_id == obra._id) 
			
					rc.periodosC += ((periodo.comprasIva + periodo.contadoIva)/1.16) + (periodo.comprasSinIva
				 			+ periodo.contadoSinIva)
			});
		});

	console.log(rc.periodosC)
	

 	////////////////////////////////////////////////////////////////////////////////////////////////////
 	////////////////////////////////////////////////////////////////////////////////////////////////////


	_.each(partidas, function(partida){
	
			_.each(costosDirectosTotales, function(costoTotal){
				var todosPresu = 0.00;
				if (costoTotal.partida_id == partida._id) {
					_.each(costoTotal.costos, function(costo){				
		   			todosPresu += costo.presupuesto
		   	});
			}
				
				
				costoTotal.presus = todosPresu;
			});
		});

	

 			//console.log(rc.presupuestos);
 		//////////////////////////////////////////////////////////////////////////////////////////////ç









 			sumaPreciosUnitarios = {};
 			
			_.each(this.getReactively("presupuestos"), function(presupuesto){
				if("undefined" == typeof sumaPreciosUnitarios[presupuesto.partida_id]){
					sumaPreciosUnitarios[presupuesto.partida_id] = {};
					sumaPreciosUnitarios[presupuesto.partida_id].precioUnitario = presupuesto.precioUnitario;
					sumaPreciosUnitarios[presupuesto.partida_id].partida_id = presupuesto.partida_id;
				}else{
					sumaPreciosUnitarios[presupuesto.partida_id].precioUnitario += presupuesto.precioUnitario;
					sumaPreciosUnitarios[presupuesto.partida_id].partida_id = presupuesto.partida_id;
				}
			});
		////////////////////////////////////////////////////////////////////////////////////////////////////

					_.each(rc.getReactively("planes"), function(plan){
				_.each(sumaPreciosUnitarios, function(suma){
 			  _.each(costosDirectosTotales, function(partidas){
 			  		if (partidas.partida_id == suma.partida_id ) 
 			  		
				partidas.totalPrecioUnitarioFin = (suma.precioUnitario  * plan.trema/100) + suma.precioUnitario
 			});
 		});
 			});		

					 _.each(rc.getReactively("planes"), function(plan){

 			_.each(partidas, function(partida){
 				 rc.totalPrecioUnitario = 0.00;
 				_.each(costosDirectosTotales, function(presupuesto){
		   				  
		   				   rc.totalPrecioUnitario += presupuesto.precioUnitario
		 	      	});
	   			});
 				});
	////////////////////////////////////////////////////////////////////////////////////////////////////

				
				_.each(costosDirectosTotales, function(arreglo){
          var directoReal = 0.00;
 				_.each(arreglo.costos, function(costo){
 					if (arreglo.partida_id == costo.partida_id && arreglo.costo_id == costo.costo_id)
		   				 {
		   				 	directoReal += costo.realPeriodo
		   				 }  
		 	      	});
 				arreglo.directoReal1 = directoReal
	   			});

	 ////////////////////////////////////////////////////////////////////////////////////////////////////
	 //(partida.totalPrecioUnitarioFin) + (partida.totalPrecioUnitarioFin * cd.planes[0].trema/100)



var costosDirectosTotales2 = {};
	   		
	   			_.each(costosDirectosTotales, function(costoTotal){
 			
 					//console.log("costo total sabado", costos);


 					if("undefined" == typeof costosDirectosTotales2[costoTotal]){
	   			//	console.log("entré acá");
	   				costosDirectosTotales2[costoTotal] = {};
	   				costosDirectosTotales2[costoTotal].realTotal = costoTotal.realPeriodo;
	   			}else{
	   			    costosDirectosTotales2[costoTotal].realTotal += costoTotal.realPeriodo;
	   				
	   			}
 				});
	   		console.log("hola",costosDirectosTotales2)


 
	



_.each(costosDirectosTotales2, function(costoTotal2){
	console.log("papu",costoTotal2)
		_.each(rc.getReactively("planes"), function(plan){
	   			_.each(rc.getReactively("indirectoMes"), function(indi){
	   				//indirectoObra = indi.indirecto
	   			_.each(costosDirectosTotales, function(arreglo){
	   				arreglo.totalDirecto = costoTotal2.realTotal
	   				arreglo.indirectoReal=  ((arreglo.realPeriodo) /(costoTotal2.realTotal)*100) *(rc.periodosC + indi.pagoEmpresa)/100
	   				arreglo.costoUnitario = arreglo.indirectoReal + arreglo.realPeriodo
	   				arreglo.baseGravable= (arreglo.totalPrecioUnitarioFin) - (arreglo.costoUnitario);
	   				arreglo.utilidadNeta = arreglo.baseGravable -(plan.isr/100*arreglo.baseGravable)-(arreglo.baseGravable*0.1)
	   				arreglo.rentabilidad = ((arreglo.utilidadNeta) / ((arreglo.totalPrecioUnitarioFin)))*100

	   					if (arreglo.indirectoReal == undefined) {
			arreglo.indirectoReal=  ((arreglo.realPeriodo) /(costoTotal2.realTotal)*100) *(rc.periodosC + indi.pagoEmpresa)/100

				
			 }

	   			});
	   		});
	   	  });

		});
		////////////////////////////////////////////////////////////////////////////////////////////////////






	/////////////////////////////////////////////////////////////////////////////////////

		_.each(costosDirectosTotales, function(costoTotal){
	   			_.each(costoTotal.costos, function(costo){
	   			if (costo = undefined) {
	   				costo = 0;
	   			}	   	
	   	 });
	   			if (costoTotal = undefined) {
	   				costoTotal = 0;
	   			}	

		 });

		// _.each(costosDirectosTotales, function(arreglo){
		// 	if (arreglo.indirectoReal == undefined) {
		// 		window.location.reload();
		// 	}
	   		
	   		

		//  });

	////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////



	sumaPreciosUnitarios = {};
 			
			_.each(this.getReactively("presupuestos"), function(presupuesto){
				if("undefined" == typeof sumaPreciosUnitarios[presupuesto.partida_id]){
					sumaPreciosUnitarios[presupuesto.partida_id] = {};
					sumaPreciosUnitarios[presupuesto.partida_id].precioUnitario = presupuesto.precioUnitario;
					sumaPreciosUnitarios[presupuesto.partida_id].partida_id = presupuesto.partida_id;
				}else{
					sumaPreciosUnitarios[presupuesto.partida_id].precioUnitario += presupuesto.precioUnitario;
					sumaPreciosUnitarios[presupuesto.partida_id].partida_id = presupuesto.partida_id;
				}
			});



		var zamaArray = _.toArray(costosDirectosTotales);
		//console.log(zamaArray)
		_.each(zamaArray, function(presupuesto){
				var p_ids = _.pluck(presupuesto.costos, "costo_id");
				var c_ids = _.pluck(rc.costos, "_id");
				//console.log("pids", p_ids);
				//console.log("cids", c_ids);
				var diferentes = c_ids.diff(p_ids)
				_.each(diferentes, function(diferente){
					presupuesto.costos.push({_id: diferente, presupuesto : 0, ajuste : 0, realPeriodo : 0, diferencia : 0})
				});
				
				//console.log(diferentes);
				
			});
	////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////////////////////////////////////
				var costosTotalesArreglos = _.toArray(costosTotales);
	   		//var periodosCostosTotales = _.toArray(periodosCostos);

	   		//console.log("costosarreglos", costosTotalesArreglos)

	   		///////////////////////////////////////////////////////////////////////////////////////////
			//console.log("zamaArray", zamaArray);
			//console.log("periodos", rc.periodosCostos);
			var periodosCostos = {};
		 	_.each(zamaArray, function(costoTotal){
		 		_.each(costoTotal.costos, function(costo){
		 		var totalPeriodo = 0.00;
		 		var totalDiferencia = 0.00;
		 			_.each(rc.getReactively("periodosCostos"), function(periodo){
		 				//console.log(costo, periodo);
		 				if(costo.partida_id == periodo.partida_id && costo.costo_id == periodo.costo_id){
		 					//console.log("prueba", periodo)
		 					totalPeriodo += periodo.comprasSinIva + periodo.comprasIva/1.16 + periodo.contadoSinIva + periodo.contadoIva/1.16
		 					//console.log("realperiodo",costo.realPeriodo);
		 					totalDiferencia = costo.presupuesto - totalPeriodo;

		 				}
		   			
		   		     });
		 			//console.log("viernes total periodo",totalPeriodo)
		   		     costo.realPeriodo = totalPeriodo;
		   		     costo.diferencia = totalDiferencia;
		        });
		       });

		 	// console.log("arreglo pvara periodos",costosTotalesArreglos);

 			//console.log("precios Unitarios", _.toArray(sumaPreciosUnitarios));
			
            //console.log("suma", _.toArray(costosDirectosTotalesSuma));
            _.each(zamaArray, function(costoTotal){
	   			//console.log("reccorriendo",costoTotal)
	   			costoTotal.realPeriodo = 0;
	   			  _.each(costoTotal.costos, function(costo){

	   			  	costoTotal.realPeriodo += costo.realPeriodo;
		   			  	
	   			  	
	   			});
	   			//console.log("total zama vieres", costoTotal.realPeriodo)
		});

	   		console.log("nuevoArreglo",zamaArray);
	   		return zamaArray;
		},


//////////////////////////////// SEGUNDO ARREGLO  //////////////////////////////////////////////////////
//////////////////////////////// SEGUNDO ARREGLO  //////////////////////////////////////////////////////
//////////////////////////////// SEGUNDO ARREGLO  //////////////////////////////////////////////////////
//////////////////////////////// SEGUNDO ARREGLO  //////////////////////////////////////////////////////




	  costosTotales2 : () => {	
			var costosTotales = {};
			var partidas = Partidas.find().fetch();

			////////////////////////////////////////////////////////////////////////////////////////////////////
			///////////////////////////////////////// INICIO DEL ARREGLO ///////////////////////////////////////////////////////////

	   		_.each(rc.getReactively("partidas"), function(partida){
	   				_.each(rc.getReactively("presupuestos"), function(presupuesto){
	   					var totalFinal = 0.00;
	   					if(presupuesto.partida_id == partida._id ){
	   						_.each(presupuesto.costos, function(costoPresupuesto){
	   							if("undefined" == typeof costosTotales[partida.nombre + " - " + costoPresupuesto.nombre]){
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre] = {};	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].cantidad = presupuesto.cantidad;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].partida = partida.nombre;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].partida_id = partida._id;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].costo_id =  costoPresupuesto._id;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].costo =  costoPresupuesto.nombre;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].total = costoPresupuesto.value * presupuesto.cantidad;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].direct = costoPresupuesto.value * presupuesto.cantidad;
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].precioUnitario = costoPresupuesto.precioUnitario;
	   								
	   							}else{
	   								costosTotales[partida.nombre + " - " + costoPresupuesto.nombre].total += costoPresupuesto.value * presupuesto.cantidad;
	   							}
	   						});
	   					}
	   				})
	   		});
	   		////////////////////////////////////////////////////////////////////////////////////////////////////
	   		////////////////////////////////////////////////////////////////////////////////////////////////////

	   		var costosTotalesArreglos = _.toArray(costosTotales);
	   		//var totalPer=0.00;
	   		_.each(rc.getReactively("planes"), function(plan){
	   			//console.log("este es el plan",plan);
	   			_.each(plan.costos, function(costosPlan){
	   				//console.log("costos plan",costosPlan);
	   				_.each(costosTotalesArreglos, function(costoReal){
	   				//	console.log("costos reales",costoReal);

	   					if(costoReal.costo_id == costosPlan._id){
	   						costoReal.factor = costosPlan.factor;
	   						//console.log("costos de if",costoReal);
	   					}
	   					//console.log(costoReal);
	   				});
	   			});
	   		});

	   		////////////////////////////////////////////////////////////////////////////////////////////////////
	   		////////////////////////////////////////////////////////////////////////////////////////////////////

	   		var costosPeriodos = Periodos.find({tipo:"costo"}).fetch();
   			_.each(costosPeriodos, function(costoPeriodo){
			  	_.each(costosTotalesArreglos, function(kaka){
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

		  	////////////////////////////////////////////////////////////////////////////////////////////////////
		  	////////////////////////////////////////////////////////////////////////////////////////////////////
		  	//////////////////////////////EACH COSTOSDIRECTOSTOTALES//////////////////////////////////////////////

	   		//console.log("esto tengo", costosTotalesArreglos);
	   		var costosDirectosTotales = {};
	   		//console.log();
	   		var zamaPresupuesto = 0.00;
	   		_.each(costosTotalesArreglos, function(costoTotal){
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
	   			     costosDirectosTotales[costoTotal.partida].real += costoTotal.periodo;
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

	   		////////////////////////////////////////////////////////////////////////////////////////////////////
	   		////////////////////////////////////////////////////////////////////////////////////////////////////

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

	   ////////////////////////////////////////////////////////////////////////////////////////////////////

 	////////////////////////////////////////////////////////////////////////////////////////////////////
 			_.each(partidas, function(partida){
 				 rc.totalPrecioUnitario = 0.00;
 				_.each(rc.getReactively("costosTotales"), function(presupuesto){
		   				  
		   				   rc.totalPrecioUnitario += presupuesto.totalPrecioUnitarioFin
		 	      	});
	   			});

 			////////////////////////////////////////////////////////////////////////////////////////////////////
_.each(partidas, function(partida){
			_.each(costosDirectosTotales, function(costoTotal){
				var todosPresu = 0.00;
				if (costoTotal.partida_id == partida._id) {
					_.each(costoTotal.costos, function(costo){				
		   			todosPresu += costo.presupuesto
		   	});
			}	
				costoTotal.presus = todosPresu;
		});
	});
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

			costosDirectosTotalesSuma = {};
 			_.each(costosDirectosTotales, function(partidas){
 				_.each(partidas.costos, function(costos){
 					//console.log("costo total sabado", costos);

 					var costoNombre = "";
					_.each(rc.costos, function(c){
						if(c._id == costos.costo_id){
							costoNombre = c.nombre;
						}
					})

 					if("undefined" == typeof costosDirectosTotalesSuma[costoNombre]){
						costosDirectosTotalesSuma[costoNombre] = {};
						costosDirectosTotalesSuma[costoNombre].presupuestos = costos.presupuesto;
						costosDirectosTotalesSuma[costoNombre].ajuste = costos.ajuste;
						costosDirectosTotalesSuma[costoNombre].real = partidas.realPeriodo;
						costosDirectosTotalesSuma[costoNombre].diferencia =  costos.diferencia;
						costosDirectosTotalesSuma[costoNombre].partida_id =  partidas.partida_id;
						costosDirectosTotalesSuma[costoNombre].costo_id =  costos.costo_id;
						costosDirectosTotalesSuma[costoNombre].totalDirectos =  partidas.realPeriodo;
					}else{
						costosDirectosTotalesSuma[costoNombre].presupuestos += costos.presupuesto;
						costosDirectosTotalesSuma[costoNombre].ajuste += costos.ajuste;
						costosDirectosTotalesSuma[costoNombre].real += partidas.realPeriodo;
						costosDirectosTotalesSuma[costoNombre].diferencia += costos.diferencia;
						costosDirectosTotalesSuma[costoNombre].partida_id =  partidas.partida_id;
						costosDirectosTotalesSuma[costoNombre].costo_id =  costos.costo_id;
						costosDirectosTotalesSuma[costoNombre].totalDirectos +=  partidas.realPeriodo;

					}

 				})
 			});
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

 			_.each(costosDirectosTotalesSuma, function(suma){
 			  _.each(costosDirectosTotales, function(partidas){
 			  	_.each(partidas.costos, function(costos){
 			  		if (costos.costo_id == suma.costo_id ) {
 			  			costos.presupuestoFinal = suma.presupuestos
 			  		}
 			});
 		});
 	 });

 ////////////////////////////////////////////////////////////////////////////////////////////////////
 			//console.log(rc.presupuestos);
 			sumaPreciosUnitarios = {};
			_.each(this.getReactively("presupuestos"), function(presupuesto){
				if("undefined" == typeof sumaPreciosUnitarios[presupuesto.partida_id]){
					sumaPreciosUnitarios[presupuesto.partida_id] = {};
					sumaPreciosUnitarios[presupuesto.partida_id].precioUnitario = presupuesto.precioUnitario;
				}else{
					sumaPreciosUnitarios[presupuesto.partida_id].precioUnitario += presupuesto.precioUnitario;
				}
			});
			//console.log("hola como",sumaPreciosUnitarios)
////////////////////////////////////////////////////////////////////////////////////////////////////


			_.each(rc.presupuestos, function(presupuesto){
				var p_ids = _.pluck(presupuesto.costos, "_id");
				var c_ids = _.pluck(rc.costos, "_id");
				//console.log("pids", p_ids);
				//console.log("cids", c_ids);
				var diferentes = c_ids.diff(p_ids)
				_.each(diferentes, function(diferente){
					presupuesto.costos.push({_id: diferente, direct : 0})
				})
				//console.log("que quiero",presupuesto);
				//console.log(diferentes);

			});

			_.each(rc.presupuestos, function(presupuesto){
	//console.log("entro aqui")
	_.each(presupuesto.costos, function(costo){
		//console.log("entro aca")
					if (isNaN(costo.direct)) {
							costo.direct = 0;
	 					}
	 				});
				});


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////FINAL DEL ARREGLO////////////////////////////////////////////////////////////////



            console.log("suma de costosTotales2", _.toArray(costosDirectosTotalesSuma));
	   		return costosDirectosTotalesSuma;
		},


///////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

});
	

this.refrescar = function(){
	
}

// $(document).ready(function() {
//     location.reload();
// });
  
	this.nuevo = true;  	  
  this.nuevoCostoDirecto = function()
  {
    this.action = true;
    this.nuevo = !this.nuevo;
    this.CostoDirecto = {};		
  };
  
  this.guardar = function(CostoDirecto)
	{
		this.costoDirecto.estatus = true;
		
		CostoDirecto.insert(this.costoDirecto);
		toastr.success(' guardado con exito.');
		this.costoDirecto = {}; 
		$('.collapse').collapse('hide');
		this.nuevo = true;
		$state.go('root.obras')
	};
	
	this.editar = function(id)
	{
    this.costoDirecto = CostoDirecto.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};
	
	this.actualizar = function(costoDirecto)
	{
		var idTemp = costoDirecto._id;
		delete costoDirecto._id;		
		CostoDirecto.update({_id:idTemp},{$set:costoDirecto});
		$('.collapse').collapse('hide');
		this.nuevo = true;
		//console.log(costoDirecto);
	};

	this.cambiarEstatus = function(id)
	{
		var costoDirecto = CostoDirecto.findOne({_id:id});
		if(costoDirecto.estatus == true)
			costoDirecto.estatus = false;
		else
			costoDirecto.estatus = true;
		
		CostoDirecto.update({_id: id},{$set :  {estatus : costoDirecto.estatus}});
    };

    this.getConcepto= function(concepto_id)
	{
		var concepto = Conceptos.findOne(concepto_id);
		if(concepto)
		return concepto.nombre;
	};
	this.totalPre = function(costos){
		
		var suma = 0.00;
		_.each(costos, function(costo){
			suma += parseFloat(costo.value);
		});
		//console.log("totalre" , suma)
		return suma;
	}
		
};


	 	

