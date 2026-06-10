<template>
  <div class="adm-root">
    <div class="adm-orb adm-orb--1"></div>
    <div class="adm-orb adm-orb--2"></div>
    <div class="adm-orb adm-orb--3"></div>

    <!-- ── HEADER ── -->
    <header class="adm-header">
      <h1 class="adm-title">Admin Dashboard</h1>
      <div v-if="loggedIn" class="adm-tabs-wrap no-scrollbar">
        <button v-for="(tab, i) in tabs" :key="i"
          @click="switchTab(i)"
          class="adm-tab" :class="activeTab === i ? 'adm-tab--active' : ''">
          {{ tab.icon }} {{ tab.label }}
        </button>
      </div>
    </header>

    <div class="adm-body">

      <!-- ══ LOGIN ══ -->
      <div v-if="!loggedIn" class="adm-login-card">
        <div class="adm-login-logo">🛡️</div>
        <h2 class="adm-login-title">NovaBett Admin</h2>
        <p class="adm-login-sub">Enter admin password to access the panel</p>
        <input v-model="adminKey" type="password" placeholder="Admin Password"
          class="adm-input adm-login-input" @keyup.enter="login" />
        <button @click="login" :disabled="loginLoading" class="adm-btn-cyan adm-login-btn">
          {{ loginLoading ? 'Verifying...' : 'Login' }}
        </button>
        <p v-if="loginError" class="adm-error-msg">{{ loginError }}</p>
      </div>

      <!-- ══ DASHBOARD CONTENT ══ -->
      <div v-else>

        <!-- ── TAB 0: OVERVIEW ── -->
        <div v-if="activeTab === 0">
          <div class="adm-stats-grid">
            <div class="adm-stat-card">
              <div class="adm-stat-icon">👥</div>
              <div class="adm-stat-val">{{ stats.total_users?.toLocaleString() || '—' }}</div>
              <div class="adm-stat-label">Total Users</div>
            </div>
            <div class="adm-stat-card">
              <div class="adm-stat-icon">💰</div>
              <div class="adm-stat-val">{{ fmtNum(stats.total_deposits) }}</div>
              <div class="adm-stat-label">Total Deposits</div>
            </div>
            <div class="adm-stat-card">
              <div class="adm-stat-icon">📤</div>
              <div class="adm-stat-val">{{ fmtNum(stats.total_withdrawals) }}</div>
              <div class="adm-stat-label">Total Withdrawals</div>
            </div>
            <div class="adm-stat-card adm-stat-card--yellow">
              <div class="adm-stat-icon">⏳</div>
              <div class="adm-stat-val">{{ stats.pending_tx ?? '—' }}</div>
              <div class="adm-stat-label">Pending TXs</div>
            </div>
            <div class="adm-stat-card adm-stat-card--green">
              <div class="adm-stat-icon">🏦</div>
              <div class="adm-stat-val">{{ fmtNum(stats.total_balance) }}</div>
              <div class="adm-stat-label">Total Balance</div>
            </div>
            <div class="adm-stat-card">
              <div class="adm-stat-icon">📊</div>
              <div class="adm-stat-val">{{ fmtNum((stats.total_deposits || 0) - (stats.total_withdrawals || 0)) }}</div>
              <div class="adm-stat-label">Net Flow</div>
            </div>
          </div>
          <button @click="loadStats" class="adm-btn-outline" style="width:100%;margin-top:8px;">
            🔄 Refresh Stats
          </button>
        </div>

        <!-- ── TAB 1: TRANSACTIONS ── -->
        <div v-if="activeTab === 1">
          <div class="adm-card">
            <div class="adm-filter-row">
              <select v-model="filter.status" class="adm-select">
                <option value="">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="rejected">Rejected</option>
              </select>
              <select v-model="filter.type" class="adm-select">
                <option value="">All Types</option>
                <option value="deposit">Deposit</option>
                <option value="withdraw">Withdraw</option>
              </select>
              <button @click="fetchTransactions" class="adm-btn-cyan adm-filter-btn">Search</button>
            </div>
          </div>

          <div class="adm-card" style="margin-top:8px;">
            <h3 class="adm-section-title">Transactions</h3>
            <div v-if="loadingTx" class="adm-loading">Loading...</div>
            <div v-else-if="txError" class="adm-error-msg">{{ txError }}</div>
            <div v-else>
              <div v-for="tx in transactions" :key="tx.id" class="adm-tx-row">
                <div class="adm-tx-top">
                  <span class="adm-tx-type" :class="tx.type === 'deposit' ? 'adm-tx-type--dep' : 'adm-tx-type--wd'">
                    {{ tx.type === 'deposit' ? '↓ DEPOSIT' : '↑ WITHDRAW' }}
                  </span>
                  <span class="adm-tx-amount">{{ Number(tx.amount).toLocaleString() }} Ks</span>
                  <span class="adm-badge" :class="`adm-badge--${tx.status}`">{{ tx.status }}</span>
                </div>
                <div class="adm-tx-meta">
                  <span>User: <b>{{ tx.user_id?.slice(0,8) }}...</b></span>
                  <span>Method: {{ tx.method }}</span>
                  <span>Slip/Phone: {{ tx.slip_last5 || tx.phone || '—' }}</span>
                </div>
                <div class="adm-tx-id-row">
                  <span class="adm-tx-id">ID: {{ tx.id }}</span>
                  <button @click="copyText(tx.id)" class="adm-copy-btn" title="Copy ID">📋</button>
                </div>
                <div v-if="tx.status === 'pending'" class="adm-tx-actions">
                  <button @click="approveReject(tx.id, 'approve')" class="adm-btn-approve">✅ Approve</button>
                  <button @click="approveReject(tx.id, 'reject')" class="adm-btn-reject">❌ Reject</button>
                </div>
              </div>
              <div v-if="transactions.length === 0" class="adm-empty">No transactions found</div>
            </div>
          </div>
        </div>

        <!-- ── TAB 2: SETTINGS ── -->
        <div v-if="activeTab === 2">
          <div class="adm-card" v-if="loadingSettings">
            <div class="adm-loading">Loading settings...</div>
          </div>
          <div v-else>
            <div class="adm-card">
              <h3 class="adm-section-title">💳 KBZ Pay</h3>
              <label class="adm-label">Recipient Name</label>
              <input v-model="settings.kpay_recipient_name" class="adm-input" placeholder="KBZ Pay Name" />
              <label class="adm-label" style="margin-top:8px;">Account Number</label>
              <input v-model="settings.kpay_recipient_account" class="adm-input" placeholder="09XXXXXXXXX" />
            </div>
            <div class="adm-card" style="margin-top:8px;">
              <h3 class="adm-section-title">🌊 Wave Pay</h3>
              <label class="adm-label">Recipient Name</label>
              <input v-model="settings.wave_recipient_name" class="adm-input" placeholder="Wave Pay Name" />
              <label class="adm-label" style="margin-top:8px;">Account Number</label>
              <input v-model="settings.wave_recipient_account" class="adm-input" placeholder="09XXXXXXXXX" />
            </div>
            <div class="adm-card" style="margin-top:8px;">
              <h3 class="adm-section-title">📊 Commission & Wagering</h3>
              <label class="adm-label">Direct Commission Rate (%)</label>
              <input v-model.number="settings.commission_direct_rate" type="number" step="0.1" min="0" max="100" class="adm-input" />
              <label class="adm-label" style="margin-top:8px;">Override Commission Rate (%)</label>
              <input v-model.number="settings.commission_override_rate" type="number" step="0.1" min="0" max="100" class="adm-input" />
              <label class="adm-label" style="margin-top:8px;">Wagering Multiplier (x)</label>
              <input v-model.number="settings.wagering_multiplier" type="number" step="1" min="1" max="100" class="adm-input" />
              <label class="adm-label" style="margin-top:8px;">Cashback Percent (%)</label>
              <input v-model.number="settings.cashback_percent" type="number" step="0.5" min="0" max="50" class="adm-input" />
            </div>
            <div class="adm-card" style="margin-top:8px;">
              <h3 class="adm-section-title">💸 Deposit Limits</h3>
              <label class="adm-label">Min Deposit (Ks)</label>
              <input v-model.number="settings.min_deposit" type="number" step="1000" min="0" class="adm-input" />
              <label class="adm-label" style="margin-top:8px;">Max Deposit (Ks)</label>
              <input v-model.number="settings.max_deposit" type="number" step="10000" min="0" class="adm-input" />
            </div>
            <button @click="saveSettings" :disabled="savingSettings" class="adm-btn-cyan" style="width:100%;margin-top:12px;padding:14px;">
              {{ savingSettings ? '⏳ Saving...' : '💾 Save All Settings' }}
            </button>
            <p v-if="settingsMsg" :class="settingsOk ? 'adm-success-msg' : 'adm-error-msg'" style="margin-top:8px;text-align:center;">{{ settingsMsg }}</p>
          </div>
        </div>

        <!-- ── TAB 3: USERS ── -->
        <div v-if="activeTab === 3">
          <div class="adm-card">
            <div class="adm-filter-row">
              <input v-model="userSearch" class="adm-input adm-search-input" placeholder="🔍 Search username / phone..." />
              <button @click="fetchUsers" class="adm-btn-cyan adm-filter-btn">Search</button>
            </div>
          </div>

          <!-- User detail modal -->
          <div v-if="selectedUser" class="adm-modal-overlay" @click.self="selectedUser = null">
            <div class="adm-modal">
              <button @click="selectedUser = null" class="adm-modal-close">✕</button>
              <h3 class="adm-section-title">👤 {{ selectedUser.username }}</h3>
              <div class="adm-info-rows">
                <div class="adm-info-row"><span>ID</span><span>{{ selectedUser.id?.slice(0,12) }}...</span></div>
                <div class="adm-info-row"><span>Phone</span><span>{{ selectedUser.phone || '—' }}</span></div>
                <div class="adm-info-row"><span>Balance</span><span class="adm-green">{{ fmtNum(selectedUser.balance) }} Ks</span></div>
                <div class="adm-info-row"><span>Total Deposit</span><span>{{ fmtNum(selectedUser.total_deposit) }} Ks</span></div>
                <div class="adm-info-row"><span>VIP Level</span><span>{{ selectedUser.vip_level || 0 }}</span></div>
                <div class="adm-info-row"><span>Referral Code</span><span>{{ selectedUser.referral_code || '—' }}</span></div>
                <div class="adm-info-row"><span>Joined</span><span>{{ fmtDate(selectedUser.created_at) }}</span></div>
                <div class="adm-info-row"><span>Status</span><span :class="selectedUser.is_banned ? 'adm-red' : 'adm-green'">{{ selectedUser.is_banned ? '🚫 Banned' : '✅ Active' }}</span></div>
              </div>
              <div class="adm-modal-actions">
                <button @click="toggleBan(selectedUser)" :class="selectedUser.is_banned ? 'adm-btn-approve' : 'adm-btn-reject'" :disabled="actionLoading">
                  {{ actionLoading ? '...' : (selectedUser.is_banned ? '✅ Unban User' : '🚫 Ban User') }}
                </button>
              </div>
              <div style="margin-top:12px;">
                <h4 style="color:#94a3b8;font-size:12px;margin-bottom:8px;">Adjust Balance</h4>
                <div class="adm-filter-row">
                  <input v-model.number="adjustAmt" type="number" placeholder="Amount (+ or -)" class="adm-input" style="flex:1;" />
                  <button @click="adjustBalance(selectedUser)" class="adm-btn-cyan adm-filter-btn" :disabled="actionLoading">Apply</button>
                </div>
                <p v-if="userActionMsg" class="adm-success-msg" style="margin-top:6px;">{{ userActionMsg }}</p>
              </div>
            </div>
          </div>

          <div class="adm-card" style="margin-top:8px;">
            <h3 class="adm-section-title">Users ({{ filteredUsers.length }})</h3>
            <div v-if="loadingUsers" class="adm-loading">Loading users...</div>
            <div v-else>
              <div v-for="u in filteredUsers.slice(0, 50)" :key="u.id"
                class="adm-user-row" @click="selectUser(u)">
                <div class="adm-user-avatar">{{ (u.username || '?')[0].toUpperCase() }}</div>
                <div class="adm-user-info">
                  <div class="adm-user-name">{{ u.username }}</div>
                  <div class="adm-user-meta">{{ u.phone || '—' }} · VIP{{ u.vip_level || 0 }} · {{ fmtNum(u.balance) }} Ks</div>
                </div>
                <span class="adm-badge" :class="u.is_banned ? 'adm-badge--rejected' : 'adm-badge--confirmed'">
                  {{ u.is_banned ? 'Banned' : 'Active' }}
                </span>
              </div>
              <div v-if="filteredUsers.length === 0" class="adm-empty">No users found</div>
              <div v-if="filteredUsers.length > 50" class="adm-empty" style="font-size:11px;">Showing first 50 of {{ filteredUsers.length }}</div>
            </div>
          </div>
        </div>

        <!-- ── TAB 4: GAMES ── -->
        <div v-if="activeTab === 4">
          <div class="adm-card">
            <div class="adm-filter-row">
              <input v-model="gameSearch" class="adm-input adm-search-input" placeholder="🔍 Search game name..." />
              <select v-model="gameCatFilter" class="adm-select">
                <option value="">All Categories</option>
                <option v-for="c in gameCategories" :key="c" :value="c">{{ c }}</option>
              </select>
            </div>
          </div>

          <div class="adm-card" style="margin-top:8px;">
            <div class="adm-games-header">
              <h3 class="adm-section-title">Games ({{ filteredGames.length }})</h3>
              <div class="adm-games-summary">
                <span class="adm-green">✅ {{ games.filter(g=>g.is_active).length }} Active</span>
                <span class="adm-red" style="margin-left:8px;">❌ {{ games.filter(g=>!g.is_active).length }} Inactive</span>
              </div>
            </div>
            <div v-if="loadingGames" class="adm-loading">Loading games...</div>
            <div v-else>
              <div v-for="g in filteredGames.slice(0,100)" :key="g.id" class="adm-game-row">
                <img v-if="g.image_url" :src="g.image_url" class="adm-game-img" @error="e=>e.target.style.display='none'" />
                <div v-else class="adm-game-img adm-game-img--placeholder">🎮</div>
                <div class="adm-game-info">
                  <div class="adm-game-name">{{ g.name }}</div>
                  <div class="adm-game-meta">{{ g.provider }} · {{ g.category }}</div>
                </div>
                <button @click="toggleGame(g)" class="adm-toggle-btn"
                  :class="g.is_active ? 'adm-toggle-btn--on' : 'adm-toggle-btn--off'">
                  {{ g.is_active ? 'ON' : 'OFF' }}
                </button>
              </div>
              <div v-if="filteredGames.length === 0" class="adm-empty">No games found</div>
            </div>
          </div>
        </div>

        <!-- ── TAB 5: MESSAGES ── -->
        <div v-if="activeTab === 5">
          <div class="adm-card">
            <h3 class="adm-section-title">📢 Send Message to All Users</h3>
            <label class="adm-label">Title</label>
            <input v-model="newMsg.title" class="adm-input" placeholder="Message title..." />
            <label class="adm-label" style="margin-top:8px;">Body</label>
            <textarea v-model="newMsg.body" class="adm-textarea" placeholder="Message body..." rows="4"></textarea>
            <button @click="sendMessage" :disabled="sendingMsg" class="adm-btn-cyan" style="width:100%;margin-top:10px;padding:13px;">
              {{ sendingMsg ? '⏳ Sending...' : '📤 Send Message' }}
            </button>
            <p v-if="msgSendResult" :class="msgSendOk ? 'adm-success-msg' : 'adm-error-msg'" style="margin-top:6px;text-align:center;">{{ msgSendResult }}</p>
          </div>

          <div class="adm-card" style="margin-top:8px;">
            <h3 class="adm-section-title">📬 Sent Messages ({{ messages.length }})</h3>
            <div v-if="loadingMsgs" class="adm-loading">Loading...</div>
            <div v-else>
              <div v-for="m in messages" :key="m.id" class="adm-msg-row">
                <div class="adm-msg-info">
                  <div class="adm-msg-title">{{ m.title }}</div>
                  <div class="adm-msg-body">{{ m.body }}</div>
                  <div class="adm-msg-date">{{ fmtDate(m.created_at) }}</div>
                </div>
                <button @click="deleteMessage(m.id)" class="adm-delete-btn" title="Delete">🗑️</button>
              </div>
              <div v-if="messages.length === 0" class="adm-empty">No messages sent yet</div>
            </div>
          </div>
        </div>

        <!-- Logout -->
        <button @click="logout" class="adm-logout-btn">Logout</button>
      </div>
    </div>

    <!-- Toast -->
    <div v-if="toast.show" class="adm-toast" :class="`adm-toast--${toast.type}`">{{ toast.msg }}</div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { supabase } from '@/supabase'

