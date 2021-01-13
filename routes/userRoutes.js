const mongoose = require('mongoose');
const user = require('../schemas/users');
const bcrypt = require('bcrypt');

var User = mongoose.model('User', user.User);

module.exports = function(app){
    app.get('/api/users', function(req,res){
        User.find(function(err,users){
            if(err) res.send(err);
            res.status(200).json(users);
        })
    });
    app.get('/api/user/:email',function(req,res){
        User.findOne({email: req.params.email}, function(err,user){
            if(err) res.send(err)
            res.status(200).json(user);
        })
    });

    app.post("/api/users", function(req,res){
        if(req.body.email == null || req.body.name == null || req.body.password == null) res.status(400).send("L'un des paramètres obligatoires n'a pas été fourni.");
        else {
            User.findOne({email: req.body.email}, function(err,user){
                if(err) res.send(err);
                if(user != null) res.status(400).send("Cet email est déjà assigné à un autre utilisateur.");
                else {
                    var newUser = new User();
                    bcrypt.genSalt(10, function(err,salt){
                        if(err)res.send(err);
                        bcrypt.hash(req.body.password, salt, function(err, hash){
                            if(err) res.send(err);
                            newUser.email = req.body.email;
                            newUser.name = req.body.name;
                            newUser.password = hash;
    
                            newUser.save(function(err){
                                if(err) res.send(err)
                                res.status(201).json(newUser);
                            })
                        })
                    })
                }
            });
        }
        
        
    });

    // CONNEXION
    app.put("/api/login", function(req,res){
        User.findOne({email: req.body.email}, function(err,user){
            if(err) res.status(400).send(err);
            if(user == null) res.status(404).send(`Aucun utilisateur avec l'adresse ${req.body.email} n'a été trouvé.`)
            else{
                bcrypt.compare(req.body.password, user.password, function(err, result){
                    if(err) res.status(400).send(err);
                    if(result == false) res.status(400).send("Mot de passe incorrect.");
                    else {
                        var returned = `{"email":"${req.body.email}","passphrase":"takehome"}`;
                        var retJson = JSON.parse(returned);
                        res.status(200).json(retJson);
                    }
                })
            }
            
        })
    })
}