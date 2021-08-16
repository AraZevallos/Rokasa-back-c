var mongoose = require('mongoose');
var schema = mongoose.Schema;

var SaleSchema = mongoose.Schema({
    idcustomer: {type: schema.ObjectId, ref: 'customer'},
    iduser: {type: schema.ObjectId, ref: 'user'},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('sale', SaleSchema);