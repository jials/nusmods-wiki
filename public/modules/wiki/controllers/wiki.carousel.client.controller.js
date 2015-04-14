'use strict';

angular.module('wiki')
.controller('CarouselDemoCtrl', ['$scope', 
	function($scope) {
		$scope.myInterval = -1; // positive integer to play

		$scope.projects = 
		[{	user: 'daryl1', 
			slides: [
				{ image: 'http://lorempixel.com/400/200/' },
				{ image: 'http://lorempixel.com/400/200/food' },
				{ image: 'http://lorempixel.com/400/200/sports'	},
				{ image: 'http://lorempixel.com/400/200/people' }]
		},
		{ 	user: 'daryl2', 
			slides: [
				{ image: 'http://lorempixel.com/400/200/' },
				{ image: 'http://lorempixel.com/400/200/food' },
				{ image: 'http://lorempixel.com/400/200/sports'	},
				{ image: 'http://lorempixel.com/400/200/people' }]
		},
		{ 	user: 'daryl3', 
			slides: [
				{ image: 'http://lorempixel.com/400/200/' },
				{ image: 'http://lorempixel.com/400/200/food' },
				{ image: 'http://lorempixel.com/400/200/sports'	},
				{ image: 'http://lorempixel.com/400/200/people' }]
		}];

		$scope.description = 'Lorem ipsum dolor sit amet.';
	}
]);

