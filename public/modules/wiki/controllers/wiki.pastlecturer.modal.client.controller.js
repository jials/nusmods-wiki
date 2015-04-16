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
  $http.get('/' + $stateParams.moduleTitle).success(function(data){
    $scope.pastLecturers = data.pastLecturer[data.pastLecturer.length - 1].faculties;
  });

  $scope.save = function () {
    $scope.pastLecturers.push({name: $scope.pastLecturer.name, academicYear: $scope.pastLecturer.academicYear1 +'/'+ $scope.pastLecturer.academicYear2});

    $http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'pastLecturer', pastLecturer: $scope.pastLecturers}).success(function(data){
      console.log(success);
    });

    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});