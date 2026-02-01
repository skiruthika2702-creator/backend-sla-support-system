const Ticket = require('../tickets/ticket.model');
const SLA = require('../../config/sla.config');

const escalateTickets = async() => {
    const now = new Date();

    const openTickets = await Ticket.find({ status: 'OPEN' });

    for (let ticket of openTickets) {
        const slaTime = SLA[ticket.priority];
        const createdTime = new Date(ticket.createdAt);
        const diff = now - createdTime;

        if (diff > slaTime && ticket.level < 3) {
            ticket.level += 1;
            await ticket.save();

            console.log(`Ticket ${ticket._id} escalated to level ${ticket.level}`);
        }
    }
};

module.exports = escalateTickets;