create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

create table if not exists public.project_heartbeat (
  id text primary key,
  source text not null default 'manual',
  job_name text not null default 'project-heartbeat-daily',
  details jsonb not null default '{}'::jsonb,
  touched_at timestamptz not null default timezone('utc', now()),
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.project_heartbeat enable row level security;

create or replace function public.set_project_heartbeat_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists project_heartbeat_set_updated_at on public.project_heartbeat;

create trigger project_heartbeat_set_updated_at
before update on public.project_heartbeat
for each row
execute function public.set_project_heartbeat_updated_at();

comment on table public.project_heartbeat is
  'Stores a small heartbeat row updated by the scheduled Supabase Edge Function.';

comment on column public.project_heartbeat.id is
  'Stable row identifier for the heartbeat process.';

comment on column public.project_heartbeat.touched_at is
  'Last time the heartbeat function successfully updated the row.';
