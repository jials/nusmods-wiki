'use strict';

angular.module('wiki').controller('ModuleLogoFilePickerCtrl', ['$scope', '$http', '$stateParams', 'Authentication',
	function ($scope, $http, $stateParams, Authentication) {
		$http.get('/' + $stateParams.moduleTitle).success(function(data){
			if (data.logo.length !== 0) {
		        $scope.img = data.logo[0].content;
	    	} else {
	    		$scope.img = '/modules/wiki/img/logo/logo.png';
	    	}
	    });
	}
]);