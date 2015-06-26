app.directive('record', function() { // injectable function!
  return { // always returns directive definition object
    restrict: 'E', // Element, must be capital
    templateUrl: 'js/directives/record/record.html', // must put script path in head of html
    scope: {
      vinyl: "="
    },
    link: function(scope, element, attrs) {
      scope.toggleEdit = function() {
        scope.isEditing = scope.isEditing === true ? false : true;
      };
      scope.remove = function(record) {
        RecordsFactory.deleteRecord(record).then(function() {
          scope.record = {};
        })
      }
    }
  };
})