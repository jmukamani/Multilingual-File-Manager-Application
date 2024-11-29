const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./src/routes/authRoutes');
const fileRoutes = require('./src/routes/fileRoutes');
const connectDB = require('./src/config/mongodb');
const { uploadQueue } = require('./src/services/uploadQueue');
const arena = require('./src/services/redisDashboard'); // Optional: Redis dashboard for monitoring

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

// Optional: Redis dashboard for monitoring
app.use('/arena', arena);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Bull queue event listeners (optional)
uploadQueue.on('completed', (job, result) => {
    console.log(`Job ${job.id} completed with result:`, result);
});

uploadQueue.on('failed', (job, err) => {
    console.error(`Job ${job.id} failed with error:`, err);
});