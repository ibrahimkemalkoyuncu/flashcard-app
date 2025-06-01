'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Word } from '@/types/word'

interface WordListProps {
  words: Word[]
}

export default function WordList({ words }: WordListProps) {
  const router = useRouter()

  const handleDelete = async (id: number) => {
    if (!confirm('Bu kelimeyi silmek istediğinize emin misiniz?')) return
    
    try {
      const response = await fetch(`/api/words/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        toast.success('Kelime başarıyla silindi')
        router.refresh()
      } else {
        const errorData = await response.json()
        toast.error(errorData.error || 'Silme işlemi başarısız oldu')
      }
    } catch (error) {
      toast.error('Bir hata oluştu')
      console.error('Error:', error)
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kelime</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Anlam</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Zorluk</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {words.length > 0 ? (
            words.map((word) => (
              <tr key={word.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{word.english}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-500">{word.turkish}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {word.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    word.difficulty === 'easy' 
                      ? 'bg-blue-100 text-blue-800' 
                      : word.difficulty === 'medium' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-red-100 text-red-800'
                  }`}>
                    {word.difficulty === 'easy' ? 'Kolay' : word.difficulty === 'medium' ? 'Orta' : 'Zor'}
                  </span>
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
            ))
          ) : (
            <tr>
              <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                Hiç kelime bulunamadı
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}