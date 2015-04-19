'use strict';

angular.module('core').controller('SearchController', ['$scope', '$http', '$location', '$timeout', '$q', '$log',

	function ($scope, $http, $location, $timeout, $q, $log) {
	    var self = this;
	    
	    loadAll();
	    
	    self.selectedItem  = null;
	    self.searchText    = null;
	    self.querySearch   = querySearch;
	    self.simulateQuery = false;
	    self.selectedItemChange = selectedItemChange;
	    self.searchTextChange   = searchTextChange;

	    self.submit = submit;

	    function querySearch (query) {
	    	var results = query ? self.modules.filter( createFilterFor(query) ) : [],
	    	deferred;

	    	if (self.simulateQuery) {
	    		deferred = $q.defer();
	    		$timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
	    		return deferred.promise;
	    	} else {
	    		return results;
	    	}
	    }

	    function submit(selectedItem) {
	    	$location.path("/" + selectedItem);
	    }

	    function searchTextChange(text) {
	    	// $log.info('Text changed to ' + text);
	    }

	    function selectedItemChange(item) {
	    	// $log.info('Item changed to ' + item);
	    }

	    function loadAll() {
	    	var modules = '';

	    	$http.get('http://api.nusmods.com/2014-2015/moduleList.json?callback=?').success(function(data, status, headers, config) {
				var allmodules = data;
				
				for (var i = 0; i < allmodules.length; i++) {
					if (i == allmodules.length - 1) {
						modules += allmodules[i].ModuleCode;
					} else {
						modules += allmodules[i].ModuleCode + ", ";
					}
				}

				self.modules = modules.split(/, +/g).map( function (module) {
			        return {
			        	value: module.toLowerCase(),
			        	display: module
			        };
			    });
			});
	    }

	    function createFilterFor(query) {
	    	var lowercaseQuery = angular.lowercase(query);
	    	return function filterFn(module) {
	    		return (module.value.indexOf(lowercaseQuery) === 0);
	    	};
	    }
	}

	// function($scope, $http, $location) {
	// 	function getModules() {
	// 		$http.get('http://api.nusmods.com/2014-2015/moduleList.json?callback=?').success(function(data, status, headers, config) {
	// 			$scope.modules = data;
	// 		}).
	// 	    error(function(data) {
	// 	        // alert(data);
	// 	    });
	// 	}
	// 	getModules(); // Load all modules

	// 	$scope.submit = function() {
	// 		$location.path('/' + $scope.selectedModule.ModuleCode);
	// 	};
	// }
]);