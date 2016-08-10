'use strict';

angular.module('myApp.map', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/map', {
            templateUrl: 'controllers/map/map.html',
            controller: 'MapCtrl'
        });
    }])

    .controller('MapCtrl', ['$scope', 'CrimesService', 'MapService', function ($scope, CrimesService, MapService) {
        var $timer;
        MapService.initMap();

        MapService.map.on('zoomend', function (e) {
            $timeout.cancel($timer);
            $timer = $timeout(function () {
                CrimesService.loadCrimes();
            }, 500);
        });

        MapService.map.on('moveend', function (e) {
            $timeout.cancel($timer);
            $timer = $timeout(function () {
                CrimesService.loadCrimes();
            }, 500);
        });

    }]);
