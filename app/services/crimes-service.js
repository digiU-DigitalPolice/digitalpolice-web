'use strict';

angular.module('myApp.services')
    .service("CrimesService", ['$http', 'ENV', 'MapService', function ($http, ENV, MapService) {
        var self = this;

        self.categoryIds = [];
        self.regionIds = [];
        self.dateFrom = new Date("2014/01/01");
        self.dateTo = new Date("2017/01/01");

        self.setCategoryIds = function (categoryIds) {
            self.categoryIds = categoryIds;
        };

        self.setRegionIds = function (regionIds) {
            self.regionIds = regionIds;
        };

        self.setDateFrom = function (dateFrom) {
            self.dateFrom = dateFrom;
        };

        self.setDateTo = function (dateTo) {
            self.dateTo = dateTo;
        };

        self.loadCrimes = function () {
            var params = {
                dateFrom: new Date(self.dateFrom).getTime(),
                dateTo: new Date(self.dateTo).getTime()
            };
            if (self.categoryIds.length > 0) {
                params.categories = self.categoryIds;
            } else {
                params.categories = [0];
            }
            if (self.regionIds.length > 0) {
                params.regions = self.regionIds;
            }

            var bounds = MapService.map.getBounds();

            params['southWest.latitude'] = bounds._southWest.lat,
                params['southWest.longitude'] = bounds._southWest.lng,
                params['northEast.latitude'] = bounds._northEast.lat,
                params['northEast.longitude'] = bounds._northEast.lng,
                params['precision'] = MapService.map.getZoom() - 7;

            $http({
                url: ENV.apiURL + '/crimes',
                method: 'GET',
                params: params
            }).
            success(function (geoJSON, status, headers, config) {
                MapService.renderMarkers(geoJSON);
            });
        };

    }]);
