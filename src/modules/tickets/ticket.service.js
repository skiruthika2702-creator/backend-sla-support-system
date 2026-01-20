const Ticket = require('./ticket.model'); // Import ticket model

// Function to create a new ticket
const createTicket = async(data) => {
    const ticket = new Ticket(data); // Create new ticket
    return await ticket.save(); // Save ticket to MongoDB
};

// Function to get all tickets
const getAllTickets = async() => {
    return await Ticket.find(); // Return all tickets
};

module.exports = { createTicket, getAllTickets }; // Export functions