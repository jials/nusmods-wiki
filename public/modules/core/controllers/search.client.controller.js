'use strict';

angular.module('core').controller('SearchController', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
		function getModules() {
			$http.get('/getmodules').success(function(data, status, headers, config) {
				$scope.modules = data;
			}).
		    error(function(data) {
		        // alert(data);
		    });
		}
		getModules(); // Load all modules

		$scope.submit = function() {
			$location.path('/' + $scope.selectedModule.ModuleCode);
		};
	}
]);