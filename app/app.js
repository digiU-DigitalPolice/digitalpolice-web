'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'config',
  'ngRoute',
  'myApp.services',
  'myApp.map',
  'angular-loading-bar',
  'myApp.directives'
])

.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
  cfpLoadingBarProvider.includeSpinner = false;
}])


.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/map'});
}]);

angular.module('myApp.services', []);
