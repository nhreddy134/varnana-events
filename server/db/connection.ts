import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

let db: ReturnType<typeof drizzle> | null = null;
let pool: mysql.Pool | null = null;

export async function initializeDatabase() {
  if (db) return db;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  try {
    // Create connection pool
    pool = await mysql.createPool(connectionString);

    // Initialize Drizzle ORM
    db = drizzle(pool, { schema, mode: 'default' });

    console.log('✅ Database connection established');
    return db;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
}

export function getDatabase() {
  if (!db) {
    // In serverless, we might need to initialize synchronously if possible or 
    // handle the async nature. For now, we'll keep it simple but ensure 
    // app.ts calls initializeDatabase().
    console.warn('⚠️ getDatabase called before initialization');
  }
  return db!;
}

export async function closeDatabase() {
  if (pool) {
    await pool.end();
    db = null;
    pool = null;
    console.log('✅ Database connection closed');
  }
}
