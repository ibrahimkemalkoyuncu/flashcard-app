import sql from 'mssql'
import { Word } from '@/types/word'

export async function getWords(
  page: number = 1,
  limit: number = 10,
  search: string = ''
): Promise<{ words: Word[]; totalPages: number }> {
  try {
    const pool = await sql.connect(process.env.DATABASE_URL)
    const offset = (page - 1) * limit
    
    // Toplam kayıt sayısı
    const countResult = await pool.request()
      .input('search', sql.NVarChar, `%${search}%`)
      .query(`
        SELECT COUNT(*) as total 
        FROM Words 
        WHERE english LIKE @search OR turkish LIKE @search
      `)
    
    const total = countResult.recordset[0].total
    const totalPages = Math.ceil(total / limit)

    // Sayfalı veriler
    const result = await pool.request()
      .input('search', sql.NVarChar, `%${search}%`)
      .input('offset', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query(`
        SELECT * FROM Words 
        WHERE english LIKE @search OR turkish LIKE @search
        ORDER BY english
        OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY
      `)
    
    return {
      words: result.recordset,
      totalPages
    }
  } catch (error) {
    console.error('Database error:', error)
    return { words: [], totalPages: 0 }
  }
}

export async function getWordById(id: string): Promise<Word | null> {
  try {
    const pool = await sql.connect(process.env.DATABASE_URL)
    const result = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT * FROM Words WHERE id = @id')
    
    return result.recordset[0] || null
  } catch (error) {
    console.error('Database error:', error)
    return null
  }
}

export async function createWord(wordData: Omit<Word, 'id'>): Promise<boolean> {
  try {
    const pool = await sql.connect(process.env.DATABASE_URL)
    await pool.request()
      .input('english', sql.NVarChar, wordData.english)
      .input('turkish', sql.NVarChar, wordData.turkish)
      .input('category', sql.NVarChar, wordData.category)
      .input('difficulty', sql.NVarChar, wordData.difficulty)
      .query(`
        INSERT INTO Words (english, turkish, category, difficulty)
        VALUES (@english, @turkish, @category, @difficulty)
      `)
    
    return true
  } catch (error) {
    console.error('Database error:', error)
    return false
  }
}

export async function updateWord(
  id: string,
  wordData: Partial<Word>
): Promise<boolean> {
  try {
    const pool = await sql.connect(process.env.DATABASE_URL)
    await pool.request()
      .input('id', sql.Int, id)
      .input('english', sql.NVarChar, wordData.english)
      .input('turkish', sql.NVarChar, wordData.turkish)
      .input('category', sql.NVarChar, wordData.category)
      .input('difficulty', sql.NVarChar, wordData.difficulty)
      .query(`
        UPDATE Words 
        SET 
          english = @english,
          turkish = @turkish,
          category = @category,
          difficulty = @difficulty
        WHERE id = @id
      `)
    
    return true
  } catch (error) {
    console.error('Database error:', error)
    return false
  }
}

export async function deleteWord(id: string): Promise<boolean> {
  try {
    const pool = await sql.connect(process.env.DATABASE_URL)
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Words WHERE id = @id')
    
    return true
  } catch (error) {
    console.error('Database error:', error)
    return false
  }
}