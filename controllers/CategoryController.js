var Category = require("../models/Category");

function register(req, res) {
  var data = req.body;

  var category = new Category();
  category.title = data.title;
  category.description = data.description;

  category.save((err, category_save) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (category_save) {
        res.status(200).send({ category: category_save });
      } else {
        res.status(200).send({ message: "La categoría no se pudo registrar" });
      }
    }
  });
}

function getCategory(req, res) {
  var id = req.params["id"];

  Category.findById({ _id: id }, (err, category_data) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (category_data) {
        res.status(200).send({ category: category_data });
      } else {
        res.status(403).send({ message: "La categoría no existe" });
      }
    }
  });
}

function update(req, res) {
  var id = req.params["id"];
  var data = req.body;

  Category.findByIdAndUpdate(
    { _id: id },
    { title: data.title, description: data.description },
    (err, category_edit) => {
      if (err) {
        res.status(500).send({ message: "Error en el servidor" });
      } else {
        if (category_edit) {
          res.status(200).send({ category: category_edit });
        } else {
          res
            .status(403)
            .send({ message: "La categoría no se pudo actualizar" });
        }
      }
    }
  );
}

function remove(req, res) {
  var id = req.params["id"];

  Category.findByIdAndRemove({ _id: id }, (err, category_remove) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (category_remove) {
        res.status(200).send({ category: category_remove });
      } else {
        res.status(403).send({ message: "La categoría no se pudo eliminar" });
      }
    }
  });
}

function read(req, res) {
  var title = req.params["title"];

  Category.find({ title: new RegExp(title, "i") }, (err, category_read) => {
    if (err) {
      res.status(500).send({ message: "Error en el servidor" });
    } else {
      if (category_read) {
        res.status(200).send({ categories: category_read });
      } else {
        res.status(403).send({ message: "No hay registros con ese título" });
      }
    }
  });
}

module.exports = {
  register,
  getCategory,
  update,
  remove,
  read,
};
