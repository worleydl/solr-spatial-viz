'use strict';

angular.module('frontendApp')
  .factory('$solr', ['$http', '$log', '$q', function($http, $log, $q) {
    var factory = {};
  
    var SOLR_URL = "http://localhost:8983/solr/hmdb/select?rows=100&wt=json&q=";
     
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
