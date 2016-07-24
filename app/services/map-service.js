'use strict';

angular.module('myApp.services')
.service("MapService", [function(){
  var self = this;

  self.map = null;
  self.osmLayer = null;

  self.initMap = function () {
      self.map = new L.Map('map');

      // create the tile layer with correct attribution
      var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
      var osmAttrib = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
      self.osmLayer = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 19, attribution: osmAttrib});

      // start the map in South-East England
      self.map.setView([49.8327786, 23.9420238], 11);
      self.map.addLayer(self.osmLayer);
      return map;
  };

  self.renderMarkers = function(geoJSON) {
      self.map.eachLayer(function (layer) {
          if (self.osmLayer !== layer) {
              self.map.removeLayer(layer);
          }
      });
      L.geoJson(geoJSON, {
          onEachFeature: self.onEachFeature
      }).addTo(self.map);
  };

  self.onEachFeature = function (feature, layer) {
      if (feature.properties) {
          layer.bindPopup("count: " + feature.properties.count);
      }
  };

}]);
