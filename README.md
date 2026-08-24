# Mobile Service — Shop Website

A professional website + backend for a mobile phone repair and service shop.
The business name is not finalized yet — the placeholder **"Mobile Service"**
is used everywhere and is centrally configurable (see
[`frontend/src/config/site.ts`](frontend/src/config/site.ts)).

Full docs: [Business Analysis](docs/BA.md) · [Architecture](docs/ARCHITECTURE.md) · [Roadmap](docs/ROADMAP.md)

## Overview

- **Frontend**: React + Vite + TypeScript + Tailwind CSS — public marketing
  site with services, gallery, about, FAQ, contact form and a floating chat
  widget for guided enquiries.
- **Backend**: Django + Django REST Framework — REST API for enquiries,
  services, gallery images and website content.
- **Database**: SQLite for local development (zero setup); PostgreSQL-ready
  via `DATABASE_URL` for production.

## Technology Stack

| Layer | Stack |
|---|---|
| Frontend | React 19, Vite, TypeScript, Tailwind CSS 4, React Router, Axios, lucide-react |
| Backend | Python 3.12, Django 6.1, Django REST Framework, django-cors-headers |
| Database | SQLite (dev) / PostgreSQL (prod, via `dj-database-url`) |
| Images | Local `MEDIA_ROOT` (dev) → S3/Cloudinary-compatible storage (prod) |

## Prerequisites

- Node.js 18+ and npm
- Python 3.10+ (this project was set up with Python 3.12 via Homebrew:
  `brew install python@3.12`)
- (Optional, production) PostgreSQL

## Installation & Local Development

### Backend

```bash
cd backend
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # edit values as needed
python manage.py migrate
python manage.py createsuperuser
python manage.py seed_services   # sample services
python manage.py seed_gallery    # sample gallery images (generated placeholders)
python manage.py runserver 8000
```

API available at `http://localhost:8000/api/`. Admin at `http://localhost:8000/admin/`.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env.local     # edit VITE_API_BASE_URL if needed
npm run dev
```

Site available at `http://localhost:5173/`.

## Environment Variables

**`backend/.env`** (see `backend/.env.example`):

| Variable | Purpose |
|---|---|
| `DJANGO_SECRET_KEY` | Django secret key — set a real random value in production |
| `DJANGO_DEBUG` | `True`/`False` — must be `False` in production |
| `DJANGO_ALLOWED_HOSTS` | Comma-separated hostnames |
| `DATABASE_URL` | Leave unset for local SQLite; set for PostgreSQL (e.g. `postgres://user:pass@host:5432/db`) |
| `CORS_ALLOWED_ORIGINS` | Comma-separated frontend origins allowed to call the API |

**`frontend/.env.local`** (see `frontend/.env.example`):

| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Base URL of the Django API, e.g. `http://localhost:8000/api` |

Never commit `.env` files — only `.env.example`.

## Database Setup

Local development uses SQLite by default (`backend/db.sqlite3`, gitignored) —
no setup required. To switch to PostgreSQL:

1. Create a database and user in PostgreSQL.
2. Set `DATABASE_URL=postgres://USER:PASSWORD@HOST:5432/DBNAME` in `backend/.env`.
3. Run `python manage.py migrate`.

No code changes are required to switch databases.

## API Endpoints

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/enquiries/` | Public | Submit a repair enquiry |
| `GET` | `/api/enquiries/` | Admin (token) | List enquiries |
| `PATCH` | `/api/enquiries/{id}/` | Admin (token) | Update enquiry status |
| `GET` | `/api/services/` | Public | List active services |
| `POST`/`PATCH`/`DELETE` | `/api/services/{id}/` | Admin (token) | Manage services |
| `GET` | `/api/gallery/` | Public | List active gallery images |
| `POST`/`PATCH`/`DELETE` | `/api/gallery/{id}/` | Admin (token) | Manage gallery images |
| `GET` | `/api/website-content/` | Public | List website content blocks |
| `POST`/`PATCH`/`DELETE` | `/api/website-content/{id}/` | Admin (token) | Manage website content |

Admin-only endpoints require a Django staff user and DRF Token
authentication (`Authorization: Token <key>`).

## Git Workflow

The repository is a single monorepo (`frontend/`, `backend/`, `docs/`).
Standard workflow: feature branches → PR → merge to `main`. No secrets are
committed; `.env` files are gitignored.

## Deployment (Phase 2/3)

- **Frontend**: Vercel or any static host — set `VITE_API_BASE_URL` to the
  production API URL as a build-time env var.
- **Backend**: any Django-capable host (Railway, Render, Fly.io, etc.) —
  set `DJANGO_DEBUG=False`, a real `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`,
  `CORS_ALLOWED_ORIGINS`, and `DATABASE_URL` pointing at managed PostgreSQL.
- **Media/images**: switch `DEFAULT_FILE_STORAGE`/`STORAGES` to an
  S3-compatible or Cloudinary backend in production settings.

See [`docs/ROADMAP.md`](docs/ROADMAP.md) for the full phased plan, including
the future React admin panel.

## Future Roadmap

See [`docs/ROADMAP.md`](docs/ROADMAP.md): Phase 2 adds a React admin panel
(enquiry management, service/gallery/content CRUD with image upload); Phase 3
covers production deployment and hardening.
