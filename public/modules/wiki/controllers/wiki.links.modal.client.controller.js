'use strict';

angular.module('wiki').controller('LinksModalCtrl', [ '$scope', '$modal', '$log', '$http', '$stateParams',
    function ($scope, $modal, $log, $http, $stateParams) {
        $scope.links = [{content: '', title: 'home page'}, {content: '', title: 'facebook'}];

    	$http.get('/' + $stateParams.moduleTitle).success(function(data){
            $scope.links[0].content = data.homePage[data.homePage.length - 1];
            $scope.links[1].content = data.facebook[data.facebook.length - 1];
        });

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
    	};
    }
]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('wiki').controller('LinksModalInstanceCtrl', [ '$scope', '$modalInstance', 'links', '$http', '$stateParams', 'Authentication',
    function ($scope, $modalInstance, links, $http, $stateParams, Authentication) {
    	$scope.links = links;

        $scope.uploadFile = function() {
            filepicker.setKey('ABMzRUFagRuyMHNU9Jksvz');
            filepicker.pick(
                {
                    mimetypes: 'image/*',
                    container: 'modal',
                    services:['COMPUTER', 'DROPBOX', 'FACEBOOK', 'GMAIL', 'GOOGLE_DRIVE', 'INSTAGRAM'],
                    maxSize: '1024*1024',
                },

                function(Blob) {
                    $http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'logo', logo: Blob.url}).success(function(data){ 
                    });
                },

                function(FPError){
                    console.log(FPError.toString());
                }
            );
        };

    	$scope.save = function () {
    		$scope.$broadcast('show-errors-check-validity');

            // don't allow if both checked and untouched
      		if (!$scope.linksForm.$dirty && $scope.linksForm.$invalid && $scope.disabledHomepage && $scope.disabledFacebook) { return; }

            // don't allow if both checked
            if ($scope.linksForm.$invalid && $scope.disabledHomepage && $scope.disabledFacebook) { return; }

            // don't allow if homepage is blank
            if (!$scope.disabledHomepage && $scope.disabledFacebook) {
                $http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'homePage', homePage: $scope.links[0].content.content}).success(function(data){     
                });
                $modalInstance.close();
            }

            // don't allow if facebook is blank
            if ($scope.disabledHomepage && !$scope.disabledFacebook) {
                $http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'facebook', facebook: $scope.links[1].content.content}).success(function(data){     
                });
                $modalInstance.close();
            }

            if (!$scope.linksForm.$invalid && !$scope.disabledHomepage && !$scope.disabledFacebook) {
                $http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'homePage', homePage: $scope.links[0].content.content}).success(function(data){     
                });
                $http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'facebook', facebook: $scope.links[1].content.content}).success(function(data){     
                });
                $modalInstance.close();
            }
    	};

    	$scope.cancel = function () {
    		$modalInstance.dismiss('cancel');
    	};
    }
]);