angular.module("formulas")
.controller("GICTRL", GICTRL);  
function GICTRL($scope, $meteor, $reactive, $state, $stateParams, toastr){
let rc =$reactive(this).attach($scope);


this.mes_id = '';
this.tipoPeriodo = 'gasto';
this.mesSeleccionado = '';

this.subscribe('users',()=>{
	return Meteor.users.findOne[{ _id: Meteor.userId() }];
    });

	this.subscribe('GI',()=>{
	return [{estatus:true}] 
    });

     this.subscribe('gastosOficina',()=>{
	 return [{estatus:true,usuario_id:Meteor.userId()}] 
     });

    this.subscribe('planes',()=>{
	return [{estatus:true,usuario_id:Meteor.userId()}] 
    });

     this.subscribe('presupuestosCampo',()=>{
	return [{estatus:true,usuario_id:Meteor.userId()}] 
    });

    this.subscribe('obras',()=>{
	return [{empresa_id : Meteor.user() != undefined ? Meteor.user().profile.empresa_id : undefined,estatus:true,usuario_id:Meteor.userId()}] 
    });

    	this.subscribe('meses',()=>{
		return [{estatus:true,usuarioMes: Meteor.userId()}]
	});

    this.subscribe('pagosProveedores',()=>{
	return [{estatus:true,usuario_id:Meteor.userId()}] 
  });
    this.subscribe('cobros',()=>{
	return [{estatus:true,modo:true,usuario_id:Meteor.userId()}] 
  });
	this.subscribe('periodos',()=>{
	return [{tipo: this.getReactively('tipoPeriodo'),estatus:true,usuario_id:Meteor.userId()}] 
  });

  this.action = true;
  
	this.helpers({
	  meses : () => {
		  return Meses.find();
	  },
	   mes : () => {
		  return Meses.findOne();
	  },
	  obras : () => {
		  return Obras.find().fetch();
	  },
	  gastos : () => {
		  return GI.find();
	  },
	  gastosOficinas : () => {
		  return GastosOficina.find({mes_id: this.getReactively('mes_id')});
	  },
	   todosOficinas : () => {
		  return GastosOficina.find();
	  },
	  pagos : () => {
		  return PagosProveedores.find();
	  },
	  campos : () => {
		  return PresupuestosCampo.find();
	  },
	  
	   PeriodosObra : () => {
		  return Periodos.find({mes_id: this.getReactively('mes_id'),obra_id: this.getReactively('obra_id')});
	  },
	  cobros : () => {
		  return Cobros.find({mes_id: this.getReactively('mes_id'),modo:true});
	  },

	   cobrosObra : () => {
		  return Cobros.find({obra_id: this.getReactively('obra_id')});
	  },

	   TodosCobros : () => {
		  return Cobros.find({usuario_id: Meteor.userId()});
	  },

	  periodos : () => {
	  	return Periodos.find({mes_id: this.getReactively('mes_id')});
	  },
	  TodosPeriodos : () => {
	  	return Periodos.find();
	  },
	  
	  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
				// if (arreglo.pago !=undefined) {

 			// 		}else{
 			// 			arreglo.pago = 0;
 			// 		}
			});
			//console.log("tatal pago", totalPago);
			//console.log("arreglo total", arreglin);
			_.each(arreglin, function(arreglo){
					if (isNaN(arreglo.porcentaje)) {
							arreglo.porcentaje = 0;
	 					}
	 						
	 					

			});

			//console.log(totalPago);
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

	  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  

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


/////////////////////////////////////////////////////////////////////////////////////////












	  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	  
	
	  indirectos : () => {
		var gastosIndirectoEmpresa = [];
          
		  	//GASTOS OFICINA;
		  	var totalGastosOficinas = 0;
		  	var gastosOF = GastosOficina.find().fetch();
 				_.each(gastosOF,function(gasto){
 					totalGastosOficinas += gasto.importeFijo + gasto.importeVar
 					gasto.gastoOficina = parseInt(totalGastosOficinas);
 					
 				});

 				gastosIndirectoEmpresa.push({totalGO : totalGastosOficinas});

 				
 	            
 				var totalIngresos = 0;
 				var cobros = Cobros.find().fetch();
 				_.each(rc.TodosCobros,function(cobro){
 					totalIngresos += cobro.cSinIva + cobro.cIva/1.16;
 					cobro.ingresos = parseInt(totalIngresos);
 				
 				});

 				gastosIndirectoEmpresa.push({totalIngreso : totalIngresos});
				
 				
 	           
 				var totalGastosCampo = 0;
 				var periodos = Periodos.find().fetch();
 				_.each(rc.TodosPeriodos,function(campo){
 				  totalGastosCampo += campo.comprasSinIva + (campo.comprasIva / 1.16)
 				  + campo.contadoSinIva + (campo.contadoIva / 1.16)
 				  campo.gastosCampo = parseInt(totalGastosCampo);
 				  
				});

				gastosIndirectoEmpresa.push({totalGCampo : totalGastosCampo});

                
               var cantidadesSumadas = (totalGastosOficinas  + totalGastosCampo) / (totalIngresos) * 100;

              gastosIndirectoEmpresa.push({total : cantidadesSumadas })



        console.log("gastos", gastosIndirectoEmpresa);
	//	console.log("final", final);

		return gastosIndirectoEmpresa;
	},
  });
  
	this.nuevo = true; 
	this.accionAgregar = false; 	  
  this.nuevoGastoIndirecto = function()
  {
    this.accionAgregar = true;
    this.nuevo = !this.nuevo;
    this.gastosIndirecto= {};		
  };
  
  this.guardarPreGC = function(obra)
	{
		var idTemp = obra._id;
		delete obra._id;		
		Obras.update({_id:idTemp},{$set:obra});
		this.campos = false;
		console.log(obra);
	};

     this.campos = false;
	this.editarObra = function(id)
	{
    this.obra = Obras.findOne({_id:id});
    this.campos = true;
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


     this.borrarGC = function(id)
	{
	    var gc;
	    var r = confirm("Esta seguro de borrar esta fecha");
	    if (r == true) {
	        txt = gc = Obras.findOne({_id:id});
		if(gc.estatus == true)
			gc.estatus = false;
		else
			gc.estatus = true;
		
		Obras.update({_id: id},{$set :  {estatus : gc.estatus}});

	    } else {
	        gc.estatus = true;
	    }
    };


     this.mostrarMeses= function(mes_id,nombre)
	{
		this.panelId = mes_id;
		this.mes_id = mes_id;
		this.panelColor = true;
		this.accionImporte = false;
		this.mesSeleccionado = nombre;

	};

	this.cobroTotalFinal = function(obra_id){
		var total = 0;
		_.each(rc.cobros,function(cobro){
			if(obra_id == cobro.obra_id)
				total += cobro.cIva/1.16 + cobro.cSinIva
		});
		return total
	}

	this.cobroTotalFinalPeriodo = function(obra_id){
		var total = 0;
		_.each(this.periodos,function(periodo){
			if(obra_id == periodo.obra_id)
			total += (periodo.comprasIva / 1.16) + periodo.comprasSinIva
		 + (periodo.contadoIva / 1.16) + periodo.contadoSinIva
		});
		return total
	}

		this.TotalFinalGO = function(){
		total = 0;
		_.each(this.gastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	}

	// this.TotalFinalGO = function(){
	// 	total = 0;
	// 	_.each(rc.gastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
	// 	return total
	// }

	this.todosGastosOficinas = function(){
		total = 0;
		_.each(rc.todosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	}	


	this.cobrosTotales=function(obras){
		var totalCobros=0;
		_.each(obras, function(obra){
			var periodos = Periodos.find().fetch();
			_.each(periodos,function(periodo){
				var obra_id=obra._id;
				if(obra_id == periodo.obra_id)
					totalCobros += (periodo.comprasIva / 1.16) + periodo.comprasSinIva
				 			+ (periodo.contadoIva/ 1.16) + periodo.contadoSinIva
			})

		});
		return totalCobros
	};

	this.ingresosTotales2=function(){
		var totalIngresos=0;
		var obras = Obras.find().fetch()
		_.each(obras, function(obra){
			var cobros = Cobros.find().fetch();
			_.each(rc.TodosCobros,function(cobro){
				var obra_id=obra._id;
				if(obra_id == cobro.obra_id  )
					totalIngresos += cobro.cIva/1.16 + cobro.cSinIva
			})
		});
		return totalIngresos
 	};

 	this.ingresosTotales3=function(){
		var totalIngresos=0;
		var obras = Obras.find().fetch()
		_.each(obras, function(obra){
			var cobros = Cobros.find().fetch();
			_.each(rc.TodosCobros,function(cobro){
				var obra_id=obra._id;
				if(obra_id == cobro.obra_id && cobro.mes_id == rc.mes_id)
					totalIngresos += cobro.cIva/1.16 + cobro.cSinIva
			})
		});
		return totalIngresos
 	};



	this.camposTotales=function(){
		var totalCobros=0;
		var obras = Obras.find().fetch()
		_.each(obras, function(obra){
			var periodos = Periodos.find().fetch();
			_.each(periodos,function(periodo){
				var obra_id=obra._id;
				if(obra_id == periodo.obra_id && periodo.mes_id == rc.mes_id)
					totalCobros += (periodo.comprasIva / 1.16) + periodo.comprasSinIva
				 			+ (periodo.contadoIva/ 1.16) + periodo.contadoSinIva
			})

		});
		return totalCobros
	};

		this.camposTotales2=function(){
		var totalCobros=0;
		var obras = Obras.find().fetch()
		_.each(obras, function(obra){
			var periodos = Periodos.find().fetch();
			_.each(periodos,function(periodo){
				var obra_id=obra._id;
				if(obra_id == periodo.obra_id)
					totalCobros += (periodo.comprasIva / 1.16) + periodo.comprasSinIva
				 			+ (periodo.contadoIva/ 1.16) + periodo.contadoSinIva
			})

		});
		return totalCobros
	}




		this.TotalFinal = function(){
		total = 0;
		_.each(this.gastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	};


///////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////
	this.cobroTotalFinal = function(obra_id){
		var total = 0;
		_.each(rc.cobros,function(cobro){
			if(obra_id == cobro.obra_id)
				total += cobro.cIva/1.16 + cobro.cSinIva
		});
		return total
	}


	this.TotalFinal = function(){
		total = 0;
		_.each(rc.todosGastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	};


 	this.totalCantidadApagar = function(){
		total = 0;
		_.each(rc.todosGastosOficinas,function(gasto){total += gasto.importeFijo + gasto.importeVar});
		return total
	}

	this.TotalFinalGastos = function()
	{
		total = 0;
		_.each(rc.periodos,function(periodo)
		  {total += periodo.comprasIva + periodo.comprasSinIva
		 + periodo.contadoIva + periodo.contadoSinIva});
		return total
	}

	this.cobrosTotalesOF =function(obras){
		var totalOF=0;
		_.each(obras, function(obra){
			var gastosOficinas = GastosOficina.find().fetch();
			_.each(rc.todosGastosOficinas,function(gasto){
				var obra_id=obra._id;
				if(obra_id == gasto.obra_id)
					totalOF += gasto.importeFijo + gasto.importeVar
			})
		});
		return totalOF
	};


	this.ingresosTotales=function(obras){
		var totalIngresos=0;
		_.each(obras, function(obra){
			var cobros = Cobros.find().fetch();
			_.each(rc.getReactively("TodosCobros"),function(cobro){
				var obra_id=obra._id;
				if(obra_id == cobro.obra_id)
					totalIngresos += cobro.cIva/1.16 + cobro.cSinIva
			})
		});
		console.log(totalIngresos)
		return totalIngresos
 	};

 	

	this.ingresosTotalesMes=function(obras){
		var totalIngresos=0;
		_.each(obras, function(obra){
		
			_.each(rc.getReactively("cobros"),function(cobro){
				var obra_id=obra._id;
				
				if(obra_id == cobro.obra_id)
					totalIngresos += cobro.cIva/1.16 + cobro.cSinIva
			})
		});
		return totalIngresos
	};












};
