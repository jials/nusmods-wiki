'use strict';

angular.module('wiki').controller('PastLecturerCtrl', function ($scope, $modal, $log) {

  $scope.pastLecturer = {name: '', academicYear: ''};

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'PastLecturerModalContent.html',
      controller: 'PastLecturerModalInstanceCtrl',
      size: size,
      resolve: {
        pastLecturer: function () {
          return $scope.pastLecturer;
        }
      }
    });
  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('wiki').controller('PastLecturerModalInstanceCtrl', function ($scope, $modalInstance, pastLecturer, $http, $stateParams, Authentication) {

  $scope.pastLecturer = pastLecturer;

  $scope.save = function () {
    // checks for empty past lecturer name
    // if ($scope.pastLecturer.name === '') {
    //   return;
    // }

    // if (Math.abs($scope.pastLecturer.academicYear1 - $scope.pastLecturer.academicYear2) > 2) {
    //   return;
    // }

    $scope.isDisabled = false;

    $http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'pastLecturer', pastLecturer: [{name: $scope.pastLecturer.name, academicYear: $scope.pastLecturer.academicYear1 +'/'+ $scope.pastLecturer.academicYear2}]}).success(function(data){
      console.log(success);
    });

    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});