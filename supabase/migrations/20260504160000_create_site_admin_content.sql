create extension if not exists pgcrypto with schema extensions;

insert into storage.buckets (
  id,
  name,
  public,
  file_size_limit,
  allowed_mime_types
)
values (
  'site-images',
  'site-images',
  true,
  10485760,
  array[
    'image/jpeg',
    'image/png',
    'image/webp'
  ]
)
on conflict (id) do update
set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.site_admins (
  email text primary key,
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.is_site_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.site_admins
    where lower(email) = lower(coalesce(auth.email(), ''))
  );
$$;

create table if not exists public.hero_slides (
  id uuid primary key default gen_random_uuid(),
  image_path text not null unique,
  alt text not null default '',
  object_position text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.property_groups (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  eyebrow text not null default '',
  title text not null default '',
  description text not null default '',
  highlights text[] not null default '{}'::text[],
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint property_groups_slug_format
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_group_id uuid not null references public.property_groups(id) on delete cascade,
  image_path text not null,
  alt text not null default '',
  object_position text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (property_group_id, image_path)
);

create or replace function public.set_site_content_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists hero_slides_set_updated_at on public.hero_slides;
create trigger hero_slides_set_updated_at
before update on public.hero_slides
for each row
execute function public.set_site_content_updated_at();

drop trigger if exists property_groups_set_updated_at on public.property_groups;
create trigger property_groups_set_updated_at
before update on public.property_groups
for each row
execute function public.set_site_content_updated_at();

drop trigger if exists property_images_set_updated_at on public.property_images;
create trigger property_images_set_updated_at
before update on public.property_images
for each row
execute function public.set_site_content_updated_at();

alter table public.site_admins enable row level security;
alter table public.hero_slides enable row level security;
alter table public.property_groups enable row level security;
alter table public.property_images enable row level security;

drop policy if exists "Admins can read admin list" on public.site_admins;
create policy "Admins can read admin list"
on public.site_admins
for select
to authenticated
using (public.is_site_admin());

drop policy if exists "Public can read active hero slides" on public.hero_slides;
create policy "Public can read active hero slides"
on public.hero_slides
for select
to anon, authenticated
using (is_active or public.is_site_admin());

drop policy if exists "Admins can insert hero slides" on public.hero_slides;
create policy "Admins can insert hero slides"
on public.hero_slides
for insert
to authenticated
with check (public.is_site_admin());

drop policy if exists "Admins can update hero slides" on public.hero_slides;
create policy "Admins can update hero slides"
on public.hero_slides
for update
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

drop policy if exists "Admins can delete hero slides" on public.hero_slides;
create policy "Admins can delete hero slides"
on public.hero_slides
for delete
to authenticated
using (public.is_site_admin());

drop policy if exists "Public can read active property groups" on public.property_groups;
create policy "Public can read active property groups"
on public.property_groups
for select
to anon, authenticated
using (is_active or public.is_site_admin());

drop policy if exists "Admins can insert property groups" on public.property_groups;
create policy "Admins can insert property groups"
on public.property_groups
for insert
to authenticated
with check (public.is_site_admin());

drop policy if exists "Admins can update property groups" on public.property_groups;
create policy "Admins can update property groups"
on public.property_groups
for update
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

drop policy if exists "Admins can delete property groups" on public.property_groups;
create policy "Admins can delete property groups"
on public.property_groups
for delete
to authenticated
using (public.is_site_admin());

drop policy if exists "Public can read active property images" on public.property_images;
create policy "Public can read active property images"
on public.property_images
for select
to anon, authenticated
using (is_active or public.is_site_admin());

drop policy if exists "Admins can insert property images" on public.property_images;
create policy "Admins can insert property images"
on public.property_images
for insert
to authenticated
with check (public.is_site_admin());

drop policy if exists "Admins can update property images" on public.property_images;
create policy "Admins can update property images"
on public.property_images
for update
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

drop policy if exists "Admins can delete property images" on public.property_images;
create policy "Admins can delete property images"
on public.property_images
for delete
to authenticated
using (public.is_site_admin());

drop policy if exists "Public can read site images" on storage.objects;
create policy "Public can read site images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'site-images');

drop policy if exists "Admins can upload site images" on storage.objects;
create policy "Admins can upload site images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'site-images' and public.is_site_admin());

drop policy if exists "Admins can update site images" on storage.objects;
create policy "Admins can update site images"
on storage.objects
for update
to authenticated
using (bucket_id = 'site-images' and public.is_site_admin())
with check (bucket_id = 'site-images' and public.is_site_admin());

drop policy if exists "Admins can delete site images" on storage.objects;
create policy "Admins can delete site images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'site-images' and public.is_site_admin());

grant execute on function public.is_site_admin() to anon, authenticated;
grant select on public.site_admins to authenticated;
grant select on public.hero_slides, public.property_groups, public.property_images to anon, authenticated;
grant insert, update, delete on public.hero_slides, public.property_groups, public.property_images to authenticated;
