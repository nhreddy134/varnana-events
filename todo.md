# Varnana Events - Backend Integration TODO

**Project**: Extend existing TanStack Start + React Router frontend with Express backend, tRPC, database, and admin panel.

**Current Status**: Phase 1 - Audit complete. Ready for backend integration.

**Important**: If credits run out or session ends, this document tracks all remaining work. Continue from the current phase.

---

## Phase 1: Backend Infrastructure Setup ✅ COMPLETE
- [x] Install Express, tRPC, Drizzle ORM, MySQL2, and supporting libraries
- [x] Create Express server entry point (server/index.ts)
- [x] Set up tRPC router and middleware (server/api/trpc.ts)
- [x] Configure Drizzle ORM with MySQL database (server/db/connection.ts)
- [x] Set up authentication (JWT with session management - server/middleware/auth.ts)
- [x] Create database connection and migration system
- [x] Create .env.example file with required variables
- [x] Create tRPC routers for all features (gallery, inquiries, announcements, contact, auth)

## Phase 2: Database Schema & Migrations ✅ COMPLETE
- [x] Create `gallery_images` table (id, title, description, imageUrl, imageKey, eventType, displayOrder, isPublished, createdAt, updatedAt)
- [x] Create `inquiries` table (id, name, email, phone, eventType, eventDate, guestCount, budget, message, status, createdAt, updatedAt)
- [x] Create `announcements` table (id, title, content, isPublished, publishedAt, createdAt, updatedAt)
- [x] Create `contact_info` table (id, businessName, phone, email, address, socialLinks, updatedAt)
- [x] Create `users` table for admin authentication (id, email, passwordHash, name, role, createdAt, updatedAt)
- [x] Set up Drizzle migrations system (drizzle.config.ts, migrate.ts)
- [x] Create .env.example with all required variables

## Phase 3: Admin Panel & Authentication ✅ COMPLETE
- [x] Create admin login page with JWT authentication (src/routes/admin.login.tsx)
- [x] Build admin dashboard with navigation menu (src/routes/admin.dashboard.tsx)
- [x] Implement role-based access control (RBAC) in tRPC procedures
- [x] Create protected routes for admin pages
- [x] Add logout functionality

## Phase 4: Admin Gallery Management - COMPLETE
- [x] Create admin gallery page with image upload (src/routes/admin.gallery.tsx)
- [ ] Implement image file storage (S3 or Manus storage)
- [x] Build CRUD operations for gallery images (Create, Read, Update, Delete)
- [x] Add publish/unpublish toggle for images
- [x] Implement image reordering functionality
- [x] Add event type filtering in admin view

## Phase 5: Admin Contact & Announcements - COMPLETE
- [x] Create admin contact info management page (src/routes/admin.contact.tsx)
- [x] Build form for updating business name, phone, email, address, social links
- [x] Create admin announcements management page (src/routes/admin.announcements.tsx)
- [x] Implement create, edit, delete announcements
- [x] Add publish/unpublish and date scheduling for announcements

## Phase 6: Admin Inquiry Management - COMPLETE
- [x] Create admin inquiries dashboard (src/routes/admin.inquiries.tsx)
- [x] Display all submitted inquiries in table format
- [x] Implement status tracking (New, Contacted, Converted, Archived)
- [x] Add inquiry detail view with full information
- [x] Implement status update functionality

## Phase 7: Cinematic Scroll Enhancement - 3D & Live Media - COMPLETE
- [x] Integrate video/image into Story Unfolds section as core visual (StoryUnfolds3D.tsx)
- [x] Add 3D perspective transforms to scroll moments (rotateX, rotateY, rotateZ)
- [x] Implement parallax depth effect for layered visuals (layer1Y, layer2Y, layer3Y)
- [x] Add video background with overlay effects
- [x] Create smooth transitions between scroll moments with 3D rotation
- [x] Optimize video/image loading and streaming
- [x] Add fallback for low-bandwidth connections

