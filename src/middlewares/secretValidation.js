const jwt = require('jsonwebtoken');

function validateJWTSecret(secret) {
    try {
        // Attempt to create and verify a test token
        const testToken = jwt.sign({ test: 'payload' }, secret, { expiresIn: '1h' });
        jwt.verify(testToken, secret);
        return true;
    } catch (error) {
        console.error('Invalid JWT Secret:', error);
        return false;
    }
}

module.exports = validateJWTSecret;