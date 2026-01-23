const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');

// Register route
router.post('/register', authController.register);

module.exports = router;