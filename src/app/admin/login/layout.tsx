import { verifyToken } from '@/lib/auth/jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
//import AdminNavbar from '@/components/admin/AdminNavbar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = cookies().get('token')?.value;

  if (!token) {
    redirect('/admin/login');
  }

  try {
    verifyToken(token);
  } catch (err) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="container mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
}