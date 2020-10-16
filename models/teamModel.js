const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    created_by: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    created_at: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    members: {
        type: Array,
        required: true
    },
    head: {
        type: String,
        required: true
    },
    privacy: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('teams', teamSchema);