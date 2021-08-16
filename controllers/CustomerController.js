var Customer = require('../models/Customer');

function register(req,res){
    let data = req.body;
    var customer = new Customer();
    customer.name= data.name;
    customer.lastname= data.lastname;
    customer.dni = data.dni;
    customer.points = 10;

    customer.save((err,customer_save)=>{
        if(customer_save){
            res.status(200).send({customer: customer_save});
        }else{
            res.status(500).send(err);
        }
    })
}

function update(req,res){
    let id = req.params['id'];
    let data = req.body;

    Customer.findOneAndUpdate(id,{name: data.name, lastname: data.lastname, dni: data.dni},(err,customer_edit)=>{
        if(customer_edit){
            res.status(200).send({customer: customer_edit});
        }else{
            res.status(500).send(err);
        }
    })
}

function remove(req,res){
    let id = req.params['id'];

    Customer.findByIdAndRemove(id,(err,customer_remove)=>{
        if(customer_remove){
            res.status(200).send({customer: customer_remove});
        }else{
            res.status(500).send(err);
        }
    })
}

module.exports = {
    register,
    update,
    remove
}