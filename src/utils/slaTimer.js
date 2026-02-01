const slaConfig = require('../config/sla.config');

const calculateSlaExpiry = (priority) => {
    const now = new Date();

    const slaDuration = slaConfig[priority];

    if (!slaDuration) {
        throw new Error('Invalid priority for SLA calculation');
    }

    return new Date(now.getTime() + slaDuration);
};

module.exports = {
    calculateSlaExpiry
};