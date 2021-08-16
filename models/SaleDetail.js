var mongoose = require('mongoose');
var schema = mongoose.Schema;

var SaleDetailSchema = mongoose.Schema({
    idproduct: {type: schema.ObjectId, ref: 'product'},
    quantity: Number,
    idsale: {type: schema.ObjectId, ref: 'sale'}
});

module.exports = mongoose.model('saledetail', SaleDetailSchema);