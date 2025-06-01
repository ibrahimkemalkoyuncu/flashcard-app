import { NextResponse } from 'next/server'
import { login } from '@/lib/auth/jwt'

export async function POST(request: Request) {
  const { email, password } = await request.json()

  try {
    const success = await login(email, password)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Geçersiz email veya şifre' },
        { status: 401 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Giriş sırasında bir hata oluştu' },
      { status: 500 }
    )
  }
}