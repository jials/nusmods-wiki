'use strict';

angular.module('wiki').controller('OthersModalCtrl', function ($scope, $modal, $log, $http, $stateParams, Authentication) {

    $http.get('/' + $stateParams.moduleTitle).success(function(data){
        if (data.others.length !== 0) {
            $scope.content = data.others[data.others.length - 1].content;
        } else {
            $scope.content = '';
        }
    });

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
    };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('wiki').controller('OthersModalInstanceCtrl', function ($scope, $modalInstance, content, $http, $stateParams, Authentication) {

    $scope.content = content;

    $scope.save = function () {
        $http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'others', others: $scope.content}).success(function(data){
        });
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});