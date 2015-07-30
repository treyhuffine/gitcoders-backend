var mongoose = require('mongoose');
var userSchema = new mongoose.Schema({
  githubID: String,
  githubData: Object
});
var User = mongoose.model('User', userSchema);


module.exports = User;
