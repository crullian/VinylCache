app.factory('RecordsFactory', function($http) {
  return {
    getRecords: function(artist) {
      var queryParams = {};
      if (artist) {
        queryParams.artist = artist;
      }
      return $http.get('/records', {
        params: queryParams
      }).then(function(record) {
        return record.data;
      });
      // return $http.get('/records')
      //   .then(function(record) {
      //     return record.data;
      //   });
    },

    postNewRecord: function(data) {
      return $http.post('/records', data)
        .then(function(record) {
          return record.data;
        });
    },

    updateRecord: function(record) {
      console.log('IN RECORDSFACTORY UPDATERECORD');
      var id = record._id;
      return $http.put('/records/' + id, record)
        .success(function(record) {
          console.log('UPDATED');
        })
        .error(function(err) {
          console.log('ERROR');
        });
    },

    deleteRecord: function(record) {
      console.log('IN RECORDSFACTORY');
      console.log('RECORD ID: ', record._id)
      var id = record._id;
      return $http.delete('/records/' + id)
        .success(function(record) {
          console.log("THIS RAN");
        }).error(function(err) {
          console.log("YA FUCKED UP SON");
        });
    }
  };
});