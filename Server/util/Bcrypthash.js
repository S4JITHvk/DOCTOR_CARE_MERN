const bcrypt = require('bcrypt');

// Function to hash a password
async function hashdata(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
}

// Function to compare a password with a hashed password
async function comparedata(password, hashedPassword) {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
}

module.exports = { hashdata, comparedata };
