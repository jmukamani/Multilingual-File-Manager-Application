const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const i18nMiddleware = require('./middlewares/i18nMiddleware');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const userRoutes = require('./routes/userRoutes');
const directoryRoutes = require('./routes/directoryRoutes');
require('./config/passport'); // Passport configuration

dotenv.config();

const app = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'session_secret', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(i18nMiddleware);

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the File Manager API. Please use Postman or curl to access the API endpoints.');
});

app.use('/api/auth', authRoutes);
app.use('/api/directories', directoryRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/users', userRoutes);

// Move the catch-all route to the END
app.get('*', (req, res) => {
  res.status(404).send('Endpoint not found. Please check the API documentation.');
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'An internal error occurred', error: err.message });
});

module.exports = app;