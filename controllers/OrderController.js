var Order = require("../models/Order");
var OrderDetail = require("../models/OrderDetail");
var Product = require("../models/Product");

function register(req, res) {
  let data = req.body;
  var order = new Order();
  order.iduser = data.iduser;

  order.save((err, order_save) => {
    if (order_save) {
      let details = data.details;

      details.forEach((element, index) => {
        var orderdetail = new OrderDetail();
        orderdetail.idproduct = element.idproduct;
        orderdetail.quantity = element.quantity;
        orderdetail.idsupplier = element.idsupplier;
        orderdetail.idorder = order_save.id;

        orderdetail.save((err, detail_save) => {
          if (detail_save) {
            Product.findById(
              { _id: element.idproduct },
              (err, product_data) => {
                if (product_data) {
                  res.end();
                } else {
                  res.send("No se encontró el producto");
                }
              }
            );
          } else {
            res.send("No se pudo registrar los datos");
          }
        });
      });
    } else {
      res.send("No se pudo registrar los datos");
    }
  });
}

function info_order(req, res) {
  var id = req.params["id"];

  Order.findById(id, (err, data_order) => {
    if (data_order) {
      OrderDetail.find({ idorder: id }, (err, data_detail) => {
        if (data_detail) {
          res.status(200).send({
            order: data_order,
            details: data_detail,
          });
        }
      });
    }
  });
}

module.exports = {
  register,
  info_order,
};
