'use strict';

// Wiki Links Controller
angular.module('wiki')
.controller('WikiLinksCtrl', ['$scope', '$stateParams',
	function($scope, $stateParams) {
		$scope.moduleTitle = $stateParams.moduleTitle;

		var home = '//www.nus.edu.sg';
		var facebook = '//www.facebook.com';
		var ivle = '//www.ivle.nus.edu.sg';

		$scope.links = [
		{title: 'Home', href: home, img: ''},
		{title: 'Facebook', href: facebook, img: ''},
		{title: 'IVLE', href: ivle, img: ''}
		];
	}
]);