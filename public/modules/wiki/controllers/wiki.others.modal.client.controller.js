'use strict';

angular.module('wiki').controller('OthersModalCtrl', function ($scope, $modal, $log) {

  $scope.content = 'This is others content';

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'OthersModalContent.html',
      controller: 'OthersModalInstanceCtrl',
      size: size,
      resolve: {
        content: function () {
          return $scope.content;
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

angular.module('wiki').controller('OthersModalInstanceCtrl', function ($scope, $modalInstance, content) {

  $scope.content = content;

  $scope.save = function () {
    alert('saving ' + $scope.content);
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});