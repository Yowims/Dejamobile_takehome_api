const mongoose = require('mongoose');

module.exports = {
    Card: new mongoose.Schema({
        cardID : String,
        ownerEmail: String,
        cardInfo: String
    })
};