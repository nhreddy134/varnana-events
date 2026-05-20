# Varnana Events - Deployment Guide

## Overview

This guide covers deploying Varnana Events to Vercel with the new backend infrastructure (Express, tRPC, MySQL).

## Architecture Changes for Deployment

### Previous Setup
- TanStack Start + Cloudflare Workers
- Edge-first architecture

### New Setup
- **Frontend**: TanStack Start (React Router)
- **Backend**: Express.js + tRPC
- **Database**: MySQL (managed service)
- **Storage**: S3-compatible storage for images
- **Deployment**: Vercel (Frontend) + Separate Node.js server (Backend)

## Deployment Options

### Option 1: Vercel + Railway (Recommended for Scaling)

**Pros:**
- Vercel handles frontend deployment (automatic from GitHub)
- Railway handles backend (Express server + MySQL)
- Excellent for production traffic
- Easy scaling and monitoring

**Steps:**

1. **Deploy Frontend to Vercel:**
   ```bash
   # Push to GitHub (already done)
   git push origin main
   
   # Connect to Vercel
   # 1. Go to vercel.com
   # 2. Import project from GitHub
   # 3. Configure build settings:
   #    - Build Command: npm run build
   #    - Output Directory: dist
   ```

2. **Deploy Backend to Railway:**
   ```bash
   # 1. Go to railway.app
   # 2. Create new project
   # 3. Add MySQL database
   # 4. Deploy Node.js app from GitHub
   # 5. Set environment variables:
   DATABASE_URL=mysql://user:pass@host/db
   JWT_SECRET=your-secret-key
   NODE_ENV=production
   ```

3. **Connect Frontend to Backend:**
   - Update `VITE_API_URL` in Vercel environment to Railway backend URL
   - Update tRPC client to use production API endpoint

### Option 2: Vercel + Vercel Postgres (Simpler Setup)

**Pros:**
- Everything in one platform
- Simpler deployment
- Integrated monitoring

**Steps:**

1. **Create Vercel Postgres Database:**
   - In Vercel dashboard, create Postgres database
   - Get connection string

2. **Update Environment Variables:**
   ```
   DATABASE_URL=postgresql://...
   JWT_SECRET=your-secret-key
   ```

3. **Deploy:**
   - Push to GitHub
   - Vercel auto-deploys

### Option 3: Docker + Any Cloud Provider

**Pros:**
- Maximum flexibility
- Portable across providers
- Easy to scale

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## Environment Variables for Production

Create `.env.production` with:

```env
# Database
DATABASE_URL=mysql://user:pass@host/db

# Authentication
JWT_SECRET=your-production-jwt-secret

# API
NODE_ENV=production
PORT=3000

# Frontend
VITE_API_URL=https://your-backend-url.com
VITE_APP_NAME=Varnana Events

# Storage (if using S3)
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_REGION=us-east-1
AWS_S3_BUCKET=varnana-events

# Email (for notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

## Database Migrations in Production

Before deploying:

```bash
# Generate migrations
npm run db:generate

# Run migrations locally to test
npm run db:migrate

# In production (after deployment):
# SSH into server and run:
npm run db:migrate
```

## Performance Optimization for Vercel

1. **Image Optimization:**
   - Use Vercel's Image Optimization API
   - Update image URLs to use `/_next/image`

2. **Bundle Size:**
   - Current: ~450KB (acceptable)
   - Monitor with `npm run build --analyze`

3. **Caching Strategy:**
   - Static assets: 1 year cache
   - API routes: no-cache
   - HTML: no-cache

4. **CDN:**
   - Vercel automatically uses Vercel Edge Network
   - Images cached globally

## Monitoring & Logging

1. **Vercel Analytics:**
   - Dashboard shows real user metrics
   - Performance monitoring

2. **Backend Logging:**
   - Use Winston or Pino for structured logging
   - Send logs to service like LogRocket or Datadog

3. **Error Tracking:**
   - Set up Sentry for error monitoring
   - Get alerts on production errors

## Security Checklist

- [ ] HTTPS enabled (automatic on Vercel)
- [ ] CORS configured for frontend domain
- [ ] JWT secrets stored in environment variables
- [ ] Database credentials in environment variables
- [ ] Rate limiting enabled on API
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (using Drizzle ORM)
- [ ] XSS protection headers set (vercel.json)
- [ ] CSRF protection implemented
- [ ] Regular security audits scheduled

## Rollback Plan

If deployment fails:

1. **Frontend Rollback:**
   - Vercel automatically keeps previous deployments
   - One-click rollback in Vercel dashboard

2. **Backend Rollback:**
   - Keep previous version deployed
   - Switch traffic back via load balancer or DNS

3. **Database Rollback:**
   - Keep database backups
   - Use backup restore feature

## Post-Deployment Checklist

- [ ] Test all admin features (login, upload, edit, delete)
- [ ] Test all public features (scroll, gallery, forms)
- [ ] Verify database connectivity
- [ ] Check image loading from storage
- [ ] Test email notifications
- [ ] Monitor error logs
- [ ] Check performance metrics
- [ ] Verify HTTPS and security headers
- [ ] Test on mobile devices
- [ ] Load test with simulated traffic

## Troubleshooting

### Build Fails
```bash
# Check build logs
npm run build

# Clear cache
rm -rf node_modules
npm install
npm run build
```

### Database Connection Issues
```bash
# Verify connection string
echo $DATABASE_URL

# Test connection
npm run db:test
```

### API Not Responding
```bash
# Check server logs
# In Vercel/Railway dashboard, view logs

# Restart server
# In dashboard, click "Restart"
```

### Images Not Loading
```bash
# Check storage credentials
# Verify S3 bucket permissions
# Check image URLs in database
```

## Scaling for Real-World Traffic

1. **Database:**
   - Enable read replicas for scaling reads
   - Add caching layer (Redis)
   - Optimize queries with indexes

2. **Backend:**
   - Use load balancer (Railway/Vercel auto-scales)
   - Implement rate limiting
   - Add request queuing for heavy operations

3. **Frontend:**
   - Vercel auto-scales edge functions
   - Use ISR (Incremental Static Regeneration) for gallery
   - Implement service workers for offline support

4. **Storage:**
   - Use CDN for image delivery
   - Implement image compression
   - Set up automatic cleanup of old images

## Support & Resources

- Vercel Docs: https://vercel.com/docs
- Railway Docs: https://docs.railway.app
- Express.js Docs: https://expressjs.com
- tRPC Docs: https://trpc.io
- Drizzle ORM Docs: https://orm.drizzle.team
