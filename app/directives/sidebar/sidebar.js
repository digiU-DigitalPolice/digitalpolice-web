'use strict';

/* Directives */

angular.module('myApp.directives', [])

.directive('sidebar', function() {
	return {
		restrict : 'E',
		templateUrl : 'directives/sidebar/sidebar.html',
		replace : true,
		controller: 'SidebarCtrl'
	};
})

.controller('SidebarCtrl', ['$scope', '$http', 'ENV', 'CrimesService', 'CategoriesService',
function($scope, $http, ENV, CrimesService, CategoriesService) {

		$scope.categories = {};

		$scope.dateFrom = new Date("2014/01/01");
		$scope.dateTo = new Date("2017/01/01");

		CategoriesService.loadCategories(function(data){
			$scope.categories = data;
		});

		$scope.$watch('categories', function (newObj, oldObj) {
			$scope.reloadCrimesData();
		}, true);

		$scope.reloadCrimesData = function() {
			var categoryIds = filterOutSelectedCategoryIds($scope.categories);
			var dateFrom = +$scope.dateFrom;
			var dateTo = +$scope.dateTo;
			if(categoryIds.length == 0){
				categoryIds = [0]; //TODO: This is a workaround
			}
			CrimesService.renderCrimes(categoryIds, dateFrom, dateTo);
		}

		function filterOutSelectedCategoryIds(categories){
			var result = [];
			for (var i = 0; i < categories.length; i++) {
				if(categories[i].selected){
					result.push(categories[i].id);
				}
			}
			return result;
		}
}]);
