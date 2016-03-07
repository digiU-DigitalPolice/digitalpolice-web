'use strict';

angular.module('myApp.services')
.service("CrimesService", ['$http', 'ENV', function($http, ENV){
  var self = this;

  self.loadCrimes = function(callback){
    $http({
      url: ENV.crimesUrl + '/crimes',
      method: "GET",
      params: {
        dateFrom: "2015/01/01",
        dateTo: "2015/12/31",
        categories: "1,2,3"
      }
    }).
    success(function(data, status, headers, config) {
        callback(data);
    });
  };

}]);
