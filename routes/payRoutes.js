const mongoose = require('mongoose');
const pay = require("../schemas/pay");

var Pay = mongoose.model('Pay', pay.Pay);

module.exports = function(app){
    app.get("/api/pay/:senderID", function(req,res){
        Pay.find({$or: [{'senderID': req.params.senderID}, {'recieverID': req.params.senderID}]},
        function(err,list){
            if(err) res.send(err);
            res.status(200).json(list);
        });
    })

    app.post("/api/pay", function(req,res){
        if(req.body.senderID == null || req.body.recieverID == null || req.body.amount == null) res.status(400).send("L'un des champs n'est pas complet.");
        else {
            var newPay = new Pay();
            newPay.senderID = req.body.senderID;
            newPay.recieverID = req.body.recieverID;
            newPay.amount = req.body.amount;
            req.body.comment == null ? newPay.comment = "" : newPay.comment = req.body.comment;
            newPay.save(function(err){
                if(err) res.send(err);
                res.status(201).json(newPay);
            })
        }
    })
}