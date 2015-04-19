'use strict';

angular.module('wiki')
.controller('LeftBarCtrl', ['$scope', 
	function($scope) {
		$scope.links = 
		[{ title: 'description' },
		{ title: 'prerequisite' },
		{ title: 'preclusion' },
		{ title: 'past-lecturer' },
		{ title: 'past-ta' },
		{ title: 'projects' },
		{ title: 'fun-facts' },
		{ title: 'others' }];
	}
]);

