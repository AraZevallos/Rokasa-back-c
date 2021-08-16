var mongoose = require('mongoose');
var schema = mongoose.Schema;

var OrderSchema = mongoose.Schema({
    iduser: {type: schema.ObjectId, ref: 'user'},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('order', OrderSchema);