'use strict';

angular.module('wiki').controller('CollapseController', ['$scope', 
	function($scope) {
		$scope.isCollapsed = true;

		$scope.$watch('isCollapsed', function() {
        	$scope.text = $scope.isCollapsed ? 'Edit' : 'Hide';
	    });
	}
]);