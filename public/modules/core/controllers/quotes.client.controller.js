'use strict';

angular.module('core').controller('QuotesCtrl', [ '$scope',
    function ($scope) {
        var quotes = [ 'random quote 1', 'random quote 2', 'random quote 3' ];

        var randomNum = Math.floor((Math.random() * quotes.length));

        $scope.quote = quotes[randomNum];
    }
]);