'use strict';

angular.module('wiki').controller('ScrollController', ['$scope', '$location', 'anchorSmoothScroll',  
	function($scope, $location, anchorSmoothScroll) {
	    $scope.gotoElement = function (eID){
	      // set the location.hash to the id of
	      // the element you wish to scroll to.
	      $location.hash(eID);

	      // angular.element(eID).addClass('active');
	 
	      // call $anchorScroll()
	      anchorSmoothScroll.scrollTo(eID);
	      
	    };
	}
]);