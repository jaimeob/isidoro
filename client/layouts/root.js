angular.module("formulas").controller("RootCtrl", ['$scope', '$meteor', function ($scope, $meteor)
{
  $scope.isLoggedIn = function(){
	  return Meteor.user();
  } 
}]);