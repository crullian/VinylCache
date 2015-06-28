app.directive('record', function(RecordsFactory) { // injectable function!
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
      scope.updateRecord = function(record) {
        RecordsFactory.updateRecord(record)
          .success(function() {
            console.log("RETURNING FROM RECORDSFACTORY");
            scope.isEditing = false;
          })
          .error(function(err) {
            console.log("NO DICE");
          });
      };
      scope.remove = function(record) {
        console.log('ARE WE REMOVING?');
        RecordsFactory.deleteRecord(record)
          .success(function() {
            scope.isEditing = false;
          })
          .error(function(error) {
            console.log("ERROR");
          });
      };
    }
  };
});