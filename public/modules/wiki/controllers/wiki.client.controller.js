'use strict';

// Wiki controller
angular.module('wiki').controller('WikiController', ['$scope', '$stateParams', '$location',
	function($scope, $stateParams, $location) {
		$scope.moduleTitle = $location.path().substr(1);

		$scope.isActive = function(item) {
			if (item == $location.hash()) {
				return true;
			}

			return false;
		};
	}
]);