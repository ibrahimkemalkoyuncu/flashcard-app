import { getWordsCount, getCategoriesCount } from '@/lib/database/queries/adminQueries'
import StatisticsCard from '@/components/admin/StatisticsCard'

export default async function AdminDashboardPage() {
  const wordsCount = await getWordsCount()
  const categoriesCount = await getCategoriesCount()

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Paneli</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatisticsCard 
          title="Toplam Kelime" 
          value={wordsCount} 
          icon="📚"
        />
        <StatisticsCard 
          title="Kategori Sayısı" 
          value={categoriesCount} 
          icon="🏷️"
        />
        <StatisticsCard 
          title="Aktif Kullanıcılar" 
          value="0" 
          icon="👥"
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Son Eklenen Kelimeler</h2>
        {/* Buraya son eklenen kelimelerin listesi gelecek */}
      </div>
    </div>
  )
}