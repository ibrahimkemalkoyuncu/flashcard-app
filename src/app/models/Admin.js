// models/Admin.js
const mongoose = require('mongoose');
const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Admin', AdminSchema);

// models/Word.js
const WordSchema = new mongoose.Schema({
  english: { type: String, required: true },
  turkish: { type: String, required: true },
  category: { type: String },
  difficulty: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
});