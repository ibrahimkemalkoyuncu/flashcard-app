import { createSession } from '@/lib/auth/server-auth'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json()
  
  // Örnek kontrol (gerçek projede DB sorgusu yapın)
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
    await createSession({ email })
    return NextResponse.json({ success: true })
  }
  
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}