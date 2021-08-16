var express = require('express');
var customerController = require('../controllers/CustomerController');

var api = express.Router();

api.post('/customer',customerController.register);
api.put('/customer/update/:id',customerController.update);
api.delete('/customer/remove/:id',customerController.remove);

module.exports = api;