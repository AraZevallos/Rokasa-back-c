var mongoose = require("mongoose");
var schema = mongoose.Schema;

var ProductSchema = mongoose.Schema({
  title: String,
  sku: String,
  description: String,
  unitSale: String,
  img: String,
  purPrice: Number,
  salePrice: Number,
  stock: Number,
  idcategory: { type: schema.ObjectId, ref: "category" },
  points: Number,
});

module.exports = mongoose.model("product", ProductSchema);
