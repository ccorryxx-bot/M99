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

  const { adminKey, txId, action } = req.body || {}
  if (!adminKey || !txId || !action)        return res.status(400).json({ error: 'Missing required fields' })
  if (!['approve', 'reject'].includes(action)) return res.status(400).json({ error: 'Invalid action' })

  try {
    // 1. Validate admin key using the anon client
    const anon = createClient(SUPA_URL, ANON_KEY, { auth: { persistSession: false } })
    const { data: isValid, error: authErr } = await anon.rpc('validate_admin', { p_key: adminKey })
    if (authErr) return res.status(500).json({ error: 'Auth check failed: ' + authErr.message })
    if (!isValid) return res.status(401).json({ error: 'Invalid admin credentials' })

    // 2. Use service role for all DB operations (bypasses RLS + generated column bug)
    const admin = createClient(SUPA_URL, SR_KEY, { auth: { persistSession: false } })

    // 3. Get the transaction
    const { data: tx, error: txErr } = await admin
      .from('transactions')
      .select('id, type, amount, user_id, status')
      .eq('id', txId)
      .single()
    if (txErr || !tx) return res.status(404).json({ error: 'Transaction not found' })
    if (tx.status !== 'pending') return res.status(409).json({ error: `Already ${tx.status}` })

    // 4. Update transaction status
    const newStatus = action === 'approve' ? 'confirmed' : 'rejected'
    const { error: statusErr } = await admin
      .from('transactions')
      .update({ status: newStatus, processed_at: new Date().toISOString() })
      .eq('id', txId)
    if (statusErr) return res.status(500).json({ error: 'Status update failed: ' + statusErr.message })

    // 5. Adjust wallet balance on approval
    if (action === 'approve') {
      const { data: wallet, error: wErr } = await admin
        .from('wallets')
        .select('main_balance')
        .eq('user_id', tx.user_id)
        .single()
      if (wErr || !wallet) return res.status(500).json({ error: 'Wallet not found' })

      const curr   = Number(wallet.main_balance) || 0
      const amt    = Number(tx.amount) || 0
      const newBal = tx.type === 'deposit' ? curr + amt : Math.max(0, curr - amt)

      const { error: balErr } = await admin
        .from('wallets')
        .update({ main_balance: newBal })
        .eq('user_id', tx.user_id)
      if (balErr) return res.status(500).json({ error: 'Balance update failed: ' + balErr.message })
    }

    return res.status(200).json({ ok: true, status: newStatus })
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Unexpected error' })
  }
}
