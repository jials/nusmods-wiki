'use strict';

angular.module('wiki').controller('ModuleLogoFilePickerCtrl', ['$scope', 
	function ($scope) {

		$scope.module = { img: '' }; // TODO send get request to database to retrieve img url

		$scope.img = ($scope.module.img !== '') ? $scope.module.img : '/modules/wiki/img/logo/logo.png';

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
					console.log(JSON.stringify(Blob));
					console.log(Blob.url);
					// TODO send PUT request to store url
				},

				function(FPError){
					console.log(FPError.toString());
				}
			);
	    };
	}
]);