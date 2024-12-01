const Directory = require('../models/Directory');

const createDirectory = async (directoryData, userId) => {
  const { name, path, parent } = directoryData;
  
  // Validate input
  if (!name || !path) {
    throw new Error('Directory name and path are required');
  }

  const directory = new Directory({
    name,
    path,
    user: userId,
    parent: parent || null
  });

  await directory.save();
  return directory;
};

const getDirectoriesByUser = async (userId) => {
  return await Directory.find({ user: userId });
};

const getDirectoryById = async (directoryId, userId) => {
  const directory = await Directory.findOne({ 
    _id: directoryId, 
    user: userId 
  });

  if (!directory) {
    throw new Error('Directory not found');
  }

  return directory;
};

module.exports = { 
  createDirectory, 
  getDirectoriesByUser,
  getDirectoryById 
};