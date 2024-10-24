const jwt = require('jsonwebtoken');
const config = require('../config/auth.config'); 

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.sendStatus(401); // Unauthorized
    }

    // Verify the token
    jwt.verify(token, config.secret, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden
        }

        req.user = user; // Attach the user information to the request
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = authenticateToken;
