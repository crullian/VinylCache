app.factory('RecordsFactory', function($http) {
  return {
    getRecords: function(artist) {
      // var queryParams = {};
      // if (artist) {
      //   queryParams.artist = artist;
      // }
      // return $http.get('/records', {
      //   params: queryParams
      // }).then(function(record) {
      //   return record.data;
      // });
      return $http.get('/records')
        .then(function(record) {
          return record.data;
        });
    },

    postNewRecord: function(data) {
      return $http.post('/records', data)
        .then(function(record) {
          return record.data;
        });
    },

    updateRecord: function(data) {
      return $http.put('/records', data)
        .then(function(record) {
          return record.data;
        });
    },

    deleteRecord: function(id) {
      console.log('IN RECORDSFACTORY');
      var recordParams = {};
      if (id) {
        recordParams.id = id
      }
      return $http.delete('/records/:id', {
          params: recordParams
        })
        .success(function(record) {
          console.log("THIS RAN");
          return record.data;
        }).error(function(err) {
          console.log("YA FUCKED UP SON");
        });
    }
  };
});