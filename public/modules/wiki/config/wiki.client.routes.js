'use strict';

// Setting up route
angular.module('wiki').config(['$stateProvider',
	function($stateProvider) {
		// wiki state routing
		$stateProvider.
		state('wiki', {
			url: '/:moduleId',
			templateUrl: 'modules/wiki/views/wiki.client.view.html'
		});
	}
]);