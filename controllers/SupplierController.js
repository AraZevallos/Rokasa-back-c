var Supplier = require('../models/Supplier');

function register(req,res){
    var data = req.body;

    var supplier = new Supplier();
    supplier.company = data.company;
    supplier.contact = data.contact;

    supplier.save((err,supplier_save)=>{
        if(err){
            res.status(500).send({message: "Error en el servidor"});
        }else{
            if(supplier_save){
                res.status(200).send({supplier: supplier_save});
            }else{
                res.status(200).send({message: "El proveedor no se pudo registrar"});
            }
        }
    });
}

function getSupplier(req,res){
    var id = req.params['id'];

    Category.findById({_id: id}, (err,supplier_data)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(supplier_data){
                res.status(200).send({supplier: supplier_data});
            }else{
                res.status(403).send({message: 'El proveedor no existe'});
            }
        }
    });
}

function update(req,res){
    var id = req.params['id'];
    var data = req.body;

    Supplier.findByIdAndUpdate({_id:id},{company: data.contact, contact: data.contact},(err,supplier_edit)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(supplier_edit){
                res.status(200).send({supplier: supplier_edit});
            }else{
                res.status(403).send({message: 'El proveedor no se pudo actualizar'});
            }
        }
    });
}

function remove(req,res){
    var id = req.params['id'];

    Supplier.findByIdAndRemove({_id:id},(err,supplier_remove)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(supplier_remove){
                res.status(200).send({supplier: supplier_remove});
            }else{
                res.status(403).send({message: 'El proveedor no se pudo eliminar'});
            }
        }
    })
}

function read(req,res){
    var company = req.params['company'];

    Supplier.find({company: new RegExp(title,"i")},(err,supplier_read)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(supplier_read){
                res.status(200).send({suppliers: supplier_read})
            }else{
                res.status(403).send({message: 'No hay proveedores con el nombre de esta empresa'})
            }
        }
    })
}

module.exports = {
    register,
    getSupplier,
    update,
    remove,
    read
}