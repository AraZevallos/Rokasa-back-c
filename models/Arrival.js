var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ArrivalSchema = mongoose.Schema({
    idorder: {type: schema.ObjectId, ref: 'order'},
    iduser: {type: schema.ObjectId, ref: 'user'},
    date: {type: Date, default: Date.now}
});

module.exports = mongoose.model('arrival', ArrivalSchema);