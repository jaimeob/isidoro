angular.module('formulas').controller('LoginCtrl', ['$injector', function ($injector) {
  var $meteor = $injector.get('$meteor');
  var $state 	= $injector.get('$state');
  var toastr 	= $injector.get('toastr');
  this.credentials = {
    username: '',
    password: ''
  };
  this.login = function () {
    $meteor.loginWithPassword(this.credentials.username, this.credentials.password).then(
      function () {
	      toastr.success("Bienvenido al Sistema");
        if(Meteor.user().roles[0] == "admin" )
        {
          $state.go('root.empresas'); 
        }else{
          $state.go('root.obras'); 
        }
               
      },
      function (error) {
        toastr.error(error.reason);
      }
    )
  }
}]);