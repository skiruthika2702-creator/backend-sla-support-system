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

module.exports = {
    registerUser
};