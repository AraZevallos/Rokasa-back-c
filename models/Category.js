var mongoose = require('mongoose');
var schema = mongoose.Schema;

var CategorySchema = mongoose.Schema({
    title: String,
    description: String,
});

module.exports = mongoose.model('category', CategorySchema);