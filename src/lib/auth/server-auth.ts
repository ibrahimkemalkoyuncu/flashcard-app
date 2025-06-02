import { cookies } from 'next/headers'

export async function getSession() {
  const cookieStore = cookies() // Önce cookieStore oluşturulur
  const session = cookieStore.get('session')?.value // Sonra değer alınır
  return session ? await decrypt(session) : null
}