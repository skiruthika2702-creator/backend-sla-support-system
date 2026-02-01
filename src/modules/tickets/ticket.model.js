const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ['OPEN', 'IN_PROGRESS', 'RESOLVED'],
        default: 'OPEN'
    },

    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Low'
    },

    level: {
        type: Number,
        default: 1
    },

    slaExpiry: {
        type: Date,
        required: true
    },

    escalated: {
        type: Boolean,
        default: false
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Ticket', ticketSchema);