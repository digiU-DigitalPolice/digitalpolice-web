'use strict';

angular.module('myApp.map', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'controllers/map/map.html',
    controller: 'MapCtrl'
  });
}])

.controller('MapCtrl', ['$scope', 'CrimesService', function($scope, CrimesService) {

  CrimesService.initMap();

}]);
