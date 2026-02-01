const ticketService = require('./ticket.service');

// CREATE TICKET
const createTicket = async(req, res) => {
    try {
        const ticket = await ticketService.createTicket(
            req.body,
            req.user.id // logged-in user id
        );

        res.status(201).json(ticket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// GET ALL TICKETS
const getTickets = async(req, res) => {
    try {
        const tickets = await ticketService.getAllTickets(req.user);
        res.status(200).json(tickets);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UPDATE TICKET
const updateTicket = async(req, res) => {
    try {
        const updatedTicket = await ticketService.updateTicket(
            req.params.id,
            req.body,
            req.user
        );

        res.status(200).json(updatedTicket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// DELETE TICKET
const deleteTicket = async(req, res) => {
    try {
        await ticketService.deleteTicket(
            req.params.id,
            req.user
        );

        res.status(200).json({ message: 'Ticket deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createTicket,
    getTickets,
    updateTicket,
    deleteTicket
};