'use strict';

angular.module('wiki').controller('LinksModalCtrl', function ($scope, $modal, $log) {

	$scope.home = 'www.nus.edu.sg';
	$scope.facebook = 'www.facebook.com';

	$scope.links = [$scope.home, $scope.facebook];

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

angular.module('wiki').controller('LinksModalInstanceCtrl', function ($scope, $modalInstance, links) {

	// $scope.items = links;

	$scope.links = { homepage : '', facebook: '' };

	$scope.save = function () {
		$scope.$broadcast('show-errors-check-validity');
  		if ($scope.linksForm.$invalid && (!$scope.disabledHomepage || !$scope.disabledFacebook)) { return; }

		alert('saving ' + JSON.stringify($scope.links) + ' ' + $scope.semester);
		$modalInstance.close();
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
                if(value && !/^(http):\/\//i.test(value)
                   && 'http://'.indexOf(value) === -1) {
                    controller.$setViewValue('http://' + value);
                    controller.$render();
                    return 'http://' + value;
                }
                else
                    return value;
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
	        var inputEl   = el[0].querySelector("[name]");
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
	        })
	    }
	}
});