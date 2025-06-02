import sql from 'mssql'

const config = {
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    trustServerCertificate: true
  }
}

let pool: sql.ConnectionPool

export async function connect() {
  if (!pool) {
    pool = new sql.ConnectionPool(config)
    await pool.connect()
  }
  return pool
}