<template>
  <div class="a-tab-content">

    <!-- Session Stats -->
    <div class="sess-stats-grid">
      <div class="sess-stat">
        <div class="sess-stat-val" style="color:#4f46e5;">{{ activeSessions.length }}</div>
        <div class="sess-stat-lbl">Active Now</div>
      </div>
      <div class="sess-stat">
        <div class="sess-stat-val" style="color:#0891b2;">{{ todaySessions }}</div>
        <div class="sess-stat-lbl">Today</div>
      </div>
      <div class="sess-stat">
        <div class="sess-stat-val" style="color:#d97706;">{{ suspiciousSess.length }}</div>
        <div class="sess-stat-lbl">Suspicious</div>
      </div>
      <div class="sess-stat">
        <div class="sess-stat-val" style="color:#16a34a;">{{ uniqueDevices }}</div>
        <div class="sess-stat-lbl">Unique Devices</div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="a-filter-bar">
      <select v-model="sessFilter" class="a-select">
        <option value="all">All Sessions</option>
        <option value="active">Active Now</option>
        <option value="today">Today</option>
        <option value="suspicious">Suspicious</option>
      </select>
      <input v-model="sessSearch" class="a-input a-srch" placeholder="Search username/IP..." style="flex:1;" />
      <button @click="loadSessions" :disabled="loading" class="a-btn-primary a-btn-sm-p">
        <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" :class="loading?'spinning':''"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
        Refresh
      </button>
    </div>

    <!-- Sessions List -->
    <div v-if="loading" class="a-loading"><span class="a-spinner"></span></div>
    <div v-else>
      <div v-for="sess in filteredSessions" :key="sess.id" class="sess-row" :class="sess._suspicious ? 'sess-row--warn' : ''">
        <div class="sess-status-dot" :class="sess._isActive ? 'dot-active' : 'dot-inactive'"></div>
        <div class="sess-info">
          <div class="sess-username">{{ sess.username || sess.user_id?.slice(0,10) }}</div>
          <div class="sess-meta">
            <span class="sess-ip">{{ sess.ip_address || '—' }}</span>
            <span class="sess-device">{{ formatDevice(sess.user_agent) }}</span>
            <span class="sess-loc" v-if="sess.country">{{ sess.country }}</span>
          </div>
          <div class="sess-time">
            <span>Login: {{ fmtDateTime(sess.login_at) }}</span>
            <span v-if="sess.logout_at"> · Logout: {{ fmtDateTime(sess.logout_at) }}</span>
            <span v-else class="sess-active-label">● Active</span>
          </div>
        </div>
        <div class="sess-flags">
          <span v-if="sess._suspicious" class="sess-flag-chip">⚠ Suspicious</span>
          <span v-if="sess._multiDevice" class="sess-flag-chip sess-flag-chip--blue">Multi-device</span>
        </div>
        <div class="sess-actions">
          <button v-if="sess._isActive" @click="terminateSession(sess)" :disabled="sess._busy" class="a-btn-sm a-btn-danger">
            <span v-if="sess._busy" class="a-spinner-sm"></span>
            Terminate
          </button>
          <button @click="blockIP(sess.ip_address)" v-if="sess.ip_address" class="a-btn-sm a-btn-ghost">Block IP</button>
        </div>
      </div>
      <div v-if="!filteredSessions.length" class="a-empty">No sessions found</div>
    </div>

    <!-- Session Settings -->
    <div class="a-sett-block" style="margin-top:12px;">
      <div class="a-sett-ttl">Session Security Settings</div>
      <div class="sess-sett-row">
        <span class="sess-sett-label">Session Timeout (minutes)</span>
        <input v-model.number="sessTimeout" type="number" class="a-input a-input-sm" style="width:80px;" />
      </div>
      <div class="sess-sett-row">
        <span class="sess-sett-label">Max concurrent sessions per user</span>
        <input v-model.number="maxConcurrent" type="number" class="a-input a-input-sm" style="width:80px;" />
      </div>
      <div class="sess-sett-row">
        <span class="sess-sett-label">Block multiple countries in one day</span>
        <button @click="blockMultiCountry = !blockMultiCountry" class="a-tog" :class="blockMultiCountry ? 'a-tog-on' : 'a-tog-off'">
          {{ blockMultiCountry ? 'ON' : 'OFF' }}
        </button>
      </div>
      <div class="sess-sett-row">
        <span class="sess-sett-label">Force re-login on suspicious activity</span>
        <button @click="forceRelogin = !forceRelogin" class="a-tog" :class="forceRelogin ? 'a-tog-on' : 'a-tog-off'">
          {{ forceRelogin ? 'ON' : 'OFF' }}
        </button>
      </div>
      <button @click="saveSessSettings" :disabled="settSaving" class="a-btn-primary" style="width:100%;margin-top:10px;">
        <span v-if="settSaving" class="a-spinner-sm"></span>
        Save Session Settings
      </button>
    </div>

    <!-- Live Session Map (Heat Display) -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">Login Frequency (Today, by hour)</div>
      <div class="sess-heatmap">
        <div v-for="(count, hour) in hourlyLogins" :key="hour" class="heat-cell"
          :style="`opacity:${Math.min(1, 0.1 + count / Math.max(maxHourly, 1) * 0.9)};background:#4f46e5;`"
          :title="`${hour}:00 — ${count} logins`">
          <span class="heat-hour">{{ hour }}</span>
        </div>
      </div>
      <div class="heat-legend">
        <span>12am</span><span style="margin-left:auto;">11pm</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { supabase } from '@/supabase'