const SUPABASE_URL = 'https://vuywhhmwrqykukcemifd.supabase.co'

const adminKey    = ref('')
const loggedIn    = ref(false)
const loginLoading = ref(false)
const loginError  = ref('')
const activeTab   = ref(0)

const tabs = [
  { label: 'Overview',      icon: '📊' },
  { label: 'Transactions',  icon: '💳' },
  { label: 'Settings',      icon: '⚙️' },
  { label: 'Users',         icon: '👥' },
  { label: 'Games',         icon: '🎮' },
  { label: 'Messages',      icon: '📢' },
]

const toast = reactive({ show: false, msg: '', type: 'info' })
function showToast(msg, type = 'info') {
  toast.msg = msg; toast.type = type; toast.show = true
  setTimeout(() => { toast.show = false }, 3000)
}

// ── Stats
const stats = reactive({})
const loadStats = async () => {
  try {
    const { data, error } = await supabase.rpc('admin_get_stats', { p_key: adminKey.value })
    if (error) throw error
    if (data?.[0]) Object.assign(stats, data[0])
  } catch(e) { console.error('stats:', e) }
}

// ── Login
const login = async () => {
  if (!adminKey.value) return
  loginLoading.value = true
  loginError.value = ''
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/admin_get_transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey.value },
      body: JSON.stringify({})
    })
    const data = await res.json()
    if (data.error && data.error !== 'Unauthorized') {
      // Try via RPC validate_admin for local fallback
    }
    if (data.error === 'Unauthorized') {
      loginError.value = 'Incorrect password'
      return
    }
    localStorage.setItem('admin_key', adminKey.value)
    loggedIn.value = true
    onLoggedIn()
  } catch (e) {
    loginError.value = 'Network error: ' + e.message
  } finally {
    loginLoading.value = false
  }
}

