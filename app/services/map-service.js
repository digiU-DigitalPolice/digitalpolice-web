'use strict';

angular.module('myApp.services')
    .service("MapService", [function () {
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

        self.renderMarkers = function (geoJSON) {
            self.map.eachLayer(function (layer) {
                if (self.osmLayer !== layer) {
                    self.map.removeLayer(layer);
                }
            });
            var markers = L.markerClusterGroup({
                zoomToBoundsOnClick:true,
                animate:true,
                animateAddingMarkers:true,
                showCoverageOnHover:false});

            for (var i = 0; i < geoJSON.features.length; ++i) {
                var feature = geoJSON.features[i];
                var c = L.marker(new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0])
                );
                markers.addLayer(c);
            }
            self.map.addLayer(markers);

            markers.on('clusterclick', function (a) {
                if (self.map.getZoom()<=15){
                    a.layer.unspiderfied;
                }else{
                a.layer.spiderfy();
                }
            });
        };

    }
    ]);
