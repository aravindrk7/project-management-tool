const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    assigned_to: {
        type: Object,
        required: true,
    },
    assigned_by: {
        type: Object,
        required: true,
    },
    created_at: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    associated_team: {
        type: Object,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    like: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('tasks', taskSchema);