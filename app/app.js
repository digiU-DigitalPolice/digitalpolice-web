'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'config',
  'ngRoute',
  'myApp.services',
  'myApp.map',
  'myApp.view2'
])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/map'});
}]);

angular.module('myApp.services', []);
