export default function AdminDashboard() {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Admin Paneline Hoş Geldiniz</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Kelimeler</h3>
            <p>Toplam kelime sayısı: 0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Kullanıcılar</h3>
            <p>Aktif kullanıcılar: 0</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">İstatistikler</h3>
            <p>Son güncelleme: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    )
  }