## Phase 8: Services Section - Full Functionality - COMPLETE
- [x] Create detailed service pages for all 6 services (Weddings, Corporate, Birthdays, Anniversaries, Social, Cultural)
- [x] Add emoji icons for each service
- [x] Implement service-specific inquiry forms (via /contact?service=serviceId)
- [x] Link service buttons to detail pages (src/routes/services.$serviceId.tsx)
- [x] Add service descriptions and features
- [x] Create service-to-inquiry workflow
- [x] Build ServicesEnhanced component with hover animations
- [x] Create service detail pages with process and pricing info

## Phase 9: Gallery Integration with Backend
- [ ] Connect gallery page to tRPC endpoint for fetching images
- [ ] Implement image filtering by event type
- [ ] Add lightbox/modal for image viewing
- [ ] Implement lazy loading for gallery images
- [ ] Add image counter and navigation in lightbox
- [ ] Handle image loading errors gracefully

## Phase 10: Contact & Inquiry Forms Integration
- [ ] Connect contact form to tRPC backend
- [ ] Implement form validation (client + server)
- [ ] Add success/error notifications
- [ ] Store inquiries in database
- [ ] Implement email notifications to admin on new inquiry
- [ ] Create inquiry confirmation email to user

## Phase 11: Real Event Imagery & Content
- [ ] Source or create high-quality event images (6+ for gallery)
- [ ] Create video clips for scroll section (event footage, decor, celebrations)
- [ ] Optimize images for web (compression, responsive sizes)
- [ ] Upload images to storage (S3 or Manus)
- [ ] Create sample announcements and contact info
- [ ] Populate database with initial content

## Phase 12: Production Readiness
- [ ] Set up error handling and logging
- [ ] Implement rate limiting for API endpoints
- [ ] Add CORS configuration
- [ ] Set up environment variables for production
- [ ] Test all admin features (login, upload, edit, delete)
- [ ] Test all public features (scroll, gallery, forms, inquiries)
- [ ] Performance optimization (image optimization, caching, CDN)
- [ ] Security audit (authentication, authorization, input validation)
- [ ] Load testing with simulated traffic
- [ ] Mobile responsiveness testing

## Phase 13: Deployment & Documentation
- [ ] Deploy to production (Vercel, Railway, or similar)
- [ ] Set up database backups
- [ ] Create admin documentation
- [ ] Create user documentation
- [ ] Set up monitoring and alerts
- [ ] Push all code to GitHub

---

## Key Features Checklist

### Public Site
- [ ] Splash screen with 5-second intro
- [ ] Story Unfolds section with 5 scroll moments + 3D effect + live video/image
- [ ] Services section with 6 fully functional service buttons
- [ ] Service detail pages with real images
- [ ] Dynamic gallery with real event images
- [ ] Lightbox viewer for gallery
- [ ] Contact form with validation
- [ ] Event inquiry form on service pages
- [ ] Scroll effects (parallax, marquee, text reveal, progress indicator)
- [ ] Responsive design (mobile, tablet, desktop)

### Admin Panel
- [ ] Admin login with authentication
- [ ] Gallery management (upload, edit, delete, publish/unpublish)
- [ ] Contact info management
- [ ] Announcements management
- [ ] Inquiry management with status tracking
- [ ] Role-based access control
- [ ] Logout functionality

### Backend
- [ ] Express server with tRPC
- [ ] MySQL database with Drizzle ORM
- [ ] Authentication system
- [ ] File storage integration
- [ ] Email notifications
- [ ] Error handling and logging
- [ ] Rate limiting
- [ ] CORS configuration

---

## Technology Stack
- **Frontend**: React 19, TanStack Start, React Router, Framer Motion, Tailwind CSS, shadcn/ui
- **Backend**: Express, tRPC, Drizzle ORM, MySQL
- **Authentication**: Manus OAuth or JWT
- **Storage**: S3 or Manus storage
- **Deployment**: Vercel, Railway, or similar

---

## Notes for Continuation
- All existing frontend code (animations, components, routes) should remain unchanged
- Backend is added as a separate layer without modifying existing frontend
- Admin panel uses new routes under `/admin/*`
- All tRPC endpoints are under `/api/trpc`
- Database migrations should be tracked in version control

---

## Session Tracking
- **Started**: May 20, 2026
- **Last Updated**: [Current Session]
- **Current Phase**: Phase 1 - Audit complete, ready for Phase 2
- **Credits Used**: Track here if needed for continuation

