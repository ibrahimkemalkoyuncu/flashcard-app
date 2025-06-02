import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Güvenlik başlıklarını ekle
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'SAMEORIGIN')
  
  return response
}

export const config = {
  matcher: [
    /*
     * Tüm isteklerde çalışması için:
     * - source: '/(.*)'
     */
    '/admin/:path*',
  ],
}