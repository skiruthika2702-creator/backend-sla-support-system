const fs = require('fs');
const path = require('path');

const logFilePath = path.join(__dirname, 'escalation.log');

exports.logEscalation = (message) => {

    const logMessage = `[${new Date().toISOString()}] ${message}\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) {
            console.error('Escalation log error:', err);
        }
    });

};