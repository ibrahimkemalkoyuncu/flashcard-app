// src/lib/database/connection.ts
import sql from 'mssql';

// Database configuration
const dbConfig: sql.config = {
  server: process.env.DB_SERVER || 'DESKTOP-167J7JG\\SQLEXPRESS',
  database: process.env.DB_NAME || 'FlashcardDb',
  options: {
    encrypt: false, // Local SQL Server için
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  authentication: {
    type: 'ntlm',
    options: {
      userName: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
    }
  },
  // Eğer Windows Authentication kullanıyorsanız:
  // authentication: {
  //   type: 'default'
  // },
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

// Connection pool
let pool: sql.ConnectionPool | null = null;

export async function getConnection(): Promise<sql.ConnectionPool> {
  try {
    if (pool && pool.connected) {
      return pool;
    }

    if (!pool) {
      pool = new sql.ConnectionPool(dbConfig);
    }

    if (!pool.connected && !pool.connecting) {
      console.log('🔄 Veritabanına bağlanılıyor...');
      await pool.connect();
      console.log('✅ Veritabanı bağlantısı başarılı!');
    }

    return pool;
  } catch (error) {
    console.error('❌ Veritabanı bağlantı hatası:', error);
    throw new Error('Veritabanı bağlantısı kurulamadı');
  }
}

export async function closeConnection(): Promise<void> {
  try {
    if (pool && pool.connected) {
      await pool.close();
      pool = null;
      console.log('🔒 Veritabanı bağlantısı kapatıldı');
    }
  } catch (error) {
    console.error('❌ Bağlantı kapatma hatası:', error);
  }
}

// Connection test fonksiyonu
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await getConnection();
    const result = await connection.request().query('SELECT 1 as test');
    return result.recordset.length > 0;
  } catch (error) {
    console.error('❌ Bağlantı testi başarısız:', error);
    return false;
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  await closeConnection();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await closeConnection();
  process.exit(0);
});