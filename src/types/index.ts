// src/types/index.ts
export interface Word {
    id: number;
    english: string;
    turkish: string;
    category: string;
    difficulty: DifficultyLevel;
    pronunciation?: string;
    example_sentence?: string;
    created_at: Date;
    updated_at: Date;
  }
  
  // src/types/word.ts
  export type DifficultyLevel = 'easy' | 'medium' | 'hard';
  
  export interface WordInput {
    english: string;
    turkish: string;
    category: string;
    difficulty: DifficultyLevel;
    pronunciation?: string;
    example_sentence?: string;
  }
  
  export interface WordUpdate extends Partial<WordInput> {
    id: number;
  }
  
  export interface WordFilter {
    category?: string;
    difficulty?: DifficultyLevel;
    search?: string;
    limit?: number;
    offset?: number;
  }
  
  // src/types/admin.ts
  export interface Admin {
    id: number;
    username: string;
    email: string;
    created_at: Date;
  }
  
  export interface AdminLogin {
    username: string;
    password: string;
  }
  
  export interface AdminSession {
    id: number;
    username: string;
    email: string;
    token: string;
  }
  
  // src/types/api.ts
  export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
  }
  
  export interface PaginatedResponse<T> {
    success: boolean;
    data: T[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  }
  
  // src/types/game.ts
  export interface GameSession {
    id: string;
    words: Word[];
    currentIndex: number;
    score: {
      correct: number;
      incorrect: number;
      total: number;
    };
    startTime: Date;
    endTime?: Date;
    category?: string;
    difficulty?: DifficultyLevel;
  }
  
  export interface GameStats {
    totalGames: number;
    averageScore: number;
    bestScore: number;
    categoryStats: {
      [category: string]: {
        played: number;
        correct: number;
        total: number;
      };
    };
  }
  
  export interface FlashCardState {
    isFlipped: boolean;
    showAnswer: boolean;
    currentWord: Word | null;
    userAnswer: string;
    isCorrect?: boolean;
  }
  
  // Database table interfaces
  export interface DbWord {
    id: number;
    english: string;
    turkish: string;
    category: string;
    difficulty: string;
    pronunciation?: string;
    example_sentence?: string;
    created_at: Date;
    updated_at: Date;
  }
  
  export interface DbAdmin {
    id: number;
    username: string;
    email: string;
    password_hash: string;
    created_at: Date;
    updated_at: Date;
  }