import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const connectionString = process.env.DATABASE_URL || '';

// Clean up query parameters if present
const cleanConnectionString = connectionString
  ? connectionString.replace(/[?&]sslmode=[^&]*/g, '').replace(/[?&]pgbouncer=[^&]*/g, '').replace(/\?$/, '')
  : connectionString;

export const pool = new Pool({
  connectionString: cleanConnectionString,
  ssl: cleanConnectionString ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 10000,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client', err);
});
