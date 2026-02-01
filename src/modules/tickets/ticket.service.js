const Ticket = require('./ticket.model');
const { calculateSlaExpiry } = require('../../utils/slaTimer');

/* =========================
   CREATE TICKET
========================= */
const createTicket = async (data, user) => {

    const slaExpiry = calculateSlaExpiry(data.priority);

    const ticket = new Ticket({
        title: data.title,
        description: data.description,
        priority: data.priority || 'Low',
        status: 'OPEN',
        level: 1,
        slaExpiry,
        createdBy: user.id
    });

    return await ticket.save();
};

/* =========================
   GET TICKETS (ROLE BASED)
========================= */
const getAllTickets = async (user) => {

    if (user.role === 'ADMIN') {
        return await Ticket.find();
    }

    if (user.role === 'SUPPORT_L1') {
        return await Ticket.find({ level: 1 });
    }

    if (user.role === 'SUPPORT_L2') {
        return await Ticket.find({ level: 2 });
    }

    return await Ticket.find({ createdBy: user.id });
};

/* =========================
   UPDATE TICKET
========================= */
const updateTicket = async (id, data, user) => {

    const ticket = await Ticket.findById(id);
    if (!ticket) throw new Error('Ticket not found');

    if (
        user.role !== 'ADMIN' &&
        ticket.createdBy.toString() !== user.id
    ) {
        throw new Error('Access denied');
    }

    ticket.title = data.title || ticket.title;
    ticket.description = data.description || ticket.description;
    ticket.status = data.status || ticket.status;
    ticket.priority = data.priority || ticket.priority;
    ticket.level = data.level || ticket.level;

    return await ticket.save();
};

/* =========================
   DELETE TICKET
========================= */
const deleteTicket = async (id, user) => {

    if (user.role !== 'ADMIN') {
        throw new Error('Only admin can delete tickets');
    }

    return await Ticket.findByIdAndDelete(id);
};

module.exports = {
    createTicket,
    getAllTickets,
    updateTicket,
    deleteTicket
};
