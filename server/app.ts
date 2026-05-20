import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { initializeDatabase } from './db/connection';
import { appRouter } from './api/routers';
import { createContext } from './api/trpc';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for easier integration, can be tuned later
}));
app.use(compression());
app.use(cors({
  origin: '*', // Allow all for now, will restrict in production
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// tRPC middleware
app.use(
  '/api/trpc',
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// Auto-initialize database for serverless
initializeDatabase().catch(err => {
  console.error('Failed to initialize database:', err);
});

export default app;
