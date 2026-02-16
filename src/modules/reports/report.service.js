const Ticket = require('../tickets/ticket.model');

exports.getDashboardReport = async() => {

    const totalTickets = await Ticket.countDocuments();

    const byStatus = await Ticket.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    const byPriority = await Ticket.aggregate([
        { $group: { _id: "$priority", count: { $sum: 1 } } }
    ]);

    const escalatedTickets = await Ticket.countDocuments({
        escalated: true
    });

    return {
        totalTickets,
        byStatus,
        byPriority,
        escalatedTickets
    };
};