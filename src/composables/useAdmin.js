import { ref, computed } from 'vue'
import { supabase } from '@/supabase'

export const SUPA_URL = 'https://vuywhhmwrqykukcemifd.supabase.co'

// ── Singleton state ──────────────────────────────────────────────────────────
export const adminKey     = ref('')
export const loggedIn     = ref(false)
export const loginLoading = ref(false)
export const loginErr     = ref('')
export const activeTab    = ref(0)

export const stats = ref({
  total_deposits: 0, total_withdrawals: 0, active_users: 0,
  pending_tx: 0, total_balance: 0, total_users: 0
})

export const chartLoading = ref(false)
export const chartData    = ref(
  Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - 6 + i)
    return { l: d.toLocaleDateString('en-US', { weekday: 'short' }), dH: 4, wH: 4 }
  })
)
export const recentLoading = ref(false)
export const recentTx      = ref([])
export const gameActiveRate = ref(0)

export const txFilter  = ref({ status: '', type: '' })
export const txList    = ref([])
export const txLoading = ref(false)
export const txErr     = ref('')

export const sett       = ref({})
export const settLoading = ref(false)
export const settSaving  = ref(false)
export const settMsg     = ref('')
export const settOk      = ref(false)

export const users        = ref([])
export const usersLoading = ref(false)
export const userQ        = ref('')
export const userRiskFilter = ref('all')
export const filteredUsers = computed(() => {
  let list = users.value
  const q = userQ.value.toLowerCase()
  if (q) list = list.filter(u => (u.username || '').toLowerCase().includes(q) || (u.phone || '').includes(q))
  if (userRiskFilter.value === 'banned')   list = list.filter(u => u.is_banned)
  if (userRiskFilter.value === 'active')   list = list.filter(u => !u.is_banned)
  if (userRiskFilter.value === 'vip')      list = list.filter(u => (u.vip_level || 0) >= 3)
  if (userRiskFilter.value === 'high_bal') list = list.filter(u => (Number(u.balance) || 0) >= 100000)
  if (userRiskFilter.value === 'new')      list = list.filter(u => {
    const d = new Date(u.created_at); const now = new Date()
    return (now - d) < 7 * 86400 * 1000
  })
  return list
})

export const leftDrawer      = ref(false)
export const drawerSettings  = ref({
  banner_1_url: '', banner_2_url: '', banner_3_url: '', banner_4_url: '',
  cs_telegram: '', cs_livechat_url: '', cs_control_plus: ''
})
export const drawerSaving = ref(false)
export const drawerMsg    = ref('')
export const drawerOk     = ref(false)

export const playerPanel       = ref(false)
export const selectedPlayer    = ref(null)
export const playerTxList      = ref([])
export const playerTxLoading   = ref(false)
export const playerSessions    = ref([])
export const playerSessLoading = ref(false)
export const panelLoading      = ref(false)
export const panelMsg          = ref('')
export const panelActionMsg    = ref('')
export const panelActionOk     = ref(false)
export const adjAmt            = ref(0)
export const newPassword       = ref('')
export const genPassword       = computed(() => {
  if (!selectedPlayer.value) return ''
  return 'iW99@' + Math.random().toString(36).slice(2, 8).toUpperCase()
})
export const playerTotalWd = computed(() =>
  playerTxList.value.filter(t => t.type !== 'deposit' && t.status === 'confirmed')
    .reduce((s, t) => s + (Number(t.amount) || 0), 0)
)
export const playerWinWdCount = computed(() =>
  playerTxList.value.filter(t => t.type !== 'deposit' && t.status === 'confirmed').length
)
export const playerWinAmt = computed(() => playerTotalWd.value)
export const playerDepositMethods = computed(() => {
  const map = {}
  playerTxList.value.filter(t => t.type === 'deposit' && t.status === 'confirmed').forEach(t => {
    const m = t.method || 'Unknown'
    if (!map[m]) map[m] = { method: m, count: 0, total: 0 }
    map[m].count++; map[m].total += Number(t.amount) || 0
  })
  return Object.values(map).sort((a, b) => b.total - a.total)
})
export const playerWithdrawMethods = computed(() => {
  const map = {}
  playerTxList.value.filter(t => t.type !== 'deposit' && t.status === 'confirmed').forEach(t => {
    const m = t.method || 'Unknown'
    if (!map[m]) map[m] = { method: m, count: 0, total: 0 }
    map[m].count++; map[m].total += Number(t.amount) || 0
  })
  return Object.values(map).sort((a, b) => b.total - a.total)
})
export const playerDepositCount  = computed(() => playerTxList.value.filter(t => t.type === 'deposit' && t.status === 'confirmed').length)
export const playerWithdrawCount = computed(() => playerTxList.value.filter(t => t.type !== 'deposit' && t.status === 'confirmed').length)
export const playerPendingCount  = computed(() => playerTxList.value.filter(t => t.status === 'pending').length)
export const playerAvgDeposit    = computed(() => {
  const deps = playerTxList.value.filter(t => t.type === 'deposit' && t.status === 'confirmed')
  return deps.length ? deps.reduce((s, t) => s + (Number(t.amount) || 0), 0) / deps.length : 0
})
export const playerFirstDeposit  = computed(() => {
  const deps = playerTxList.value.filter(t => t.type === 'deposit' && t.status === 'confirmed')
  return deps.length ? deps[deps.length - 1]?.created_at || null : null
})
export const playerLastDeposit   = computed(() => {
  const deps = playerTxList.value.filter(t => t.type === 'deposit' && t.status === 'confirmed')
  return deps.length ? deps[0]?.created_at || null : null
})
export const playerTurnover = computed(() =>
  playerTxList.value.filter(t => t.type === 'deposit' && t.status === 'confirmed')
    .reduce((s, t) => s + (Number(t.amount) || 0), 0)
)
export const playerRiskScore = computed(() => {
  const dep = playerTurnover.value, wd = playerTotalWd.value
  if (!dep) return { label: 'No Data', color: '#94a3b8', pct: 0 }
  const ratio = wd / dep
  if (ratio >= 0.9) return { label: 'High Risk', color: '#dc2626', pct: Math.min(100, Math.round(ratio * 100)) }
  if (ratio >= 0.5) return { label: 'Medium',    color: '#d97706', pct: Math.round(ratio * 100) }
  return { label: 'Low Risk', color: '#16a34a', pct: Math.round(ratio * 100) }
})

