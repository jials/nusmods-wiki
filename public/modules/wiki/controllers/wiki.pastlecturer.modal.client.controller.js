'use strict';

angular.module('wiki').controller('PastLecturerCtrl', function ($scope, $modal, $log) {

  $scope.pastLecturer = [];

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

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      // $log.info('Modal dismissed at: ' + new Date());
    });
  };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('wiki').controller('PastLecturerModalInstanceCtrl', function ($scope, $modalInstance, pastLecturer) {

  $scope.pastLecturer = pastLecturer;

  $scope.save = function () {
    alert('saving ' + $scope.pastLecturer);
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});