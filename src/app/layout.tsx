import { ReactNode } from 'react'
import AdminNavbar from '@/components/admin/AdminNavbar'
import { verifySession } from '@/lib/auth/jwt'

export const metadata = {
  title: 'FlashCard Admin Panel',
  description: 'Kelime kartları yönetim paneli',
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await verifySession()
  
  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-red-500">Yetkisiz Erişim</h1>
          <p className="mt-4">Lütfen admin olarak giriş yapın.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="p-4 md:p-8">
        {children}
      </div>
    </div>
  )
}