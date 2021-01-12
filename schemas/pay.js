const mongoose = require('mongoose');

module.exports = {
    Pay: new mongoose.Schema({
        senderID : String,
        recieverID: String,
        amount: String,
        comment: String
    })
};