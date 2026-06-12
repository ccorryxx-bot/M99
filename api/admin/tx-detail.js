import { createClient } from '@supabase/supabase-js'

export const config = { maxDuration: 10 }

const SUPA_URL = 'https://vuywhhmwrqykukcemifd.supabase.co'

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(200).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const SR_KEY   = process.env.SUPABASE_SERVICE_ROLE
  const ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY
  if (!SR_KEY)   return res.status(500).json({ error: 'Server misconfigured: SUPABASE_SERVICE_ROLE not set' })
  if (!ANON_KEY) return res.status(500).json({ error: 'Server misconfigured: VITE_SUPABASE_ANON_KEY not set' })

  const { adminKey, txId } = req.body || {}
  if (!adminKey || !txId) return res.status(400).json({ error: 'Missing required fields' })

  try {
    const anon = createClient(SUPA_URL, ANON_KEY, { auth: { persistSession: false } })
    const { data: isValid, error: authErr } = await anon.rpc('validate_admin', { p_key: adminKey })
    if (authErr) return res.status(500).json({ error: 'Auth check failed: ' + authErr.message })
    if (!isValid) return res.status(401).json({ error: 'Invalid admin credentials' })

    const admin = createClient(SUPA_URL, SR_KEY, { auth: { persistSession: false } })
    const { data: tx, error: txErr } = await admin
      .from('transactions')
      .select('id, slip_url, screenshot_url')
      .eq('id', txId)
      .single()

    if (txErr || !tx) return res.status(404).json({ error: 'Transaction not found' })

    return res.status(200).json({
      slip_url:        tx.slip_url        || null,
      screenshot_url:  tx.screenshot_url  || null,
    })
  } catch (err) {
    return res.status(500).json({ error: err.message || 'Unexpected error' })
  }
}
