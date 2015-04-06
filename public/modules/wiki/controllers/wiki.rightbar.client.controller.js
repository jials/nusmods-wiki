'use strict';

// Wiki controller
angular.module('wiki').controller('RightbarController', ['$scope', '$http', 
	function($scope, $http) {
		function getModules() {  
			$http.get('http://api.nusmods.com/2014-2015/moduleInformation.json').success(function(data){
				$scope.modules = data;
			});
		}

		getModules(); // Load all modules
	}
]);