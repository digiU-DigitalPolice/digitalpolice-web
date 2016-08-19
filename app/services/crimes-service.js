'use strict';

angular.module('myApp.services')
    .service("CrimesService", ['$http', 'ENV', 'MapService', '$timeout', function ($http, ENV, MapService, $timeout) {
        var $timer;
        $timeout.cancel($timer);
        $timer = $timeout(function () {
        var self = this;

        self.categoryIds = [];
        self.dateFrom = new Date("2014/01/01");
        self.dateTo = new Date("2017/01/01");

        self.setCategoryIds = function (categoryIds) {
            self.categoryIds = categoryIds;
        };

        self.setDateFrom = function (dateFrom) {
            self.dateFrom = dateFrom;
        };

        self.setDateTo = function (dateTo) {
            self.dateTo = dateTo;
        };

        self.loadCrimes = function () {
            var $timer;

            $timeout.cancel($timer);
            $timer = $timeout(function () {
            var params = {
                dateFrom: new Date(self.dateFrom).getTime(),
                dateTo: new Date(self.dateTo).getTime()
            };
            if (self.categoryIds.length > 0) {
                params.categories = self.categoryIds;
            } else {
                params.categories = [0];
            }

            var bounds = MapService.map.getBounds();

            params['southWest.latitude'] = bounds._southWest.lat,
            params['southWest.longitude'] = bounds._southWest.lng,
            params['northEast.latitude'] = bounds._northEast.lat,
            params['northEast.longitude'] = bounds._northEast.lng,

            $http({
                url: ENV.apiURL + '/crimes',
                method: 'GET',
                params: params
            }).
            success(function (geoJSON, status, headers, config) {
                MapService.renderMarkers(geoJSON);
            });
        }, 500);

        };

    }]);
