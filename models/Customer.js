var mongoose = require('mongoose');
var schema = mongoose.Schema;

var CustomerSchema = mongoose.Schema({
    name: String,
    lastname: String,
    dni: String,
    points: Number,
    createAt: {type: Date, default: Date.now}
});

module.exports = mongoose.model('customer', CustomerSchema);