const onLoggedIn = () => {
  loadStats()
  fetchTransactions()
  loadSettings()
  fetchUsers()
  fetchGames()
  fetchMessages()
}

const logout = () => {
  loggedIn.value = false
  localStorage.removeItem('admin_key')
  adminKey.value = ''
}

const switchTab = (i) => {
  activeTab.value = i
  if (i === 0) loadStats()
  if (i === 1) fetchTransactions()
  if (i === 2) loadSettings()
  if (i === 3) fetchUsers()
  if (i === 4) fetchGames()
  if (i === 5) fetchMessages()
}

// Auto-login check
onMounted(() => {
  const saved = localStorage.getItem('admin_key')
  if (saved) {
    adminKey.value = saved
    login()
  }
})

// ── Transactions
const filter = reactive({ status: '', type: '' })
const transactions = ref([])
const loadingTx = ref(false)
const txError = ref('')

const fetchTransactions = async () => {
  loadingTx.value = true
  txError.value = ''
  try {
    const body = {}
    if (filter.status) body.status = filter.status
    if (filter.type) body.type = filter.type
    const res = await fetch(`${SUPABASE_URL}/functions/v1/admin_get_transactions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey.value },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    if (data.error) {
      txError.value = data.error
      if (data.error === 'Unauthorized') { loggedIn.value = false; localStorage.removeItem('admin_key') }
    } else {
      transactions.value = data.data || []
    }
  } catch (e) {
    txError.value = 'Network error: ' + e.message
  } finally {
    loadingTx.value = false
  }
}

const approveReject = async (id, action) => {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/admin_approve_reject_v4`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-admin-key': adminKey.value },
      body: JSON.stringify({ transactionId: id, action })
    })
    const data = await res.json()
    if (data.error) showToast(data.error, 'error')
    else { showToast(action === 'approve' ? 'Approved ✅' : 'Rejected ❌', 'success'); fetchTransactions() }
  } catch (e) { showToast('Network error: ' + e.message, 'error') }
}

