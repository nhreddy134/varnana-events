import { migrate } from 'drizzle-orm/mysql2/migrator';
import mysql from 'mysql2/promise';
import { drizzle } from 'drizzle-orm/mysql2';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

async function runMigrations() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL environment variable is not set');
  }

  console.log('🔄 Starting database migrations...');

  try {
    const connection = await mysql.createConnection(connectionString);
    const db = drizzle(connection);

    const migrationsFolder = path.join(__dirname, 'migrations');
    await migrate(db, { migrationsFolder });

    console.log('✅ Migrations completed successfully');
    await connection.end();
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

runMigrations();
