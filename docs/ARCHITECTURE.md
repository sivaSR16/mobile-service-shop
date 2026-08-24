# Architecture

## Overview

```
CUSTOMER                                   ADMIN (Phase 2)
   │                                            │
   ▼                                            ▼
React Website (Vite/TS)                React Admin Panel (Phase 2)
   │                                            │
   ├── Landing / Services / Gallery /           ├── Enquiries
   │   Contact / Chat                           ├── Website Content
   │                                            ├── Images
   ▼                                            ├── Services
Axios API layer (src/services)                  └── Settings
   │                                            │
   └───────────────► Django REST API ◄──────────┘
                          │
                          ├── SQLite (dev) / PostgreSQL (prod)
                          └── Image storage abstraction
                                (local MEDIA_ROOT now →
                                 Cloudinary/S3-compatible later)
```

A single Django monolith serves a REST API consumed by a React SPA. No
microservices, no message queues, no k8s — deliberately simple for a small
business site.

## Backend (Django + DRF)

```
backend/
├── manage.py
├── config/                # project settings, urls, wsgi/asgi
│   ├── settings.py        # env-driven, PostgreSQL-ready, DEBUG from env
│   ├── urls.py
│   └── ...
├── apps/
│   ├── enquiries/         # Enquiry model, serializers, views (public POST, admin GET/PATCH)
│   ├── services/          # Service model, public GET, admin CRUD
│   ├── gallery/            # GalleryImage model, public GET, admin CRUD
│   └── website/            # WebsiteContent model (generic CMS-lite), public GET, admin CRUD
├── requirements.txt
└── .env.example
```

- **Settings** read `DATABASE_URL` (via `dj-database-url`) so switching
  SQLite → PostgreSQL is an env var change, not a code change. Falls back to
  local SQLite file when `DATABASE_URL` is unset.
- **Auth**: DRF Token Authentication for admin-only endpoints (`GET
  /api/enquiries/`, all write endpoints on services/gallery/website content).
  No custom password handling — Django's built-in hashed auth is used as-is.
- **CORS**: `django-cors-headers`, allowed origins driven by env var
  (`CORS_ALLOWED_ORIGINS`), permissive only in local dev.
- **Images**: `ImageField`s write to `MEDIA_ROOT`/`MEDIA_URL` locally in dev;
  storage backend is swappable to `django-storages` (S3/Cloudinary-compatible)
  in production by changing `DEFAULT_FILE_STORAGE` / `STORAGES` config only —
  no model or API changes required. The API always returns absolute image
  URLs, never file paths.
- **Validation**: DRF serializers validate enquiry fields (required fields,
  phone format) before persisting.

## Frontend (React + Vite + TS)

```
frontend/
├── src/
│   ├── components/   # Header, Footer, ServiceCard, GalleryGrid, ChatWidget, etc.
│   ├── pages/         # Home (composes all landing sections)
│   ├── layouts/       # MainLayout (Header/Footer wrapper)
│   ├── services/      # api.ts (axios instance) + per-resource functions
│   ├── hooks/         # useServices, useGallery, useEnquiryForm, etc.
│   ├── types/         # Service, GalleryImage, Enquiry, WebsiteContent types
│   ├── utils/         # validation, formatting helpers
│   ├── config/        # site.ts — centralized branding/config (shop name, phone, etc.)
│   ├── assets/        # static, brand-agnostic assets only (icons, generic graphics)
│   ├── App.tsx
│   └── main.tsx
└── public/
```

- All API calls go through `src/services/api.ts` (single Axios instance, base
  URL from `VITE_API_BASE_URL`), never scattered `fetch()` calls in
  components.
- Any content that the shop owner should be able to change later (hero copy,
  services, gallery, brand name) is either (a) fetched from the API, or (b)
  isolated in `src/config/site.ts` as a clearly-marked placeholder — never
  duplicated inline across components.
- Tailwind CSS for styling; orange (`brand-500` etc.) as the accent color
  scale, neutral grays for backgrounds/text.
- React Router for `/`, and section anchors within the landing page (services,
  gallery, about, contact are sections of one page per typical small-business
  site UX; dedicated routes can be split out in Phase 2 if content grows).

## Data Model Summary

| Model | Purpose |
|---|---|
| `Enquiry` | Customer repair/service enquiries, with status workflow |
| `Service` | Repair services shown on the site (name, description, price, image) |
| `GalleryImage` | Repair/shop photos shown in the gallery |
| `WebsiteContent` | Generic keyed content blocks (section, title, description, image, metadata JSON) for CMS-lite editing without code changes |

## Environments

- **Local dev**: SQLite file DB, Django dev server (`runserver`), Vite dev
  server, images in local `MEDIA_ROOT`.
- **Production (Phase 2 deploy)**: Managed PostgreSQL, Django on a
  Django-capable host (Railway/Render/Fly/etc.), static frontend on
  Vercel/Netlify, media on S3-compatible/Cloudinary storage, `DEBUG=False`,
  secrets via host-level env vars.

## Security Notes

- No secrets committed; `.env` files are gitignored, `.env.example` documents
  required keys.
- Django `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, `CORS_ALLOWED_ORIGINS`,
  `DATABASE_URL` are all env-driven.
- Public enquiry list/detail is never exposed without authentication.
- Token auth for the future admin panel; no bespoke crypto/password storage.
