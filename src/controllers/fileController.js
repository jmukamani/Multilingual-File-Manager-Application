const { createFile, getFileById, updateFile, deleteFile } = require('../services/fileService');
const fileUploadQueue = require('../utils/queue');

const createFileHandler = async (req, res) => {
  try {

    // Extract file data from request body
    const { name, path, size, directory } = req.body;
    
    // Add user ID from authenticated request
    const fileData = {
      name, 
      path, 
      size, 
      directory,
      user: req.user.id
    };

    // Create the file
    const newFile = await createFile(fileData);
    
    res.status(201).json(newFile);
    
  } catch (error) {
    console.error('File creation error:', error);
    res.status(400).json({ 
      message: error.message || 'Error creating file',
      error: error.toString() 
    });
  }
};


const getFileHandler = async (req, res) => {
  try {
    const file = await getFileById(req.params.id, req.user.id);
    res.status(200).json({ file });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const updateFileHandler = async (req, res) => {
  try {
    const file = await updateFile(req.params.id, req.user.id, req.body);
    res.status(200).json({ file });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const deleteFileHandler = async (req, res) => {
  try {
    const file = await deleteFile(req.params.id, req.user.id);
    res.status(200).json({ message: 'File deleted successfully', file });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

const uploadFileHandler = async (req, res) => {
  try {
    // Add a job to the queue
    const job = await fileUploadQueue.add({
      fileName: req.body.name,
      filePath: req.body.path,
      fileSize: req.body.size,
    });
    res.status(201).json({ message: 'File upload initiated', jobId: job.id });
  } catch (error) {
    res.status(500).json({ message: 'Failed to enqueue file upload', error });
  }
};

module.exports = { createFileHandler, getFileHandler, updateFileHandler, deleteFileHandler, uploadFileHandler };
