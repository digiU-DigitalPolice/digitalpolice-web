'use strict';

angular.module('myApp.services')
.service("CategoriesService", ['$http', 'ENV', function($http, ENV){
  var self = this;

  self.loadCategories = function(callback){
    $http.get(ENV.apiURL + '/categories').then(function(res){
      callback(res.data);
    });
  };

}]);
