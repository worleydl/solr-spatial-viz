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
    $scope.query = '';
    $scope.markers = [];

    $scope.layers = [];
    
    $scope.doSearch = function() {
      $solr.search($scope.query).then(function(data) {
        $scope.markers = data.features;

        $scope.layers = [];

        var layer = {
          type: 'Heatmap',
          source: {
            type: 'GeoJSON',
            radius: 5,
            geojson: { 
              object: data,
              projection: 'EPSG:3857' 
            }
          }
        }; 

        $scope.layers.push(layer);
      });
    };
  }]);
