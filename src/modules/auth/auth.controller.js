const authService = require('./auth.service');

/* =========================
   REGISTER CONTROLLER
========================= */
exports.register = async (req, res) => {
    try {
        await authService.registerUser(req.body);

        res.status(201).json({
            message: 'User registered successfully'
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};


/* =========================
   LOGIN CONTROLLER
========================= */
exports.login = async (req, res) => {
    try {
        const result = await authService.loginUser(req.body); // ✅ IMPORTANT

        res.status(200).json({
            message: 'Login successful',
            token: result.token,
            user: result.user
        });

    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
};