// ── Promo state ───────────────────────────────────────────────────────────────
export const promos        = ref([])
export const promosLoading = ref(false)
export const newPromo      = ref({ code: '', bonus_amount: 5000, max_uses: 100, expiry_date: '' })
export const promoSaving   = ref(false)
export const promoMsg      = ref('')
export const promoOk       = ref(false)

// ── IP Blacklist state ────────────────────────────────────────────────────────
export const ipList   = ref([])
export const ipLoading = ref(false)
export const newIp    = ref({ ip_address: '', reason: '' })

// ── Audit Log state ───────────────────────────────────────────────────────────
export const auditLog     = ref([])
export const auditLoading = ref(false)

// ── Agents state ──────────────────────────────────────────────────────────────
export const agents        = ref([])
export const agentsLoading = ref(false)
export const agentQ        = ref('')
export const agentFilter   = ref('all')
export const agentStats    = ref({ total_agents: 0, pending_commission: 0, total_paid: 0, total_commission: 0 })
export const commTxList    = ref([])
export const commTxLoading = ref(false)
export const filteredAgents = computed(() => {
  let list = agents.value
  if (agentQ.value) list = list.filter(a => (a.username || '').toLowerCase().includes(agentQ.value.toLowerCase()))
  if (agentFilter.value === 'pending') list = list.filter(a => (a.available_commission || 0) > 0)
  if (agentFilter.value === 'high')    list = list.filter(a => (a.direct_count || 0) >= 5)
  return list
})

// ── Reports state ─────────────────────────────────────────────────────────────
export const reportFrom    = ref(new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0])
export const reportTo      = ref(new Date().toISOString().split('T')[0])
export const reportLoading = ref(false)
export const reportData    = ref({ ready: false, totalDeposit: 0, totalWithdraw: 0, newUsers: 0, txList: [], byMethod: [] })

// ── Games ─────────────────────────────────────────────────────────────────────
export const games        = ref([])
export const gamesLoading = ref(false)
export const gameQ        = ref('')
export const gameCat      = ref('')
export const gameCats     = computed(() => [...new Set(games.value.map(g => g.category).filter(Boolean))])
export const filteredGames = computed(() => {
  let l = games.value
  if (gameQ.value)   l = l.filter(g => g.name?.toLowerCase().includes(gameQ.value.toLowerCase()))
  if (gameCat.value) l = l.filter(g => g.category === gameCat.value)
  return l
})

// ── Messages ──────────────────────────────────────────────────────────────────
export const msgs        = ref([])
export const msgsLoading = ref(false)
export const newMsg      = ref({ title: '', body: '' })
export const msgSending  = ref(false)
export const msgResult   = ref('')
export const msgOk       = ref(false)

export const toast = ref({ show: false, msg: '', type: 'info' })

// ── Helpers ───────────────────────────────────────────────────────────────────
export const fmtNum = (n, dec = 0) => {
  const v = Number(n) || 0
  if (v >= 1000000) return (v / 1000000).toFixed(2) + 'M'
  if (v >= 1000) return new Intl.NumberFormat().format(Math.round(v))
  return v.toFixed(dec)
}
export const fmtDate = d => {
  if (!d) return '—'
  const dt = new Date(d)
  const date = dt.toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' })
  const time = dt.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })
  return `${date} ${time}`
}

export const showToast = (msg, type = 'info') => {
  toast.value = { show: true, msg, type }
  setTimeout(() => { toast.value.show = false }, 2600)
}
export const copyTxt = t =>
  navigator.clipboard.writeText(t).then(() => showToast('Copied', 'info')).catch(() => {})

