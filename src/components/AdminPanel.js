// src/components/AdminPanel.js
import React, { useState } from 'react';
import axios from 'axios';

function AdminPanel() {
  const [english, setEnglish] = useState('');
  const [turkish, setTurkish] = useState('');
  const [category, setCategory] = useState('');
  const [words, setWords] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/words', { english, turkish, category });
      // Başarı mesajı ve form temizleme
    } catch (error) {
      console.error('Kelime eklenirken hata:', error);
    }
  };

  return (
    <div>
      <h2>Admin Paneli</h2>
      <form onSubmit={handleSubmit}>
        <input value={english} onChange={(e) => setEnglish(e.target.value)} placeholder="İngilizce" />
        <input value={turkish} onChange={(e) => setTurkish(e.target.value)} placeholder="Türkçe" />
        <input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Kategori" />
        <button type="submit">Ekle</button>
      </form>
      
      <div className="word-list">
        {words.map(word => (
          <div key={word._id}>
            <p>{word.english} - {word.turkish}</p>
          </div>
        ))}
      </div>
    </div>
  );
}