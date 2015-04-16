'use strict';

angular.module('wiki').controller('FunFactsModalCtrl', function ($scope, $modal, $log, $http, $stateParams, Authentication) {

	$http.get('/' + $stateParams.moduleTitle).success(function(data){
        $scope.content = data.funFacts[data.funFacts.length - 1].content;
    });

	$scope.open = function (size) {

		var modalInstance = $modal.open({
			templateUrl: 'FunFactsModalContent.html',
			controller: 'FunFactsModalInstanceCtrl',
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

angular.module('wiki').controller('FunFactsModalInstanceCtrl', function ($scope, $modalInstance, content, $http, $stateParams, Authentication) {
	$scope.content = content;

    $scope.save = function () {
        $http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'funFacts', funFacts: $scope.content}).success(function(data){     
        });
        $modalInstance.close();
    };

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});