import { connectDB } from '@/lib/database/connection';
import { NextResponse } from 'next/server';
import sql from 'mssql';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    
    let query = 'SELECT TOP 1 * FROM Words';
    const conditions = [];
    
    if (category) conditions.push('Category = @category');
    if (difficulty) conditions.push('Difficulty = @difficulty');
    
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');
    query += ' ORDER BY NEWID()';
    
    const pool = await connectDB();
    const request = pool.request();
    
    if (category) request.input('category', sql.NVarChar, category);
    if (difficulty) request.input('difficulty', sql.TinyInt, difficulty);
    
    const result = await request.query(query);
    
    if (result.recordset.length === 0) {
      return NextResponse.json(
        { success: false, message: 'No words found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: result.recordset[0] });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}