'use strict';

angular.module('wiki').controller('RightBarContentCtrl', [ '$scope', '$http', '$stateParams',
	function ($scope, $http, $stateParams) {
		$scope.data = {
			selectedIndex: 0,
			secondLocked:  true,
			secondLabel:   "Item Two",
			bottom:        false
		};
		$scope.next = function() {
			$scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
		};
		$scope.previous = function() {
			$scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
		};


		$http.get('http://api.nusmods.com/2014-2015/moduleList.json?callback=JSON_CALLBACK').success(function(data, status, headers, config) {
			// alert(JSON.stringify(data));

			var semester;
			for (var i = 0; i < data.length; i++) {
				if (data[i].ModuleCode == $stateParams.moduleTitle) {
					semester = data[i].Semesters;
				}
			}

			$scope.semesterOneDisabled = (semester.indexOf(1) > -1) ? false : true;
			$scope.semesterTwoDisabled = (semester.indexOf(2) > -1) ? false : true;
    	});
	}
]);