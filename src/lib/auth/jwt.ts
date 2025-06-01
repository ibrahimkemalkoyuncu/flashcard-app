import { jwtVerify, SignJWT } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'

const secretKey = process.env.JWT_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, encodedKey, {
    algorithms: ['HS256'],
  })
  return payload
}

export async function verifySession() {
  const cookieStore = cookies()
  const session = cookieStore.get('session')?.value
  if (!session) return null
  return await decrypt(session)
}

export async function login(email: string, password: string) {
  // Burada gerçek bir veritabanı sorgusu olmalı
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

  if (email !== adminEmail) return false

  const passwordMatch = await bcrypt.compare(password, await bcrypt.hash(adminPassword, 10))
  if (!passwordMatch) return false

  const session = await encrypt({ email, role: 'admin' })

  document.cookie = `session=${session}; Path=/; HttpOnly; SameSite=Lax; Max-Age=604800`
  return true
}

export async function signOut() {
  document.cookie = 'session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

export async function getSession() {
  const session = cookies().get('session')?.value
  if (!session) return null
  return await decrypt(session)
}