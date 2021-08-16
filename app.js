var express = require("express");
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var port = process.env.PORT || 4201;

//ROUTES
var user_routes = require("./routes/user");
var category_routes = require("./routes/category");
var supplier_routes = require("./routes/supplier");
var product_routes = require("./routes/product");
var customer_routes = require("./routes/customer");
var sale_routes = require("./routes/sale");
var order_routes = require("./routes/order");

//Inicializando Express
var app = express();

mongoose.connect(
  "mongodb://localhost:27017/rokasadb",
  { useUnifiedTopology: true, useNewUrlParser: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("corriendo servidor");
      app.listen(port, function () {
        console.log("servidor conectado en " + port);
      });
    }
  }
);

app.use(bodyparser.urlencoded({ extended: true })); //analiza el texto como datos codificados en la URL
app.use(bodyparser.json()); //analiza el texto como JSON

app.use((req, res, next) => {
  res.header("Content-Type: application/json");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header("Allow", "GET, PUT, POST, DELETE, OPTIONS");
  next();
});

app.use("/api", user_routes);
app.use("/api", category_routes);
app.use("/api", supplier_routes);
app.use("/api", product_routes);
app.use("/api", customer_routes);
app.use("/api", sale_routes);
app.use("/api", order_routes);

module.exports = app;
