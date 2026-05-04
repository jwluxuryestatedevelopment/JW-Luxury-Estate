import "https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

type HeartbeatPayload = {
  jobName?: string;
  source?: string;
  note?: string;
  [key: string]: unknown;
};

const jsonHeaders = {
  "Content-Type": "application/json",
};

const heartbeatSecret = Deno.env.get("HEARTBEAT_SECRET")?.trim() ?? "";
const heartbeatRowId =
  Deno.env.get("HEARTBEAT_ROW_ID")?.trim() || "site-images-heartbeat";
const supabaseUrl = Deno.env.get("SUPABASE_URL")?.trim() ?? "";
const supabaseServiceRoleKey =
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")?.trim() ?? "";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

function resolvePayloadSource(payload: HeartbeatPayload) {
  if (typeof payload.source === "string" && payload.source.trim()) {
    return payload.source.trim();
  }

  return "supabase-cron";
}

function resolvePayloadJobName(payload: HeartbeatPayload) {
  if (typeof payload.jobName === "string" && payload.jobName.trim()) {
    return payload.jobName.trim();
  }

  return "project-heartbeat-daily";
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return jsonResponse(
      {
        ok: false,
        error: "Method not allowed. Use POST.",
      },
      405,
    );
  }

  if (!heartbeatSecret) {
    return jsonResponse(
      {
        ok: false,
        error: "Missing HEARTBEAT_SECRET in Edge Function secrets.",
      },
      500,
    );
  }

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return jsonResponse(
      {
        ok: false,
        error: "Missing Supabase runtime secrets for this function.",
      },
      500,
    );
  }

  const requestSecret = req.headers.get("x-heartbeat-secret")?.trim() ?? "";

  if (requestSecret !== heartbeatSecret) {
    return jsonResponse(
      {
        ok: false,
        error: "Unauthorized heartbeat request.",
      },
      401,
    );
  }

  let payload: HeartbeatPayload = {};

  try {
    const contentType = req.headers.get("content-type") ?? "";

    if (contentType.includes("application/json")) {
      const parsedPayload = await req.json();

      if (parsedPayload && typeof parsedPayload === "object") {
        payload = parsedPayload as HeartbeatPayload;
      }
    }
  } catch {
    return jsonResponse(
      {
        ok: false,
        error: "Invalid JSON body.",
      },
      400,
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
  const touchedAt = new Date().toISOString();

  const { data, error } = await supabaseAdmin
    .from("project_heartbeat")
    .upsert(
      {
        id: heartbeatRowId,
        source: resolvePayloadSource(payload),
        job_name: resolvePayloadJobName(payload),
        touched_at: touchedAt,
        details: payload,
      },
      {
        onConflict: "id",
      },
    )
    .select("id, source, job_name, touched_at, updated_at")
    .single();

  if (error) {
    return jsonResponse(
      {
        ok: false,
        error: error.message,
      },
      500,
    );
  }

  return jsonResponse({
    ok: true,
    heartbeat: data,
  });
});
