# Business Analysis — Mobile Phone Service & Repair Shop Website

## 1. Business Context

A new mobile phone repair and service shop needs a professional web presence to
attract customers, showcase services, and capture repair enquiries. The shop's
final brand name is **not yet finalized**; the system uses the placeholder
**"Mobile Service"** everywhere, driven from a single central config so it can
be renamed later without touching component code.

## 2. Goals

- Present the shop as trustworthy, modern, and professional.
- Let customers browse services, see brands supported, and view a repair
  gallery.
- Let customers submit repair enquiries directly from the site (form + chat
  widget) without calling in.
- Give the shop owner a path (Phase 2) to manage services, gallery images, and
  website content without editing code.
- Keep customer enquiry data private, structured, and actionable (status
  tracking) for the shop owner.

## 3. Target Users

| User | Needs |
|---|---|
| Customer (visitor) | Find services & pricing info, see trust signals, contact/enquire quickly, mobile-friendly |
| Shop owner / staff (admin, Phase 2) | View & manage enquiries, update services/gallery/content, no-code image uploads |

## 4. Functional Requirements

### Public Website
- FR-1: Landing page with hero, services, brands, why-choose-us, gallery, about, contact.
- FR-2: Services are data-driven (from API), not hard-coded, with seed data for development.
- FR-3: Gallery images are data-driven (from API), with seed placeholder images.
- FR-4: Floating chat widget for guided enquiry submission (not an AI chatbot in v1).
- FR-5: Enquiry form (via chat and/or a dedicated contact form) posts to the backend.
- FR-6: WhatsApp contact link as an alternative to the form.
- FR-7: Fully responsive (mobile/tablet/desktop), no horizontal scroll, no overlap.

### Backend / API
- FR-8: `POST /api/enquiries/` — public, creates a new enquiry (validated).
- FR-9: `GET /api/enquiries/` — admin-only (authenticated), list all enquiries.
- FR-10: `PATCH /api/enquiries/{id}/` — admin-only, update enquiry status.
- FR-11: `GET /api/services/` — public, list active services.
- FR-12: `GET /api/gallery/` — public, list active gallery images.
- FR-13: Admin CRUD endpoints for services, gallery, and website content
  (protected by token authentication) — architected now, exposed via a future
  admin UI in Phase 2.
- FR-14: Website content (hero text, about text, contact info, etc.) is
  stored in the database via a generic `WebsiteContent` model so ordinary
  content edits don't require frontend code changes.

### Data
- FR-15: Enquiry statuses: `NEW`, `CONTACTED`, `IN_PROGRESS`, `COMPLETED`, `CANCELLED`.
- FR-16: Images are referenced by URL (external storage abstraction), never
  imported directly into React source/bundled assets for user-facing content.

## 5. Non-Functional Requirements

- NFR-1: No hard-coded shop name/branding — centralized config (`frontend/src/config/site.ts`).
- NFR-2: No hard-coded secrets; `.env` / `.env.example` pattern, secrets excluded from git.
- NFR-3: CORS configured explicitly between frontend and backend origins.
- NFR-4: Django `DEBUG=False` and secure settings in production; `DEBUG` driven by env var.
- NFR-5: Accessible: labeled form inputs, alt text, keyboard navigation, sufficient contrast.
- NFR-6: SEO basics: titles, meta description, semantic HTML, Open Graph tags, robots.txt.
- NFR-7: Performance: lazy loading, code splitting where sensible, minimal dependencies.
- NFR-8: Database: SQLite for local dev now; PostgreSQL-ready via `DATABASE_URL`/env vars for production.
- NFR-9: No microservices/Kubernetes/over-engineering — a single Django monolith + single React SPA.

## 6. Out of Scope (v1)

- Full admin dashboard UI (backend architecture only in v1; UI is Phase 2).
- Payment processing.
- Real AI-powered chatbot (widget is scripted/guided; designed to allow an AI API later).
- Multi-tenant / multi-shop support.

## 7. Placeholder Content Policy

Anything not yet supplied by the business owner (shop name, phone, address,
logo, photos, years of experience, warranty terms) uses clearly-labeled
placeholder content and centralized config, rather than blocking development
or inventing false claims.
