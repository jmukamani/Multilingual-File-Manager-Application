const mongoose = require('mongoose');

const directorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Directory', default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Directory', directorySchema);