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
	for (var j = 0; j < projects.length; j++) {
		delete projects[j]._id;
	}

	$scope.projects = projects;

	$scope.add = function () {
		$scope.projects.push({ 
			name: '',
			academicYear1: '',
			academicYear2: '',
			photo: []
		});
	};

	$scope.save = function() {
		if ($scope.projectForm.$invalid || $scope.projectForm.$pristine) { return; }

		for (var i = 0; i < $scope.projects.length; i++) {
			if ($scope.projects[i].photo.length < 2) {
				return;
			}
		}

		if (!$scope.projectForm.$invalid) {
			$http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: "outstandingProj", outstandingProj: $scope.projects}).success(function(data){
			});
		}

		$modalInstance.close();
	};

	$scope.cancel = function() {
		$modalInstance.dismiss('cancel');
	};

	$scope.uploadFile = function(index) {
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
				for(var i = 0; i < Blob.length; i++) {
					$scope.projects[index].photo.push(Blob[i].url);
				}
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