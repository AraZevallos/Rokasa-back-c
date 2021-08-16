var Sale = require("../models/Sale");
var SaleDetail = require("../models/SaleDetail");
var Product = require("../models/Product");

function register(req, res) {
  let data = req.body;
  var sale = new Sale();
  sale.idcustomer = data.idcustomer;
  sale.iduser = data.iduser;

  sale.save((err, sale_save) => {
    if (sale_save) {
      let details = data.details;

      details.forEach((element, index) => {
        var saledetail = new SaleDetail();
        saledetail.idproduct = element.idproduct;
        saledetail.quantity = element.quantity;
        saledetail.idsale = sale_save.id;

        saledetail.save((err, detail_save) => {
          if (detail_save) {
            Product.findById(
              { _id: element.idproduct },
              (err, product_data) => {
                if (product_data) {
                  Product.findByIdAndUpdate(
                    { _id: product_data._id },
                    {
                      stock:
                        parseInt(product_data.stock) -
                        parseInt(element.quantity),
                    },
                    (err, product_edit) => {
                      res.end();
                    }
                  );
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

function info_sale(req, res) {
  var id = req.params["id"];

  Sale.findById(id, (err, data_sale) => {
    if (data_sale) {
      SaleDetail.find({ idsale: id }, (err, data_detail) => {
        if (data_detail) {
          res.status(200).send({
            sale: data_sale,
            details: data_detail,
          });
        }
      });
    }
  });
}

module.exports = {
  register,
  info_sale,
};
