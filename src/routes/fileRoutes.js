const express = require('express');
const { 
  createFileHandler, 
  getFileHandler, 
  updateFileHandler, 
  deleteFileHandler, 
  uploadFileHandler 
} = require('../controllers/fileController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

// Define routes for file management
router.post('/create', authenticate, createFileHandler); // File creation
router.get('/:id', authenticate, getFileHandler); // Get file by ID
router.put('/:id', authenticate, updateFileHandler); // Update file
router.delete('/:id', authenticate, deleteFileHandler); // Delete file
router.post('/upload', authenticate, uploadFileHandler); // Upload file (queued)

// Export the router
module.exports = router;
