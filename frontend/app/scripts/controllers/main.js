'use strict';

/**
 * @ngdoc function
 * @name frontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the frontendApp
 */
angular.module('frontendApp')
  .controller('MainCtrl', ['$scope', '$solr', function ($scope, $solr) {
    // Start zoomed at US center
    $scope.center = {
      lon: -98.5795,
      lat: 39.8282,
      zoom: 4
    };

    // The search query
    $scope.query = '';

    // Map state variables
    $scope.mapMode = 'Markers';
    $scope.markers = [];
    $scope.layers = [];
    
    // Carry out search and update state vars
    $scope.doSearch = function() {
      $solr.search($scope.query).then(function(data) {
        $scope.markers = $solr.toMarkers(data);

        $scope.layers = [];

        var layer = {
          opacity: 0.5,
          type: 'Heatmap',
          source: {
            type: 'GeoJSON',
            radius: 5,
            geojson: { 
              object: $solr.toGeoJson(data),
              projection: 'EPSG:3857' 
            }
          }
        }; 

        $scope.layers.push(layer);
      });
    };
  }]);
