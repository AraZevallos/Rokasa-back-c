var mongoose = require('mongoose');
var schema = mongoose.Schema;

var SupplierSchema = mongoose.Schema({
    company: String,
    contact: String,
});

module.exports = mongoose.model('supplier', SupplierSchema);