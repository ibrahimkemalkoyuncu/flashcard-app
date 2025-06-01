'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import WordForm from '@/components/admin/WordForm'
import { createWord } from '@/lib/database/queries/wordQueries'
import { toast } from 'react-hot-toast'

export default function AddWordPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true)
    try {
      await createWord(formData)
      toast.success('Kelime başarıyla eklendi!')
      router.push('/admin/words')
    } catch (error) {
      toast.error('Kelime eklenirken bir hata oluştu')
      console.error('Error adding word:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Yeni Kelime Ekle</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <WordForm 
          onSubmit={handleSubmit} 
          isSubmitting={isSubmitting} 
        />
      </div>
    </div>
  )
}