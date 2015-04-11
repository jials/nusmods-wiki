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

		$scope.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent quis leo iaculis, lacinia tortor nec, bibendum sapien. In hac habitasse platea dictumst. Suspendisse fermentum velit et eros convallis pulvinar. Maecenas ac enim sit amet justo aliquam sollicitudin laoreet vitae enim. Cras tempor sem diam, sit amet consequat velit pharetra sed. Maecenas arcu nisi, eleifend non arcu nec, dignissim ullamcorper sem. Maecenas et volutpat eros. Phasellus pellentesque imperdiet eros eu finibus. Aliquam erat volutpat. Morbi in dignissim metus. Quisque sit amet orci hendrerit, condimentum eros et, ornare erat.';
	}
]);

