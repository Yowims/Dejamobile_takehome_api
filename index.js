const express = require('express');
const app = express();
const cors = require('cors');
var bodyParser = require("body-parser"); 
const jwt = require('jsonwebtoken');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

var mongoose = require('mongoose');
 
var urlmongo = "mongodb://localhost:27017/takehome"; 
mongoose.connect(urlmongo, {useNewUrlParser: true, useUnifiedTopology: true });


 
var db = mongoose.connection; 
db.on('error', console.error.bind(console, 'Erreur lors de la connexion')); 
db.once('open', function (){
    console.log("Connexion à la base OK"); 
});

app.get("/api", function(req,res){
    res.send('Point d\'entrée');
});

require("./routes/cardRoutes")(app,jwt);
require("./routes/userRoutes")(app)

app.listen(process.env.PORT || 3000, () => {
    console.log('Example app listening on port 3000!')
});