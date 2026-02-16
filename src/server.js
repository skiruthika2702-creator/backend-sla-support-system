const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();
require('./modules/escalation/escalation.job');

const app = express();

app.use(express.json());

// Test login
app.post('/test-login', (req, res) => {
    res.json({ message: 'TEST LOGIN WORKING' });
});

// Routes
const ticketRoutes = require('./modules/tickets/ticket.routes');
app.use('/api/tickets', ticketRoutes);

const userRoutes = require('./modules/users/user.routes');
app.use('/api/users', userRoutes);

const authRoutes = require('./modules/auth/auth.routes');
app.use('/auth', authRoutes);

// ✅ ADD HERE
const reportRoutes = require('./modules/reports/report.routes');
app.use('/api/reports', reportRoutes);

const errorHandler = require('./middlewares/error.handler');
app.use(errorHandler);

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});