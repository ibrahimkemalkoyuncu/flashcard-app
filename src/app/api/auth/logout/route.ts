import { deleteSession } from '@/lib/auth/server-auth'
import { NextResponse } from 'next/server'

export async function POST() {
  await deleteSession()
  return NextResponse.json({ success: true })
}