'use strict';

angular.module('wiki').controller('FunFactsModalCtrl', [ '$scope', '$modal', '$log', '$http', '$stateParams',
    function ($scope, $modal, $log, $http, $stateParams) {
    	$http.get('/' + $stateParams.moduleTitle).success(function(data){
            if (data.funFacts.length !== 0) {
                $scope.content = data.funFacts[data.funFacts.length - 1].content;
                $scope.history = data.funFacts;
            } else {
                $scope.content = '';
            }
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

        $scope.openRev = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'FunFactsRevModalContent.html',
                controller: 'FunFactsRevModalInstanceCtrl',
                size: size,
                resolve: {
                    history: function () {
                        return $scope.history;
                    }
                }
            });
        };
    }
]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('wiki').controller('FunFactsModalInstanceCtrl', [ '$scope', '$modalInstance', 'content', '$http', '$stateParams', 'Authentication', '$state',
    function ($scope, $modalInstance, content, $http, $stateParams, Authentication, $state) {
    	$scope.content = content;

        $scope.save = function () {
            $http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'funFacts', funFacts: $scope.content}).success(function(data){     
                $modalInstance.close();
                $state.go($state.$current, null, { reload: true });
            });
        };

    	$scope.cancel = function () {
    		$modalInstance.dismiss('cancel');
    	};
    }
]);

angular.module('wiki').controller('FunFactsRevModalInstanceCtrl', [ '$scope', '$modalInstance', 'history', '$http', '$stateParams', 'Authentication', '$state',
    function ($scope, $modalInstance, history, $http, $stateParams, Authentication, $state) {
        $scope.history = history;

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
]);