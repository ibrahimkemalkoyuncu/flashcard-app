'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '@/lib/auth/client-actions'

export default function AdminNavbar() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Dashboard', path: '/admin' },
    { name: 'Kelimeler', path: '/admin/words' },
    { name: 'Kullanıcılar', path: '/admin/users' },
  ]

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`px-3 py-2 text-sm font-medium ${
                  pathname === item.path
                    ? 'text-indigo-600 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <button
            onClick={logout}
            className="text-gray-500 hover:text-gray-700 px-3 py-2 text-sm font-medium"
          >
            Çıkış Yap
          </button>
        </div>
      </div>
    </nav>
  )
}