'use client'

import { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

interface WordFormProps {
  onSubmit: (data: any) => void
  isSubmitting?: boolean
  initialData?: any
}

export default function WordForm({ 
  onSubmit, 
  isSubmitting = false, 
  initialData = {} 
}: WordFormProps) {
  const [formData, setFormData] = useState({
    english: initialData.english || '',
    turkish: initialData.turkish || '',
    category: initialData.category || '',
    difficulty: initialData.difficulty || 'medium',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="İngilizce Kelime"
        name="english"
        value={formData.english}
        onChange={handleChange}
        required
      />
      
      <Input
        label="Türkçe Anlamı"
        name="turkish"
        value={formData.turkish}
        onChange={handleChange}
        required
      />
      
      <Input
        label="Kategori"
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      />
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Zorluk Seviyesi
        </label>
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option value="easy">Kolay</option>
          <option value="medium">Orta</option>
          <option value="hard">Zor</option>
        </select>
      </div>
      
      <div className="pt-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Kaydediliyor...' : 'Kaydet'}
        </Button>
      </div>
    </form>
  )
}