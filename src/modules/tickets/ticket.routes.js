const express = require('express');
const router = express.Router();
const ticketController = require('./ticket.controller');
const authGuard = require('../../middlewares/auth.guard');
const roleGuard = require('../../middlewares/role.guard');

// CREATE → any logged-in user
router.post('/create', authGuard, ticketController.createTicket);

// READ → any logged-in user
router.get('/', authGuard, ticketController.getTickets);

// UPDATE → SUPPORT & ADMIN only
router.put(
    '/:id',
    authGuard,
    roleGuard('SUPPORT_L1', 'SUPPORT_L2', 'ADMIN'),
    ticketController.updateTicket
);

// DELETE → ADMIN only
router.delete(
    '/:id',
    authGuard,
    roleGuard('ADMIN'),
    ticketController.deleteTicket
);

module.exports = router;