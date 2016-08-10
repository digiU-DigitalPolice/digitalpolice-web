'use strict';

angular.module('myApp.services')
    .service("CrimesService", ['$http', 'ENV', function ($http, ENV) {
        var self = this;

        self.map = {};
        self.osmLayer = {};

        self.initMap = function () {
            self.map = new L.Map('map');

            // create the tile layer with correct attribution
            var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
            var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
            self.osmLayer = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 19, attribution: osmAttrib});

            // start the map in South-East England
            self.map.setView([49.8327786, 23.9420238], 11);
            self.map.addLayer(self.osmLayer);
            self.map.on('zoomend', function (e) {
                $scope.reloadCrimesData();
            });
            return map;
        };

        self.onEachFeature = function (feature, layer) {
            if (feature.properties) {
                layer.bindPopup("count: " + feature.properties.count);
            }
        };

        self.renderCrimes = function (params) {

            var bounds = self.map.getBounds();

            params['southWest.latitude'] = bounds._southWest.lat,
                params['southWest.longitude'] = bounds._southWest.lng,
                params['northEast.latitude'] = bounds._northEast.lat,
                params['northEast.longitude'] = bounds._northEast.lng,
                params['precision'] = self.map.getZoom() - 7;
            console.log('catch');
            $http({
                url: ENV.apiURL + '/crimes',
                method: 'GET',
                params: params
            }).
            success(function (data, status, headers, config) {
                self.map.eachLayer(function (layer) {
                    if (self.osmLayer !== layer) {
                        self.map.removeLayer(layer);
                    }
                });
                L.geoJson(data, {
                    onEachFeature: self.onEachFeature
                }).addTo(self.map);
            });
        };
    }]);