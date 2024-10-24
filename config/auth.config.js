require('dotenv').config();

// Load environment variables from .env file
// dotenv.config();

module.exports = {
    secret: process.env.JWT_SECRET || 'asfasdfsdfsdfdsfsdfsdfsdfsdfsd', // Secret key for JWT signing
    expiresIn: '1h', // Token expiration time (can be set to a string like '1h', '2d', etc.)
};
