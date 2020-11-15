const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    displayName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        minlength: 5,
        required: true
    },
    projects: {
        type: Array,
        required: true
    },
});

module.exports = mongoose.model('users', userSchema);