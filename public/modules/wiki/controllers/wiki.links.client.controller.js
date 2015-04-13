'use strict';

// Wiki Links Controller
angular.module('wiki')
.controller('WikiLinksCtrl', ['$scope', '$stateParams',
	function($scope, $stateParams) {
		// $scope.moduleTitle = $stateParams.moduleTitle;

		$scope.mod =
		[{	code: 'CP3101B',
			links: 
			[{ 	title: 'home', 
			  	href: '//www.nus.edu.sg', 
			},
			{ 	title: 'facebook', 
			  	href: '//www.facebook.com',  
			},
			{ 	title: 'ivle', // IVLE
			  	href: '//www.ivle.nus.edu.sg', 
			}]
		}];
	}
]);