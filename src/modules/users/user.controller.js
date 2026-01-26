const userService = require('./user.service');

const register = async(req, res) => {
    try {
        const user = await userService.registerUser(req.body);
        res.status(201).json({
            message: 'User registered successfully',
            user
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

module.exports = {
    register
};