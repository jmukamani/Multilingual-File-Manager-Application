const { 
    createDirectory, 
    getDirectoriesByUser,
    getDirectoryById 
  } = require('../services/directoryService');
  
  const createDirectoryHandler = async (req, res) => {
    try {
      const { name, path, parent } = req.body;
      
      // Validate input
      if (!name || !path) {
        return res.status(400).json({ 
          message: 'Directory name and path are required' 
        });
      }
  
      const directory = await createDirectory(
        { name, path, parent }, 
        req.user.id
      );
  
      res.status(201).json({ 
        message: 'Directory created successfully', 
        directory 
      });
    } catch (error) {
      res.status(400).json({ 
        message: error.message 
      });
    }
  };
  
  const listDirectoriesHandler = async (req, res) => {
    try {
      const directories = await getDirectoriesByUser(req.user.id);
      res.status(200).json({ directories });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  const getDirectoryHandler = async (req, res) => {
    try {
      const directory = await getDirectoryById(req.params.id, req.user.id);
      res.status(200).json({ directory });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  module.exports = { 
    createDirectoryHandler, 
    listDirectoriesHandler,
    getDirectoryHandler 
  };