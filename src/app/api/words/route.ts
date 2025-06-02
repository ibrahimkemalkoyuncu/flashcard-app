// src/app/api/words/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAllWords, createWord, getWordStats } from '@/lib/database/queries/wordQueries';
import { withAuth } from '@/lib/auth/middleware';
import { validateWordInput } from '@/lib/utils/validation';
import { ApiResponse, PaginatedResponse, Word, WordInput } from '@/types';

// GET - Tüm kelimeleri getir (sayfalama ile)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category') || undefined;
    const difficulty = searchParams.get('difficulty') || undefined;
    const search = searchParams.get('search') || undefined;

    const offset = (page - 1) * limit;

    const { words, total } = await getAllWords({
      category,
      difficulty: difficulty as any,
      search,
      limit,
      offset
    });

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: words,
      pagination: {
        total,
        page,
        limit,
        totalPages
      }
    } as PaginatedResponse<Word>);

  } catch (error) {
    console.error('❌ Kelime getirme hatası:', error);
    return NextResponse.json({
      success: false,
      error: 'Kelimeler getirilemedi'
    } as ApiResponse, { status: 500 });
  }
}

// POST - Yeni kelime ekle (Admin Only)
export const POST = withAuth(async (request: NextRequest) => {
  try {
    const body = await request.json();
    
    // Input validasyonu
    const validation = validateWordInput(body);
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        error: 'Geçersiz veri',
        data: validation.errors
      } as ApiResponse, { status: 400 });
    }

    const wordData: WordInput = {
      english: body.english.trim(),
      turkish: body.turkish.trim(),
      category: body.category.trim(),
      difficulty: body.difficulty,
      pronunciation: body.pronunciation?.trim() || undefined,
      example_sentence: body.example_sentence?.trim() || undefined
    };

    const newWord = await createWord(wordData);

    return NextResponse.json({
      success: true,
      data: newWord,
      message: 'Kelime başarıyla eklendi'
    } as ApiResponse<Word>, { status: 201 });

  } catch (error) {
    console.error('❌ Kelime ekleme hatası:', error);
    return NextResponse.json({
      success: false,
      error: 'Kelime eklenemedi'
    } as ApiResponse, { status: 500 });
  }
});

// src/app/api/words/[id]/route.ts
import { getWordById, updateWord, deleteWord } from '@/lib/database/queries/wordQueries';

// GET - Tekil kelime getir
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        error: 'Geçersiz ID'
      } as ApiResponse, { status: 400 });
    }

    const word = await getWordById(id);
    
    if (!word) {
      return NextResponse.json({
        success: false,
        error: 'Kelime bulunamadı'
      } as ApiResponse, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: word
    } as ApiResponse<Word>);

  } catch (error) {
    console.error('❌ Kelime getirme hatası:', error);
    return NextResponse.json({
      success: false,
      error: 'Kelime getirilemedi'
    } as ApiResponse, { status: 500 });
  }
}

// PUT - Kelime güncelle (Admin Only)
export const PUT = withAuth(async (request: NextRequest, { params }: { params: { id: string } }) => {
  try {
    const id = parseInt(params.id);
    
    if (isNaN(id)) {
      return NextResponse.json({
        success: false,
        error: 'Geçersiz ID'
      } as ApiResponse, { status: 400 });
    }

    const body = await request.json();
    
    // Partial validation (sadece gönderilen alanları kontrol et)
    const validation = validateWordInput({ ...body, english: body.english || 'x', turkish: body.turkish || 'x', category: body.category || 'x', difficulty: body.difficulty || 'easy' });
    
    // Gerçek validation - sadece gönderilen alanlar
    const errors: Record<string, string> = {};
    
    if (body.english !== undefined) {
      if (!body.english || typeof body.english !== 'string' || body.english.trim().length === 0) {
        errors.english = 'İngilizce kelime gereklidir';
      } else if (body.english.length > 255) {
        errors.english = 'Bu bir hata mesajı devam ediyor...'