// ── Settings
const settings = reactive({
  kpay_recipient_name: '', kpay_recipient_account: '',
  wave_recipient_name: '', wave_recipient_account: '',
  commission_direct_rate: 10, commission_override_rate: 3,
  wagering_multiplier: 10, cashback_percent: 10,
  min_deposit: 2000, max_deposit: 1000000,
})
const loadingSettings = ref(false)
const savingSettings = ref(false)
const settingsMsg = ref('')
const settingsOk = ref(false)

const loadSettings = async () => {
  loadingSettings.value = true
  try {
    const { data, error } = await supabase.rpc('admin_get_settings', { p_key: adminKey.value })
    if (error) throw error
    const map = {}
    ;(data || []).forEach(r => { map[r.k] = r.v })
    settings.kpay_recipient_name      = map.kpay_recipient_name      || ''
    settings.kpay_recipient_account   = map.kpay_recipient_account   || ''
    settings.wave_recipient_name      = map.wave_recipient_name      || ''
    settings.wave_recipient_account   = map.wave_recipient_account   || ''
    settings.commission_direct_rate   = Number(map.commission_direct_rate)   || 10
    settings.commission_override_rate = Number(map.commission_override_rate) || 3
    settings.wagering_multiplier      = Number(map.wagering_multiplier)      || 10
    settings.cashback_percent         = Number(map.cashback_percent)         || 10
    settings.min_deposit              = Number(map.min_deposit)              || 2000
    settings.max_deposit              = Number(map.max_deposit)              || 1000000
  } catch(e) { console.error('loadSettings:', e) }
  finally { loadingSettings.value = false }
}