const { adminKey, fmtDate, showToast, writeAudit } = useAdmin()

const sessions       = ref([])
const loading        = ref(false)
const sessFilter     = ref('all')
const sessSearch     = ref('')
const sessTimeout    = ref(30)
const maxConcurrent  = ref(3)
const blockMultiCountry = ref(false)
const forceRelogin   = ref(true)
const settSaving     = ref(false)

const now = Date.now()

const activeSessions = computed(() => sessions.value.filter(s => s._isActive))
const todaySessions  = computed(() => sessions.value.filter(s => {
  const d = new Date(s.login_at); const today = new Date()
  return d.toDateString() === today.toDateString()
}).length)
const suspiciousSess = computed(() => sessions.value.filter(s => s._suspicious))
const uniqueDevices  = computed(() => new Set(sessions.value.map(s => formatDevice(s.user_agent))).size)

const filteredSessions = computed(() => {
  let list = sessions.value
  const q = sessSearch.value.toLowerCase()
  if (q) list = list.filter(s => (s.username||'').toLowerCase().includes(q) || (s.ip_address||'').includes(q))
  if (sessFilter.value === 'active')     list = list.filter(s => s._isActive)
  if (sessFilter.value === 'today')      list = list.filter(s => { const d=new Date(s.login_at); return d.toDateString()===new Date().toDateString() })
  if (sessFilter.value === 'suspicious') list = list.filter(s => s._suspicious)
  return list.sort((a, b) => new Date(b.login_at) - new Date(a.login_at))
})

const hourlyLogins = computed(() => {
  const hours = Array(24).fill(0)
  const today = new Date().toDateString()
  sessions.value.forEach(s => {
    if (!s.login_at) return
    const d = new Date(s.login_at)
    if (d.toDateString() === today) hours[d.getHours()]++
  })
  return hours
})
const maxHourly = computed(() => Math.max(...hourlyLogins.value, 1))

function formatDevice(ua) {
  if (!ua) return 'Unknown'
  if (/iPhone|iPad|iOS/i.test(ua)) return '📱 iOS'
  if (/Android/i.test(ua)) return '📱 Android'
  if (/Windows/i.test(ua)) return '💻 Windows'
  if (/Mac/i.test(ua)) return '💻 Mac'
  return '🖥 Desktop'
}

function fmtDateTime(d) {
  if (!d) return '—'
  const dt = new Date(d)
  return dt.toLocaleString('en-GB', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })
}

async function loadSessions() {
  loading.value = true
  try {
    const { data } = await supabase.from('login_sessions').select('*, profiles(username)').order('login_at', { ascending: false }).limit(200)
    const ipCounts = {}
    const raw = (data || []).map(s => ({
      ...s,
      username: s.profiles?.username || s.user_id?.slice(0,8),
      _isActive: !s.logout_at && (now - new Date(s.login_at)) < sessTimeout.value * 60000,
      _suspicious: (s.ip_address && ipCounts[s.ip_address] > 3),
    }))
    const ipMap = {}
    raw.forEach(s => { if (s.ip_address) { ipMap[s.ip_address] = (ipMap[s.ip_address]||0) + 1 } })
    sessions.value = raw.map(s => ({ ...s, _suspicious: s.ip_address && (ipMap[s.ip_address]||0) > 5 }))
  } catch (e) { showToast(e.message, 'error') }
  finally { loading.value = false }
}

