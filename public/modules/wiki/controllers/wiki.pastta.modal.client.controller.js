'use strict';

angular.module('wiki').controller('PastTACtrl', function ($scope, $modal, $log) {

  $scope.pastTA = [];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'PastTAModalContent.html',
      controller: 'PastTAModalInstanceCtrl',
      size: size,
      resolve: {
        pastTA: function () {
          return $scope.pastTA;
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

angular.module('wiki').controller('PastTAModalInstanceCtrl', function ($scope, $modalInstance, pastTA) {

  $scope.pastTA = pastTA;

  $scope.save = function () {
    alert('saving ' + $scope.pastTA);
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});