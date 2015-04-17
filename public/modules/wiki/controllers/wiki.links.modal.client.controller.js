'use strict';

angular.module('wiki').controller('LinksModalCtrl', function ($scope, $modal, $log, $http, $stateParams) {
    $scope.links = [{content: '', title: 'home page'}, {content: '', title: 'facebook'}];

	$http.get('/' + $stateParams.moduleTitle).success(function(data){
        $scope.links[0].content = data.homePage[data.homePage.length - 1];
        $scope.links[1].content = data.facebook[data.facebook.length - 1];
    });

	$scope.open = function (size) {

		var modalInstance = $modal.open({
			templateUrl: 'LinksModalContent.html',
			controller: 'LinksModalInstanceCtrl',
			size: size,
			resolve: {
				links: function () {
					return $scope.links;
				}
			}
		});
	};
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('wiki').controller('LinksModalInstanceCtrl', function ($scope, $modalInstance, links, $http, $stateParams, Authentication) {
	$scope.links = links;

	$scope.save = function () {
		$scope.$broadcast('show-errors-check-validity');

        // don't allow if both checked and untouched
  		if (!$scope.linksForm.$dirty && $scope.linksForm.$invalid && $scope.disabledHomepage && $scope.disabledFacebook) { return; }

        // don't allow if both checked
        if ($scope.linksForm.$invalid && $scope.disabledHomepage && $scope.disabledFacebook) { return; }

        // don't allow if homepage is blank
        if (!$scope.linksForm.$invalid && !$scope.disabledHomepage && $scope.disabledFacebook) {
            $http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'homePage', homePage: $scope.links[0].content.content}).success(function(data){     
            });
            $modalInstance.close();
        }

        // don't allow if facebook is blank
        if (!$scope.linksForm.$invalid && $scope.disabledHomepage && !$scope.disabledFacebook) {
            $http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'facebook', facebook: $scope.links[1].content.content}).success(function(data){     
            });
            $modalInstance.close();
        }


        if (!$scope.linksForm.$invalid && !$scope.disabledHomepage && !$scope.disabledFacebook) {
            $http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'homePage', homePage: $scope.links[0].content.content}).success(function(data){     
            });
            $http.put('/' + $stateParams.moduleTitle, {editedBy: Authentication.user.id, type: 'facebook', facebook: $scope.links[1].content.content}).success(function(data){     
            });
            $modalInstance.close();
        }
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});

angular.module('wiki').directive('httpPrefix', function() {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, controller) {
            function ensureHttpPrefix(value) {
                // Need to add prefix if we don't have http:// prefix already AND we don't have part of it
                if (value && (!/^(http):\/\//i).test(value) && ('http://').indexOf(value) === -1) {
                    controller.$setViewValue('http://' + value);
                    controller.$render();
                    return 'http://' + value;
                }
                else {
                    return value;
                }
            }
            controller.$formatters.push(ensureHttpPrefix);
            controller.$parsers.splice(0, 0, ensureHttpPrefix);
        }
    };
});

angular.module('wiki').directive('showErrors', function() {
	return {
		restrict: 'A',
		require:  '^form',
		link: function (scope, el, attrs, formCtrl) {
	        // find the text box element, which has the 'name' attribute
	        var inputEl   = el[0].querySelector('[name]');
	        // convert the native text box element to an angular element
	        var inputNgEl = angular.element(inputEl);
	        // get the name on the text box so we know the property to check
	        // on the form controller
	        var inputName = inputNgEl.attr('name');

	        scope.$on('show-errors-check-validity', function() {
				el.toggleClass('has-error', formCtrl[inputName].$invalid);
			});

	        // only apply the has-error class after the user leaves the text box
	        inputNgEl.bind('blur', function() {
	        	el.toggleClass('has-error', formCtrl[inputName].$invalid);
	        });
	    }
	};
});