const cron = require('node-cron');
const Ticket = require('../tickets/ticket.model');
const SLA_CONFIG = require('../../config/sla.config');
const { sendNotification } = require('../../utils/notifier');
const { logEscalation } = require('./escalation.logger');

/*
 Runs every 5 minutes
*/
cron.schedule('*/5 * * * *', async() => {
    console.log('SLA Escalation Job Running...');

    const now = Date.now();

    // Get all OPEN or IN_PROGRESS tickets
    const tickets = await Ticket.find({
        status: { $ne: 'RESOLVED' }
    });

    for (let ticket of tickets) {

        const createdTime = new Date(ticket.createdAt).getTime();
        const slaLimit = SLA_CONFIG[ticket.priority] || SLA_CONFIG.Low;

        if (now - createdTime > slaLimit) {

            // Already at final level
            if (ticket.level >= 3) {
                continue;
            }

            // Escalate
            ticket.level += 1;
            ticket.escalated = true;
            ticket.createdAt = new Date(); // reset SLA timer

            await ticket.save();

            const message = `Ticket ${ticket._id} escalated to Level ${ticket.level}`;

            console.log(message);

            sendNotification('ESCALATION', message);

            logEscalation(message);

        }
    }
});