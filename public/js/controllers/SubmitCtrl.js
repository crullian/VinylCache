app.controller('SubmitCtrl', function($scope, RecordsFactory) {
  $scope.record = {}; // a new record

  $scope.submitRecord = function(record) {
    RecordsFactory.postNewRecord(record).then(function() {
      $scope.record = {};
    });
  }
  $scope.remove = function(record) {
    RecordsFactory.deleteRecord(record).then(function() {
      $scope.record = {};
    })
  }
});