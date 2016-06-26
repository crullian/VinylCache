var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var schema = new mongoose.Schema({
  artist: String,
  title: String,
  imgUrl: String,
  year: String
});

module.exports = mongoose.model('Record', schema);