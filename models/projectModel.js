const mongoose = require('mongoose');
const Tasks = require('../models/taskModel');
const projectSchema = mongoose.Schema({
    created_by: {
        type: String,
        required: true
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
        required: true,
        default: Date.now()
    },
    start_date: {
        type: Date,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'open'
    },
    // team_id: {
    //     type: String,
    //     required: true
    // },
    head: {
        type: Array,
        required: true
    },
    privacy: {
        type: String,
        required: true,
        default: 'public'
    },
    favorite: {
        type: Boolean,
        required: true,
        default: false
    },
    tasks: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'tasks',
        default: []
    }],
    members: {
        type: Array,
        default: []
    },
});

module.exports = mongoose.model('projects', projectSchema);