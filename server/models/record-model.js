var mongoose = require('mongoose');

var schema = new mongoose.Schema({
  artist: String,
  title: String,
  imgUrl: String,
  year: String
});

module.exports = mongoose.model('Record', schema);