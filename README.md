# ELT-2026

## Backend & Database

This project includes a small Node + Express backend using Prisma and PostgreSQL. The recommended setup is to create a **Supabase** project (free tier is fine), copy the **DATABASE_URL** from Supabase, and add it to `server/.env` as `DATABASE_URL`.

Quick steps:

- Create Supabase project and Postgres instance: https://app.supabase.com/
- In project Settings → Database → Connection string → copy **Connection string** (use a role with migration permissions)
- In `server/` create `.env` from `.env.example` and paste the value:

```
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
```

- From `server/` run:
  - `npm install`
  - `npx prisma generate`
  - `npx prisma migrate dev --name init`
  - `npm run prisma:seed`

The seed script imports workers from `src/data/mockData.js`.

## Deployment notes

- I recommend deploying the API to Render or Railway and the frontend to Vercel (current setup).
- For Vercel, add env var `VITE_GOOGLE_MAPS_KEY` in Project Settings → Environment Variables so the map works in production.
- For the backend (Render/Railway), add `DATABASE_URL` to the service's environment variables and deploy.

