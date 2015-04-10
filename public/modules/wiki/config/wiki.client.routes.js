'use strict';

// Setting up route
angular.module('wiki').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		// wiki state routing
		$stateProvider.
		state('wiki', {
			url: '/{moduleTitle:[a-zA-Z]{2,3}[0-9]{4}[a-zA-Z]{0,2}}',
			templateUrl: 'modules/wiki/views/wiki.client.view.html'
		});

		$urlRouterProvider.rule(function ($injector, $location) {
	    	// what this function returns will be set as the $location.url
	        var path = $location.path(), normalized = path.toUpperCase();
	        if (path != normalized) {
	            // change the $location.path directly
	            $location.replace().path(normalized);
	        }
	        // because we've returned nothing, no state change occurs
	    });
	}
]);