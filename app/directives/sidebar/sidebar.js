'use strict';

/* Directives */
angular.module('myApp.directives', [])

    .directive('sidebar', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/sidebar/sidebar.html',
            replace: true,
            controller: 'SidebarCtrl'
        };
    })

    .controller('SidebarCtrl', ['$scope', '$http', 'ENV', 'CrimesService', 'CategoriesService', 'RegionsService',
        function ($scope, $http, ENV, CrimesService, CategoriesService, RegionsService) {

            $scope.categories = {};

            $scope.dateFrom = new Date("2014/01/01");
            $scope.dateTo = new Date("2017/01/01");

            CategoriesService.loadCategories(function (data) {
                $scope.categories = data;
            });

            RegionsService.loadRegions(function (data) {
                $scope.regions = data;
            });
            $scope.$watch('[categories,regions]', function (newObj, oldObj) {
                $scope.reloadCrimesData();
                $scope.changeZoom();
            }, true);

            $scope.reloadCrimesData = function () {
                var categoryIds = filterOutSelectedCategoryIds($scope.categories);
                var regionIds = filterOutSelectedRegionIds($scope.regions);
                var dateFrom = +$scope.dateFrom;
                var dateTo = +$scope.dateTo;
                var params = {
                    dateFrom: dateFrom,
                    dateTo: dateTo
                };
                if (categoryIds.length > 0) {
                    params.categories = categoryIds;
                } else {
                    params.categories = [0];
                }
                if (regionIds.length > 0) {
                    params.regions = regionIds;
                }

                CrimesService.renderCrimes(params);
            };
            /*change zoom & update map*/
            $scope.changeZoom = function () {
                CrimesService.map.on('zoomend', function (e) {
                    $scope.reloadCrimesData();
                });

            };

            function filterOutSelectedCategoryIds(categories) {
                var result = [];
                for (var i = 0; i < categories.length; i++) {
                    if (categories[i].selected) {
                        result.push(categories[i].id);
                    }
                }
                return result;
            }

            function filterOutSelectedRegionIds(regions) {
                var result = [];
                for (var i = 0; i < regions.length; i++) {
                    if (regions[i].selected) {
                        result.push(regions[i].koatuu);
                    }
                }
                return result;
            }

        }]);
