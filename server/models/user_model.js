var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  admin: Boolean
});

module.exports = mongoose.model('User', userSchema);