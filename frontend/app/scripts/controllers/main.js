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

    $scope.doSearch = function() {
      $solr.search($scope.query).then(function(data) {
        $scope.markers = [];
        angular.forEach(data, function(value, key) {
          var coordData = value.coords.split(',');

          var marker = {
            name: value.name,
            lat: parseFloat(coordData[0]),
            lon: parseFloat(coordData[1])
          };

          $scope.markers.push(marker);
        });
      });
    };
  }]);
