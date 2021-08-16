var express = require('express');
var supplierController = require('../controllers/SupplierController');

var api = express.Router();

api.post('/supplier/register',supplierController.register);
api.get('/supplier/:id',supplierController.getSupplier);
api.put('/supplier/update/:id',supplierController.update);
api.delete('/supplier/remove/:id',supplierController.remove);
api.get('/suppliers/:title?',supplierController.read);

module.exports = api;