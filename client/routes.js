angular.module("formulas").run(function ($rootScope, $state, toastr) {
  $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireUser promise is rejected
    // and redirect the user back to the main page
    switch(error) {
      case "AUTH_REQUIRED":
        $state.go('anon.login');
        break;
      case "FORBIDDEN":
        //$state.go('root.home');
        break;
      case "UNAUTHORIZED":
      	toastr.error("Acceso Denegado");
				toastr.error("No tiene permiso para ver esta opción");
        break;
      default:
        $state.go('internal-client-error');
    }
/*
    if (error === 'AUTH_REQUIRED') {
      $state.go('anon.login');
    }
*/
  });
});

angular.module('formulas').config(['$injector', function ($injector) {
  var $stateProvider = $injector.get('$stateProvider');
  var $urlRouterProvider = $injector.get('$urlRouterProvider');
  var $locationProvider = $injector.get('$locationProvider');

  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

  /***************************
   * Anonymous Routes
   ***************************/
  $stateProvider
    .state('anon', {
      url: '',
      abstract: true,
      template: '<ui-view/>'
    })
    .state('anon.login', {
      url: '/login',
      templateUrl: 'client/login/login.ng.html',
      controller: 'LoginCtrl',
      controllerAs: 'lc'
    })
    .state('anon.logout', {
      url: '/logout',
      resolve: {
        'logout': ['$meteor', '$state', 'toastr', function ($meteor, $state, toastr) {
          return $meteor.logout().then(
            function () {
	            toastr.success("Vuelva pronto.");
              $state.go('anon.login');
            },
            function (error) {
              toastr.error(error.reason);
            }
          );
        }]
      }
    });

  /***************************
   * Login Users Routes
   ***************************/
  $stateProvider
    .state('root', {
      url: '',
      abstract: true,
      templateUrl: 'client/layouts/root.ng.html',
      controller: 'RootCtrl',
    })
    .state('root.home', {
      url: '/',
      templateUrl: 'client/home/home.ng.html',      
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    }
    })
    .state('root.estadisticas', {
      url: '/',
      templateUrl: 'client/estadisticas/estadisticas.ng.html',
      controller: 'EstadisticasCtrl as est',
      resolve: {
	      "currentUser": ["$meteor", function($meteor){
	        return $meteor.requireUser();
	      }]
	    }
    })
    //<-///////////////////  MATERIALES  //////////////-->//

    .state('root.materiales', {
      url: '/materiales',
      templateUrl: 'client/materiales/materiales.ng.html',
      controller: 'MaterialesCtrl as mat',
    })
     .state('root.editarMateriales', {
      url: '/editarMateriales/:material_id',
      templateUrl: 'client/materiales/materialesDetalle.ng.html',
      controller: 'MaterialesDetalleCtrl as mat',
    })
     .state('root.materialesDetalle', {
      url: '/materialesDetalle/',
      templateUrl: 'client/materiales/materialesDetalle.ng.html',
      controller: 'MaterialesDetalleCtrl as mat',
    })

     //<--///////////////// CLIENTES ////////////////////-->//

     .state('root.clientes', {
      url: '/clientes/:id',
      templateUrl: 'client/clientes/clientes.ng.html',
      controller: 'ClientesCtrl as client',
    })
     .state('root.editarCliente', {
      url: '/editarCliente/:cliente_id',
      templateUrl: 'client/clientes/clientesDetalle.ng.html',
      controller: 'EditarClienteCtrl as cl',
    })
     .state('root.clientesDetalle', {
      url: '/clientesDetalle/',
      templateUrl: 'client/clientes/clientesDetalle.ng.html',
      controller: 'ClientesDetalleCtrl as cl',
    })
      //<--///////////////// PRODUCTOS ////////////////////-->//

      .state('root.productos', {
      url: '/productos',
      templateUrl: 'client/productos/productos.ng.html',
      controller: 'ProductosCtrl as pro',
    })
      .state('root.editarProductos', {
      url: '/editarProductos/:producto_id',
      templateUrl: 'client/productos/productosDetalle.ng.html',
      controller: 'EditarProductosCtrl as pro',
    })
     .state('root.productosDetalle', {
      url: '/productosDetalle/',
      templateUrl: 'client/productos/productosDetalle.ng.html',
      controller: 'ProductosDetalleCtrl as pro',
    })
      //<--///////////////// COTIZACION ////////////////////-->//

      .state('root.cotizacion', {
      url: '/cotizacion',
      templateUrl: 'client/cotizacion/cotizacion.ng.html',
      controller: 'CotizacionCtrl as cot',
    })
        .state('root.editarCotizacion', {
      url: '/editarCotizacion/:cotizacion_id',
      templateUrl: 'client/cotizacion/editarCotizacion.ng.html',
      controller: 'EditarCotizacionDetalleCtrl as cot',
    })
     .state('root.cotizacionDetalle', {
      url: '/cotizacionDetalle/:cantidad',
      templateUrl: 'client/cotizacion/cotizacionDetalle.ng.html',
      controller: 'CotizacionDetalleCtrl as cot',
    })


      .state('anon.imprimirCotizacion', {
      url: '/imprimirCotizacion/:cotizacion_id',
      templateUrl: 'client/cotizacion/imprimirCotizacion.ng.html',
      controller: 'ImprimirCotizacionCtrl as cot',
    })
      //<--///////////////// ORDEN DE COMPRA ////////////////////-->//

      .state('root.ordenCompra', {
      url: '/ordenCompra',
      templateUrl: 'client/ordenCompra/ordenCompra.ng.html',
      controller: 'OrdenCompraCtrl as orden',

    })
      .state('root.ordenCompraDetalle', {
      url: '/ordenCompraDetalle/:cotizacion_id',
      templateUrl: 'client/ordenCompra/ordenCompraDetalle.ng.html',
      controller: 'OrdenCompraDetalleCtrl as orden',

    })

         .state('root.EditarOrdenCompraDetalle', {
      url: '/ordenCompraDetalle/:cotizacion_id',
      templateUrl: 'client/ordenCompra/ordenCompraDetalle.ng.html',
      controller: 'EditarOrdenCompraDetalleCtrl as orden',
  })

         //<--///////////////// ORDEN DE PRODUCCIÓN ////////////////////-->//

      .state('root.ordenProduccion', {
      url: '/ordenProduccion',
      templateUrl: 'client/ordenProduccion/ordenProduccion.ng.html',
      controller: 'OrdenProduccionCtrl as orden',

    })
      .state('root.ordenProduccionDetalle', {
      url: '/ordenProduccionDetalle/:cotizacion_id',
      templateUrl: 'client/ordenProduccion/ordenProduccionDetalle.ng.html',
      controller: 'OrdenProduccionDetalleCtrl as orden',

    })

         .state('root.editarOrdenProduccion', {
      url: '/editarOrdenProduccion/:ordenProduccion_id',
      templateUrl: 'client/ordenProduccion/editarOrdenProduccion.ng.html',
      controller: 'EditarOrdenProduccionCtrl as orden',
  })
  //<--///////////////// USUARIOS ////////////////////-->//
    .state('root.usuarios', {
      url: '/usuarios',
      templateUrl: 'client/usuarios/usuarios.ng.html',
      controller: 'UsuariosCtrl as usu',
    })

       .state('root.partidas', {
      url: '/partidas/:id',
      templateUrl: 'client/partidas/partidas.ng.html',
      controller: 'PartidasCtrl as par',
    })
        .state('root.conceptos', {
      url: '/conceptos/:id/:partida_id',
      templateUrl: 'client/partidas/conceptos.ng.html',
      controller: 'ConceptosCtrl as con',
    })
    .state('root.planes', {
      url: '/planes/:id',
      templateUrl: 'client/planes/planes.ng.html',
      controller: 'PlanesCtrl as pl',
    })
    .state('root.planes2', {
      url: '/planes2/:id',
      templateUrl: 'client/planes2/planes2.ng.html',
      controller: 'Planes2Ctrl as pl',
    })
    .state('root.meses', {
      url: '/obra/:id',
      templateUrl: 'client/obras/meses.ng.html',
      controller: 'MesesCtrl as mes',
    })
    .state('root.mes', {
      url: '/AgregarMes/',
      templateUrl: 'client/obras/mes.ng.html',
      controller: 'MesCtrl as mes',
    })
     .state('root.costos', {
      url: '/costos/:id',
      templateUrl: 'client/costos/costos.ng.html',
      controller: 'CostosCtrl as cos',
    })
     .state('root.presupuestos', {
      url: '/presupuestos/:id',
      templateUrl: 'client/presupuestos/presupuestos.ng.html',
      controller: 'PresupuestosCtrl as pres',
    })
      .state('root.gastos', {
      url: '/gastos/:id',
      templateUrl: 'client/gastos/gastos.ng.html',
      controller: 'GastosCtrl as gas',
    })
     .state('root.periodos', {
      url: '/periodos/:id',
      templateUrl: 'client/periodos/periodos.ng.html',
      controller: 'PeriodosCtrl as per',
    })
      .state('root.GI', {
      url: '/GI/',
      templateUrl: 'client/GI/GI.ng.html',
      controller: 'GICTRL as GI',
    })
      .state('root.addGasto', {
      url: '/GastosDeOficina/',
      templateUrl: 'client/GI/addGasto.ng.html',
      controller: 'AddGasto as add',
    })
        .state('root.verGastos', {
      url: '/verGastos/',
      templateUrl: 'client/GI/verGastos.ng.html',
      controller: 'verGastosCtrl as gas',
    })
      .state('root.control', {
      url: '/control/:id',
      templateUrl: 'client/control/control.ng.html',
      controller: 'ControlCrtl as ct',
    })
      .state('root.costosDirectos', {
      url: '/costosDirectos/:id',
      templateUrl: 'client/costosDirectos/costosDirectos.ng.html',
      controller: 'CostosDirectosCrtl as cd',
    });
}]);     