var Product = require("../models/Product");
var fs = require("fs");
var path = require("path");

function register(req, res) {
  var data = req.body;

  if (req.files) {
    var img_path = req.files.img.path;
    var name = img_path.split("/");
    var img_name = name[2];

    var product = new Product();
    product.title = data.title;
    product.sku = data.sku;
    product.description = data.description;
    product.unitSale = data.unitSale;
    product.img = img_name;
    product.purPrice = data.purPrice;
    product.salePrice = data.salePrice;
    product.stock = data.stock;
    product.idcategory = data.idcategory;
    product.points = data.points;

    product.save((err, product_save) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        if (product_save) {
          res.status(200).send({ product: product_save });
        } else {
          res.status(403).send({ message: "No se registró el producto" });
        }
      }
    });
  } else {
    var product = new Product();
    product.title = data.title;
    product.sku = data.sku;
    product.description = data.description;
    product.unitSale = data.unitSale;
    product.img = null;
    product.purPrice = data.purPrice;
    product.salePrice = data.salePrice;
    product.stock = data.stock;
    product.idcategory = data.idcategory;
    product.points = data.points;

    product.save((err, product_save) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        if (product_save) {
          res.status(200).send({ product: product_save });
        } else {
          res.status(403).send({ message: "No se registró el producto" });
        }
      }
    });
  }
}

function read(req, res) {
  var title = req.params["title"];

  Product.find({ title: new RegExp(title, "i") }).populate('idcategory').exec((err, products_read) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (products_read) {
        res.status(200).send({ products: products_read });
      } else {
        res
          .status(403)
          .send({ message: "No hay ningún registro con ese título" });
      }
    }
  });
}

function update(req, res) {
  var data = req.body;
  var id = req.params["id"];
  var img = req.params["img"];

  if (req.files) {
    fs.unlink("./uploads/products/" + img, (err) => {
      if (err) throw err;
    });

    var img_path = req.files.img.path;
    var name = img_path.split("/");
    var img_name = name[2];

    Product.findByIdAndUpdate(
      { _id: id },
      {
        title: data.title,
        sku: data.sku,
        description: data.description,
        unitSale: data.unitSale,
        img: img_name,
        purPrice: data.purPrice,
        salePrice: data.salePrice,
        stock: data.stock,
        idcategory: data.idcategory,
        points: data.points,
      },
      (err, product_update) => {
        if (err) {
          res.status(200).send({ message: "Error en el servidor" });
        } else {
          if (product_update) {
            res.status(200).send({ product: product_update });
          } else {
            res.status(403).send({ message: "No se editó el producto" });
          }
        }
      }
    );
  } else {
    Product.findByIdAndUpdate(
      { _id: id },
      {
        title: data.title,
        sku: data.sku,
        description: data.description,
        unitSale: data.unitSale,
        purPrice: data.purPrice,
        salePrice: data.salePrice,
        stock: data.stock,
        idcategory: data.idcategory,
        points: data.points,
      },
      (err, product_update) => {
        if (err) {
          res.status(200).send({ message: "Error en el servidor" });
        } else {
          if (product_update) {
            res.status(200).send({ product: product_update });
          } else {
            res.status(403).send({ message: "No se editó el producto" });
          }
        }
      }
    );
  }
}

function getProduct(req, res) {
  var id = req.params["id"];

  Product.findOne({ _id: id }, (err, product_data) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (product_data) {
        res.status(200).send({ product: product_data });
      } else {
        res.status(403).send({ message: "No existe el registro" });
      }
    }
  });
}

function remove(req, res) {
  var id = req.params["id"];

  Product.findOneAndRemove({ _id: id }, (err, product_remove) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (product_remove) {
        fs.unlink("./uploads/products/" + product_remove.img, (err) => {
          if (err) throw err;
        });
        res.status(200).send({ product: product_remove });
      } else {
        res.status(403).send({ message: "No se eliminó ningún registro" });
      }
    }
  });
}

function update_stock(req, res) {
  let id = req.params["id"];
  let data = req.body;

  Product.findById(id, (err, product_data) => {
    if (product_data) {
      Product.findByIdAndUpdate(
        id,
        { stock: parseInt(product_data.stock) + parseInt(data.stock) },
        (err, product_edit) => {
          if (product_edit) {
            res.status(200).send({ product: product_edit });
          }
        }
      );
    } else {
      res.status(500).send(err);
    }
  });
}

function get_img(req, res) {
  var img = req.params["img"];

  if (img != "null") {
    let path_img = "./uploads/products/" + img;
    res.status(200).sendFile(path.resolve(path_img));
  } else {
    let path_img = "./uploads/products/default.jpg";
    res.status(200).sendFile(path.resolve(path_img));
  }
}

module.exports = {
  register,
  read,
  update,
  getProduct,
  remove,
  update_stock,
  get_img,
};
