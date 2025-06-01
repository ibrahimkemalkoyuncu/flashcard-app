import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const secretKey = process.env.JWT_SECRET
if (!secretKey) throw new Error('JWT_SECRET is not set')

const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)
}

export async function decrypt(input: string) {
  const { payload } = await jwtVerify(input, encodedKey, {
    algorithms: ['HS256'],
  })
  return payload
}

export async function getSession() {
  const cookieStore = cookies()
  const session = cookieStore.get('session')?.value
  if (!session) return null
  
  try {
    return await decrypt(session)
  } catch (error) {
    console.error('Session decrypt error:', error)
    return null
  }
}

export async function createSession(userData: any) {
  const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  const session = await encrypt({ user: userData, expires })

  cookies().set('session', session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    expires,
    sameSite: 'lax',
    path: '/',
  })
}

export async function deleteSession() {
  cookies().delete('session')
}