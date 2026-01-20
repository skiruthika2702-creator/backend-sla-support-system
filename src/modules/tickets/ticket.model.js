const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Ticket title
    description: { type: String, required: true }, // Ticket description
    status: { type: String, default: 'OPEN' }, // OPEN, IN_PROGRESS, RESOLVED
    priority: { type: String, default: 'LOW' }, // LOW, MEDIUM, HIGH
    level: { type: Number, default: 1 }, // Level 1 → Level 2 → Level 3
    createdAt: { type: Date, default: Date.now }, // Creation time
    updatedAt: { type: Date, default: Date.now } // Last update
});

module.exports = mongoose.model('Ticket', ticketSchema);