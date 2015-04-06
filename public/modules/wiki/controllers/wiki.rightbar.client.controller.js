'use strict';

// Wiki controller
angular.module('core').controller('RightbarController', function($scope, $http) {
	getModules(); // Load all modules
	function getModules() {  
		$http.get("http://api.nusmods.com/2014-2015/moduleInformation.json").success(function(data){
			$scope.modules = data;
		});
	}
});