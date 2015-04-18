'use strict';

angular.module('core').controller('QuotesCtrl', [ '$scope',
    function ($scope) {
        var quotes = 
                    [ 
                    { content: 'Friendship... is not something you learn in school. But if you haven\'t learned the meaning of friendship, you really haven\'t learned anything.', by: 'Muhammad Ali' },
                    { content: 'Education is what remains after one has forgotten what one has learned in school.', by: 'Albert Einstein' },
                    { content: 'The philosophy of the school room in one generation will be the philosophy of government in the next.', by: 'Abraham Lincoln' },
                    { content: 'What\'s amazing is, if young people understood how doing well in school makes the rest of their life so much interesting, they would be more motivated. It\'s so far away in time that they can\'t appreciate what it means for their whole life.', by: 'Bill Gates' },
                    { content: 'A man who has never gone to school may steal from a freight car; but if he has a university education, he may steal the whole railroad.', by: 'Theodore Roosevelt' },
                    { content: 'In my school, the brightest boys did math and physics, the less bright did physics and chemistry, and the least bright did biology. I wanted to do math and physics, but my father made me do chemistry because he thought there would be no jobs for mathematicians.', by: 'Stephen Hawking' },
                    { content: 'We learned about gratitude and humility - that so many people had a hand in our success, from the teachers who inspired us to the janitors who kept our school clean... and we were taught to value everyone\'s contribution and treat everyone with respect.', by: 'Michelle Obama' }
                    ];

        var randomNum = Math.floor((Math.random() * quotes.length));

        $scope.quote = quotes[randomNum];
    }
]);