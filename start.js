var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/VinylCache');

var server = require('./server');

mongoose.connection.once('open', function() {
  server.listen(1335, function() {
    console.log('Server started on port 1335');
  });
});