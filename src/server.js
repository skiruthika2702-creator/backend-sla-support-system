const express = require('express');
const connectDB = require('./config/database'); // Import DB connection
require('dotenv').config(); // Load .env variables
require('./modules/escalation/escalation.job');

const app = express();

// Middleware to parse JSON
app.use(express.json());
app.post('/api/users/login', (req, res) => {
    res.json({ message: 'DIRECT LOGIN ROUTE WORKING' });
});

// Ticket routes
app.post('/test-login', (req, res) => {
    res.json({ message: 'TEST LOGIN WORKING' });
});

const ticketRoutes = require('./modules/tickets/ticket.routes');
app.use('/api/tickets', ticketRoutes);

const userRoutes = require('./modules/users/user.routes');
app.use('/api/users', userRoutes);


const authRoutes = require('./modules/auth/auth.routes');
app.use('/auth', authRoutes);

const errorHandler = require('./middlewares/error.handler');

// LAST middleware
app.use(errorHandler);


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