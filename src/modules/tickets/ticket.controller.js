const ticketService = require('./ticket.service'); // Import ticket service

// Create a ticket
const createTicket = async(req, res) => {
    try {
        const ticket = await ticketService.createTicket(req.body); // Call service
        res.status(201).json(ticket); // Send response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all tickets
const getTickets = async(req, res) => {
    try {
        const tickets = await ticketService.getAllTickets(); // Call service
        res.status(200).json(tickets); // Send response
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const updateTicket = async(req, res) => {
    try {
        const updatedTicket = await ticketService.updateTicket(
            req.params.id,
            req.body
        );
        res.status(200).json(updatedTicket);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
const deleteTicket = async(req, res) => {
    try {
        await ticketService.deleteTicket(req.params.id);
        res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = { createTicket, getTickets, updateTicket, deleteTicket };