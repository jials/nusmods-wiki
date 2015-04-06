//Define an angular module for our app
'use strict';

angular.module('core').controller('SearchController', function($scope, $http) {
	getModules(); // Load all modules
	function getModules() {  
		$http.get("http://api.nusmods.com/2014-2015/moduleList.json").success(function(data){
			$scope.modules = data;
		});
	}
});
