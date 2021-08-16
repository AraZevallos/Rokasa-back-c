var express = require('express');
var saleController = require('../controllers/SaleController');

var api = express.Router();

api.post('/sale/register',saleController.register);
api.get('/sale/info/:id',saleController.info_sale);

module.exports = api;