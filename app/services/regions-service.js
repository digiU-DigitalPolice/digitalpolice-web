'use strict';

angular.module('myApp.services')
.service("RegionsService", ['$http', 'ENV', function($http, ENV){
  var self = this;

  self.loadRegions = function(callback){
    $http.get(ENV.apiURL + '/regions').then(function(res){
      callback(res.data);
    });
  };

}]);
