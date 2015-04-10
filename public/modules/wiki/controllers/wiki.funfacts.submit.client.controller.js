'use strict';

angular.module('wiki')
.controller('FunFactsSubmitCtrl', ['$scope', 
  function($scope) {
    $scope.submit = function() {
      alert($scope.content);
    };
  }
]);