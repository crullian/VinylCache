app.directive('record', function() { // injectable function!
  return { // always returns directive definition object
    restrict: 'E', // Element, must be capital
    templateUrl: 'js/directives/record/record.html', // must put script path in head of html
    scope: {
      vinyl: "="
    }
    // link: function(scope, element, attrs) {
    //   scope.answered = false;
    //   scope.answeredCorrectly = null;

    //   scope.answerQuestion = function(answer) {

    //     if (scope.answered) {
    //       return;
    //     }

    //     scope.answered = true;
    //     scope.answeredCorrectly = answer.correct;
    //     if (scope.answeredCorrectly) {
    //       ScoreFactory.correct++;
    //     } else {
    //       ScoreFactory.incorrect++;
    //     }

    //   };
    // }
  };
})