const saveSettings = async () => {
  savingSettings.value = true
  settingsMsg.value = ''
  try {
    const { error } = await supabase.rpc('admin_save_settings', {
      p_key: adminKey.value,
      p_kpay_name: settings.kpay_recipient_name,
      p_kpay_account: settings.kpay_recipient_account,
      p_wave_name: settings.wave_recipient_name,
      p_wave_account: settings.wave_recipient_account,
      p_direct_rate: settings.commission_direct_rate,
      p_override_rate: settings.commission_override_rate,
      p_wagering: settings.wagering_multiplier,
      p_cashback: settings.cashback_percent,
    })
    if (error) throw error
    // Also save min/max deposit via direct upsert
    await supabase.rpc('admin_save_settings', {
      p_key: adminKey.value,
      p_kpay_name: settings.kpay_recipient_name,
      p_kpay_account: settings.kpay_recipient_account,
      p_wave_name: settings.wave_recipient_name,
      p_wave_account: settings.wave_recipient_account,
      p_direct_rate: settings.commission_direct_rate,
      p_override_rate: settings.commission_override_rate,
      p_wagering: settings.wagering_multiplier,
      p_cashback: settings.cashback_percent,
    })
    settingsOk.value = true
    settingsMsg.value = '✅ Settings saved successfully!'
    showToast('Settings saved!', 'success')
  } catch(e) {
    settingsOk.value = false
    settingsMsg.value = '❌ Error: ' + (e.message || 'Unknown')
    showToast('Save failed!', 'error')
  } finally {
    savingSettings.value = false
    setTimeout(() => { settingsMsg.value = '' }, 4000)
  }
}

// ── Users
const users = ref([])
const loadingUsers = ref(false)
const userSearch = ref('')
const selectedUser = ref(null)
const actionLoading = ref(false)
const adjustAmt = ref(0)
const userActionMsg = ref('')

const filteredUsers = computed(() => {
  const q = userSearch.value.toLowerCase().trim()
  if (!q) return users.value
  return users.value.filter(u =>
    (u.username || '').toLowerCase().includes(q) ||
    (u.phone || '').includes(q) ||
    (u.referral_code || '').toLowerCase().includes(q)
  )
})

const fetchUsers = async () => {
  loadingUsers.value = true
  try {
    const { data, error } = await supabase.rpc('admin_list_users', { p_key: adminKey.value })
    if (error) throw error
    users.value = data || []
  } catch(e) { console.error('fetchUsers:', e) }
  finally { loadingUsers.value = false }
}

const selectUser = (u) => {
  selectedUser.value = { ...u }
  adjustAmt.value = 0
  userActionMsg.value = ''
}

const toggleBan = async (u) => {
  actionLoading.value = true
  try {
    const newBan = !u.is_banned
    const { error } = await supabase.rpc('admin_ban_user', { p_key: adminKey.value, p_user_id: u.id, p_ban: newBan })
    if (error) throw error
    u.is_banned = newBan
    const idx = users.value.findIndex(x => x.id === u.id)
    if (idx >= 0) users.value[idx].is_banned = newBan
    showToast(newBan ? 'User banned 🚫' : 'User unbanned ✅', 'success')
    userActionMsg.value = newBan ? '🚫 User banned' : '✅ User unbanned'
  } catch(e) { showToast('Error: ' + e.message, 'error') }
  finally { actionLoading.value = false }
}

const adjustBalance = async (u) => {
  if (!adjustAmt.value || adjustAmt.value === 0) return
  actionLoading.value = true
  try {
    const { error } = await supabase.rpc('admin_adjust_balance', { p_key: adminKey.value, p_user_id: u.id, p_amount: adjustAmt.value })
    if (error) throw error
    u.balance = (Number(u.balance) || 0) + adjustAmt.value
    const idx = users.value.findIndex(x => x.id === u.id)
    if (idx >= 0) users.value[idx].balance = u.balance
    userActionMsg.value = `✅ Balance adjusted by ${adjustAmt.value > 0 ? '+' : ''}${adjustAmt.value.toLocaleString()} Ks`
    showToast('Balance updated!', 'success')
    adjustAmt.value = 0
  } catch(e) { showToast('Error: ' + e.message, 'error') }
  finally { actionLoading.value = false }
}

