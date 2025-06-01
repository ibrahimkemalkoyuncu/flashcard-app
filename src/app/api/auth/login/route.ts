import { createSession } from '@/lib/auth/server-auth'
import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()
    
    // Gerçek projede veritabanından kontrol edin
    const validEmail = email === process.env.ADMIN_EMAIL
    const validPass = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH!)
    
    if (!validEmail || !validPass) {
      return NextResponse.json(
        { error: 'Geçersiz kimlik bilgileri' },
        { status: 401 }
      )
    }

    await createSession({ email })
    return NextResponse.json({ success: true })
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Sunucu hatası' },
      { status: 500 }
    )
  }
}