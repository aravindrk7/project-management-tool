const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    assigned_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now()
    },
    status: {
        type: String,
        required: true,
        default: 'open'
    },
    associated_project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'projects',
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
    start_date: {
        type: Date,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    like: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = mongoose.model('tasks', taskSchema);

