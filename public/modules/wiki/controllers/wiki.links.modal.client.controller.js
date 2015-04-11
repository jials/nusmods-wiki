'use strict';

angular.module('wiki').controller('LinksModalCtrl', function ($scope, $modal, $log) {

  $scope.home = 'www.nus.edu.sg';
  $scope.facebook = 'www.facebook.com';
  $scope.ivle = 'www.ivle.nus.edu.sg';

  $scope.links = [$scope.home, $scope.facebook, $scope.ivle];

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      templateUrl: 'LinksModalContent.html',
      controller: 'LinksModalInstanceCtrl',
      size: size,
      resolve: {
        links: function () {
          return $scope.links;
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

angular.module('wiki').controller('LinksModalInstanceCtrl', function ($scope, $modalInstance, links) {

  $scope.items = links;

  $scope.save = function () {
    alert('saving ' + $scope.items[0] + ' ' + $scope.items[1] + ' ' + $scope.items[2]);
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});