const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique:true
    },
    created_at: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    team_id: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    privacy: {
        type: String,
        required: true
    },
    favorite: {
        type: Boolean,
        required: true
    },
});

module.exports = mongoose.model('projects', projectSchema);