const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  size: { type: Number, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  directory: { type: mongoose.Schema.Types.ObjectId, ref: 'Directory', required: true },
});

module.exports = mongoose.model('File', fileSchema);
