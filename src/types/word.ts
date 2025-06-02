export interface Word {
    id: number
    english: string
    turkish: string
    category: string
    difficulty: 'easy' | 'medium' | 'hard'
    createdAt?: Date
    updatedAt?: Date
  }