import { useState, useEffect } from 'react';
import { Word } from '@/types/word';
import Link from 'next/link';

export default function WordList() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWords = async () => {
      try {
        const response = await fetch('/api/words');
        const data = await response.json();
        if (response.ok) {
          setWords(data.data);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError('Kelime listesi alınamadı');
      } finally {
        setLoading(false);
      }
    };

    fetchWords();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Bu kelimeyi silmek istediğinize emin misiniz?')) return;
    
    try {
      const response = await fetch(`/api/words/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setWords(words.filter(word => word.id !== id));
      } else {
        const data = await response.json();
        alert(data.message || 'Silme işlemi başarısız');
      }
    } catch (err) {
      alert('Sunucu hatası oluştu');
    }
  };

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-semibold">Kelime Listesi</h2>
        <Link 
          href="/admin/words/add"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Yeni Ekle
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İngilizce</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Türkçe</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zorluk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {words.map((word) => (
              <tr key={word.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{word.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{word.english}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{word.turkish}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{word.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {word.difficulty === 1 ? 'Kolay' : word.difficulty === 2 ? 'Orta' : 'Zor'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link
                    href={`/admin/words/edit/${word.id}`}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Düzenle
                  </Link>
                  <button
                    onClick={() => handleDelete(word.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}