// ── Computed helpers ──────────────────────────────────────────────────────────
export const netFlow = computed(() =>
  (stats.value.total_deposits || 0) - (stats.value.total_withdrawals || 0)
)
export const netPct = computed(() => {
  const d = stats.value.total_deposits || 0, w = stats.value.total_withdrawals || 0
  return d + w === 0 ? 0 : Math.round(d / (d + w) * 100)
})
export const gaugeArc = computed(() => Math.round(netPct.value / 100 * 95))
export const healthBars = computed(() => {
  const dep = stats.value.total_deposits || 0, wd = stats.value.total_withdrawals || 0, tot = dep + wd || 1
  return [
    { label: 'Deposit Rate',    pct: Math.round(dep / tot * 100), c: '#4f46e5' },
    { label: 'Withdrawal Rate', pct: Math.round(wd / tot * 100),  c: '#dc2626' },
    { label: 'Pending Load',    pct: Math.min(100, (stats.value.pending_tx || 0) / 20 * 100 | 0), c: '#d97706' },
    { label: 'Active Games',    pct: gameActiveRate.value, c: '#0891b2' },
  ]
})
export const metricCards = computed(() => [
  { key: 'dep', label: 'Total Deposits',    val: stats.value.total_deposits,    cls: 'a-val-in',     color: '#4f46e5', pct: 100, svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>' },
  { key: 'wd',  label: 'Total Withdrawals', val: stats.value.total_withdrawals, cls: 'a-val-out',    color: '#dc2626', pct: Math.round((stats.value.total_withdrawals||0)/(stats.value.total_deposits||1)*100), svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>' },
  { key: 'usr', label: 'Active Users',      val: stats.value.active_users,      cls: 'a-val-accent', color: '#0891b2', pct: Math.round((stats.value.active_users||0)/(stats.value.total_users||1)*100), svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"/>' },
  { key: 'ptx', label: 'Pending TX',        val: stats.value.pending_tx,        cls: 'a-val-warn',   color: '#d97706', pct: Math.min(100,(stats.value.pending_tx||0)/20*100), svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>' },
])

// ── Auto-refresh pending count every 30s ─────────────────────────────────────
let _pendingTimer = null
export const startPendingRefresh = () => {
  if (_pendingTimer) return
  _pendingTimer = setInterval(async () => {
    if (!loggedIn.value) return
    try {
      const { data } = await supabase.rpc('admin_get_stats', { p_key: adminKey.value })
      if (data) stats.value = { ...stats.value, ...data }
    } catch (e) {}
    // Always do a direct count to keep badge accurate
    await fetchPendingCount()
  }, 15000)
}

// ── Auth ──────────────────────────────────────────────────────────────────────
export const login = async () => {
  if (!adminKey.value) { loginErr.value = 'Enter password'; return }
  loginLoading.value = true; loginErr.value = ''
  try {
    const { data, error } = await supabase.rpc('validate_admin', { p_key: adminKey.value })
    if (error) throw error
    if (data) {
      loggedIn.value = true
      try { sessionStorage.setItem('iw99_admin_key', adminKey.value) } catch(e) {}
      startPendingRefresh()
      await loadOverview()
    }
    else loginErr.value = 'Invalid credentials'
  } catch (e) { loginErr.value = e.message }
  finally { loginLoading.value = false }
}
export const logout = () => {
  loggedIn.value = false; adminKey.value = ''; activeTab.value = 0
  try { sessionStorage.removeItem('iw99_admin_key') } catch(e) {}
  leftDrawer.value = false; playerPanel.value = false
}
export const tryAutoLogin = async () => {
  let saved = ''
  try { saved = sessionStorage.getItem('iw99_admin_key') || '' } catch(e) {}
  if (!saved) return false
  try {
    const { data } = await supabase.rpc('validate_admin', { p_key: saved })
    if (data) {
      adminKey.value = saved
      loggedIn.value = true
      startPendingRefresh()
      return true
    }
  } catch(e) {}
  try { sessionStorage.removeItem('iw99_admin_key') } catch(e) {}
  return false
}

// ── Overview ──────────────────────────────────────────────────────────────────
export const loadOverview  = async () => { await Promise.all([loadStats(), loadRecentTx(), loadChart(), fetchPendingCount()]) }
export const loadStats     = async () => {
  try { const { data } = await supabase.rpc('admin_get_stats', { p_key: adminKey.value }); if (data) stats.value = { ...stats.value, ...data } } catch (e) {}
}
// Direct pending count — bypasses admin_get_stats which may mis-count
export const fetchPendingCount = async () => {
  try {
    const { count, error } = await supabase
      .from('transactions')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'pending')
    if (!error && count !== null) stats.value.pending_tx = count
  } catch (e) {}
}
export const loadRecentTx  = async () => {
  recentLoading.value = true
  try {
    const { data, error } = await supabase.rpc('admin_list_transactions', {
      p_key: adminKey.value, p_limit: 5, p_offset: 0
    })
    if (error) throw error
    recentTx.value = (data || []).slice(0, 5)
  } catch (e) {} finally { recentLoading.value = false }
}
export const loadChart = async () => {
  chartLoading.value = true
  try {
    const days = []
    for (let i = 6; i >= 0; i--) {
      const d = new Date(); d.setDate(d.getDate() - i)
      days.push({ date: d.toISOString().split('T')[0], l: d.toLocaleDateString('en-US', { weekday: 'short' }), dep: 0, wd: 0 })
    }
    const { data: txs } = await supabase.from('transactions').select('type,amount,created_at')
      .gte('created_at', days[0].date + 'T00:00:00Z').eq('status', 'confirmed')
    ;(txs || []).forEach(tx => {
      const d = tx.created_at.split('T')[0]; const day = days.find(x => x.date === d); if (!day) return
      tx.type === 'deposit' ? day.dep += Number(tx.amount) || 0 : day.wd += Number(tx.amount) || 0
    })
    const mx = Math.max(...days.map(d => Math.max(d.dep, d.wd)), 1)
    chartData.value = days.map(d => ({ l: d.l, dH: Math.max(2, Math.round(d.dep / mx * 62)), wH: Math.max(2, Math.round(d.wd / mx * 62)) }))
  } catch (e) {} finally { chartLoading.value = false }
}

// ── Transactions ──────────────────────────────────────────────────────────────
export const fetchTx = async () => {
  txLoading.value = true; txErr.value = ''
  try {
    const { data, error } = await supabase.rpc('admin_list_transactions', {
      p_key:    adminKey.value,
      p_status: txFilter.value.status || null,
      p_type:   txFilter.value.type   || null,
      p_limit:  50,
      p_offset: 0
    })
    if (error) throw error
    txList.value = data || []
  } catch (e) { txErr.value = e.message } finally { txLoading.value = false }
}
const _doApproveDirect = async (id, action, overrideAmount = null) => {
  const body = { adminKey: adminKey.value, txId: id, action }
  if (overrideAmount !== null && overrideAmount > 0) body.overrideAmount = overrideAmount
  const res = await fetch('/api/admin/process-tx', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.error || `Server error ${res.status}`)
}

export const doApprove = async (id, action, overrideAmount = null) => {
  try {
    // If a custom amount is provided, skip the RPC (which doesn't support overrides)
    // and go directly to the serverless API that handles amount adjustments
    if (overrideAmount !== null && overrideAmount > 0) {
      await _doApproveDirect(id, action, overrideAmount)
    } else {
      const { data, error } = await supabase.rpc('admin_process_transaction', {
        p_key: adminKey.value, p_tx_id: id, p_action: action
      })
      if (error) {
        const msg = error.message || ''
        if (msg.includes('balance') || msg.includes('DEFAULT') || msg.includes('generated') || error.code === '428C9') {
          await _doApproveDirect(id, action)
        } else {
          throw error
        }
      }
    }
    showToast(action === 'approve' ? 'Approved ✓' : 'Rejected', 'success')
    fetchTx()
    writeAudit(action.toUpperCase() + '_TX', id, overrideAmount ? `override:${overrideAmount}` : '')
    loadStats()
    fetchPendingCount()
  } catch (e) { showToast(e.message, 'error') }
}

// ── Settings ──────────────────────────────────────────────────────────────────
export const fetchSett = async () => {
  settLoading.value = true
  try { const { data } = await supabase.rpc('admin_get_settings', { p_key: adminKey.value }); if (data) sett.value = { ...data } }
  catch (e) {} finally { settLoading.value = false }
}
export const saveSett = async () => {
  settSaving.value = true; settMsg.value = ''
  try {
    const { error } = await supabase.rpc('admin_save_settings', { p_key: adminKey.value, p_settings: sett.value })
    if (error) throw error; settOk.value = true; settMsg.value = 'Saved'
    showToast('Settings saved', 'success')
    writeAudit('SAVE_SETTINGS', '', '')
  } catch (e) { settOk.value = false; settMsg.value = e.message }
  finally { settSaving.value = false; setTimeout(() => { settMsg.value = '' }, 3000) }
}

// ── Users ─────────────────────────────────────────────────────────────────────
export const fetchUsers = async () => {
  usersLoading.value = true
  try { const { data } = await supabase.rpc('admin_list_users', { p_key: adminKey.value }); users.value = data || [] }
  catch (e) {} finally { usersLoading.value = false }
}
export const openPlayer = async (u) => {
  selectedPlayer.value = { ...u }; playerPanel.value = true
  panelMsg.value = ''; panelActionMsg.value = ''; adjAmt.value = 0; newPassword.value = ''
  await Promise.all([loadPlayerTx(u.id), loadPlayerSessions(u.id)])
}
export const loadPlayerTx = async (uid) => {
  playerTxLoading.value = true; playerTxList.value = []
  try {
    const { data, error } = await supabase.rpc('admin_list_transactions', {
      p_key: adminKey.value, p_user_id: uid, p_limit: 20, p_offset: 0
    })
    if (error) throw error
    playerTxList.value = data || []
  } catch (e) {} finally { playerTxLoading.value = false }
}
export const loadPlayerSessions = async (uid) => {
  playerSessLoading.value = true; playerSessions.value = []
  try {
    const { data } = await supabase.from('login_sessions').select('*').eq('user_id', uid)
      .order('login_at', { ascending: false }).limit(5)
    playerSessions.value = data || []
  } catch (e) {} finally { playerSessLoading.value = false }
}
export const doAdjustBalance = async () => {
  if (!adjAmt.value || !selectedPlayer.value) return
  panelLoading.value = true
  try {
    const { error } = await supabase.rpc('admin_adjust_balance', {
      p_key: adminKey.value, p_user_id: selectedPlayer.value.id, p_amount: adjAmt.value
    })
    if (error) throw error
    panelMsg.value = `Adjusted by ${adjAmt.value > 0 ? '+' : ''}${adjAmt.value} Ks`
    adjAmt.value = 0; showToast('Balance updated', 'success')
  } catch (e) { showToast(e.message, 'error') } finally { panelLoading.value = false }
}
export const doAddBalance = async () => {
  const amt = Math.abs(Number(adjAmt.value) || 0)
  if (!amt || !selectedPlayer.value) { showToast('Enter amount', 'error'); return }
  panelLoading.value = true
  try {
    const { error } = await supabase.rpc('admin_adjust_balance', {
      p_key: adminKey.value, p_user_id: selectedPlayer.value.id, p_amount: amt
    })
    if (error) throw error
    selectedPlayer.value.balance = (Number(selectedPlayer.value.balance) || 0) + amt
    panelMsg.value = `+${fmtNum(amt)} Ks added`
    adjAmt.value = 0; showToast('Balance added ✓', 'success')
    writeAudit('ADD_BALANCE', selectedPlayer.value.username, `+${amt} Ks`)
  } catch (e) { showToast(e.message, 'error') } finally { panelLoading.value = false }
}
export const doDeductBalance = async () => {
  const amt = Math.abs(Number(adjAmt.value) || 0)
  if (!amt || !selectedPlayer.value) { showToast('Enter amount', 'error'); return }
  panelLoading.value = true
  try {
    const { error } = await supabase.rpc('admin_adjust_balance', {
      p_key: adminKey.value, p_user_id: selectedPlayer.value.id, p_amount: -amt
    })
    if (error) throw error
    selectedPlayer.value.balance = Math.max(0, (Number(selectedPlayer.value.balance) || 0) - amt)
    panelMsg.value = `-${fmtNum(amt)} Ks deducted`
    adjAmt.value = 0; showToast('Balance deducted ✓', 'success')
    writeAudit('DEDUCT_BALANCE', selectedPlayer.value.username, `-${amt} Ks`)
  } catch (e) { showToast(e.message, 'error') } finally { panelLoading.value = false }
}
export const doToggleBan = async () => {
  if (!selectedPlayer.value) return; panelLoading.value = true
  try {
    const nb = !selectedPlayer.value.is_banned
    const { error } = await supabase.rpc('admin_ban_user', {
      p_key: adminKey.value, p_user_id: selectedPlayer.value.id, p_ban: nb
    })
    if (error) throw error; selectedPlayer.value.is_banned = nb
    const idx = users.value.findIndex(x => x.id === selectedPlayer.value.id)
    if (idx !== -1) users.value[idx].is_banned = nb
    panelActionOk.value = true; panelActionMsg.value = nb ? 'User banned' : 'User unbanned'
    showToast(panelActionMsg.value, 'success')
    writeAudit(nb ? 'BAN_USER' : 'UNBAN_USER', selectedPlayer.value.username, '')
  } catch (e) { panelActionOk.value = false; panelActionMsg.value = e.message; showToast(e.message, 'error') }
  finally { panelLoading.value = false }
}
export const doResetPassword = async () => {
  if (!newPassword.value || !selectedPlayer.value) return; panelLoading.value = true
  try {
    const res = await fetch(`${SUPA_URL}/auth/v1/admin/users/${selectedPlayer.value.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY, 'Authorization': `Bearer ${adminKey.value}` },
      body: JSON.stringify({ password: newPassword.value })
    })
    const d = await res.json()
    if (d.error || d.msg) throw new Error(d.error || d.msg)
    panelActionOk.value = true; panelActionMsg.value = 'Password updated'
    showToast('Password reset', 'success'); newPassword.value = ''
    writeAudit('RESET_PASSWORD', selectedPlayer.value.username, '')
  } catch (e) {
    panelActionOk.value = false; panelActionMsg.value = 'Reset requires service role key'
    showToast('Need service role for reset', 'error')
  } finally { panelLoading.value = false }
}

// ── Drawer ────────────────────────────────────────────────────────────────────
export const saveDrawerSettings = async () => {
  drawerSaving.value = true; drawerMsg.value = ''
  try {
    const merged = { ...sett.value, ...drawerSettings.value }
    const { error } = await supabase.rpc('admin_save_settings', { p_key: adminKey.value, p_settings: merged })
    if (error) throw error; drawerOk.value = true; drawerMsg.value = 'Saved'; showToast('Saved', 'success')
    Object.assign(sett.value, drawerSettings.value)
  } catch (e) { drawerOk.value = false; drawerMsg.value = e.message }
  finally { drawerSaving.value = false; setTimeout(() => { drawerMsg.value = '' }, 3000) }
}

// ── Games ─────────────────────────────────────────────────────────────────────
export const fetchGames = async () => {
  gamesLoading.value = true
  try {
    const { data } = await supabase.rpc('admin_list_games', { p_key: adminKey.value }); games.value = data || []
    gameActiveRate.value = Math.round(games.value.filter(g => g.is_active).length / (games.value.length || 1) * 100)
  } catch (e) {} finally { gamesLoading.value = false }
}
export const doToggleGame = async (g) => {
  const ns = !g.is_active
  try {
    const { error } = await supabase.rpc('admin_toggle_game', { p_key: adminKey.value, p_game_id: g.id, p_active: ns })
    if (error) throw error
    const idx = games.value.findIndex(x => x.id === g.id); if (idx !== -1) games.value[idx].is_active = ns
    gameActiveRate.value = Math.round(games.value.filter(x => x.is_active).length / (games.value.length || 1) * 100)
  } catch (e) { showToast(e.message, 'error') }
}

// ── Messages ──────────────────────────────────────────────────────────────────
export const fetchMsgs = async () => {
  msgsLoading.value = true
  try { const { data } = await supabase.rpc('admin_list_messages', { p_key: adminKey.value }); msgs.value = data || [] }
  catch (e) {} finally { msgsLoading.value = false }
}
export const sendMsg = async () => {
  if (!newMsg.value.title.trim() || !newMsg.value.body.trim()) { showToast('Title+body required', 'error'); return }
  msgSending.value = true; msgResult.value = ''
  try {
    const { error } = await supabase.rpc('admin_send_message', {
      p_key: adminKey.value, p_title: newMsg.value.title.trim(), p_body: newMsg.value.body.trim()
    })
    if (error) throw error; msgOk.value = true; msgResult.value = 'Sent to all users'
    newMsg.value = { title: '', body: '' }; showToast('Message sent', 'success'); fetchMsgs()
  } catch (e) { msgOk.value = false; msgResult.value = e.message }
  finally { msgSending.value = false; setTimeout(() => { msgResult.value = '' }, 4000) }
}
export const deleteMsg = async (id) => {
  try {
    const { error } = await supabase.rpc('admin_delete_message', { p_key: adminKey.value, p_id: id })
    if (error) throw error
    msgs.value = msgs.value.filter(m => m.id !== id); showToast('Deleted', 'success')
  } catch (e) { showToast(e.message, 'error') }
}

// ── Promos ────────────────────────────────────────────────────────────────────
export const fetchPromos = async () => {
  promosLoading.value = true
  try { const { data } = await supabase.rpc('admin_list_promos', { p_key: adminKey.value }); promos.value = data || [] }
  catch (e) {} finally { promosLoading.value = false }
}
export const createPromo = async () => {
  if (!newPromo.value.code) return
  promoSaving.value = true; promoMsg.value = ''
  try {
    const { error } = await supabase.rpc('admin_create_promo', {
      p_key: adminKey.value,
      p_code: newPromo.value.code.toUpperCase(),
      p_bonus: newPromo.value.bonus_amount,
      p_max_uses: newPromo.value.max_uses,
      p_expiry: newPromo.value.expiry_date || null
    })
    if (error) throw error
    promoOk.value = true; promoMsg.value = 'Code created!'
    const created = newPromo.value.code.toUpperCase()
    newPromo.value = { code: '', bonus_amount: 5000, max_uses: 100, expiry_date: '' }
    await fetchPromos(); showToast('Promo created', 'success')
    writeAudit('CREATE_PROMO', created, '')
  } catch (e) { promoOk.value = false; promoMsg.value = e.message }
  finally { promoSaving.value = false; setTimeout(() => { promoMsg.value = '' }, 3000) }
}
export const deletePromo = async (id) => {
  try {
    const { error } = await supabase.rpc('admin_delete_promo', { p_key: adminKey.value, p_id: id })
    if (error) throw error
    promos.value = promos.value.filter(p => p.id !== id); showToast('Deleted', 'success')
    writeAudit('DELETE_PROMO', id, '')
  } catch (e) { showToast(e.message, 'error') }
}
export const togglePromo = async (p) => {
  try {
    const { error } = await supabase.rpc('admin_toggle_promo', { p_key: adminKey.value, p_id: p.id, p_active: !p.is_active })
    if (error) throw error
    const idx = promos.value.findIndex(x => x.id === p.id)
    if (idx !== -1) promos.value[idx].is_active = !p.is_active
  } catch (e) { showToast(e.message, 'error') }
}

// ── IP Blacklist ──────────────────────────────────────────────────────────────
export const fetchIpList = async () => {
  ipLoading.value = true
  try { const { data } = await supabase.rpc('admin_list_ip_blacklist', { p_key: adminKey.value }); ipList.value = data || [] }
  catch (e) {} finally { ipLoading.value = false }
}
export const addIp = async () => {
  if (!newIp.value.ip_address) return
  const ip = newIp.value.ip_address; const reason = newIp.value.reason
  try {
    const { error } = await supabase.rpc('admin_add_ip_blacklist', { p_key: adminKey.value, p_ip: ip, p_reason: reason })
    if (error) throw error
    newIp.value = { ip_address: '', reason: '' }; await fetchIpList(); showToast('IP blocked', 'success')
    writeAudit('BLOCK_IP', ip, reason)
  } catch (e) { showToast(e.message, 'error') }
}
export const removeIp = async (id) => {
  try {
    const { error } = await supabase.rpc('admin_remove_ip_blacklist', { p_key: adminKey.value, p_id: id })
    if (error) throw error
    ipList.value = ipList.value.filter(i => i.id !== id); showToast('Unblocked', 'success')
    writeAudit('UNBLOCK_IP', id, '')
  } catch (e) { showToast(e.message, 'error') }
}

// ── Audit Log ─────────────────────────────────────────────────────────────────
export const fetchAuditLog = async () => {
  auditLoading.value = true
  try { const { data } = await supabase.rpc('admin_list_audit_log', { p_key: adminKey.value }); auditLog.value = data || [] }
  catch (e) {} finally { auditLoading.value = false }
}
export const writeAudit = async (action, target, details) => {
  try { await supabase.rpc('admin_write_audit', { p_action: action, p_target: target || '', p_details: details || '' }) }
  catch (e) {}
}

// ── Agents ────────────────────────────────────────────────────────────────────
export const fetchAgents = async () => {
  agentsLoading.value = true
  try {
    const { data } = await supabase.rpc('admin_list_users', { p_key: adminKey.value })
    const all = data || []
    agents.value = all.filter(u => (u.direct_count || 0) > 0 || u.agent_level)
    agentStats.value = {
      total_agents:       agents.value.length,
      pending_commission: agents.value.filter(a => (a.available_commission || 0) > 0).length,
      total_paid:         agents.value.reduce((s, a) => s + (Number(a.total_commission_paid) || 0), 0),
      total_commission:   agents.value.reduce((s, a) => s + (Number(a.available_commission)  || 0), 0)
    }
  } catch (e) {} finally { agentsLoading.value = false }
}
export const fetchCommTx = async () => {
  commTxLoading.value = true
  try {
    const { data, error } = await supabase.rpc('admin_list_transactions', {
      p_key: adminKey.value, p_type: 'withdraw', p_status: 'pending', p_limit: 50, p_offset: 0
    })
    if (error) throw error
    commTxList.value = data || []
  } catch (e) {} finally { commTxLoading.value = false }
}

// ── Reports ───────────────────────────────────────────────────────────────────
export const loadReport = async () => {
  reportLoading.value = true
  try {
    const from = reportFrom.value + 'T00:00:00Z'
    const to   = reportTo.value   + 'T23:59:59Z'
    const { data: txs } = await supabase.from('transactions')
      .select('id,type,amount,method,status,user_id,created_at')
      .gte('created_at', from).lte('created_at', to)
      .order('created_at', { ascending: false })
    const txList_ = txs || []
    const { data: uData } = await supabase.from('profiles').select('id,username')
    const uMap = {}; (uData || []).forEach(u => uMap[u.id] = u.username)
    const enriched = txList_.map(t => ({ ...t, username: uMap[t.user_id] || null }))
    const confirmed = enriched.filter(t => t.status === 'confirmed')
    const totalDeposit  = confirmed.filter(t => t.type === 'deposit').reduce((s, t) => s + Number(t.amount || 0), 0)
    const totalWithdraw = confirmed.filter(t => t.type !== 'deposit').reduce((s, t) => s + Number(t.amount || 0), 0)
    const methodMap = {}
    confirmed.forEach(t => {
      const m = t.method || 'Unknown'
      if (!methodMap[m]) methodMap[m] = { method: m, depCount: 0, depTotal: 0, wdCount: 0, wdTotal: 0 }
      if (t.type === 'deposit') { methodMap[m].depCount++; methodMap[m].depTotal += Number(t.amount || 0) }
      else { methodMap[m].wdCount++; methodMap[m].wdTotal += Number(t.amount || 0) }
    })
    const { count: newUsers } = await supabase.from('profiles')
      .select('*', { count: 'exact', head: true }).gte('created_at', from).lte('created_at', to)
    reportData.value = {
      ready: true, totalDeposit, totalWithdraw,
      newUsers: newUsers || 0, txList: enriched,
      byMethod: Object.values(methodMap).sort((a, b) => (b.depTotal + b.wdTotal) - (a.depTotal + a.wdTotal))
    }
  } catch (e) { showToast(e.message, 'error') } finally { reportLoading.value = false }
}
export const exportTxCsv = () => {
  const rows = reportData.value.txList
  if (!rows.length) return
  const hdr  = 'ID,Type,User,Method,Amount,Status,Date'
  const body = rows.map(t => [
    t.id, t.type, t.username || t.user_id?.slice(0, 8) || '', t.method, t.amount, t.status,
    new Date(t.created_at).toLocaleString()
  ].join(','))
  const csv = [hdr, ...body].join('\n')
  const a = document.createElement('a')
  a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv' }))
  a.download = `iw99-report-${reportFrom.value}-${reportTo.value}.csv`
  a.click(); URL.revokeObjectURL(a.href)
}

// ── Export ────────────────────────────────────────────────────────────────────
export function useAdmin() {
  return {
    adminKey, loggedIn, loginLoading, loginErr, activeTab,
    stats, chartLoading, chartData, recentLoading, recentTx, gameActiveRate,
    txFilter, txList, txLoading, txErr,
    sett, settLoading, settSaving, settMsg, settOk,
    users, usersLoading, userQ, userRiskFilter, filteredUsers,
    leftDrawer, drawerSettings, drawerSaving, drawerMsg, drawerOk,
    playerPanel, selectedPlayer, playerTxList, playerTxLoading,
    playerSessions, playerSessLoading, panelLoading, panelMsg,
    panelActionMsg, panelActionOk, adjAmt, newPassword, genPassword,
    playerTotalWd, playerWinWdCount, playerWinAmt,
    playerDepositMethods, playerWithdrawMethods,
    playerDepositCount, playerWithdrawCount, playerPendingCount,
    playerAvgDeposit, playerFirstDeposit, playerLastDeposit,
    playerTurnover, playerRiskScore,
    games, gamesLoading, gameQ, gameCat, gameCats, filteredGames,
    msgs, msgsLoading, newMsg, msgSending, msgResult, msgOk,
    promos, promosLoading, newPromo, promoSaving, promoMsg, promoOk,
    ipList, ipLoading, newIp,
    auditLog, auditLoading,
    agents, agentsLoading, agentQ, agentFilter, agentStats, filteredAgents,
    commTxList, commTxLoading,
    reportFrom, reportTo, reportData, reportLoading,
    toast,
    netFlow, netPct, gaugeArc, healthBars, metricCards,
    fmtNum, fmtDate, showToast, copyTxt,
    login, logout,
    loadOverview, loadStats, loadRecentTx, loadChart, fetchPendingCount,
    fetchTx, doApprove,
    fetchSett, saveSett,
    fetchUsers, openPlayer, loadPlayerTx, loadPlayerSessions,
    doAdjustBalance, doAddBalance, doDeductBalance, doToggleBan, doResetPassword,
    saveDrawerSettings,
    fetchGames, doToggleGame,
    fetchMsgs, sendMsg, deleteMsg,
    fetchPromos, createPromo, deletePromo, togglePromo,
    fetchIpList, addIp, removeIp,
    fetchAuditLog, writeAudit,
    fetchAgents, fetchCommTx,
    loadReport, exportTxCsv, exportReportXlsx,
    ggrData, ggrLoading, ggrFrom, ggrTo, loadGGR,
    notifPermission, notifSub, lastPendingCount,
    syncEnabled, syncConnected, newPendingCount,
    telegramTesting, telegramMsg, telegramOk,
    requestNotifPermission, playNotifSound, showBrowserNotif,
    setupRealtimeNotifications, teardownRealtimeNotifications,
    tryAutoLogin,
    testTelegram, sendTelegramDailySummary,
    exportXlsx, computeRiskScore, fetchUsersWithRisk,
    SUPA_URL,
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// ── GGR State ─────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
export const ggrData    = ref({ ready: false, totalBet: 0, totalWin: 0, ggr: 0, ggrPct: 0, byGame: [], byDate: [] })
export const ggrLoading = ref(false)
export const ggrFrom    = ref(new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0])
export const ggrTo      = ref(new Date().toISOString().split('T')[0])

// ── Notification / Realtime State ─────────────────────────────────────────────
export const notifPermission  = ref('default')
export const notifSub         = ref(null)
export const lastPendingCount = ref(0)
export const syncEnabled      = ref(true)
export const syncConnected    = ref(false)
export const newPendingCount  = ref(0)

// ── Telegram State ────────────────────────────────────────────────────────────
export const telegramTesting = ref(false)
export const telegramMsg     = ref('')
export const telegramOk      = ref(false)

// ── GGR Load ──────────────────────────────────────────────────────────────────
export const loadGGR = async () => {
  ggrLoading.value = true
  try {
    const from = ggrFrom.value + 'T00:00:00Z'
    const to   = ggrTo.value   + 'T23:59:59Z'
    const { data: bets } = await supabase
      .from('game_bets')
      .select('game_name, provider, bet_amount, win_amount, ggr, created_at')
      .gte('created_at', from).lte('created_at', to)

    const rows = bets || []
    const totalBet = rows.reduce((s, r) => s + Number(r.bet_amount || 0), 0)
    const totalWin = rows.reduce((s, r) => s + Number(r.win_amount || 0), 0)
    const ggr = totalBet - totalWin
    const ggrPct = totalBet ? Math.round(ggr / totalBet * 100) : 0

    // Group by game
    const gameMap = {}
    rows.forEach(r => {
      const key = r.game_name || r.provider || 'Unknown'
      if (!gameMap[key]) gameMap[key] = { name: key, provider: r.provider, bet: 0, win: 0, ggr: 0, rounds: 0 }
      gameMap[key].bet     += Number(r.bet_amount || 0)
      gameMap[key].win     += Number(r.win_amount || 0)
      gameMap[key].ggr     += Number(r.ggr || 0)
      gameMap[key].rounds  += 1
    })
    const byGame = Object.values(gameMap).sort((a, b) => b.ggr - a.ggr)

    // Group by date
    const dateMap = {}
    rows.forEach(r => {
      const d = r.created_at?.split('T')[0] || ''
      if (!dateMap[d]) dateMap[d] = { date: d, bet: 0, win: 0, ggr: 0 }
      dateMap[d].bet  += Number(r.bet_amount || 0)
      dateMap[d].win  += Number(r.win_amount || 0)
      dateMap[d].ggr  += Number(r.ggr || 0)
    })
    const byDate = Object.values(dateMap).sort((a, b) => a.date.localeCompare(b.date))

    ggrData.value = { ready: true, totalBet, totalWin, ggr, ggrPct, byGame, byDate }
  } catch (e) { showToast(e.message, 'error') }
  finally { ggrLoading.value = false }
}

// ── Real-time Notifications (Browser + Sound) ─────────────────────────────────
export const requestNotifPermission = async () => {
  if (!('Notification' in window)) return
  const perm = await Notification.requestPermission()
  notifPermission.value = perm
}

export const playNotifSound = () => {
  try {
    const ctx  = new (window.AudioContext || window.webkitAudioContext)()
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.type = 'sine'; osc.frequency.value = 880
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.4, ctx.currentTime + 0.05)
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4)
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.5)
    setTimeout(() => {
      const o2 = ctx.createOscillator(); const g2 = ctx.createGain()
      o2.connect(g2); g2.connect(ctx.destination)
      o2.type = 'sine'; o2.frequency.value = 1100
      g2.gain.setValueAtTime(0, ctx.currentTime)
      g2.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05)
      g2.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.35)
      o2.start(ctx.currentTime); o2.stop(ctx.currentTime + 0.5)
    }, 200)
  } catch (e) {}
}

export const showBrowserNotif = (title, body) => {
  if (Notification.permission !== 'granted') return
  try {
    const n = new Notification(title, { body, icon: '/favicon.ico', badge: '/favicon.ico' })
    setTimeout(() => n.close(), 5000)
  } catch (e) {}
}

export const setupRealtimeNotifications = () => {
  if (notifSub.value) return
  syncConnected.value = false
  notifSub.value = supabase.channel('admin-notif-channel')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'transactions' }, (payload) => {
      const tx = payload.new
      if (tx.status === 'pending') {
        stats.value.pending_tx = (stats.value.pending_tx || 0) + 1
        newPendingCount.value = (newPendingCount.value || 0) + 1
        playNotifSound()
        const type = tx.type === 'deposit' ? '💰 New Deposit' : '💸 New Withdrawal'
        const amt  = Number(tx.amount || 0).toLocaleString()
        showBrowserNotif(`iW99 Admin — ${type}`, `${amt} Ks • ${tx.method || ''}`)
        showToast(`🔔 ${type}: ${amt} Ks`, 'info')
      }
    })
    .subscribe((status) => {
      syncConnected.value = (status === 'SUBSCRIBED')
    })
}

export const teardownRealtimeNotifications = () => {
  if (notifSub.value) {
    supabase.removeChannel(notifSub.value)
    notifSub.value = null
  }
  syncConnected.value = false
}

// ── Telegram Alert ─────────────────────────────────────────────────────────────
export const testTelegram = async () => {
  telegramTesting.value = true; telegramMsg.value = ''
  try {
    const now = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Yangon' })
    const msg = `🔔 <b>iW99 Admin Alert Test</b>\n\n✅ Telegram notifications are working!\n\n📊 Current Stats:\n💰 Deposits: ${fmtNum(stats.value.total_deposits)} Ks\n💸 Withdrawals: ${fmtNum(stats.value.total_withdrawals)} Ks\n⏳ Pending: ${stats.value.pending_tx}\n\n🕐 ${now} (MMT)`
    const res = await fetch(`${SUPA_URL}/functions/v1/send_telegram_alert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`, 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY, 'x-admin-key': adminKey.value },
      body: JSON.stringify({ p_key: adminKey.value, message: msg, bot_token: sett.value.telegram_bot_token, chat_id: sett.value.telegram_chat_id })
    })
    const d = await res.json()
    if (d.error) throw new Error(d.error)
    telegramOk.value = true; telegramMsg.value = '✓ Test message sent!'
    showToast('Telegram test sent!', 'success')
  } catch (e) {
    telegramOk.value = false; telegramMsg.value = e.message
    showToast(e.message, 'error')
  } finally {
    telegramTesting.value = false
    setTimeout(() => { telegramMsg.value = '' }, 4000)
  }
}

export const sendTelegramDailySummary = async () => {
  try {
    const now  = new Date().toLocaleString('en-GB', { timeZone: 'Asia/Yangon' })
    const dep  = fmtNum(stats.value.total_deposits)
    const wd   = fmtNum(stats.value.total_withdrawals)
    const net  = fmtNum(netFlow.value)
    const msg  = `📊 <b>iW99 Daily Summary</b>\n\n💰 Total Deposits: <b>${dep} Ks</b>\n💸 Total Withdrawals: <b>${wd} Ks</b>\n📈 Net Flow: <b>${net} Ks</b>\n👥 Active Users: <b>${stats.value.active_users}</b>\n⏳ Pending TX: <b>${stats.value.pending_tx}</b>\n\n🕐 ${now} (MMT)`
    await fetch(`${SUPA_URL}/functions/v1/send_telegram_alert`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`, 'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY, 'x-admin-key': adminKey.value },
      body: JSON.stringify({ p_key: adminKey.value, message: msg, bot_token: sett.value.telegram_bot_token, chat_id: sett.value.telegram_chat_id })
    })
    showToast('Daily summary sent to Telegram!', 'success')
  } catch (e) { showToast(e.message, 'error') }
}

// ── XLSX Export ───────────────────────────────────────────────────────────────
export const exportXlsx = async (rows, filename) => {
  try {
    // Dynamic import SheetJS from CDN
    const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.20.2/package/xlsx.mjs')
    const ws = XLSX.utils.json_to_sheet(rows)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Report')
    XLSX.writeFile(wb, filename || 'iw99-export.xlsx')
    showToast('XLSX exported!', 'success')
  } catch (e) {
    showToast('XLSX export failed: ' + e.message, 'error')
  }
}

export const exportReportXlsx = () => {
  const rows = reportData.value.txList.map(t => ({
    'ID': t.id,
    'Type': t.type,
    'User': t.username || t.user_id?.slice(0, 8) || '',
    'Method': t.method,
    'Amount (Ks)': t.amount,
    'Status': t.status,
    'Date': new Date(t.created_at).toLocaleString()
  }))
  const from = reportFrom.value, to = reportTo.value
  exportXlsx(rows, `iw99-report-${from}-${to}.xlsx`)
}

// ── Risk Auto-Flag ─────────────────────────────────────────────────────────────
export const computeRiskScore = (u) => {
  const dep = Number(u.total_deposit || 0)
  const wd  = Number(u.balance || 0)
  const ratio = dep > 0 ? wd / dep : 0
  let score = 0
  const flags = []
  if (ratio >= 0.9)   { score += 40; flags.push('high_wd_ratio') }
  if (dep >= 5000000) { score += 20; flags.push('large_deposits') }
  if (u.is_banned)    { score += 30; flags.push('banned') }
  if ((u.vip_level||0) === 0 && dep >= 500000) { score += 10; flags.push('new_high_dep') }
  return { score: Math.min(100, score), flags }
}

// Enhance fetchUsers to auto-compute risk scores
const _origFetchUsers = fetchUsers
export const fetchUsersWithRisk = async () => {
  await fetchUsers()
  users.value = users.value.map(u => {
    const { score, flags } = computeRiskScore(u)
    return { ...u, _riskScore: score, _riskFlags: flags }
  })
}
