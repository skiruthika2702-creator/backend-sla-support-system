const cron = require('node-cron');
const escalateTickets = require('./escalation.service');

cron.schedule('*/5 * * * *', async() => {
    console.log('Checking SLA escalations...');
    await escalateTickets();
});