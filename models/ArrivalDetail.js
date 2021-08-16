var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ArrivalDetailSchema = mongoose.Schema({
    idproduct: {type: schema.ObjectId, ref: 'product'},
    quantity: Number,
    idsupplier: {type: schema.ObjectId, ref: 'supplier'},
});

module.exports = mongoose.model('arrivaldetail', ArrivalDetailSchema);