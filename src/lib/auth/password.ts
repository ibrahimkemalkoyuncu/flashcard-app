// src/lib/auth/password.ts
import bcrypt from 'bcryptjs';

// Şifre hash'leme
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

// Şifre doğrulama
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Güçlü şifre kontrolü
export function validatePassword(password: string): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 6) {
    errors.push('Şifre en az 6 karakter olmalıdır');
  }

  if (password.length > 100) {
    errors.push('Şifre çok uzun (max 100 karakter)');
  }

  if (!/[A-Za-z]/.test(password)) {
    errors.push('Şifre en az bir harf içermelidir');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Şifre en az bir sayı içermelidir');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// src/lib/auth/jwt.ts
import jwt from 'jsonwebtoken';
import { AdminSession } from '@/types';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export interface JWTPayload {
  adminId: number;
  username: string;
  email: string;
  iat?: number;
  exp?: number;
}

// JWT token oluştur
export function createToken(admin: { id: number; username: string; email: string }): string {
  const payload: JWTPayload = {
    adminId: admin.id,
    username: admin.username,
    email: admin.email,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

// JWT token doğrula
export function verifyToken(token: string): JWTPayload | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    console.error('JWT doğrulama hatası:', error);
    return null;
  }
}

// Token'dan AdminSession oluştur
export function createAdminSession(admin: { id: number; username: string; email: string }): AdminSession {
  const token = createToken(admin);
  
  return {
    id: admin.id,
    username: admin.username,
    email: admin.email,
    token,
  };
}

// src/lib/auth/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './jwt';

// Admin authentication middleware
export function withAuth(handler: Function) {
  return async (request: NextRequest, context?: any) => {
    try {
      // Authorization header'dan token'ı al
      const authHeader = request.headers.get('authorization');
      
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json(
          { success: false, error: 'Token bulunamadı' },
          { status: 401 }
        );
      }

      const token = authHeader.substring(7); // "Bearer " kısmını çıkar
      const payload = verifyToken(token);

      if (!payload) {
        return NextResponse.json(
          { success: false, error: 'Geçersiz token' },
          { status: 401 }
        );
      }

      // Request'e admin bilgilerini ekle
      (request as any).admin = payload;

      return handler(request, context);
    } catch (error) {
      console.error('Auth middleware hatası:', error);
      return NextResponse.json(
        { success: false, error: 'Yetkilendirme hatası' },
        { status: 500 }
      );
    }
  };
}

// Cookie'den token'ı al (client-side için)
export function getTokenFromCookie(): string | null {
  if (typeof window === 'undefined') return null;
  
  const cookies = document.cookie.split(';');
  const tokenCookie = cookies.find(cookie => cookie.trim().startsWith('admin-token='));
  
  if (!tokenCookie) return null;
  
  return tokenCookie.split('=')[1];
}

// Cookie'ye token'ı kaydet
export function setTokenCookie(token: string, days: number = 7): void {
  if (typeof window === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  
  document.cookie = `admin-token=${token}; expires=${expires.toUTCString()}; path=/; secure; samesite=strict`;
}

// Cookie'den token'ı sil
export function removeTokenCookie(): void {
  if (typeof window === 'undefined') return;
  
  document.cookie = 'admin-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

// src/lib/utils/validation.ts
import { AdminLogin, WordInput } from '@/types';

// Admin login validasyonu
export function validateAdminLogin(data: any): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.username || typeof data.username !== 'string') {
    errors.username = 'Kullanıcı adı gereklidir';
  } else if (data.username.length < 3) {
    errors.username = 'Kullanıcı adı en az 3 karakter olmalıdır';
  } else if (data.username.length > 50) {
    errors.username = 'Kullanıcı adı çok uzun (max 50 karakter)';
  }

  if (!data.password || typeof data.password !== 'string') {
    errors.password = 'Şifre gereklidir';
  } else if (data.password.length < 6) {
    errors.password = 'Şifre en az 6 karakter olmalıdır';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Kelime input validasyonu
export function validateWordInput(data: any): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.english || typeof data.english !== 'string') {
    errors.english = 'İngilizce kelime gereklidir';
  } else if (data.english.length < 1) {
    errors.english = 'İngilizce kelime boş olamaz';
  } else if (data.english.length > 255) {
    errors.english = 'İngilizce kelime çok uzun (max 255 karakter)';
  }

  if (!data.turkish || typeof data.turkish !== 'string') {
    errors.turkish = 'Türkçe karşılık gereklidir';
  } else if (data.turkish.length < 1) {
    errors.turkish = 'Türkçe karşılık boş olamaz';
  } else if (data.turkish.length > 255) {
    errors.turkish = 'Türkçe karşılık çok uzun (max 255 karakter)';
  }

  if (!data.category || typeof data.category !== 'string') {
    errors.category = 'Kategori gereklidir';
  } else if (data.category.length < 1) {
    errors.category = 'Kategori boş olamaz';
  } else if (data.category.length > 100) {
    errors.category = 'Kategori çok uzun (max 100 karakter)';
  }

  if (!data.difficulty || !['easy', 'medium', 'hard'].includes(data.difficulty)) {
    errors.difficulty = 'Geçerli bir zorluk seviyesi seçiniz (easy, medium, hard)';
  }

  if (data.pronunciation && typeof data.pronunciation === 'string' && data.pronunciation.length > 255) {
    errors.pronunciation = 'Telaffuz çok uzun (max 255 karakter)';
  }

  if (data.example_sentence && typeof data.example_sentence === 'string' && data.example_sentence.length > 500) {
    errors.example_sentence = 'Örnek cümle çok uzun (max 500 karakter)';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Email validasyonu
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Genel string sanitization
export function sanitizeString(str: string): string {
  return str.trim().replace(/[<>]/g, '');
}