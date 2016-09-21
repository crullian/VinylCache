var mongoose = require('mongoose');
var crypto = require('crypto');

mongoose.Promise = global.Promise;

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  // password: String
  hashedPassword: String,
  salt: String,
  admin: Boolean
});

userSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hashedPassword = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hashedPassword === hash;
};

module.exports = mongoose.model('User', userSchema);