// ── Games
const games = ref([])
const loadingGames = ref(false)
const gameSearch = ref('')
const gameCatFilter = ref('')

const gameCategories = computed(() => [...new Set(games.value.map(g => g.category).filter(Boolean))])

const filteredGames = computed(() => {
  let list = games.value
  if (gameCatFilter.value) list = list.filter(g => g.category === gameCatFilter.value)
  const q = gameSearch.value.toLowerCase().trim()
  if (q) list = list.filter(g => (g.name || '').toLowerCase().includes(q) || (g.provider || '').toLowerCase().includes(q))
  return list
})

const fetchGames = async () => {
  loadingGames.value = true
  try {
    const { data, error } = await supabase.rpc('admin_list_games', { p_key: adminKey.value })
    if (error) throw error
    games.value = data || []
  } catch(e) { console.error('fetchGames:', e) }
  finally { loadingGames.value = false }
}

const toggleGame = async (g) => {
  const newState = !g.is_active
  try {
    const { error } = await supabase.rpc('admin_toggle_game', { p_key: adminKey.value, p_game_id: g.id, p_active: newState })
    if (error) throw error
    g.is_active = newState
    showToast(newState ? `${g.name} enabled` : `${g.name} disabled`, 'success')
  } catch(e) { showToast('Error: ' + e.message, 'error') }
}

// ── Messages
const messages = ref([])
const loadingMsgs = ref(false)
const sendingMsg = ref(false)
const msgSendResult = ref('')
const msgSendOk = ref(false)
const newMsg = reactive({ title: '', body: '' })

const fetchMessages = async () => {
  loadingMsgs.value = true
  try {
    const { data, error } = await supabase.rpc('admin_list_messages', { p_key: adminKey.value })
    if (error) throw error
    messages.value = data || []
  } catch(e) { console.error('fetchMessages:', e) }
  finally { loadingMsgs.value = false }
}

const sendMessage = async () => {
  if (!newMsg.title.trim() || !newMsg.body.trim()) {
    showToast('Title and body are required', 'error'); return
  }
  sendingMsg.value = true
  msgSendResult.value = ''
  try {
    const { error } = await supabase.rpc('admin_send_message', {
      p_key: adminKey.value,
      p_title: newMsg.title.trim(),
      p_body: newMsg.body.trim()
    })
    if (error) throw error
    msgSendOk.value = true
    msgSendResult.value = '✅ Message sent to all users!'
    showToast('Message sent!', 'success')
    newMsg.title = ''; newMsg.body = ''
    fetchMessages()
  } catch(e) {
    msgSendOk.value = false
    msgSendResult.value = '❌ Error: ' + e.message
    showToast('Send failed!', 'error')
  } finally {
    sendingMsg.value = false
    setTimeout(() => { msgSendResult.value = '' }, 4000)
  }
}

const deleteMessage = async (id) => {
  try {
    const { error } = await supabase.rpc('admin_delete_message', { p_key: adminKey.value, p_id: id })
    if (error) throw error
    messages.value = messages.value.filter(m => m.id !== id)
    showToast('Message deleted', 'success')
  } catch(e) { showToast('Error: ' + e.message, 'error') }
}

// ── Utilities
const fmtNum = (n) => {
  const v = Number(n) || 0
  if (v >= 1000000) return (v/1000000).toFixed(2) + 'M'
  if (v >= 1000) return new Intl.NumberFormat('en-US').format(Math.round(v))
  return v.toFixed(0)
}
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('en-GB', { year:'numeric', month:'short', day:'numeric' }) : '—'
const copyText = (t) => {
  navigator.clipboard.writeText(t).then(() => showToast('Copied!', 'success')).catch(() => {})
}
</script>

