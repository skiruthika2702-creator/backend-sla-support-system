const express = require('express');
const router = express.Router();

const reportService = require('./report.service');
const authGuard = require('../../middlewares/auth.guard');
const roleGuard = require('../../middlewares/role.guard');
const ROLES = require('../../config/roles.config');

router.get(
    '/',
    authGuard,
    roleGuard(ROLES.ADMIN),
    async(req, res) => {
        try {
            const data = await reportService.getDashboardReport();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
);

module.exports = router;