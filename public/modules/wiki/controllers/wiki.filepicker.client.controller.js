'use strict';

angular.module('wiki').controller('FilePickerCtrl', ['$scope', 
	function ($scope) {
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
				},

				function(FPError){
					console.log(FPError.toString());
				}
			);
	    };
	}
]);