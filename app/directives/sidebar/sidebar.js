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

		CategoriesService.loadCategories(function(data){
			$scope.categories = data;
		});

		$scope.$watch('categories', function (newObj, oldObj) {
			var categoryIds = filterOutSelectedCategoryIds($scope.categories);
			if(categoryIds.length == 0){
				categoryIds = [0]; //TODO: This is a workaround
			}
			CrimesService.renderCrimes(categoryIds);
		}, true);

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
