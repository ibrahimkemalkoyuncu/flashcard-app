import { connectDB } from '@/lib/database/connection';
import { NextResponse } from 'next/server';
import sql from 'mssql';

export async function GET() {
  try {
    const pool = await connectDB();
    const result = await pool.request()
      .query('SELECT DISTINCT Category FROM Words ORDER BY Category');
    
    const categories = result.recordset.map(row => row.Category);
    
    return NextResponse.json({ 
      success: true, 
      data: categories 
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}