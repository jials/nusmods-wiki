'use strict';

angular.module('wiki').controller('MainContentCtrl', ['$scope', '$http', '$stateParams',
	function($scope, $http, $stateParams) {
		$http.get('http://api.nusmods.com/2014-2015/modules/' + $stateParams.moduleTitle + '/index.json?callback=?').success(function(data){
			$scope.module = data;
		});
	}
]);