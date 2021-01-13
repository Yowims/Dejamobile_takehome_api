const mongoose = require('mongoose');

module.exports = {
    User: new mongoose.Schema({
        email: String,
        name: String,
        password: String
    })
};