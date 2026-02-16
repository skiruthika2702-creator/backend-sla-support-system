exports.sendNotification = (type, message) => {

    const timestamp = new Date().toISOString();

    console.log(`
        
Notification Type : ${type}
Time              : ${timestamp}
Message           : ${message}
    `);

};