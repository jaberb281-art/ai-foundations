create extension if not exists "pgcrypto";

create table if not exists public.learning_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  item_type text not null check (item_type in ('lesson', 'quiz', 'project')),
  week text not null,
  slug text not null,
  completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint learning_progress_unique_item unique (user_id, item_type, week, slug)
);

create or replace function public.set_learning_progress_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists learning_progress_set_updated_at on public.learning_progress;

create trigger learning_progress_set_updated_at
before update on public.learning_progress
for each row
execute function public.set_learning_progress_updated_at();

alter table public.learning_progress enable row level security;

drop policy if exists "Users can select their own progress" on public.learning_progress;
create policy "Users can select their own progress"
on public.learning_progress
for select
using (auth.uid() = user_id);

drop policy if exists "Users can insert their own progress" on public.learning_progress;
create policy "Users can insert their own progress"
on public.learning_progress
for insert
with check (auth.uid() = user_id);

drop policy if exists "Users can update their own progress" on public.learning_progress;
create policy "Users can update their own progress"
on public.learning_progress
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

drop policy if exists "Users can delete their own progress" on public.learning_progress;
create policy "Users can delete their own progress"
on public.learning_progress
for delete
using (auth.uid() = user_id);
