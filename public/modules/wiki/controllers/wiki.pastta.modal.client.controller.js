'use strict';

angular.module('wiki').controller('PastTACtrl', [ '$scope', '$modal', '$log', '$http', '$stateParams', 
	function ($scope, $modal, $log, $http, $stateParams) {
		$http.get('/' + $stateParams.moduleTitle).success(function(data){
			if (data.pastTA.length !== 0) {
				$scope.pastTAs = data.pastTA[data.pastTA.length - 1].faculties;
				$scope.history = data.pastTA;
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

		$scope.openRev = function (size) {
			var modalInstance = $modal.open({
				templateUrl: 'PastTARevModalContent.html',
				controller: 'PastTARevModalInstanceCtrl',
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

angular.module('wiki').controller('PastTAModalInstanceCtrl', [ '$scope', '$modalInstance', 'pastTAs', '$http', '$stateParams', 'Authentication', '$state',
	function ($scope, $modalInstance, pastTAs, $http, $stateParams, Authentication, $state) {
		for (var j = 0; j < pastTAs.length; j++) {
			delete pastTAs[j]._id;
			pastTAs[j].del = false;
		}	

		$scope.pastTAs = pastTAs;

		$scope.save = function () {
			if ($scope.PastTAForm.$invalid) { return; }

			var temp = [];
			for (var j = 0; j < pastTAs.length; j++) {
				if (pastTAs[j].del === false || pastTAs[j].del === '') {
					temp.push(pastTAs[j]);
				}
			}

			$scope.pastTAs = temp;

			$http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'pastTA', pastTA: $scope.pastTAs}).success(function(data){
				$modalInstance.close();
				$state.go($state.$current, null, { reload: true });
			});
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
			$state.go($state.$current, null, { reload: true });
		};

		$scope.add = function () {
			$scope.pastTAs.push({ 
				name: '',
				academicYearStart: '',
				academicYearEnd: '',
				photo: '',
				del: ''
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
	}
]);

angular.module('wiki').controller('PastTARevModalInstanceCtrl', [ '$scope', '$modalInstance', 'history', '$http', '$stateParams', 'Authentication', '$state',
    function ($scope, $modalInstance, history, $http, $stateParams, Authentication, $state) {
        $scope.history = history;

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    }
]);