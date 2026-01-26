const express = require('express');
const router = express.Router();
const ticketController = require('./ticket.controller');

// CREATE
router.post('/create', ticketController.createTicket);

// READ
router.get('/', ticketController.getTickets);

// UPDATE
router.put('/:id', ticketController.updateTicket);

// DELETE  
router.delete('/:id', ticketController.deleteTicket);

module.exports = router;