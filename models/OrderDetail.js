var mongoose = require('mongoose');
var schema = mongoose.Schema;

var OrderDetailSchema = mongoose.Schema({
    idproduct: {type: schema.ObjectId, ref: 'product'},
    quantity: Number,
    idsupplier: {type: schema.ObjectId, ref: 'supplier'},
    idorder: {type: schema.ObjectId, ref: 'order'}
});

module.exports = mongoose.model('orderdetail', OrderDetailSchema);