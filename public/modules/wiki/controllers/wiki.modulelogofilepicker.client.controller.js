'use strict';

angular.module('wiki').controller('ModuleLogoFilePickerCtrl', ['$scope', '$http', '$stateParams', 'Authentication',
	function ($scope, $http, $stateParams, Authentication) {
		$scope.logo = [];

		$http.get('/' + $stateParams.moduleTitle).success(function(data){
			if (data.logo.length > 1) {
		        $scope.logo.push(data.logo[data.logo.length - 1]);
		        $scope.img = $scope.logo[0].content;
	    	} else {
	    		$scope.img = '/modules/wiki/img/logo/logo.png';
	    	}
	    });

	    $scope.uploadFile = function() {
	    	filepicker.setKey('ABMzRUFagRuyMHNU9Jksvz');
	        filepicker.pick(
				{
					mimetypes: 'image/*',
					container: 'modal',
					services:['COMPUTER', 'DROPBOX', 'FACEBOOK', 'GMAIL', 'GOOGLE_DRIVE', 'INSTAGRAM'],
					maxSize: '1024*1024',
				},

				function(Blob){
					// console.log(JSON.stringify(Blob));
					// console.log(Blob.url);
					$http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'logo', logo: Blob.url}).success(function(data){
				    });
				},

				function(FPError){
					console.log(FPError.toString());
				}
			);
	    };
	}
]);