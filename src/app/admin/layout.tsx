import { getSession } from '@/lib/auth/server-auth'
import { redirect } from 'next/navigation'
import AdminNavbar from '@/components/admin/AdminNavbar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <main className="p-4 md:p-8">{children}</main>
    </div>
  )
}