'use strict';

// Wiki controller
angular.module('wiki')
.controller('WikiController', ['$scope', '$stateParams', '$location',
	function($scope, $stateParams, $location) {
		$scope.moduleTitle = $stateParams.moduleTitle;

		$scope.isActive = function(item) {
			if (item === $location.hash()) {
				return true;
			}

			return false;
		};
	}
]);