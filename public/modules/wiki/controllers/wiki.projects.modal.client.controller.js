'use strict';

angular.module('wiki').controller('ProjectsModalCtrl', function ($scope, $modal, $log, $http, $stateParams, Authentication) {
	$scope.myInterval = -1;

	$http.get('/' + $stateParams.moduleTitle).success(function(data){
		if (data.outstandingProj.length !== 0) {
			$scope.projects = data.outstandingProj[data.outstandingProj.length - 1].projects;
		} else {
			$scope.projects = [];
		}
	});



	$scope.open = function (size) {

		var modalInstance = $modal.open({
			templateUrl: 'ProjectsModalContent.html',
			controller: 'ProjectsModalInstanceCtrl',
			size: size,
			resolve: {
				projects: function () {
					return $scope.projects;
				}
			}
		});
	};
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('wiki').controller('ProjectsModalInstanceCtrl', function ($scope, $modalInstance, projects, $http, $stateParams, Authentication) {
	$scope.projects = projects;

	$scope.imgs = [];
	
	$scope.project = {name: '', academicYear: '', photo: $scope.imgs, video: ''};

	$scope.projects.push($scope.project);

    // "editedBy": "keepoking",
    // "type": "outstandingProj",
    // "outstandingProj": [{"name": "ai solver", "academicYear": "2030", "photo": ["img/kappa.png", "img/sdasdas.png"], "video": "www.youtube.com"}]
    
	$scope.save = function() {
		if ($scope.projectForm.$invalid || $scope.projectForm.$pristine) { alert('1'); return; }

		if (!$scope.projectForm.$invalid) {
			$http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: "outstandingProj", outstandingProj: $scope.projects}).success(function(data){
			});
		}

		$modalInstance.close();
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.uploadFile = function() {
		filepicker.setKey('ABMzRUFagRuyMHNU9Jksvz');
		filepicker.pickMultiple(
			{
				mimetypes: 'image/*',
				container: 'modal',
				services:['COMPUTER', 'DROPBOX', 'FACEBOOK', 'GMAIL', 'GOOGLE_DRIVE', 'INSTAGRAM'],
				maxSize: '800*400',
				maxFiles: '4',
			},

			function(Blob){
				// console.log(JSON.stringify(Blob));

				for(var i = 0; i < Blob.length; i++) {
					$scope.imgs.push(Blob[i].url);
				}

				// console.log("imgs: \n" + $scope.imgs);
			},

			function(FPError){
				console.log(FPError.toString());
			}
		);
	};
});

angular.module('wiki').filter('trusted', ['$sce', function ($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);