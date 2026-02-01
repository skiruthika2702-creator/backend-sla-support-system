const User = require('../users/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/* =========================
   REGISTER SERVICE
========================= */
const registerUser = async(data) => {
    const { name, email, password, role } = data;

    // Check user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({
        name,
        email,
        password: hashedPassword,
        role
    });
};

/* =========================
   LOGIN SERVICE
========================= */
const loginUser = async(data) => {
    const { email, password } = data;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    // Generate JWT
    const token = jwt.sign({
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET, { expiresIn: '1d' }
    );

    return {
        token,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    };
};

module.exports = {
    registerUser,
    loginUser
};