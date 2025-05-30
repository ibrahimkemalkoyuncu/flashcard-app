// routes/admin.js
const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Word = require('../models/Word');

// Admin girişi
router.post('/login', async (req, res) => {
  // Giriş kontrolü
});

// Kelime ekleme
router.post('/words', async (req, res) => {
  try {
    const { english, turkish, category } = req.body;
    const newWord = new Word({ english, turkish, category });
    await newWord.save();
    res.status(201).json(newWord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Kelime listeleme
router.get('/words', async (req, res) => {
  const words = await Word.find().sort({ createdAt: -1 });
  res.json(words);
});