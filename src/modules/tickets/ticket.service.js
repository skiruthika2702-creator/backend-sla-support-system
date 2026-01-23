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
const updateTicket = async(id, data) => {
    return await Ticket.findByIdAndUpdate(id, data, { new: true });
};
const deleteTicket = async(id) => {
    return await Ticket.findByIdAndDelete(id);
};
module.exports = {
    createTicket,
    getAllTickets,
    updateTicket,
    deleteTicket
};