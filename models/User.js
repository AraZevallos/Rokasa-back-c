var mongoose = require('mongoose');
var schema = mongoose.Schema;

var UserSchema = mongoose.Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    role: String,
});

module.exports = mongoose.model('user', UserSchema);