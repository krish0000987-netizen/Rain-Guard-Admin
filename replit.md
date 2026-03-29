# Rain Guard Waterproofing & Painting

## Overview
Multi-page business website for Rain Guard Waterproofing & Painting company based in Mumbai. Includes a public-facing website with 7 pages and a full admin panel for content management.

## Architecture
- **Frontend**: React + Vite + TailwindCSS + Shadcn UI + Wouter routing
- **Backend**: Express.js with session-based admin auth
- **Database**: PostgreSQL with Drizzle ORM
- **Theme**: White + Royal Blue (#1D4ED8)

## Pages
### Public Pages
- Home (/) - Hero, services preview, reviews, CTA
- Waterproofing (/waterproofing) - Waterproofing services list
- Painting (/painting) - Painting services list
- Gallery (/gallery) - Project photos with filter
- About (/about) - Company story, mission, stats
- Contact (/contact) - Contact form (creates leads), map
- Blog (/blog, /blog/:slug) - Blog posts for SEO

### Admin Panel
- Login (/admin) - Email + password auth
- Dashboard (/admin/dashboard) - Stats, recent leads
- Leads (/admin/leads) - Lead management with status updates
- Services (/admin/services) - CRUD for services
- Reviews (/admin/reviews) - Manage customer reviews

## Default Admin Credentials
- Email: admin@rainguard.com
- Password: admin123

## API Endpoints
### Public
- GET /api/services - All services
- GET /api/reviews - Approved reviews
- GET /api/gallery - Gallery images
- GET /api/blog - Published blog posts
- GET /api/blog/:slug - Single blog post
- POST /api/leads - Submit contact form

### Admin (requires session auth)
- POST /api/admin/login
- POST /api/admin/logout
- GET /api/admin/me
- GET /api/admin/leads
- PATCH /api/admin/leads/:id
- POST/PATCH/DELETE /api/admin/services/:id
- GET/POST/DELETE /api/admin/reviews/:id

## Database Schema
- leads: Customer enquiries with status tracking
- services: Waterproofing and painting services
- gallery_images: Project gallery photos
- reviews: Customer reviews with approval
- blog_posts: SEO blog content
- admin_users: Admin panel users

## Key Features
- Floating WhatsApp + Call buttons
- Contact form that saves to database
- Admin panel with CMS
- Lead management system
- SEO optimized blog
- Mobile responsive design
