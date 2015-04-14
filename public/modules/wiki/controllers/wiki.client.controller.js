'use strict';

// Wiki controller
angular.module('wiki')
.controller('WikiController', ['$scope', '$stateParams', '$location', 'Authentication',
	function($scope, $stateParams, $location, Authentication) {
		$scope.authentication = Authentication;

		$scope.moduleTitle = $stateParams.moduleTitle;

		$scope.isActive = function(item) {
			if (item === $location.hash()) {
				return true;
			}

			return false;
		};
	}
]);