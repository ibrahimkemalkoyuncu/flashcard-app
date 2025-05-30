'use client'
import { useState, useEffect } from 'react';
import styles from './AdminPanel.module.css';

export default function AdminPanel({ onClose }) {
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState({ front: '', back: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = async () => {
    try {
      const response = await fetch('/api/words');
      const data = await response.json();
      setWords(data);
    } catch (error) {
      console.error('Veri çekme hatası:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingId ? `/api/words/${editingId}` : '/api/words';
      const method = editingId ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWord)
      });

      if (response.ok) {
        fetchWords();
        setNewWord({ front: '', back: '' });
        setEditingId(null);
      }
    } catch (error) {
      console.error('Kaydetme hatası:', error);
    }
  };

  const handleEdit = (word) => {
    setNewWord({ front: word.front, back: word.back });
    setEditingId(word.id);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/words/${id}`, { method: 'DELETE' });
      if (response.ok) {
        fetchWords();
      }
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  return (
    <div className={styles.adminPanel}>
      <button className={styles.closeButton} onClick={onClose}>×</button>
      <h2>Admin Paneli</h2>
      
      <form onSubmit={handleSubmit} className={styles.wordForm}>
        <input
          type="text"
          placeholder="Kelime (İngilizce)"
          value={newWord.front}
          onChange={(e) => setNewWord({...newWord, front: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Anlamı (Türkçe)"
          value={newWord.back}
          onChange={(e) => setNewWord({...newWord, back: e.target.value})}
          required
        />
        <button type="submit">
          {editingId ? 'Güncelle' : 'Ekle'}
        </button>
      </form>

      <div className={styles.wordList}>
        <h3>Kelime Listesi</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>İngilizce</th>
              <th>Türkçe</th>
              <th>İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {words.map((word) => (
              <tr key={word.id}>
                <td>{word.id}</td>
                <td>{word.front}</td>
                <td>{word.back}</td>
                <td>
                  <button onClick={() => handleEdit(word)}>Düzenle</button>
                  <button onClick={() => handleDelete(word.id)}>Sil</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}