import { ReactNode } from 'react'
import { getServerSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminLayout({
  children,
}: {
  children: ReactNode
}) {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}