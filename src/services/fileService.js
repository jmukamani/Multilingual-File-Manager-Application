const File = require('../models/File');
const Directory = require('../models/Directory');

const createFile = async (fileData) => {
  const { name, path, size, directory, user } = fileData;
  
  // Validate that the directory belongs to the user
  const directoryDoc = await Directory.findOne({ 
    _id: directory, 
    user: user 
  });

  if (!directoryDoc) {
    throw new Error('Directory not found or does not belong to the user');
  }

  const file = new File({ 
    name, 
    path, 
    size, 
    user, 
    directory 
  });
  
  await file.save();
  return file;
};

const getFileById = async (fileId, userId) => {
  const file = await File.findOne({ _id: fileId, user: userId });
  if (!file) throw new Error('File not found');
  return file;
};

const updateFile = async (fileId, userId, updateData) => {
  const updatedFile = await File.findOneAndUpdate(
    { _id: fileId, user: userId },
    updateData,
    { new: true }
  );
  if (!updatedFile) throw new Error('File not found');
  return updatedFile;
};

const deleteFile = async (fileId, userId) => {
  const deletedFile = await File.findOneAndDelete({ _id: fileId, user: userId });
  if (!deletedFile) throw new Error('File not found');
  return deletedFile;
};

module.exports = { createFile, getFileById, updateFile, deleteFile };
