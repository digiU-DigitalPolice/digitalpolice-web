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
            /*TODO render map(zoom)*/
            var markers = L.markerClusterGroup();
            for (var i = 0; i < geoJSON.features.length; ++i) {
                console.log(geoJSON.features.length);
                var feature = geoJSON.features[i];
                var c = L.marker(new L.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0],
                    {icon: iconCreateFunction(feature)})
                );
                markers.addLayer(c);
            }
            self.map.addLayer(markers);
        };
        var iconCreateFunction = function (feature) {
            var childCount = feature.properties.count;

            var c = ' marker-cluster-';
            if (childCount < 10) {
                c += 'small';
            } else if (childCount < 100) {
                c += 'medium';
            } else {
                c += 'large';
            }

            return new L.DivIcon({
                html: '<div><span><b>' + childCount + '</b></span></div>',
                className: 'marker-cluster' + c,
                iconSize: new L.Point(40, 40)
            });

            //L.geoJson(geoJSON).addTo(self.map);
        }
    }
    ]);
