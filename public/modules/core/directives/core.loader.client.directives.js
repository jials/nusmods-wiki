'use strict';

angular.module('core').directive('stateLoadingIndicator', function($rootScope) {
  return {
    restrict: 'E',
    template: '<div ng-show="isStateLoading" class="loading-indicator">' +
    '<div class="loading-indicator-body" style="z-index:9999;background-color:#FFFFFF;position:absolute;width:100%;height:100%;">' +
    '<div class="spinner"><rotating-plane-spinner></rotating-plane-spinner></div>' +
    '</div>' +
    '</div>',
    replace: true,
    link: function(scope, elem, attrs) {
      scope.isStateLoading = false;
 
      $rootScope.$on('$stateChangeStart', function() {
        scope.isStateLoading = true;
      });
      $rootScope.$on('$stateChangeSuccess', function() {
        scope.isStateLoading = false;
      });
    }
  };
});