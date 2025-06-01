import { getWordById, updateWord } from '@/lib/database/queries/wordQueries'
import WordForm from '@/components/admin/WordForm'
import { notFound } from 'next/navigation'

export default async function EditWordPage({
  params,
}: {
  params: { id: string }
}) {
  const word = await getWordById(params.id)
  
  if (!word) {
    return notFound()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Kelime Düzenle</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <WordForm 
          initialData={word} 
          onSubmit={async (formData) => {
            'use server'
            await updateWord(params.id, formData)
          }} 
        />
      </div>
    </div>
  )
}