'use strict';

angular.module('frontendApp')
  .factory('$solr', ['$http', '$log', '$q', function($http, $log, $q) {
    var factory = {};
  
    var SOLR_URL = "http://localhost:8983/solr/hmdb/select?rows=1000&wt=json&q=";
     

    function toGeoJson(data) {
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
    }

    factory.search = function(query) {
      $log.info('Searching for: ' + query);

      var deferred = $q.defer();
      var request = SOLR_URL + query;
      $http.get(request)
        .success(function(data, status, headers, config) {
          deferred.resolve(toGeoJson(data.response.docs));
        })
        .error(function(data, status, headers, config) {
          deferred.reject();
        });

        return deferred.promise;
    };

    return factory;
}]);
