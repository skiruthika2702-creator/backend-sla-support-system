const express = require('express');
const connectDB = require('./config/database'); // Import DB connection
require('dotenv').config(); // Load .env variables

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Ticket routes
const ticketRoutes = require('./modules/tickets/ticket.routes');
app.use('/api/tickets', ticketRoutes);

const authRoutes = require('./modules/auth/auth.routes');
app.use('/auth', authRoutes);


// Test route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

// Connect to MongoDB
connectDB();

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});