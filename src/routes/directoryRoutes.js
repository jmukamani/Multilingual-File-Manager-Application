const express = require('express');
const { 
  createDirectoryHandler, 
  listDirectoriesHandler,
  getDirectoryHandler 
} = require('../controllers/directoryController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// List all directories for the logged-in user
router.get('/', authenticate, listDirectoriesHandler);

// Create a new directory
router.post('/create', authenticate, createDirectoryHandler);

// Get a specific directory by ID
router.get('/:id', authenticate, getDirectoryHandler);

module.exports = router;