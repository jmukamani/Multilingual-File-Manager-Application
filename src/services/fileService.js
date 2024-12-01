const File = require('../models/File');
const Directory = require('../models/Directory');

const createFile = async (fileData, userId) => {
  const { name, path, size, directory } = fileData;
  const file = new File({ name, path, size, user: userId, directory });
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
