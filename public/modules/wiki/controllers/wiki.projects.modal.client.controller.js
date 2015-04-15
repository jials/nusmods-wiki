'use strict';

angular.module('wiki').controller('ProjectsModalCtrl', function ($scope, $modal, $log) {

	$scope.content = 'This is fun facts content';

	$scope.open = function (size) {

		var modalInstance = $modal.open({
			templateUrl: 'ProjectsModalContent.html',
			controller: 'ProjectsModalInstanceCtrl',
			size: size,
			resolve: {
				content: function () {
					return $scope.content;
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

angular.module('wiki').controller('ProjectsModalInstanceCtrl', function ($scope, $modalInstance, content) {

	$scope.content = content;
	$scope.imgs = [];

	$scope.save = function () {
		alert('saving ' + $scope.imgs);
		$modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

	$scope.uploadFile = function() {
		filepicker.setKey('ABMzRUFagRuyMHNU9Jksvz');
		filepicker.pickMultiple(
			{
				mimetypes: 'image/*',
				container: 'modal',
				services:['COMPUTER', 'DROPBOX', 'FACEBOOK', 'GMAIL', 'GOOGLE_DRIVE', 'INSTAGRAM'],
				maxSize: '1024*1024',
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