async function terminateSession(sess) {
  sess._busy = true
  try {
    await supabase.from('login_sessions').update({ logout_at: new Date().toISOString() }).eq('id', sess.id)
    sess._isActive = false; sess.logout_at = new Date().toISOString()
    showToast('Session terminated', 'success')
    writeAudit('TERMINATE_SESSION', sess.username, sess.ip_address || '')
  } catch (e) { showToast(e.message, 'error') }
  finally { sess._busy = false }
}

async function blockIP(ip) {
  if (!ip) return
  await supabase.from('ip_blacklist').insert({ ip_address: ip, reason: 'Admin terminated suspicious session' }).catch(() => {})
  showToast(`${ip} blocked`, 'success')
  writeAudit('BLOCK_IP_FROM_SESSION', ip, '')
}

async function saveSessSettings() {
  settSaving.value = true
  try {
    await supabase.rpc('admin_save_settings', { p_key: adminKey.value, p_settings: { session_timeout: sessTimeout.value, max_concurrent_sessions: maxConcurrent.value, block_multi_country: blockMultiCountry.value, force_relogin_suspicious: forceRelogin.value } })
    showToast('Session settings saved ✓', 'success')
    writeAudit('SAVE_SESSION_SETTINGS', '', '')
  } catch (e) { showToast(e.message, 'error') }
  finally { settSaving.value = false }
}

onMounted(loadSessions)
</script>

<style scoped>
.sess-stats-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px; }
@media(max-width:380px) { .sess-stats-grid { grid-template-columns:repeat(2,1fr); } }
.sess-stat { background:#fff;border-radius:10px;padding:10px;text-align:center; }
.sess-stat-val { font-size:22px;font-weight:900;line-height:1;margin-bottom:3px; }
.sess-stat-lbl { font-size:9px;color:#94a3b8;font-weight:600; }
.sess-row { display:flex;align-items:flex-start;gap:10px;padding:10px 4px;border-bottom:1px solid #f1f5f9; }
.sess-row--warn { background:rgba(220,38,38,.03);border-left:3px solid #dc2626; }
.sess-status-dot { width:8px;height:8px;border-radius:50%;flex-shrink:0;margin-top:4px; }
.dot-active { background:#16a34a;box-shadow:0 0 0 3px rgba(22,163,74,.2);animation:pulse-dot 2s infinite; }
.dot-inactive { background:#cbd5e1; }
@keyframes pulse-dot { 0%,100%{opacity:1}50%{opacity:.5} }
.sess-info { flex:1;min-width:0; }
.sess-username { font-size:12px;font-weight:700;color:#0f172a;margin-bottom:3px; }
.sess-meta { display:flex;flex-wrap:wrap;gap:6px;margin-bottom:2px;align-items:center; }
.sess-ip { font-family:monospace;font-size:9.5px;background:#f1f5f9;padding:1px 5px;border-radius:4px;color:#0f172a; }
.sess-device { font-size:9.5px;color:#64748b; }
.sess-loc { font-size:9px;color:#94a3b8; }
.sess-time { font-size:9px;color:#94a3b8;display:flex;gap:6px;flex-wrap:wrap; }
.sess-active-label { color:#16a34a;font-weight:700; }
.sess-flags { display:flex;flex-direction:column;gap:3px; }
.sess-flag-chip { font-size:9px;font-weight:700;background:#fee2e2;color:#dc2626;padding:2px 5px;border-radius:4px; }
.sess-flag-chip--blue { background:#e0f2fe;color:#0891b2; }
.sess-actions { display:flex;flex-direction:column;gap:4px;flex-shrink:0; }
.sess-sett-row { display:flex;align-items:center;justify-content:space-between;padding:9px 0;border-bottom:1px solid #f1f5f9; }
.sess-sett-label { font-size:11px;color:#0f172a;font-weight:600;flex:1; }
.sess-heatmap { display:grid;grid-template-columns:repeat(24,1fr);gap:2px;margin-bottom:4px; }
.heat-cell { height:24px;border-radius:3px;display:flex;align-items:center;justify-content:center;cursor:default; }
.heat-hour { font-size:7px;color:#fff;font-weight:700; }
.heat-legend { display:flex;font-size:9px;color:#94a3b8; }
.spinning { animation:spin .8s linear infinite; }
@keyframes spin { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }
</style>
