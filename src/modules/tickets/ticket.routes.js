const express = require('express');
const router = express.Router();
const ticketController = require('./ticket.controller');

// Route to create a ticket
router.post('/create', ticketController.createTicket);

// Route to get all tickets
router.get('/', ticketController.getTickets);

module.exports = router; // Export routes