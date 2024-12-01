const passport = require('passport');

const authenticate = passport.authenticate('local', { session: false });

module.exports = { authenticate };
