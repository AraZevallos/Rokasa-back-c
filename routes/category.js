var express = require('express');
var categoryController = require('../controllers/CategoryController');

var api = express.Router();

api.post('/category/register',categoryController.register);
api.get('/category/:id',categoryController.getCategory);
api.put('/category/update/:id',categoryController.update);
api.delete('/category/remove/:id',categoryController.remove);
api.get('/categories/:title?',categoryController.read);

module.exports = api;