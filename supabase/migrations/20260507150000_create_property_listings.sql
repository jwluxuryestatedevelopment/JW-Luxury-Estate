create table if not exists public.property_listing_collections (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null default '',
  subtitle text not null default '',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint property_listing_collections_slug_format
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

create table if not exists public.property_listing_cards (
  id uuid primary key default gen_random_uuid(),
  collection_id uuid not null references public.property_listing_collections(id) on delete cascade,
  slug text not null,
  title text not null default '',
  location_label text not null default '',
  short_description text not null default '',
  badge text not null default '',
  highlights text[] not null default '{}'::text[],
  image_path text not null,
  image_alt text not null default '',
  object_position text,
  interest_message text not null default '',
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (collection_id, slug),
  unique (collection_id, image_path),
  constraint property_listing_cards_slug_format
    check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$')
);

drop trigger if exists property_listing_collections_set_updated_at
on public.property_listing_collections;
create trigger property_listing_collections_set_updated_at
before update on public.property_listing_collections
for each row
execute function public.set_site_content_updated_at();

drop trigger if exists property_listing_cards_set_updated_at
on public.property_listing_cards;
create trigger property_listing_cards_set_updated_at
before update on public.property_listing_cards
for each row
execute function public.set_site_content_updated_at();

alter table public.property_listing_collections enable row level security;
alter table public.property_listing_cards enable row level security;

drop policy if exists "Public can read active listing collections"
on public.property_listing_collections;
create policy "Public can read active listing collections"
on public.property_listing_collections
for select
to anon, authenticated
using (is_active or public.is_site_admin());

drop policy if exists "Admins can insert listing collections"
on public.property_listing_collections;
create policy "Admins can insert listing collections"
on public.property_listing_collections
for insert
to authenticated
with check (public.is_site_admin());

drop policy if exists "Admins can update listing collections"
on public.property_listing_collections;
create policy "Admins can update listing collections"
on public.property_listing_collections
for update
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

drop policy if exists "Admins can delete listing collections"
on public.property_listing_collections;
create policy "Admins can delete listing collections"
on public.property_listing_collections
for delete
to authenticated
using (public.is_site_admin());

drop policy if exists "Public can read active listing cards"
on public.property_listing_cards;
create policy "Public can read active listing cards"
on public.property_listing_cards
for select
to anon, authenticated
using (is_active or public.is_site_admin());

drop policy if exists "Admins can insert listing cards"
on public.property_listing_cards;
create policy "Admins can insert listing cards"
on public.property_listing_cards
for insert
to authenticated
with check (public.is_site_admin());

drop policy if exists "Admins can update listing cards"
on public.property_listing_cards;
create policy "Admins can update listing cards"
on public.property_listing_cards
for update
to authenticated
using (public.is_site_admin())
with check (public.is_site_admin());

drop policy if exists "Admins can delete listing cards"
on public.property_listing_cards;
create policy "Admins can delete listing cards"
on public.property_listing_cards
for delete
to authenticated
using (public.is_site_admin());

grant select on public.property_listing_collections, public.property_listing_cards
to anon, authenticated;
grant insert, update, delete
on public.property_listing_collections, public.property_listing_cards
to authenticated;
