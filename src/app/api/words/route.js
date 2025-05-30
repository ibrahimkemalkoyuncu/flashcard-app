import { NextResponse } from 'next/server';
import { connect, sql } from '@/lib/db';

export async function GET() {
  try {
    const pool = await connect();
    const result = await pool.request().query('SELECT * FROM Words');
    
    return NextResponse.json(result.recordset);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Bilinmeyen hata' },
      { status: 500 }
    );
  }
}