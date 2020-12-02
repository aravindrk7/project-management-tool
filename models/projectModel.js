const mongoose = require('mongoose');
const Tasks = require('../models/taskModel');

const projectSchema = mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true
    },
    due_date: {
        type: Date,
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
    head: {
        type: Array,
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
    tasks: {
        type: Array,
        required: true
    },
    // tasks: {
    //     type: [String],
    //     required: true,
    // },
    // tasks: {
    //     type: Array,
    //     required: true
    // },
    members: {
        type: Array,
        required: true
    },
});

module.exports = mongoose.model('projects', projectSchema);