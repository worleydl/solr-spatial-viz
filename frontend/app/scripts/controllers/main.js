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

    $scope.doSearch = function() {
      $solr.search($scope.query).then(function(data) {
        console.log(data); 
      });
    };
  }]);