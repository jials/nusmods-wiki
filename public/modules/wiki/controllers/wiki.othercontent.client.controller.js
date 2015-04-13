'use strict';

angular.module('wiki').controller('OtherContentCtrl', ['$scope', '$http', '$stateParams',
	function($scope, $http, $stateParams) {
		function getContent() {  
			$http.get('http://localhost:3000/' + $stateParams.moduleTitle).success(function(data){
				$scope.pastLecturer = data.pastLecturer.toString();
				$scope.created = data.created;

				$scope.content = data;
			});
		}

		getContent();

		$http.put('http://localhost:3000/' + $stateParams.moduleTitle, {pastLecturer:[{name: 'Yang Shun'}]}).success(function(data){
			console.log('success');
		});
	}
]);