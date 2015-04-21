'use strict';

angular.module('wiki').controller('PastLecturerCtrl', [ '$scope', '$modal', '$log', '$http', '$stateParams',
	function ($scope, $modal, $log, $http, $stateParams) {
		$http.get('/' + $stateParams.moduleTitle).success(function(data){
			if (data.pastLecturer.length !== 0) {
				$scope.pastLecturers = data.pastLecturer[data.pastLecturer.length - 1].faculties;
			} else {
				$scope.pastLecturers = [];
			}
		});

		$scope.open = function (size) {
			var modalInstance = $modal.open({
				templateUrl: 'PastLecturerModalContent.html',
				controller: 'PastLecturerModalInstanceCtrl',
				size: size,
				resolve: {
					pastLecturers: function () {
						return $scope.pastLecturers;
					}
				}
			});
		};
	}
]);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('wiki').controller('PastLecturerModalInstanceCtrl', [ '$scope', '$modalInstance', 'pastLecturers', '$http', '$stateParams', 'Authentication', '$state',
	function ($scope, $modalInstance, pastLecturers, $http, $stateParams, Authentication, $state) {
		for (var j = 0; j < pastLecturers.length; j++) {
			delete pastLecturers[j]._id;
			pastLecturers[j].del = false;
		}

		$scope.pastLecturers = pastLecturers;

		$scope.save = function () {
			if ($scope.PastLecturerForm.$invalid) { return; }

			var temp = [];
			for (var j = 0; j < pastLecturers.length; j++) {
				if (pastLecturers[j].del === false || pastLecturers[j].del === '') {
					temp.push(pastLecturers[j]);
				}
			}

			$scope.pastLecturers = temp;

			$http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'pastLecturer', pastLecturer: $scope.pastLecturers}).success(function(data){
				$modalInstance.close();
				$state.go($state.$current, null, { reload: true });
			});
		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
			$state.go($state.$current, null, { reload: true });
		};

		$scope.add = function () {
			$scope.pastLecturers.push({ 
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
					$scope.pastLecturers[index].photo = Blob[0].url;
				},
				function(FPError){
					console.log(FPError.toString());
				}
			);
		};
	}
]);