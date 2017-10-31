angular.module("formulas")
.controller("ProcesosCtrl", ProcesosCtrl);  
function ProcesosCtrl($scope, $meteor, $reactive, $state, $stateParams, toastr){
let rc = $reactive(this).attach($scope);
  window = rc;

this.subscribe('users',()=>{
  return Meteor.users.findOne[{ _id: Meteor.userId() }];
    });

  this.subscribe('procesos',()=>{
  return [{ obra_id : $stateParams.id,estatus : true,area_id: this.getReactively('area_id')}] 
    });
      this.subscribe('comerciales',()=>{
  return [{ obra_id : $stateParams.id,estatus : true}] 
    });

      this.subscribe('areasProcesos',()=>{
  return [{ obra_id : $stateParams.id,estatus : true}] 
    });

      this.subscribe('obra', () => {
    return [{ _id : $stateParams.id, estatus : true}]
  });



  this.action = true;

  
  this.helpers({
    areasAdminTec : () => {
      return AreasProcesos.find({adminTec:true}).fetch();
    },
    comercialAdmin : () => {
      return AreasProcesos.find({comercialAd:true}).fetch();
    },
   areasAdmin : () => {
      return AreasProcesos.find({areasAdmin:true}).fetch();
    },
     areasComercial : () => {
      return AreasProcesos.find({comercial:true}).fetch();
    },
    areasTecnicas : () => {
      return AreasProcesos.find({tecnicas:true}).fetch();
    },
    areasReuniones : () => {
      return AreasProcesos.find({reuniones:true}).fetch();
    },
    tecnicasComercial : () => {
      return AreasProcesos.find({tecnicaComercial:true}).fetch();
    },
    coordinaciones : () => {
      return Procesos.find().fetch();
    },
     coordinacionesComercialAdmin : () => {
      return Procesos.find({comercialAdministracion:true}).fetch();
    },
    coordinacionesAdminTecnica: () => {
      return Procesos.find({permisos:true}).fetch();
    },
    coordinacionesTecnicaComercial: () => {
      return Procesos.find({tecComer:true}).fetch();
    },
     coordinacionesAdmin: () => {
      return Procesos.find({administracion:true}).fetch();
    },
    coordinacionesComercial: () => {
      return Procesos.find({comercialCoor:true}).fetch();
    },
     coordinacionesTecnicas: () => {
      return Procesos.find({tecnicasCoor:true}).fetch();
    },
    coordinacionesReuniones: () => {
      return Procesos.find({reunionesCoor:true}).fetch();
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
    this.verComercialAdmin = false
    this.coordinacionesTecnicaComercial = false
    this.verTecnicas = false
    this.verReunionesSeccion = false;


    // this.guardarCo = false
    
    this.areas = {};  
  };

  this.adminTecnica = false
   this.nuevoConceptoAdminTecnica = function()
  {
    //this.tecnica = true
    this.edicionArea = false
    this.coordinacionesTecnicaComercial = false
    this.verTecnicaSeccion = false
    this.verTecnicas = true
    this.panelComercial = false
    this.verCoordinacion = false
    this.verTecnica = false
    this.verComercialSeccion = false
    this.verAdministracion = false
    this.verTodas = false
    this.verComercialAdmin = false
    this.coordinacionesTecnicaComercial = false
    this.verReunionesSeccion = false;

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
     this.verPermisos = false
     this.verComercialAdmin = false
     this.coordinacionesTecnicaComercial = false
     this.verTecnicas = false
     this.verReunionesSeccion = false;
  };

  this.newTecnica = function()
  {
    this.panelComercial = false
    this.verCoordinacion = false
    this.verTecnica = true
    this.verComercialSeccion = false
    this.verTecnicaSeccion = false
    this.verAdministracion = false
    this.verPermisos = false
    this.verTodas = false
    this.verComercialAdmin = false
    this.verTecnicaComercial = false
    this.coordinacionesTecnicaComercial = false
    this.tecnica = {};  
    this.verTecnicaSeccion = false
    this.verTecnicas = false
    this.verReunionesSeccion = false;
    
  };
  this.newAdministracion = function()
  {
    this.panelComercial = false
    this.verCoordinacion = false
    this.verTecnica = false
    this.verComercialSeccion = false
    this.verTecnicaSeccion = false
    this.verAdministracion = true
    this.verTecnicas = false


    this.administracion = {}; 
      this.guardarCo = false
      this.verTodas = false
      this.verPermisos = false
      this.verComercialAdmin = false
      this.verTecnicaComercial = false
      this.coordinacionesTecnicaComercial = false
      this.verReunionesSeccion = false;
 

 
  };
  this.newComercialSeccion = function()
  {
    this.panelComercial = false
    this.verCoordinacion = false
    this.verTecnica = false
    this.verComercialSeccion = true
    this.verTecnicaSeccion = false
    this.verAdministracion = false
    this.verAdmin = false
    this.comercialSeccion = {}; 
    this.verTodas = false
    this.verPermisos = false
    this.verComercialAdmin = false
     this.verTecnicaComercial = false
     this.coordinacionesTecnicaComercial = false
     this.verTecnicaSeccion = false
     this.verTecnicas = false
     this.verReunionesSeccion = false;
 
  };
  this.newTecnicaSeccion = function()
  {
    this.panelComercial = false
    this.verCoordinacion = false
    this.verTecnica = false
    this.verComercialSeccion = false
    this.verTecnicaSeccion = true
    this.verTecnicas = false
    this.verAdministracion = false
    this.tecnicaSeccion = {}; 
    this.guardarCo = false
    this.guardarComer = false
    this.guardarAdmin = false
    this.guardarCom = false
    this.verTodas = false
    this.verPermisos = false
    this.verComercialAdmin = false
     this.verTecnicaComercial = false
     this.coordinacionesTecnicaComercial = false
     this.verAdmin = false
     this.verReunionesSeccion = false;

 
  };
  this.reunionesSeccion = function()
  {
    this.panelComercial = false
    this.verCoordinacion = false
    this.verTecnica = false
    this.verComercialSeccion = false
    this.verTecnicaSeccion = false
    this.verTecnicas = false
    this.verAdministracion = false
    this.reunionesSeccion = {}; 
    this.guardarCo = false
    this.guardarComer = false
    this.guardarAdmin = false
    this.guardarCom = false
    this.verTodas = false
    this.verPermisos = false
    this.verComercialAdmin = false
     this.verTecnicaComercial = false
     this.coordinacionesTecnicaComercial = false
     this.verAdmin = false
     this.verReunionesSeccion = true;

 
  };

   this.textPermisos = function(id)
  {
    this.area_id = id;
      this.verTecnicaComercial = false
    this.verAdmin = false
    this.verPermisos = true
     console.log(id); 
  };
     
   this.textverAdmin = function(id)
  {
    this.area_id = id;
    this.verTecnicaComercial = false
    this.verAdmin = true
    this.verPermisos = false
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
     this.textTecnicasComercial = function(id)
  {
    this.area_id = id;
    this.verTecnicaComercial = true
    this.verAdmin = false
    this.verPermisos = false

  };
  this.textverComercialAdmin = function(id)
  {
    this.verPermisos = false
    this.verComercialAdmin = true;
     this.area_id = id;
    this.verTecnicaComercial = false
    this.verAdmin = false
    this.verPermisos = false
  
  };

  this.textverTecnicaComercial = function(id)
  {
    this.verTecnicaComercial = true;
     this.verPermisos = false
    this.verComercialAdmin = false;
     this.area_id = id;
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
    this.verComercial = false;

  };
     this.textverReuniones = function(id)
  {
    this.verTecnicaComercial = false;
     this.verPermisos = false
    this.verComercialAdmin = false;
     this.area_id = id;
    this.verTecnicaComercial = false
    this.verAdmin = false
    this.verPermisos = false
    this.verComercial = false
    this.verTecnicas = false
    this.verComercial = false;
    this.verReuniones = true;

  };
  
  this.editar = function(id)
  {
    console.log("eñ id",id)
    this.coordinacion = Procesos.findOne({_id:id});
    this.action = false
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
    Procesos.update({_id:idTemp},{$set:costo});
    $('.collapse').collapse('hide');
    this.action = true
    this.coordinacion = {};
     
  };
  this.actualizarAreas = function(area)
  {
    console.log(area)
    var idTemp = area._id;
    delete area._id;   
    Areas.update({_id:idTemp},{$set:area});
    this.adminTecnica = false;
    this.edicionArea = false
     };

      this.borrarArea = function(id)
  {
    var area = Areas.findOne({_id:id});
    if(area.estatus == true)
      area.estatus = false;
    else
      area.estatus = true;
    
    Areas.update({_id: id},{$set :  {estatus : area.estatus}});
    };


  this.borrar = function(id)
  {
    var costo = Procesos.findOne({_id:id});
    if(costo.estatus == true)
      costo.estatus = false;
    else
      costo.estatus = true;
    
    Procesos.update({_id: id},{$set :  {estatus : costo.estatus}});
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
    Procesos.insert(this.coordinacion);
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
    Procesos.insert(this.coordinacion);
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
    Procesos.insert(this.coordinacion);
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
    Procesos.insert(this.coordinacion);
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
    Procesos.insert(this.coordinacion);
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
    Procesos.insert(this.coordinacion);
    toastr.success(' Guardado.');
    this.coordinacion = {}; 
  };
   this.guardarCoordinacionReuniones = function(coordinacion)
  {
    _.each(rc.coordinaciones, function(costo){
      delete costo.$$hashKey;
    });
    //this.control.costo_id = this.costo_id;
    coordinacion.area_id = this.area_id;
    coordinacion.reunionesCoor = true;
    coordinacion.usuario_id = Meteor.userId()
    this.coordinacion.estatus = true;
    coordinacion.obra_id = $stateParams.id;
    console.log(this.coordinacion);
    Procesos.insert(this.coordinacion);
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
    AreasProcesos.insert(area);
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
    AreasProcesos.insert(area);
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
    AreasProcesos.insert(area);
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
    AreasProcesos.insert(area);
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
    AreasProcesos.insert(area);
    toastr.success(' Guardado.');
    this.areas = {}; 
    this.adminTecnica = false
  };

   this.guardarAreasComercialAdmin = function(area)
  {
    _.each(rc.areas, function(costo){
      delete costo.$$hashKey;
    });
    area.comercialAd = true;
    area.usuario_id = Meteor.userId()
    area.estatus = true;
    area.obra_id = $stateParams.id;
    console.log(area);
    AreasProcesos.insert(area);
    toastr.success(' Guardado.');
    this.areas = {}; 
    this.adminTecnica = false
    //this.verComercialSeccion = true
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
    AreasProcesos.insert(area);
    toastr.success(' Guardado.');
    this.areas = {}; 
    this.adminTecnica = false

  };

    this.guardarAreasReuinones = function(area)
  {
    _.each(rc.areas, function(costo){
      delete costo.$$hashKey;
    });
    area.reuniones = true;
    area.usuario_id = Meteor.userId()
    area.estatus = true;
    area.obra_id = $stateParams.id;
    console.log(area);
    AreasProcesos.insert(area);
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
    this.verReuniones = false;

    this.panelComercial = false
    this.verCoordinacion = false
    this.verTecnica = false
    this.verComercialSeccion = false
    this.verTecnicaSeccion = false
    this.verAdmin = false
 this.verPermisos = false   

  };

};


