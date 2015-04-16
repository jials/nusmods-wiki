'use strict';

angular.module('wiki').controller('MainContentCtrl', ['$scope', '$http', '$stateParams', '$timeout',
	function($scope, $http, $stateParams, $timeout) {
        $scope.showSpinner = true;

		$http.get('http://api.nusmods.com/2014-2015/modules/' + $stateParams.moduleTitle + '/index.json?callback=?').success(function(data){
			$scope.module = data;
            $timeout(function() {
                $scope.showSpinner = false;
            }, 3000);
		});
	}
]);