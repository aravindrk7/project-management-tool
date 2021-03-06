const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    displayName: {
        type: String
    },
    displayPicture: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    }
});

module.exports = mongoose.model('users', userSchema);