'use strict';

angular.module('core').controller('SearchController', ['$scope', '$http', '$location', 
	function($scope, $http, $location) {
		function getModules() {
			$http.get('http://api.nusmods.com/2014-2015/moduleList.json').success(function(data){
				$scope.modules = data;
			});
		}
		getModules(); // Load all modules

		$scope.submit = function() {
			$location.path('/' + $scope.selectedModule.ModuleCode);
		};
	}
]);
