'use strict';

angular.module('wiki').controller('OtherContentCtrl', ['$scope', '$http', '$stateParams', 'Authentication',
	function($scope, $http, $stateParams, Authentication) {
		$http.get('/' + $stateParams.moduleTitle).success(function(data){
			$scope.pastLecturer = data.pastLecturer[data.pastLecturer.length - 1].faculties;
			$scope.created = data.created;

			$scope.content = data;
		});

		$scope.id = Authentication.user.id;
	}
]);