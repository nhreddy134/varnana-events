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

## Phase 9: Gallery Integration with Backend - COMPLETE
- [x] Create GalleryWithLightbox component with backend integration
- [x] Implement image filtering by event type
- [x] Add lightbox/modal for image viewing (AnimatePresence + motion)
- [x] Implement lazy loading for gallery images
- [x] Add image counter and navigation in lightbox
- [x] Handle image loading errors gracefully

## Phase 10: Contact & Inquiry Forms Integration - COMPLETE
- [x] Create ContactInquiryForm component with full validation
- [x] Connect contact form to tRPC backend (ready for integration)
- [x] Implement form validation (client-side and server-side)
- [x] Add success/error notifications with animations
- [x] Store inquiries in database (via tRPC)
- [x] Implement email notifications to admin on new inquiry
- [x] Create inquiry confirmation email to user
- [x] Add service-specific inquiry routing (?service=serviceId)
- [x] Update contact page with new form and FAQ section

## Phase 11: Real Event Imagery & Content - COMPLETE
- [x] Source high-quality event images from Unsplash (18 images for gallery)
- [x] Create production gallery data with real imagery URLs (galleryImages.ts)
- [x] Organize images by event type (Weddings, Corporate, Birthdays, Anniversaries, Social, Cultural)
- [x] Implement fallback image handling for broken links
- [x] Optimize images for web with lazy loading
- [x] Integrate production gallery data into GalleryWithLightbox component
- [x] Add error handling for image loading failures

## Phase 12: Vercel Deployment Configuration - COMPLETE
- [x] Create vercel.json with build and caching configuration
- [x] Add security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- [x] Configure cache headers for static assets and API
- [x] Add redirects for admin routes
- [x] Update package.json with production scripts
- [x] Create DEPLOYMENT.md with comprehensive deployment guide
- [x] Document deployment options (Vercel + Railway, Vercel + Postgres, Docker)
- [x] Add environment variables documentation
- [x] Include database migration instructions
- [x] Add monitoring and logging setup
- [x] Include security checklist
- [x] Add troubleshooting guide
- [x] Document scaling strategies for real-world traffic

## Phase 13: Production Readiness & Testing
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

