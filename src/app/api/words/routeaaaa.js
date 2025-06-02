import { NextRequest, NextResponse } from 'next/server';
import { WordQueries } from '@/lib/database/queries/wordQueries';
import { ApiResponse, WordCreate } from '@/types';

// GET /api/words - Get all words with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      category: searchParams.get('category') || undefined,
      difficulty: searchParams.get('difficulty') ? parseInt(searchParams.get('difficulty')!) : undefined,
      search: searchParams.get('search') || undefined,
      page: searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1,
      limit: searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10,
    };
    
    const result = await WordQueries.getWords(filters);
    
    const response: ApiResponse = {
      success: true,
      data: result,
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('GET /api/words error:', error);
    
    const response: ApiResponse = {
      success: false,
      error: 'Kelimeler yüklenirken bir hata oluştu',
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}

// POST /api/words - Create new word (Admin only)
export async function POST(request: NextRequest) {
  try {
    // TODO: Add admin authentication middleware check here
    
    const body = await request.json();
    
    // Validate required fields
    if (!body.English || !body.Turkish) {
      return NextResponse.json(
        {
          success: false,
          error: 'İngilizce ve Türkçe kelimeler zorunludur',
        },
        { status: 400 }
      );
    }
    
    // Validate word data
    if (body.English.length > 100 || body.Turkish.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: 'Kelimeler en fazla 100 karakter olabilir',
        },
        { status: 400 }
      );
    }
    
    if (body.Category && body.Category.length > 50) {
      return NextResponse.json(
        {
          success: false,
          error: 'Kategori adı en fazla 50 karakter olabilir',
        },
        { status: 400 }
      );
    }
    
    if (body.Difficulty && (body.Difficulty < 1 || body.Difficulty > 5)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Zorluk seviyesi 1-5 arasında olmalıdır',
        },
        { status: 400 }
      );
    }
    
    const wordData: WordCreate = {
      English: body.English.trim(),
      Turkish: body.Turkish.trim(),
      Category: body.Category?.trim() || null,
      Difficulty: body.Difficulty || 1,
    };
    
    const newWord = await WordQueries.createWord(wordData);
    
    const response: ApiResponse = {
      success: true,
      data: newWord,
      message: 'Kelime başarıyla eklendi',
    };
    
    return NextResponse.json(response, { status: 201 });
    
  } catch (error) {
    console.error('POST /api/words error:', error);
    
    // Check for duplicate entry error
    if (error instanceof Error && error.message.includes('duplicate')) {
      return NextResponse.json(
        {
          success: false,
          error: 'Bu kelime zaten mevcut',
        },
        { status: 409 }
      );
    }
    
    const response: ApiResponse = {
      success: false,
      error: 'Kelime eklenirken bir hata oluştu',
    };
    
    return NextResponse.json(response, { status: 500 });
  }
}