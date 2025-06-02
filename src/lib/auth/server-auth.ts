import { cookies } from 'next/headers'

export async function getSession() {
  const cookieStore = cookies() // Await kullanmadan önce
  const session = cookieStore.get('session')?.value
  return session ? await decrypt(session) : null
}