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

            $scope.$watch('[categories]', function (newObj, oldObj) {
                if (newObj === oldObj) {
                  return;
                }
                var categoryIds = filterOutSelectedCategoryIds($scope.categories);
                CrimesService.setCategoryIds(categoryIds);

                CrimesService.loadCrimes();
            }, true);

            $scope.$watch('[regions]', function (newObj, oldObj) {
                if (newObj === oldObj) {
                  return;
                }
                var regionIds = filterOutSelectedRegionIds($scope.regions);
                CrimesService.setRegionIds(regionIds);

                CrimesService.loadCrimes();
            }, true);

            $scope.dateFromChanged = function () {
                var dateFrom = +$scope.dateFrom;
                CrimesService.setDateFrom(dateFrom);

                CrimesService.loadCrimes();
            };

            $scope.dateToChanged = function () {
                var dateTo = +$scope.dateTo;
                CrimesService.setDateTo(dateTo);

                CrimesService.loadCrimes();
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
