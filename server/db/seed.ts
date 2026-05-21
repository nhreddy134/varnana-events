import { initializeDatabase } from './connection';
import { users } from './schema';
import { hashPassword } from '../middleware/auth';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

dotenv.config();

async function seed() {
  const db = await initializeDatabase();
  if (!db) {
    console.error('Failed to connect to database');
    return;
  }

  const adminEmail = 'admin@varnana-events.com';
  const adminPassword = 'varnana_admin_2026'; // You should change this after first login

  console.log('Checking for existing admin...');
  const existing = await db.select().from(users).where(eq(users.email, adminEmail));

  if (existing.length > 0) {
    console.log('Admin user already exists.');
    return;
  }

  console.log('Creating admin user...');
  const passwordHash = await hashPassword(adminPassword);
  
  await db.insert(users).values({
    email: adminEmail,
    passwordHash,
    name: 'Varnana Admin',
    role: 'admin',
  });

  console.log('✅ Admin user created successfully!');
  console.log('Email:', adminEmail);
  console.log('Password:', adminPassword);
  console.log('Please change your password after logging in.');
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error('Seed failed:', err);
    process.exit(1);
  });
