'use strict';

angular.module('myApp.map', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/map', {
    templateUrl: 'controllers/map/map.html',
    controller: 'MapCtrl'
  });
}])

.controller('MapCtrl', ['$scope', 'CrimesService', function($scope, CrimesService) {

  $scope.map = new L.Map('map');

  $scope.initMap = function(){
    // create the tile layer with correct attribution
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

    // start the map in South-East England
    $scope.map.setView([49.8327786, 23.9420238], 11);
    $scope.map.addLayer(osm);
  };

  $scope.initMap();

  $scope.crimes = CrimesService.loadCrimes(function(geoJSON){
    L.geoJson(geoJSON).addTo($scope.map);
  });

}]);
