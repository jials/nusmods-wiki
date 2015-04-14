'use strict';

angular.module('wiki').controller('MainContentCtrl', ['$scope', '$http', '$filter', '$stateParams', 'filterFilter',
	function($scope, $http, $filter, $stateParams, filterFilter) {
		function getModules() {  
			$http.get('http://api.nusmods.com/2014-2015/moduleInformation.json?callback=?').success(function(data){
				$scope.modules = data;
			});
		}

		getModules(); // Load all modules
	}
]);