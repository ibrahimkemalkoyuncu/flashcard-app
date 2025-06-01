import sql from 'mssql'

export async function getWordsCount(): Promise<number> {
  try {
    const pool = await sql.connect(process.env.DATABASE_URL)
    const result = await pool.request()
      .query('SELECT COUNT(*) as count FROM Words')
    
    return result.recordset[0].count
  } catch (error) {
    console.error('Database error:', error)
    return 0
  }
}

export async function getCategoriesCount(): Promise<number> {
  try {
    const pool = await sql.connect(process.env.DATABASE_URL)
    const result = await pool.request()
      .query('SELECT COUNT(DISTINCT category) as count FROM Words')
    
    return result.recordset[0].count
  } catch (error) {
    console.error('Database error:', error)
    return 0
  }
}