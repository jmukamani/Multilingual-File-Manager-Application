const express = require('express');
const { uploadFile, getUserFiles, deleteFile } = require('../controllers/fileController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Set your upload directory

const router = express.Router();

router.post('/upload', authMiddleware, upload.single('file'), uploadFile);
router.get('/files', authMiddleware, getUserFiles);
router.delete('/files/:fileId', authMiddleware, deleteFile);

module.exports = router;