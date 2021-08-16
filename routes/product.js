var express = require("express");
var productController = require("../controllers/ProductController");
var multipart = require("connect-multiparty");
var path = multipart({ uploadDir: "./uploads/products" });

var api = express.Router();

api.post("/product/register", path, productController.register);
api.get("/products/:title?", productController.read);
api.put("/products/update/:id/:img", path, productController.update);
api.get("/product/:id", productController.getProduct);
api.delete("/product/:id", productController.remove);
api.put('/product/stock/:id',productController.update_stock);
api.get("/product/img/:img", productController.get_img);

module.exports = api;
