'use strict';

angular.module('frontendApp')
  .factory('$solr', ['$http', '$log', '$q', function($http, $log, $q) {
    var factory = {};
  
    var SOLR_URL = "http://localhost:8983/solr/hmdb/select?rows=250&wt=json&q=";
     
    /*
      Create marker objects from Solr Data

      Object with lan/lon and label properties
    */
    factory.toMarkers = function(data) {
      var markers = [];

      angular.forEach(data, function(value, key) {
        var coordData = value.coords.split(',');
        var message = value.name + "<br/><br/>" + value.description;

        var marker = {
          lat: parseFloat(coordData[0]),
          lon: parseFloat(coordData[1]),
          label: {
            message: message,
            show: false,
            showOnMouseOver: false,
            showOnMouseClick: true
          }
        };

        markers.push(marker);
      });

      return markers;
    };

    /*
      Create GeoJSON object from Solr Data

      Returns an object that adheres to spec defined at
      geojson.org.  This data can be used for various
      purposes in OpenLayers.
    */
    factory.toGeoJson = function(data) {
      var geojson = {
        type: 'FeatureCollection',
        features: [] 
      };

      angular.forEach(data, function(value, key) {
        var coordData = value.coords.split(',');
        for(var i = 0; i < coordData.length; i++) {
          coordData[i] = parseFloat(coordData[i]);
        }
        coordData.reverse();

        var marker = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: coordData
          },
          properties: {
            name: value.name,
            description: value.description
          }
        };

        geojson.features.push(marker);
      });

      return geojson;
    };

    factory.search = function(query) {
      $log.info('Searching for: ' + query);

      var deferred = $q.defer();
      var request = SOLR_URL + query;
      $http.get(request)
        .success(function(data, status, headers, config) {
          deferred.resolve(data.response.docs);
        })
        .error(function(data, status, headers, config) {
          deferred.reject();
        });

        return deferred.promise;
    };

    return factory;
}]);
