const User = require('../users/user.model');
const bcrypt = require('bcryptjs');

exports.register = async(req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role
        });

        await user.save();

        res.status(201).json({
            message: 'User registered successfully'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};