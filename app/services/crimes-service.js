'use strict';

angular.module('myApp.services')
.service("CrimesService", ['$http', 'ENV', function($http, ENV){
  var self = this;

  self.map = {}
  self.osmLayer = {}

  self.initMap = function(){
    self.map = new L.Map('map');

    // create the tile layer with correct attribution
    var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    self.osmLayer = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

    // start the map in South-East England
    self.map.setView([49.8327786, 23.9420238], 11);
    self.map.addLayer(self.osmLayer);
    return map;
  };

  self.renderCrimes = function(categories){
    $http({
      url: ENV.apiURL + '/crimes',
      method: 'GET',
      params: {
        dateFrom: '2015/01/01',
        dateTo: '2015/12/31',
        categories: categories
      }
    }).
    success(function(data, status, headers, config) {
      self.map.eachLayer(function (layer) {
        if(self.osmLayer !== layer){
          self.map.removeLayer(layer);
        }
      });
      L.geoJson(data).addTo(self.map);
    });
  };

}]);
