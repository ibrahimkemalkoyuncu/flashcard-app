import sql from 'mssql';

interface DbConfig {
  server: string;
  database: string;
  user?: string;
  password?: string;
  options: {
    encrypt: boolean;
    trustServerCertificate: boolean;
    trustedConnection?: boolean;
  };
}

const config: DbConfig = {
  server: process.env.DB_SERVER!,
  database: process.env.DB_NAME!,
  options: {
    encrypt: false,
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
  }
};

// Windows Authentication için
if (process.env.DB_TRUSTED_CONNECTION === 'true') {
  config.options.trustedConnection = true;
} 
// SQL Authentication için
else {
  config.user = process.env.DB_USER;
  config.password = process.env.DB_PASSWORD;
}

export async function connect() {
  try {
    const pool = await sql.connect(config);
    console.log('SQL Server bağlantısı başarılı');
    return pool;
  } catch (err) {
    console.error('Bağlantı hatası:', err);
    throw err;
  }
}

export { sql };