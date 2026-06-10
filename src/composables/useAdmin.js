import { ref, computed } from 'vue'
import { supabase } from '@/supabase'

export const SUPA_URL = 'https://vuywhhmwrqykukcemifd.supabase.co'

// ── Singleton state (shared across all components) ──────────────────────────
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
export const filteredUsers = computed(() => {
  const q = userQ.value.toLowerCase()
  return q
    ? users.value.filter(u =>
        (u.username || '').toLowerCase().includes(q) || (u.phone || '').includes(q))
    : users.value
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
  playerTxList.value
    .filter(t => t.type !== 'deposit' && t.status === 'confirmed')
    .reduce((s, t) => s + (Number(t.amount) || 0), 0)
)
export const playerWinWdCount = computed(() =>
  playerTxList.value.filter(t => t.type !== 'deposit' && t.status === 'confirmed').length
)
export const playerWinAmt = computed(() => playerTotalWd.value)

// Payment method breakdowns
export const playerDepositMethods = computed(() => {
  const confirmed = playerTxList.value.filter(t => t.type === 'deposit' && t.status === 'confirmed')
  const map = {}
  confirmed.forEach(t => {
    const m = t.method || 'Unknown'
    if (!map[m]) map[m] = { method: m, count: 0, total: 0 }
    map[m].count++; map[m].total += Number(t.amount) || 0
  })
  return Object.values(map).sort((a, b) => b.total - a.total)
})
export const playerWithdrawMethods = computed(() => {
  const confirmed = playerTxList.value.filter(t => t.type !== 'deposit' && t.status === 'confirmed')
  const map = {}
  confirmed.forEach(t => {
    const m = t.method || 'Unknown'
    if (!map[m]) map[m] = { method: m, count: 0, total: 0 }
    map[m].count++; map[m].total += Number(t.amount) || 0
  })
  return Object.values(map).sort((a, b) => b.total - a.total)
})

// TX stats
export const playerDepositCount = computed(() =>
  playerTxList.value.filter(t => t.type === 'deposit' && t.status === 'confirmed').length
)
export const playerWithdrawCount = computed(() =>
  playerTxList.value.filter(t => t.type !== 'deposit' && t.status === 'confirmed').length
)
export const playerPendingCount = computed(() =>
  playerTxList.value.filter(t => t.status === 'pending').length
)
export const playerAvgDeposit = computed(() => {
  const deps = playerTxList.value.filter(t => t.type === 'deposit' && t.status === 'confirmed')
  if (!deps.length) return 0
  return deps.reduce((s, t) => s + (Number(t.amount) || 0), 0) / deps.length
})
export const playerFirstDeposit = computed(() => {
  const deps = playerTxList.value.filter(t => t.type === 'deposit' && t.status === 'confirmed')
  if (!deps.length) return null
  return deps[deps.length - 1]?.created_at || null
})
export const playerLastDeposit = computed(() => {
  const deps = playerTxList.value.filter(t => t.type === 'deposit' && t.status === 'confirmed')
  if (!deps.length) return null
  return deps[0]?.created_at || null
})
export const playerTurnover = computed(() =>
  playerTxList.value
    .filter(t => t.type === 'deposit' && t.status === 'confirmed')
    .reduce((s, t) => s + (Number(t.amount) || 0), 0)
)
export const playerRiskScore = computed(() => {
  const dep = playerTurnover.value, wd = playerTotalWd.value
  if (!dep) return { label: 'No Data', color: '#94a3b8', pct: 0 }
  const ratio = wd / dep
  if (ratio >= 0.9) return { label: 'High Risk', color: '#dc2626', pct: Math.min(100, Math.round(ratio * 100)) }
  if (ratio >= 0.5) return { label: 'Medium', color: '#d97706', pct: Math.round(ratio * 100) }
  return { label: 'Low Risk', color: '#16a34a', pct: Math.round(ratio * 100) }
})

export const games       = ref([])
export const gamesLoading = ref(false)
export const gameQ       = ref('')
export const gameCat     = ref('')
export const gameCats    = computed(() => [...new Set(games.value.map(g => g.category).filter(Boolean))])
export const filteredGames = computed(() => {
  let l = games.value
  if (gameQ.value) l = l.filter(g => g.name?.toLowerCase().includes(gameQ.value.toLowerCase()))
  if (gameCat.value) l = l.filter(g => g.category === gameCat.value)
  return l
})

export const msgs        = ref([])
export const msgsLoading = ref(false)
export const newMsg      = ref({ title: '', body: '' })
export const msgSending  = ref(false)
export const msgResult   = ref('')
export const msgOk       = ref(false)

export const toast = ref({ show: false, msg: '', type: 'info' })

// ── Helpers ─────────────────────────────────────────────────────────────────
export const fmtNum = (n, dec = 0) => {
  const v = Number(n) || 0
  if (v >= 1000000) return (v / 1000000).toFixed(2) + 'M'
  if (v >= 1000) return new Intl.NumberFormat().format(Math.round(v))
  return v.toFixed(dec)
}
export const fmtDate = d =>
  d ? new Date(d).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'

export const showToast = (msg, type = 'info') => {
  toast.value = { show: true, msg, type }
  setTimeout(() => { toast.value.show = false }, 2600)
}
export const copyTxt = t =>
  navigator.clipboard.writeText(t).then(() => showToast('Copied', 'info')).catch(() => {})

// ── Computed helpers ─────────────────────────────────────────────────────────
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
  { key: 'dep', label: 'Total Deposits',    val: stats.value.total_deposits,    cls: 'a-val-in',      color: '#4f46e5', pct: 100, svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>' },
  { key: 'wd',  label: 'Total Withdrawals', val: stats.value.total_withdrawals, cls: 'a-val-out',     color: '#dc2626', pct: Math.round((stats.value.total_withdrawals||0)/(stats.value.total_deposits||1)*100), svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18"/>' },
  { key: 'usr', label: 'Active Users',      val: stats.value.active_users,      cls: 'a-val-accent',  color: '#0891b2', pct: Math.round((stats.value.active_users||0)/(stats.value.total_users||1)*100), svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197"/>' },
  { key: 'ptx', label: 'Pending TX',        val: stats.value.pending_tx,        cls: 'a-val-warn',    color: '#d97706', pct: Math.min(100,(stats.value.pending_tx||0)/20*100), svg: '<path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>' },
])

// ── API Actions ───────────────────────────────────────────────────────────────
export const login = async () => {
  if (!adminKey.value) { loginErr.value = 'Enter password'; return }
  loginLoading.value = true; loginErr.value = ''
  try {
    const { data, error } = await supabase.rpc('validate_admin', { p_key: adminKey.value })
    if (error) throw error
    if (data) { loggedIn.value = true; await loadOverview() }
    else loginErr.value = 'Invalid credentials'
  } catch (e) { loginErr.value = e.message }
  finally { loginLoading.value = false }
}
export const logout = () => {
  loggedIn.value = false; adminKey.value = ''; activeTab.value = 0
  leftDrawer.value = false; playerPanel.value = false
}

export const loadOverview  = async () => { await Promise.all([loadStats(), loadRecentTx(), loadChart()]) }
export const loadStats     = async () => {
  try { const { data } = await supabase.rpc('admin_get_stats', { p_key: adminKey.value }); if (data) stats.value = data } catch (e) {}
}
export const loadRecentTx  = async () => {
  recentLoading.value = true
  try {
    const res = await fetch(`${SUPA_URL}/functions/v1/admin_get_transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminKey.value}` },
      body: JSON.stringify({ limit: 5, offset: 0 })
    })
    const d = await res.json()
    recentTx.value = Array.isArray(d) ? d.slice(0, 5) : (d.transactions || []).slice(0, 5)
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

export const fetchTx = async () => {
  txLoading.value = true; txErr.value = ''
  try {
    const res = await fetch(`${SUPA_URL}/functions/v1/admin_get_transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminKey.value}` },
      body: JSON.stringify({ status: txFilter.value.status || undefined, type: txFilter.value.type || undefined, limit: 50 })
    })
    const d = await res.json()
    if (d.error) throw new Error(d.error)
    txList.value = Array.isArray(d) ? d : (d.transactions || [])
  } catch (e) { txErr.value = e.message } finally { txLoading.value = false }
}
export const doApprove = async (id, action) => {
  try {
    const res = await fetch(`${SUPA_URL}/functions/v1/admin_approve_reject_v4`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminKey.value}` },
      body: JSON.stringify({ transaction_id: id, action })
    })
    const d = await res.json(); if (d.error) throw new Error(d.error)
    showToast(action === 'approve' ? 'Approved' : 'Rejected', 'success'); fetchTx()
  } catch (e) { showToast(e.message, 'error') }
}

export const fetchSett = async () => {
  settLoading.value = true
  try { const { data } = await supabase.rpc('admin_get_settings', { p_key: adminKey.value }); if (data) sett.value = { ...data } }
  catch (e) {} finally { settLoading.value = false }
}
export const saveSett = async () => {
  settSaving.value = true; settMsg.value = ''
  try {
    const { error } = await supabase.rpc('admin_save_settings', { p_key: adminKey.value, p_settings: sett.value })
    if (error) throw error; settOk.value = true; settMsg.value = 'Saved'; showToast('Settings saved', 'success')
  } catch (e) { settOk.value = false; settMsg.value = e.message }
  finally { settSaving.value = false; setTimeout(() => { settMsg.value = '' }, 3000) }
}

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
    const res = await fetch(`${SUPA_URL}/functions/v1/admin_get_transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminKey.value}` },
      body: JSON.stringify({ user_id: uid, limit: 20 })
    })
    const d = await res.json()
    playerTxList.value = Array.isArray(d) ? d : (d.transactions || [])
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
  } catch (e) {
    panelActionOk.value = false; panelActionMsg.value = 'Reset requires service role key'
    showToast('Need service role for reset', 'error')
  } finally { panelLoading.value = false }
}

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

export function useAdmin() {
  return {
    adminKey, loggedIn, loginLoading, loginErr, activeTab,
    stats, chartLoading, chartData, recentLoading, recentTx, gameActiveRate,
    txFilter, txList, txLoading, txErr,
    sett, settLoading, settSaving, settMsg, settOk,
    users, usersLoading, userQ, filteredUsers,
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
    toast,
    netFlow, netPct, gaugeArc, healthBars, metricCards,
    fmtNum, fmtDate, showToast, copyTxt,
    login, logout,
    loadOverview, loadStats, loadRecentTx, loadChart,
    fetchTx, doApprove,
    fetchSett, saveSett,
    fetchUsers, openPlayer, loadPlayerTx, loadPlayerSessions,
    doAdjustBalance, doAddBalance, doDeductBalance, doToggleBan, doResetPassword,
    saveDrawerSettings,
    fetchGames, doToggleGame,
    fetchMsgs, sendMsg, deleteMsg,
  }
}
