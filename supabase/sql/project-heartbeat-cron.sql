-- One-time setup before running this script:
-- 1. Create an Edge Function secret called HEARTBEAT_SECRET.
-- 2. Store the same secret in Vault under the name project_heartbeat_secret.
-- 3. Store your project URL in Vault under the name project_url.
-- 4. Store your publishable/anon key in Vault under the name project_heartbeat_anon_key.
--
-- Example:
-- select vault.create_secret('https://zpjszuinzrydunkafwld.supabase.co', 'project_url');
-- select vault.create_secret('your-anon-key', 'project_heartbeat_anon_key');
-- select vault.create_secret('your-heartbeat-secret', 'project_heartbeat_secret');

select cron.unschedule('project-heartbeat-daily')
where exists (
  select 1
  from cron.job
  where jobname = 'project-heartbeat-daily'
);

select
  cron.schedule(
    'project-heartbeat-daily',
    '5 6 * * *',
    $$
    select
      net.http_post(
        url := (
          select decrypted_secret || '/functions/v1/project-heartbeat'
          from vault.decrypted_secrets
          where name = 'project_url'
          order by created_at desc
          limit 1
        ),
        headers := jsonb_build_object(
          'Content-Type', 'application/json',
          'Authorization', 'Bearer ' || (
            select decrypted_secret
            from vault.decrypted_secrets
            where name = 'project_heartbeat_anon_key'
            order by created_at desc
            limit 1
          ),
          'x-heartbeat-secret', (
            select decrypted_secret
            from vault.decrypted_secrets
            where name = 'project_heartbeat_secret'
            order by created_at desc
            limit 1
          )
        ),
        body := jsonb_build_object(
          'jobName', 'project-heartbeat-daily',
          'source', 'pg_cron',
          'note', 'Keeps the Supabase project warm while image traffic is light.'
        ),
        timeout_milliseconds := 5000
      ) as request_id;
    $$
  );
