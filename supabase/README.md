# Supabase heartbeat setup

This project includes a small Supabase Edge Function and cron job intended to
touch the database once per day. The goal is to keep a lightweight stream of
activity while your site images are being served from Supabase Storage.

Important:
- This is a best-effort heartbeat, not a formal guarantee against project
  pausing on the Free plan.
- The function is protected by a custom secret header so it is not openly
  writable.

## Files

- `supabase/functions/project-heartbeat/index.ts`
- `supabase/migrations/20260415160000_create_project_heartbeat.sql`
- `supabase/sql/project-heartbeat-cron.sql`

## What it does

1. The `project-heartbeat` Edge Function receives a POST request.
2. It checks the `x-heartbeat-secret` header.
3. It upserts a single row in `public.project_heartbeat`.
4. A daily cron job calls the function using `pg_cron` + `pg_net`.

## Deploy steps

1. Link this repo to your hosted Supabase project:

   ```bash
   supabase link --project-ref zpjszuinzrydunkafwld
   ```

2. Push the database migration:

   ```bash
   supabase db push
   ```

3. Create a strong heartbeat secret and register it for the Edge Function:

   ```bash
   supabase secrets set HEARTBEAT_SECRET=replace-with-a-long-random-secret
   supabase secrets set HEARTBEAT_ROW_ID=site-images-heartbeat
   ```

4. Deploy the function:

   ```bash
   supabase functions deploy project-heartbeat
   ```

5. In the Supabase SQL Editor, store the cron values in Vault:

   ```sql
   select vault.create_secret(
     'https://zpjszuinzrydunkafwld.supabase.co',
     'project_url',
     'Hosted Supabase project URL used by the project heartbeat cron job'
   );

   select vault.create_secret(
     'paste-your-anon-key-here',
     'project_heartbeat_anon_key',
     'Publishable key used by the project heartbeat cron job'
   );

   select vault.create_secret(
     'use-the-same-heartbeat-secret-you-set-for-the-function',
     'project_heartbeat_secret',
     'Custom header secret used by the project heartbeat cron job'
   );
   ```

6. Run the SQL in `supabase/sql/project-heartbeat-cron.sql`.

## Testing

After deployment, you can trigger the function manually:

```bash
curl -i --request POST "https://zpjszuinzrydunkafwld.supabase.co/functions/v1/project-heartbeat" \
  --header "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  --header "Content-Type: application/json" \
  --header "x-heartbeat-secret: YOUR_HEARTBEAT_SECRET" \
  --data "{\"jobName\":\"manual-check\",\"source\":\"manual\"}"
```

If it works, you should get a JSON response with `ok: true`.

## Verifying in the dashboard

- Database: check `public.project_heartbeat`
- Edge Functions: check logs for `project-heartbeat`
- Cron: check the job history for `project-heartbeat-daily`

## Updating or removing the cron job

To remove the job:

```sql
select cron.unschedule('project-heartbeat-daily');
```
