const User = require('./user.model');
const bcrypt = require('bcryptjs');

const registerUser = async(userData) => {
    const { name, email, password } = userData;

    // check user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // encrypt password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    return user;
};
const jwt = require('jsonwebtoken');

const loginUser = async(userData) => {
    const { email, password } = userData;

    const user = await User.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }

    const token = jwt.sign({ id: user._id, role: user.role },
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