import { ReactNode } from 'react'
import AdminNavbar from '@/components/admin/AdminNavbar'
import { getSession } from '@/lib/auth/server-auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  const session = await getSession()
  if (!session) redirect('/auth/login')

  return (
    <>
      <AdminNavbar />
      <main className="container mx-auto p-4">
        {children}
      </main>
    </>
  )
}