const mongoose = require('mongoose'); // Import mongoose
require('dotenv').config({ path: '../../.env' }); // Load .env from backend root

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI); // Connect using MONGO_URI
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1); // Stop server if DB fails
    }
};

module.exports = connectDB; // Export function