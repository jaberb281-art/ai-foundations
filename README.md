# AI Foundations Platform

A practical AI education platform by Theory Of You Academy.

## Current launch mode

This version is focused on the founding waitlist and Week 1 preview.

## Features included

- Public landing page
- Founding waitlist form
- `/api/waitlist` route
- Supabase-ready waitlist storage
- Login page with Supabase auth support
- Dashboard preview
- MDX lesson page
- Week 1 lesson preview
- Production build verified

## Setup

```bash
npm install
npm run dev
```

## Environment variables

Copy `.env.example` to `.env.local` and add your Supabase keys.

```bash
cp .env.example .env.local
```

Required for waitlist persistence:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

## Supabase waitlist table

Run this SQL in Supabase SQL Editor:

```sql
create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text default 'website',
  status text not null default 'subscribed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.waitlist_signups enable row level security;
```

The waitlist API uses the service role key, so public insert policies are not required.

## Build

```bash
npm run build
```

Build status: passing.

## Next work

- Add thank-you page
- Connect Resend welcome email
- Complete Week 1 lessons
- Add quiz system
- Add project submission system
- Add real dashboard progress tracking
