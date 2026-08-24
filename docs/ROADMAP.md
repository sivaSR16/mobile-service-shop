# Roadmap

## Phase 1 — Public Website + Backend (this build)

- React/Vite/TS/Tailwind public website: hero, services, brands, why-choose-us,
  gallery, about, contact, floating chat widget.
- Django REST API: enquiries, services, gallery, website content.
- SQLite for local dev, PostgreSQL-ready settings.
- Enquiry submission end-to-end (chat + form → API → DB).
- Seed data for services and gallery.
- Responsive, accessible, SEO-basics.
- README + env examples + git init.

## Phase 2 — Admin Panel

- React Admin Panel (separate app or route-gated section) at `/admin`:
  - Login (DRF token auth).
  - Dashboard (enquiry counts by status, recent activity).
  - Enquiries: list, filter by status, update status, notes.
  - Services: CRUD with image upload.
  - Gallery: upload/delete images.
  - Website Content: edit hero/about/contact copy and banner images.
  - Settings: shop name, phone, address, social/WhatsApp links (feeds the
    public site's central config).
- Image upload wired to S3-compatible/Cloudinary storage in production.

## Phase 3 — Production Hardening & Deployment

- Deploy backend (Railway/Render/Fly.io or similar) with managed PostgreSQL.
- Deploy frontend to Vercel/Netlify with `VITE_API_BASE_URL` pointed at prod API.
- Configure custom domain, HTTPS, production CORS/ALLOWED_HOSTS.
- Set up error monitoring/logging (e.g. Sentry) — optional, evaluate cost/benefit.
- Automated backups for PostgreSQL.

## Phase 4 — Enhancements (future, evaluate as needed)

- Real AI-assisted chat (the chat widget is already structured to swap its
  scripted logic for an API call).
- Customer-facing enquiry status lookup.
- SMS/email notifications on enquiry status change.
- Multi-branch/location support if the business expands.
- Reviews/testimonials section, driven by `WebsiteContent`/a new model.

Each phase should ship independently working; nothing in Phase 1 should block
or require rework for Phase 2/3.
