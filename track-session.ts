import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { Pool } from "https://deno.land/x/postgres@v0.17.0/mod.ts"

const cors = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Authorization, apikey, Content-Type',
}

const CREATE_SQL = `
  CREATE TABLE IF NOT EXISTS login_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    username text,
    device_type text DEFAULT 'H5',
    app_version text,
    browser text,
    os text,
    ip_address text,
    ip_info text,
    login_at timestamptz DEFAULT now(),
    created_at timestamptz DEFAULT now()
  );
  ALTER TABLE login_sessions ENABLE ROW LEVEL SECURITY;
  DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='login_sessions' AND policyname='sel_own') THEN
      CREATE POLICY sel_own ON login_sessions FOR SELECT USING (auth.uid() = user_id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename='login_sessions' AND policyname='ins_own') THEN
      CREATE POLICY ins_own ON login_sessions FOR INSERT WITH CHECK (auth.uid() = user_id);
    END IF;
  END $$;
`

serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })

  try {
    const admin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const token = (req.headers.get('Authorization') || '').replace('Bearer ', '')
    const { data: { user }, error: authErr } = await admin.auth.getUser(token)
    if (authErr || !user) throw new Error('Unauthorized')

    const body = await req.json().catch(() => ({}))
    const { device_type = 'H5', app_version, browser, os } = body

    const clientIp =
      req.headers.get('cf-connecting-ip') ||
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') || '0.0.0.0'

    let ipInfo = clientIp
    try {
      if (clientIp !== '0.0.0.0' && !clientIp.startsWith('127.') && !clientIp.startsWith('192.168.')) {
        const r = await fetch(`http://ip-api.com/json/${clientIp}?fields=country,regionName,city,org`)
        const d = await r.json()
        if (d.country) ipInfo = `${clientIp} ${d.country}/${d.regionName} ${d.org || ''}`.trim()
      }
    } catch (_) { /* ignore */ }

    // Ensure table exists via direct DB connection
    const dbUrl = Deno.env.get('SUPABASE_DB_URL')
    if (dbUrl) {
      const pool = new Pool(dbUrl, 1, true)
      const conn = await pool.connect()
      try { await conn.queryArray(CREATE_SQL) } catch (_) { /* table may already exist */ }
      finally { conn.release(); await pool.end() }
    }

    const username = user.user_metadata?.username ||
      user.email?.replace('@novabett.internal', '') || 'user'

    const { data, error } = await admin.from('login_sessions').insert({
      user_id: user.id, username, device_type,
      app_version: app_version || null,
      browser: browser || null,
      os: os || null,
      ip_address: clientIp,
      ip_info: ipInfo,
      login_at: new Date().toISOString(),
    }).select().single()

    if (error) throw error

    return new Response(JSON.stringify({ data }), {
      headers: { ...cors, 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 400, headers: { ...cors, 'Content-Type': 'application/json' }
    })
  }
})
