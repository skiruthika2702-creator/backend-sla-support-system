const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import routes
const authRoutes = require('./modules/auth/auth.routes');

// Use routes
app.use('/auth', authRoutes);

// Test route
app.get('/', (req, res) => {
    res.send('Backend is running!');
});

module.exports = app;