app.controller('SubmitCtrl', function($scope, RecordsFactory) {
  $scope.record = {}; // a new record

  $scope.submitRecord = function(record) {
    RecordsFactory.postNewRecord(record).then(function() {
      $scope.record = {};
    });
  }
});