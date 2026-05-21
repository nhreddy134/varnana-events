import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'varnana-secret-key-2026';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@varnana.com';
// Default password is 'varnana2026' - should be changed in production via env
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH || '$2a$10$X7vXvXvXvXvXvXvXvXvXvO'; 

export interface AuthUser {
  email: string;
  role: 'admin';
}

export const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};

export const generateToken = (user: AuthUser): string => {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): AuthUser | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as AuthUser;
  } catch (error) {
    return null;
  }
};

export const login = async (email: string, password: string) => {
  if (email !== ADMIN_EMAIL) {
    throw new Error('Invalid credentials');
  }

  const isValid = await verifyPassword(password, ADMIN_PASSWORD_HASH);
  if (!isValid) {
    throw new Error('Invalid credentials');
  }

  const user: AuthUser = { email, role: 'admin' };
  const token = generateToken(user);
  
  // In a real app, we'd set a cookie here. For this implementation, 
  // we'll return the token for client-side storage.
  return { user, token };
};
