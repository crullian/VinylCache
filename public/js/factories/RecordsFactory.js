app.factory('RecordsFactory', function($http) {
  return {
    getRecords: function(artist) {
      var queryParams = {};
      // if (artist) {
      //   queryParams.artist = artist;
      // }
      return $http.get('/records', {
        params: queryParams
      }).then(function(response) {
        return response.data;
      });
    },

    postNewRecord: function(data) {
      return $http.post('/records', data);
    },

    updateRecord: function(data) {
      return $http.put('/records', data);
    }
  };
});