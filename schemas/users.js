const mongoose = require('mongoose');

module.exports = {
    User: new mongoose.Schema({
        email: String,
        password: String
    })
};