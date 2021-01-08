const mongoose = require('mongoose');
const card = require("../schemas/cards");

var Card = mongoose.model('Card', card.Card);

module.exports = function(app,jwt){
    app.get("/api/cards", function(req,res){
        Card.find(function(err,cards){
            if(err)res.send(err);
            res.status(200).json(cards);
        })
    });
    app.get("/api/cards/:email", function(req,res){
        Card.find({ownerEmail: req.params.email}, function(err,cards){
            if(err)res.status(400).send(err);
            res.status(200).json(cards);
        })
    });

    app.post("/api/cards", function(req,res){
        if(req.body.cardID == null || req.body.ownerName == null || req.body.ownerEmail == null || req.body.expDate == null || req.body.crypto == null) res.status(400).send("L'un des paramètres obligatoires n'a pas été fourni.");
        else {
            var json = `{"cardID":"${req.body.cardID}", "ownerName":"${req.body.ownerName}", "expDate":"${req.body.expDate}", "crypto":"${req.body.crypto}"}`;
            var jsonObj = JSON.parse(json);
            var token = jwt.sign(jsonObj, 'takehome');
            var newCard = new Card();
            newCard.cardID = req.body.cardID;
            newCard.ownerEmail = req.body.ownerEmail;
            newCard.cardInfo = token;
            newCard.save(function(err){
                if(err){
                    res.send(err);
                }
                res.status(201).json(newCard);
            })
        }
    });

    app.delete("/api/card/:card_id", function(req,res){
        Card.deleteOne({cardID: req.params.card_id}, function(err){
            if(err) res.send(err);
            res.status(204).send("La carte a été supprimée.");
        })
    });
}
