angular.module('formulas')
.controller('EmpresasCtrl', EmpresasCtrl);
function EmpresasCtrl($scope, $meteor, $reactive, $state, toastr) {
$reactive(this).attach($scope);

    this.subscribe("empresas",()=>{
		return [{estatus:true,empresa_id : this.getReactively("empresa_id")}]
	});
  this.action = true;  
  this.nuevo = true;
  
  this.helpers({
	  empresas : () => {
		  return Empresas.find();
	  }
  });

 
  this.nuevoEmpresa = function()
  {
	  this.action = true;
    this.nuevo = !this.nuevo;
    this.empresa = {}; 
  };
  
   this.guardar = function(empresa)
	{
		
		empresa.estatus = true;
		empresa_id = Empresas.insert(this.empresa);
		var nombre = empresa.nombreDirector != undefined ? empresa.nombreDirector + " " : "";
			var apPaterno = empresa.apPaternoDirector != undefined ? empresa.apPaternoDirector + " " : "";
			var apMaterno = empresa.apMaternoDirector != undefined ? empresa.apMaternoDirector : ""
			empresa.nombreCompleto = nombre + apPaterno + apMaterno;
		var usuario = {
			username : empresa.username,
			password : empresa.password,
			profile : {
				nombre : empresa.nombreDirector,
				apPaterno : empresa.apPaternoDirector,
				apMaterno : empresa.apMaternoDirector,
				nombreCompleto : nombre + apPaterno + apMaterno,
				empresa_id : empresa_id,
				estatus : true
			}
		}

		Meteor.call('crearUsuario', usuario, 'director');
		toastr.success('Guardado correctamente.');
		this.seccion = {};
		$('.collapse').collapse('hide');
		this.nuevo = true;
		console.log(empresa);
	};
	
	
	this.editar = function(id)
	{
		this.empresa = Empresas.findOne({_id:id});
    this.action = false;
    $('.collapse').collapse('show');
    this.nuevo = false;
	};	
	
	this.actualizar = function(empresa)
	{
		
			var idTemp = empresa._id;
			delete empresa._id;		
			Empresas.update({_id:idTemp},{$set:empresa});
			var nombre = empresa.nombre != undefined ? empresa.nombre + " " : "";
			var apPaterno = empresa.apPaterno != undefined ? empresa.apPaterno + " " : "";
			var apMaterno = empresa.apMaterno != undefined ? empresa.apMaterno : ""
			empresa.nombreCompleto = nombre + apPaterno + apMaterno;
			var usuario = {
				username : empresa.username,
				password : empresa.password,
				profile : {
					nombre : empresa.nombre,
					apPaterno : empresa.apPaterno,
					apMaterno : empresa.apMaterno,
					nombreCompleto : nombre + apPaterno + apMaterno,
					empresa_id : idTemp,
					estatus : true
				}
			}
			Meteor.call('actualizarUsuario', usuario, 'director');
			toastr.success('Actualizado correctamente.');
			$('.collapse').collapse('hide');
			this.nuevo = true;
	
		
	};
		
	this.cambiarEstatus = function(id)
	{
		var empresa = Empresas.findOne({_id:id});
		if(empresa.estatus == true)
			empresa.estatus = false;
		else
			empresa.estatus = true;
		
		Empresas.update({_id:id}, {$set : {estatus : empresa.estatus}});
		
	};
	   //  this.remove = function(empresa)
       // {
       //     this.empresa.estatus = false;
       //     this.empresas.save(empresa);
       // };
}