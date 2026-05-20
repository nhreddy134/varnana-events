import { migrate } from 'drizzle-orm/mysql2/migrator';
import { getDatabase } from './connection';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { initializeDatabase } from './connection';

export async function runMigrations() {
  const db = await initializeDatabase();
  if (!db) {
    console.error('Failed to get database connection for migrations');
    return;
  }

  console.log('Running migrations...');
  
  try {
    await migrate(db, { 
      migrationsFolder: path.join(__dirname, 'migrations') 
    });
    console.log('Migrations completed successfully');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  }
}

// Support direct execution via tsx
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('migrate.ts')) {
  runMigrations()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}