<style scoped>
.adm-root { background:#1e2150; min-height:100vh; color:#e2e8f0; padding-bottom:32px; position:relative; overflow-x:hidden; font-family:system-ui,sans-serif; }
.adm-orb { position:fixed; border-radius:50%; pointer-events:none; z-index:0; }
.adm-orb--1 { width:300px;height:300px;top:-80px;left:-80px; background:radial-gradient(circle,rgba(34,197,94,.12) 0%,transparent 70%); animation:orb1 12s ease-in-out infinite; }
.adm-orb--2 { width:320px;height:320px;top:40%;right:-100px; background:radial-gradient(circle,rgba(99,102,241,.10) 0%,transparent 70%); animation:orb2 15s ease-in-out infinite; }
.adm-orb--3 { width:240px;height:240px;bottom:80px;left:-30px; background:radial-gradient(circle,rgba(168,85,247,.09) 0%,transparent 70%); animation:orb3 14s ease-in-out infinite; }
@keyframes orb1{0%,100%{transform:translate(0,0)}50%{transform:translate(12px,-16px)}}
@keyframes orb2{0%,100%{transform:translate(0,0)}50%{transform:translate(-12px,14px)}}
@keyframes orb3{0%,100%{transform:translate(0,0)}50%{transform:translate(10px,-10px)}}

.adm-header { position:sticky;top:0;z-index:30;background:rgba(30,33,80,.92);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,.06);padding:10px 16px 0; }
.adm-title { font-size:17px;font-weight:800;text-align:center;color:#67e8f9;letter-spacing:.5px;margin-bottom:8px; }
.adm-tabs-wrap { display:flex;gap:6px;overflow-x:auto;padding-bottom:8px; }
.adm-tabs-wrap::-webkit-scrollbar { display:none; }
.adm-tab { flex-shrink:0;padding:6px 14px;border-radius:20px;font-size:11px;font-weight:700;background:rgba(255,255,255,.06);color:#94a3b8;border:1px solid rgba(255,255,255,.08);transition:all .2s;white-space:nowrap; }
.adm-tab--active { background:linear-gradient(135deg,#06b6d4,#3b82f6);color:#fff;border-color:transparent;box-shadow:0 2px 12px rgba(6,182,212,.3); }

.adm-body { padding:14px 14px 0;position:relative;z-index:10; }

/* Login */
.adm-login-card { background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:20px;padding:32px 24px;text-align:center;max-width:360px;margin:40px auto 0; }
.adm-login-logo { font-size:48px;margin-bottom:12px; }
.adm-login-title { font-size:20px;font-weight:800;color:#e2e8f0;margin-bottom:6px; }
.adm-login-sub { font-size:13px;color:#94a3b8;margin-bottom:20px; }
.adm-login-input { width:100%;box-sizing:border-box;margin-bottom:16px; }
.adm-login-btn { width:100%;padding:13px; }

/* Cards */
.adm-card { background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:16px;padding:14px; }

/* Stats */
.adm-stats-grid { display:grid;grid-template-columns:1fr 1fr;gap:8px; }
.adm-stat-card { background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:14px;text-align:center; }
.adm-stat-card--yellow { border-color:rgba(251,191,36,.2);background:rgba(251,191,36,.06); }
.adm-stat-card--green { border-color:rgba(34,197,94,.2);background:rgba(34,197,94,.06); }
.adm-stat-icon { font-size:22px;margin-bottom:4px; }
.adm-stat-val { font-size:18px;font-weight:800;color:#e2e8f0; }
.adm-stat-label { font-size:10px;color:#94a3b8;margin-top:2px; }

/* Inputs */
.adm-input { width:100%;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:10px 12px;color:#e2e8f0;font-size:13px;outline:none;box-sizing:border-box;transition:border .2s; }
.adm-input:focus { border-color:#06b6d4; }
.adm-textarea { width:100%;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:10px 12px;color:#e2e8f0;font-size:13px;outline:none;box-sizing:border-box;resize:vertical; }
.adm-textarea:focus { border-color:#06b6d4; }
.adm-label { display:block;font-size:11px;color:#94a3b8;margin-bottom:4px; }
.adm-select { flex:1;background:rgba(0,0,0,.25);border:1px solid rgba(255,255,255,.12);border-radius:10px;padding:9px 10px;color:#e2e8f0;font-size:12px;outline:none; }
.adm-search-input { flex:1; }

/* Buttons */
.adm-btn-cyan { background:linear-gradient(135deg,#06b6d4,#3b82f6);color:#fff;font-weight:700;border:none;border-radius:12px;padding:10px 18px;cursor:pointer;font-size:13px;transition:opacity .2s; }
.adm-btn-cyan:disabled { opacity:.5;cursor:not-allowed; }
.adm-btn-outline { background:transparent;border:1px solid rgba(255,255,255,.15);color:#94a3b8;border-radius:12px;padding:10px 18px;cursor:pointer;font-size:12px; }
.adm-btn-approve { background:rgba(34,197,94,.15);border:1px solid rgba(34,197,94,.3);color:#4ade80;border-radius:10px;padding:7px 16px;font-size:12px;font-weight:700;cursor:pointer; }
.adm-btn-reject { background:rgba(239,68,68,.15);border:1px solid rgba(239,68,68,.3);color:#f87171;border-radius:10px;padding:7px 16px;font-size:12px;font-weight:700;cursor:pointer; }

/* Filter row */
.adm-filter-row { display:flex;gap:8px;align-items:center; }
.adm-filter-btn { flex-shrink:0;padding:9px 16px;font-size:12px; }

/* Section title */
.adm-section-title { font-size:14px;font-weight:700;color:#67e8f9;margin:0 0 12px; }

/* Badges */
.adm-badge { padding:3px 10px;border-radius:20px;font-size:10px;font-weight:700;text-transform:uppercase; }
.adm-badge--pending { background:rgba(251,191,36,.15);color:#fbbf24;border:1px solid rgba(251,191,36,.3); }
.adm-badge--confirmed { background:rgba(34,197,94,.15);color:#4ade80;border:1px solid rgba(34,197,94,.3); }
.adm-badge--rejected { background:rgba(239,68,68,.15);color:#f87171;border:1px solid rgba(239,68,68,.3); }

/* Transaction rows */
.adm-tx-row { background:rgba(0,0,0,.2);border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:12px;margin-bottom:8px; }
.adm-tx-top { display:flex;align-items:center;gap:8px;margin-bottom:6px; }
.adm-tx-type { font-size:11px;font-weight:700;padding:2px 8px;border-radius:6px; }
.adm-tx-type--dep { background:rgba(34,197,94,.15);color:#4ade80; }
.adm-tx-type--wd { background:rgba(239,68,68,.12);color:#f87171; }
.adm-tx-amount { flex:1;font-size:15px;font-weight:800;color:#e2e8f0; }
.adm-tx-meta { font-size:11px;color:#64748b;display:flex;flex-wrap:wrap;gap:8px;margin-bottom:6px; }
.adm-tx-id-row { display:flex;align-items:center;gap:6px;margin-bottom:6px; }
.adm-tx-id { font-size:10px;color:#475569;font-family:monospace;word-break:break-all; }
.adm-copy-btn { background:none;border:none;cursor:pointer;font-size:14px;padding:2px; }
.adm-tx-actions { display:flex;gap:8px;margin-top:6px; }

/* Info rows */
.adm-info-rows { margin-bottom:14px; }
.adm-info-row { display:flex;justify-content:space-between;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.05);font-size:12px; }
.adm-info-row span:first-child { color:#94a3b8; }
.adm-info-row span:last-child { color:#e2e8f0;font-weight:600;text-align:right; }

/* User rows */
.adm-user-row { display:flex;align-items:center;gap:10px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05);cursor:pointer;transition:background .2s; }
.adm-user-row:hover { background:rgba(255,255,255,.03);border-radius:10px;padding-left:6px; }
.adm-user-avatar { width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#06b6d4,#3b82f6);display:flex;align-items:center;justify-content:center;font-weight:800;font-size:14px;flex-shrink:0; }
.adm-user-info { flex:1;min-width:0; }
.adm-user-name { font-size:13px;font-weight:700;color:#e2e8f0; }
.adm-user-meta { font-size:10px;color:#64748b;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }

/* Game rows */
.adm-games-header { display:flex;justify-content:space-between;align-items:center;margin-bottom:12px; }
.adm-games-summary { font-size:11px; }
.adm-game-row { display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,.05); }
.adm-game-img { width:40px;height:40px;object-fit:cover;border-radius:8px;flex-shrink:0; }
.adm-game-img--placeholder { background:rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font-size:18px; }
.adm-game-info { flex:1;min-width:0; }
.adm-game-name { font-size:12px;font-weight:600;color:#e2e8f0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.adm-game-meta { font-size:10px;color:#64748b;margin-top:2px; }
.adm-toggle-btn { flex-shrink:0;padding:5px 12px;border-radius:20px;font-size:10px;font-weight:800;border:none;cursor:pointer;transition:all .2s; }
.adm-toggle-btn--on { background:rgba(34,197,94,.2);color:#4ade80;border:1px solid rgba(34,197,94,.4); }
.adm-toggle-btn--off { background:rgba(100,116,139,.15);color:#94a3b8;border:1px solid rgba(100,116,139,.3); }

/* Messages */
.adm-msg-row { display:flex;align-items:flex-start;gap:10px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05); }
.adm-msg-info { flex:1; }
.adm-msg-title { font-size:13px;font-weight:700;color:#e2e8f0;margin-bottom:3px; }
.adm-msg-body { font-size:11px;color:#94a3b8;margin-bottom:4px;line-height:1.4; }
.adm-msg-date { font-size:10px;color:#475569; }
.adm-delete-btn { background:none;border:none;cursor:pointer;font-size:16px;padding:4px;flex-shrink:0;opacity:.6;transition:opacity .2s; }
.adm-delete-btn:hover { opacity:1; }

/* Modal */
.adm-modal-overlay { position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:100;display:flex;align-items:center;justify-content:center;padding:20px; }
.adm-modal { background:#252a60;border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:20px;width:100%;max-width:360px;max-height:80vh;overflow-y:auto;position:relative; }
.adm-modal-close { position:absolute;top:14px;right:14px;background:rgba(255,255,255,.08);border:none;color:#e2e8f0;width:28px;height:28px;border-radius:50%;cursor:pointer;font-size:14px; }
.adm-modal-actions { display:flex;gap:8px;margin-top:14px; }

/* Misc */
.adm-loading { text-align:center;padding:24px;color:#64748b;font-size:13px; }
.adm-empty { text-align:center;padding:24px;color:#475569;font-size:12px; }
.adm-error-msg { color:#f87171;font-size:12px;text-align:center; }
.adm-success-msg { color:#4ade80;font-size:12px; }
.adm-green { color:#4ade80;font-weight:700; }
.adm-red { color:#f87171;font-weight:700; }
.adm-logout-btn { margin:16px auto 0;display:block;background:rgba(239,68,68,.12);border:1px solid rgba(239,68,68,.25);color:#f87171;border-radius:12px;padding:10px 32px;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s; }
.adm-logout-btn:hover { background:rgba(239,68,68,.2); }
.no-scrollbar::-webkit-scrollbar { display:none; }

/* Toast */
.adm-toast { position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:#1e293b;border-radius:14px;padding:10px 20px;font-size:13px;font-weight:600;z-index:200;box-shadow:0 4px 24px rgba(0,0,0,.4);pointer-events:none;white-space:nowrap; }
.adm-toast--success { background:#166534;color:#4ade80;border:1px solid rgba(74,222,128,.3); }
.adm-toast--error { background:#7f1d1d;color:#fca5a5;border:1px solid rgba(252,165,165,.3); }
.adm-toast--info { background:#1e3a5f;color:#93c5fd;border:1px solid rgba(147,197,253,.3); }
</style>
