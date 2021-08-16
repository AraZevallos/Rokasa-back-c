var express = require('express');
var orderController = require('../controllers/OrderController');

var api = express.Router();

api.post('/order/register',orderController.register);
api.get('/order/info/:id',orderController.info_order);

module.exports = api;