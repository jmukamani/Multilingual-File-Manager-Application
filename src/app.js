const express = require('express');
const connectDB = require('./config/mongodb');
const { i18nextMiddleware } = require('./config/i18n');
const authRoutes = require('./routes/authRoutes');
const fileRoutes = require('./routes/fileRoutes');
const dotenv = require('dotenv');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(i18nextMiddleware.handle(i18n));
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});