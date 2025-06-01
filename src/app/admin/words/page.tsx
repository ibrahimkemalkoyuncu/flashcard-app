import { getWords } from '@/lib/database/queries/wordQueries'
import WordList from '@/components/admin/WordList'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default async function WordsPage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const search = searchParams.search || ''
  const { words, totalPages } = await getWords(page, 10, search)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Kelime Yönetimi</h1>
        <Link href="/admin/words/add">
          <Button>Yeni Kelime Ekle</Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Kelime ara..."
            className="px-4 py-2 border rounded-md w-full max-w-md"
            defaultValue={search}
          />
        </div>
        <WordList words={words} />
        
        {totalPages > 1 && (
          <div className="mt-4 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <Link
                key={i + 1}
                href={`/admin/words?page=${i + 1}${search ? `&search=${search}` : ''}`}
                className={`px-3 py-1 rounded ${
                  page === i + 1
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}