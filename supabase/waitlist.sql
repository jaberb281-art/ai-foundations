-- AI Foundations waitlist table
-- Run this in Supabase SQL Editor before launching the waitlist.

create table if not exists public.waitlist_signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text default 'website',
  status text not null default 'subscribed',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.waitlist_signups enable row level security;

-- No public insert policy is required because signups are written through
-- the server route using SUPABASE_SERVICE_ROLE_KEY.
