const express = require('express');
const router = express.Router();
const ticketController = require('./ticket.controller');

// Route to create a ticket
router.post('/create', ticketController.createTicket);

// Route to get all tickets
router.get('/', ticketController.getTickets);
router.put('/:id', ticketController.updateTicket);
router.delete('/:id', ticketController.deleteTicket);



module.exports = router; // Export routes