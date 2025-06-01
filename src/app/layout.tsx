import { ReactNode } from 'react'
import AdminNavbar from '@/components/admin/AdminNavbar'
import { verifySession } from '@/lib/auth/jwt'

export const metadata = {
  title: 'FlashCard Admin Panel',
  description: 'Kelime kartları yönetim paneli',
  // HTTP Security Headers (Ek koruma için)
  headers: {
    'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'",
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'SAMEORIGIN',
    'X-XSS-Protection': '1; mode=block',
    'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload'
  }
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await verifySession()
  
  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-500">Yetkisiz Erişim</h1>
          <p className="mt-4">Lütfen admin olarak giriş yapın.</p>
          <div className="mt-6">
            <a 
              href="/login" 
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Giriş Sayfasına Git
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="p-4 md:p-8">
        {children}
      </main>
      {/* Ek güvenlik öğeleri */}
      <noscript>
        <div className="bg-red-500 text-white p-4 text-center">
          JavaScript devre dışı bırakıldı. Uygulama düzgün çalışmayabilir.
        </div>
      </noscript>
    </div>
  )
}