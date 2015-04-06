//Define an angular module for our app
'use strict';

angular.module('core').controller('autocompleteController', function($scope, $rootScope, $http) {
	getModules(); // Load all modules
	function getModules() {  
		$http.get("http://api.nusmods.com/2014-2015/moduleList.json").success(function(data){
			$scope.modules = data;
		});
	}

	$scope.onSelect = function onSelect($item) {
		var selectedModule = $item;
		alert(selectedModule);
	}

	// var core = angular.module('core', []);
	// var wiki = angular.module('wiki', ['core']);
	// wiki.controller('rightbar', function($scope, selectedModule) {
	// 	$scope.selectedModule = selectedModule; 
	// });
});
