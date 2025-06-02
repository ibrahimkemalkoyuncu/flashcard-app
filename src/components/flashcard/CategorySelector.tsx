import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CategorySelector() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/words/categories');
        const data = await response.json();
        if (response.ok) {
          setCategories(data.data);
        }
      } catch (err) {
        console.error('Kategoriler alınamadı:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleStartGame = () => {
    if (selectedCategory) {
      router.push(`/flashcard/game?category=${selectedCategory}`);
    }
  };

  if (loading) return <div>Yükleniyor...</div>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold text-center mb-6">Kategori Seçin</h2>
      <div className="space-y-4">
        <select
          className="w-full p-3 border rounded-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Tüm Kategoriler</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button
          onClick={handleStartGame}
          disabled={!selectedCategory}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Oyunu Başlat
        </button>
      </div>
    </div>
  );
}