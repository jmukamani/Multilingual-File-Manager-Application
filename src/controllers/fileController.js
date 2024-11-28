// src/controllers/fileController.js
const File = require('../models/file');
const User = require('../models/User');
const fs = require('fs').promises;
const path = require('path');

exports.uploadFile = async (req, res) => {
    try {
        const { user } = req;
        const file = req.file;
        
        // Create file record in database
        const newFile = new File({
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            path: file.path,
            user: user.id
        });
        
        await newFile.save();
        
        // Update user's files
        await User.findByIdAndUpdate(
            user.id, 
            { $push: { files: newFile._id } }
        );
        
        res.status(201).json({
            message: 'File uploaded successfully',
            file: newFile
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'File upload failed', 
            error: error.message 
        });
    }
};

exports.getUserFiles = async (req, res) => {
    try {
        const files = await File.find({ user: req.user.id });
        res.json(files);
    } catch (error) {
        res.status(500).json({ 
            message: 'Could not retrieve files', 
            error: error.message 
        });
    }
};

exports.deleteFile = async (req, res) => {
    try {
        const { fileId } = req.params;
        
        // Find and delete file
        const file = await File.findOneAndDelete({ 
            _id: fileId, 
            user: req.user.id 
        });
        
        if (!file) {
            return res.status(404).json({ 
                message: 'File not found' 
            });
        }
        
        // Remove file from filesystem
        await fs.unlink(path.join(__dirname, '../../', file.path));
        
        // Remove file reference from user
        await User.findByIdAndUpdate(
            req.user.id, 
            { $pull: { files: fileId } }
        );
        
        res .status(200).json({ 
            message: 'File deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'File deletion failed', 
            error: error.message 
        });
    }
};
