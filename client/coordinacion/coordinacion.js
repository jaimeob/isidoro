angular.module("formulas")
.controller("CoordinacionCtrl", CoordinacionCtrl);  
function CoordinacionCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
let rc = $reactive(this).attach($scope);


this.subscribe('users',()=>{
	return Meteor.users.findOne[{ _id: Meteor.userId() }];
    });

	this.subscribe('coordinacion',()=>{
	return [{ obra_id : $stateParams.id,estatus : true}] 
    });
    	this.subscribe('comerciales',()=>{
	return [{ obra_id : $stateParams.id,estatus : true}] 
    });

      this.subscribe('areas',()=>{
  return [{ obra_id : $stateParams.id,estatus : true}] 
    });


      this.subscribe('obra', () => {
  	return [{ _id : $stateParams.id, estatus : true}]
  });



  this.action = true;

  
	this.helpers({
    areasAdminTec : () => {
      return Areas.find({adminTec:true}).fetch();
    },
    comercialAdmin : () => {
      return Areas.find({comercialAdmin:true}).fetch();
    },
   areasAdmin : () => {
      return Areas.find({areasAdmin:true}).fetch();
    },
     areasComercial : () => {
      return Areas.find({comercial:true}).fetch();
    },
    areasTecnicas : () => {
      return Areas.find({tecnicas:true}).fetch();
    },
		tecnicasComercial : () => {
		  return Areas.find({tecnicaComercial:true}).fetch();
	  },
	  coordinaciones : () => {
		  return Coordinacion.find().fetch();
	  },
     coordinacionesComercialAdmin : () => {
      return Coordinacion.find({comercialAdministracion:true}).fetch();
    },
	  coordinacionesAdminTecnica: () => {
		  return Coordinacion.find({permisos:true}).fetch();
	  },
    coordinacionesTecnicaComercial: () => {
      return Coordinacion.find({tecComer:true}).fetch();
    },
     coordinacionesAdmin: () => {
      return Coordinacion.find({administracion:true}).fetch();
    },
    coordinacionesComercial: () => {
      return Coordinacion.find({comercialCoor:true}).fetch();
    },
     coordinacionesTecnicas: () => {
      return Coordinacion.find({tecnicasCoor:true}).fetch();
    },


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
	  obra : () => {
		  return Obras.findOne($stateParams.id);
		},
  });
  
	this.nuevo = true; 

	 	 //  this.verComercial = true
    // this.verCoordinacion = true
    // this.verTecnica = true

  this.nuevoCoordinacion = function()
  {
  	this.panelComercial = false
    this.verCoordinacion = true
    this.verTecnica = false
    this.verComercialSeccion = false
    this.verTecnicaSeccion = false
    this.verAdministracion = false
    this.verTodas = false

    // this.guardarCo = false
    
    this.areas = {};	
  };

  this.adminTecnica = false
   this.nuevoConceptoAdminTecnica = function()
  {
    this.adminTecnica = !this.adminTecnica;
    this.edicionArea = false
     //this.adminTecnica = true;
    //this.coordinacion = {}; 
  };

  this.newComercial = function()
  {

    this.comercial = {};	
 


    this.panelComercial = true
    this.verCoordinacion = false
    this.verTecnica = false
    this.verComercialSeccion = false
    this.verTecnicaSeccion = false
    this.verAdministracion = false
     this.verTodas = false


 
  };

  this.newTecnica = function()
  {
  	this.panelComercial = false
    this.verCoordinacion = false
    this.verTecnica = true
    this.verComercialSeccion = false
    this.verTecnicaSeccion = false
    this.verAdministracion = false
    this.verTodas = false

    this.tecnica = {};	
    

 
  };
  this.newAdministracion = function()
  {
  	this.panelComercial = false
    this.verCoordinacion = false
    this.verTecnica = false
    this.verComercialSeccion = false
    this.verTecnicaSeccion = false
    this.verAdministracion = true

    this.administracion = {};	
      this.guardarCo = false
      this.verTodas = false
 

 
  };
  this.newComercialSeccion = function()
  {
  	this.panelComercial = false
    this.verCoordinacion = false
    this.verTecnica = false
    this.verComercialSeccion = true
    this.verTecnicaSeccion = false
    this.verAdministracion = false

    this.comercialSeccion = {};	
    this.verTodas = false


 
  };
  this.newTecnicaSeccion = function()
  {
  	this.panelComercial = false
    this.verCoordinacion = false
    this.verTecnica = false
    this.verComercialSeccion = false
    this.verTecnicaSeccion = true
    this.verAdministracion = false

    this.tecnicaSeccion = {};	
    this.guardarCo = false
    this.guardarComer = false
    this.guardarAdmin = false
    this.guardarCom = false
    this.verTodas = false

 
  };

   this.textPermisos = function(id)
  {
    this.area_id = id;
      this.verTecnicaComercial = false
    this.verAdmin = false
    this.verPermisos = true
  

     console.log(id); 
    
  };
   this.textTecnicasComercial = function(id)
  {
    this.area_id = id;
      this.verTecnicaComercial = true
    this.verAdmin = false
    this.verPermisos = false
    this.verTecnicaComercial = true;
 
    
  };

     this.textverAdmin = function(id)
  {
    this.area_id = id;
    this.verTecnicaComercial = false
    this.verAdmin = true
    this.verPermisos = false
    this.verTecnicaComercial = false;
    
  };
     this.textverTecnica = function(id)
  {
    this.area_id = id;
    this.verTecnicaComercial = false
    this.verAdmin = false
    this.verPermisos = false
    this.verTecnicaComercial = false;
    this.verTecnicas = true
    
  };
  this.textverComercialAdmin = function(id)
  {
    this.verPermisos = false
    this.verComercialAdmin = true;
     this.area_id = id;
    this.verTecnicaComercial = false
    this.verAdmin = false
    this.verPermisos = false
    this.verTecnicaComercial = false;
  
  };

  this.textverTecnicaComercial = function(id)
  {
    this.verTecnicaComercial = true;
     this.verPermisos = false
    this.verComercialAdmin = false;
     this.area_id = id;
    this.verTecnicaComercial = false
    this.verAdmin = false
    this.verPermisos = false

  };
  this.textverComercial = function(id)
  {
    this.verTecnicaComercial = false;
     this.verPermisos = false
    this.verComercialAdmin = false;
     this.area_id = id;
    this.verTecnicaComercial = false
    this.verAdmin = false
    this.verPermisos = false
    this.verComercial = true

  };
   this.textverTecnica = function(id)
  {
    this.verTecnicaComercial = false;
     this.verPermisos = false
    this.verComercialAdmin = false;
     this.area_id = id;
    this.verTecnicaComercial = false
    this.verAdmin = false
    this.verPermisos = false
    this.verComercial = false
    this.verTecnicas = true

  };

 

  
  
	
	this.editar = function(id)
	{
    this.costo = Coordinacion.findOne({_id:id});
	};
  this.editarArea = function(id)
  {
      console.log(id)
    this.areas = Areas.findOne({_id:id});
    //this.areas.nombreAdminTecnica = this.area.nombreAdminTecnica;
    this.edicionArea = true;
    this.adminTecnica = true;
  };
	
	this.actualizar = function(costo)
	{
		console.log(costo)
		var idTemp = costo._id;
		delete costo._id;		
		Coordinacion.update({_id:idTemp},{$set:costo});
		$('.collapse').collapse('hide');
     
		
				
	};
  this.actualizarAreas = function(area)
  {
    console.log(area)
    var idTemp = area._id;
    delete area._id;   
    Areas.update({_id:idTemp},{$set:area});
    this.adminTecnica = false;
   
    
        
  };


	this.borrar = function(id)
	{
		var costo = Coordinacion.findOne({_id:id});
		if(costo.estatus == true)
			costo.estatus = false;
		else
			costo.estatus = true;
		
		Coordinacion.update({_id: id},{$set :  {estatus : costo.estatus}});
    };
		



 
  
  /////////////////////////////////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  this.guardarCoordinacion = function(coordinacion)
	{
		_.each(rc.coordinaciones, function(costo){
			delete costo.$$hashKey;
		});
    //this.control.costo_id = this.costo_id;
    coordinacion.area_id = this.area_id;
		coordinacion.permisos = true;
		coordinacion.usuario_id = Meteor.userId()
		this.coordinacion.estatus = true;
		coordinacion.obra_id = $stateParams.id;
		console.log(this.coordinacion);
		Coordinacion.insert(this.coordinacion);
		toastr.success(' Guardado.');
		this.coordinacion = {}; 
	  

	};
  this.guardarCoordinacionComercialAdmin = function(coordinacion)
  {
    _.each(rc.coordinaciones, function(costo){
      delete costo.$$hashKey;
    });
    //this.control.costo_id = this.costo_id;
    coordinacion.area_id = this.area_id;
    coordinacion.comercialAdministracion = true;
    coordinacion.usuario_id = Meteor.userId()
    this.coordinacion.estatus = true;
    coordinacion.obra_id = $stateParams.id;
    console.log(this.coordinacion);
    Coordinacion.insert(this.coordinacion);
    toastr.success(' Guardado.');
    this.coordinacion = {}; 
    

  };
  this.guardarCoordinacionTecnicasComercial = function(coordinacion)
  {
    _.each(rc.coordinaciones, function(costo){
      delete costo.$$hashKey;
    });
    //this.control.costo_id = this.costo_id;
    coordinacion.area_id = this.area_id;
    coordinacion.tecComer = true;
    coordinacion.usuario_id = Meteor.userId()
    this.coordinacion.estatus = true;
    coordinacion.obra_id = $stateParams.id;
    console.log(this.coordinacion);
    Coordinacion.insert(this.coordinacion);
    toastr.success(' Guardado.');
    this.coordinacion = {}; 
    

  };
   this.guardarCoordinacionAdmin = function(coordinacion)
  {
    _.each(rc.coordinaciones, function(costo){
      delete costo.$$hashKey;
    });
    //this.control.costo_id = this.costo_id;
    coordinacion.area_id = this.area_id;
    coordinacion.administracion = true;
    coordinacion.usuario_id = Meteor.userId()
    this.coordinacion.estatus = true;
    coordinacion.obra_id = $stateParams.id;
    console.log(this.coordinacion);
    Coordinacion.insert(this.coordinacion);
    toastr.success(' Guardado.');
    this.coordinacion = {}; 
    

  };
  this.guardarCoordinacionComercial = function(coordinacion)
  {
    _.each(rc.coordinaciones, function(costo){
      delete costo.$$hashKey;
    });
    //this.control.costo_id = this.costo_id;
    coordinacion.area_id = this.area_id;
    coordinacion.comercialCoor = true;
    coordinacion.usuario_id = Meteor.userId()
    this.coordinacion.estatus = true;
    coordinacion.obra_id = $stateParams.id;
    console.log(this.coordinacion);
    Coordinacion.insert(this.coordinacion);
    toastr.success(' Guardado.');
    this.coordinacion = {}; 
    

  };
   this.guardarCoordinacionTecnicas = function(coordinacion)
  {
    _.each(rc.coordinaciones, function(costo){
      delete costo.$$hashKey;
    });
    //this.control.costo_id = this.costo_id;
    coordinacion.area_id = this.area_id;
    coordinacion.tecnicasCoor = true;
    coordinacion.usuario_id = Meteor.userId()
    this.coordinacion.estatus = true;
    coordinacion.obra_id = $stateParams.id;
    console.log(this.coordinacion);
    Coordinacion.insert(this.coordinacion);
    toastr.success(' Guardado.');
    this.coordinacion = {}; 
    

  };

    this.guardarAreas = function(area)
  {
    _.each(rc.areas, function(costo){
      delete costo.$$hashKey;
    });

    area.adminTec = true;
    area.usuario_id = Meteor.userId()
    area.estatus = true;
    area.obra_id = $stateParams.id;
    console.log(area);
    Areas.insert(area);
    toastr.success(' Guardado.');
    this.areas = {}; 
    this.adminTecnica = false
    

  };
   this.guardarAreasComercial = function(area)
  {
    _.each(rc.areas, function(costo){
      delete costo.$$hashKey;
    });
    area.comercial = true;
    area.usuario_id = Meteor.userId()
    area.estatus = true;
    area.obra_id = $stateParams.id;
    console.log(area);
    Areas.insert(area);
    toastr.success(' Guardado.');
    this.areas = {}; 
    this.adminTecnica = false
    

  };

    this.guardarAreasAdmin = function(area)
  {
    _.each(rc.areas, function(costo){
      delete costo.$$hashKey;
    });
    area.areasAdmin = true;
    area.usuario_id = Meteor.userId()
    area.estatus = true;
    area.obra_id = $stateParams.id;
    console.log(area);
    Areas.insert(area);
    toastr.success(' Guardado.');
    this.areas = {}; 
    this.adminTecnica = false
    

  };
   this.guardarAreasTecnicas = function(area)
  {
    _.each(rc.areas, function(costo){
      delete costo.$$hashKey;
    });
    area.tecnicas = true;
    area.usuario_id = Meteor.userId()
    area.estatus = true;
    area.obra_id = $stateParams.id;
    console.log(area);
    Areas.insert(area);
    toastr.success(' Guardado.');
    this.areas = {}; 
    this.adminTecnica = false
    

  };
  this.guardarTecnicasComercial = function(area)
  {
    _.each(rc.areas, function(costo){
      delete costo.$$hashKey;
    });
    area.tecnicaComercial = true;
    area.usuario_id = Meteor.userId()
    area.estatus = true;
    area.obra_id = $stateParams.id;
    console.log(area);
    Areas.insert(area);
    toastr.success(' Guardado.');
    this.areas = {}; 
    this.adminTecnica = false
    

  };
  this.guardarComercialAdmin = function(area)
  {
    _.each(rc.areas, function(costo){
      delete costo.$$hashKey;
    });
    area.comercialAdmin = true;
    area.usuario_id = Meteor.userId()
    area.estatus = true;
    area.obra_id = $stateParams.id;
    console.log(area);
    Areas.insert(area);
    toastr.success(' Guardado.');
    this.areas = {}; 
    this.adminTecnica = false
    

  };




  






	//////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////



	this.verTodasCoordinaciones = function(){

		///this.verTodas = true
		this.verTodas = !this.verTodas;


    this.verPermisos = false
    this.verComercialAdmin = false;
    this.verTecnicaComercial = false
    this.verAdmin = false
    this.verTecnicaComercial = false;
      this.panelComercial = false
    this.verCoordinacion = false
    this.verTecnica = false
    this.verComercialSeccion = false
    this.verTecnicaSeccion = false
    this.verAdministracion = false




		this.panelComercial = false
    this.verCoordinacion = false
    this.verTecnica = false
    this.verComercialSeccion = false
    this.verTecnicaSeccion = false
    this.verAdmin = false
 this.verPermisos = false
  

    
   

	};

};

