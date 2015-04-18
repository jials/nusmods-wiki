'use strict';

angular.module('wiki').controller('PastTACtrl', function ($scope, $modal, $log, $http, $stateParams, Authentication) {
	$http.get('/' + $stateParams.moduleTitle).success(function(data){
		if (data.pastTA.length !== 0) {
			$scope.pastTAs = data.pastTA[data.pastTA.length - 1].faculties;
		} else {
			$scope.pastTAs = [];
		}
	});

	$scope.open = function (size) {
		var modalInstance = $modal.open({
			templateUrl: 'PastTAModalContent.html',
			controller: 'PastTAModalInstanceCtrl',
			size: size,
			resolve: {
				pastTAs: function () {
					return $scope.pastTAs;
				}
			}
		});
	};
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('wiki').controller('PastTAModalInstanceCtrl', function ($scope, $modalInstance, pastTAs, $http, $stateParams, Authentication) {
	for (var j = 0; j < pastTAs.length; j++) {
		delete pastTAs[j]._id;
	}	

	$scope.pastTAs = pastTAs;

	$scope.save = function () {
		$http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'pastTA', pastTA: $scope.pastTAs}).success(function(data){
		});
		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.add = function () {
		$scope.pastTAs.push({ 
			name: '',
			academicYearStart: '',
			academicYearEnd: '',
			photo: ''
		});
	};

	$scope.uploadFile = function(index) {
		filepicker.setKey('ABMzRUFagRuyMHNU9Jksvz');
		filepicker.pickMultiple(
			{
				mimetypes: 'image/*',
				container: 'modal',
				services:['COMPUTER', 'DROPBOX', 'FACEBOOK', 'GMAIL', 'GOOGLE_DRIVE', 'INSTAGRAM'],
				maxSize: '1584*2016',
				maxFiles: '1',
			},
			function(Blob){
				$scope.pastTA[index].photo = Blob[0].url;
			},
			function(FPError){
				console.log(FPError.toString());
			}
		);
	};
});