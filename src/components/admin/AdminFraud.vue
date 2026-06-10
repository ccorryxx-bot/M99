<template>
  <div class="a-tab-content">

    <!-- Fraud Summary Cards -->
    <div class="fraud-summary-grid">
      <div class="fraud-s-card fraud-s-card--red">
        <div class="fraud-s-val">{{ highRiskUsers.length }}</div>
        <div class="fraud-s-lbl">High Risk Users</div>
      </div>
      <div class="fraud-s-card fraud-s-card--yellow">
        <div class="fraud-s-val">{{ suspiciousTx.length }}</div>
        <div class="fraud-s-lbl">Suspicious TX</div>
      </div>
      <div class="fraud-s-card fraud-s-card--blue">
        <div class="fraud-s-val">{{ blockedIPs.length }}</div>
        <div class="fraud-s-lbl">Blocked IPs</div>
      </div>
      <div class="fraud-s-card fraud-s-card--purple">
        <div class="fraud-s-val">{{ alertsToday }}</div>
        <div class="fraud-s-lbl">Alerts Today</div>
      </div>
    </div>

    <!-- Fraud Detection Rules -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">
        <svg width="12" height="12" fill="none" stroke="#dc2626" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:5px;"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
        Fraud Detection Rules
      </div>
      <div v-for="rule in fraudRules" :key="rule.key" class="fraud-rule-row">
        <div class="fraud-rule-info">
          <div class="fraud-rule-name">{{ rule.label }}</div>
          <div class="fraud-rule-desc">{{ rule.desc }}</div>
        </div>
        <div class="fraud-rule-right">
          <input v-if="rule.hasThreshold" v-model.number="rule.threshold" type="number" class="a-input a-input-sm" style="width:80px;" />
          <button @click="rule.enabled = !rule.enabled" class="a-tog" :class="rule.enabled ? 'a-tog-on' : 'a-tog-danger'">
            {{ rule.enabled ? 'ON' : 'OFF' }}
          </button>
        </div>
      </div>
      <button @click="saveFraudRules" :disabled="rulesSaving" class="a-btn-primary" style="width:100%;margin-top:10px;">
        <span v-if="rulesSaving" class="a-spinner-sm"></span>
        {{ rulesSaving ? 'Saving...' : 'Save Fraud Rules' }}
      </button>
    </div>

    <!-- High Risk Users -->
    <div class="a-sett-block">
      <div class="a-sett-ttl" style="display:flex;align-items:center;justify-content:space-between;">
        <span>
          <svg width="12" height="12" fill="none" stroke="#dc2626" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:5px;"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857"/></svg>
          High Risk Users
        </span>
        <button @click="refreshFraudData" :disabled="loading" class="a-btn-sm a-btn-ghost">
          <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24" :class="loading?'spinning':''"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          Refresh
        </button>
      </div>

      <div v-if="loading" class="a-loading"><span class="a-spinner"></span></div>
      <div v-else>
        <div v-for="u in highRiskUsers" :key="u.id" class="fraud-user-row">
          <div class="fraud-risk-badge" :style="`background:${riskColor(u._riskScore)}20;color:${riskColor(u._riskScore)}`">
            {{ Math.round(u._riskScore) }}%
          </div>
          <div class="fraud-user-info">
            <div class="fraud-username">{{ u.username }}</div>
            <div class="fraud-user-flags">
              <span v-for="flag in u._flags" :key="flag" class="fraud-flag-chip">{{ flag }}</span>
            </div>
            <div class="fraud-user-meta">Bal: {{ fmtNum(u.balance) }} Ks · VIP {{ u.vip_level || 0 }}</div>
          </div>
          <div class="fraud-user-actions">
            <button @click="autoFlag(u)" class="a-btn-sm a-btn-danger" title="Flag & Freeze">
              🚩 Flag
            </button>
            <button @click="banUser(u)" :disabled="u.is_banned" class="a-btn-sm a-btn-danger">
              {{ u.is_banned ? 'Banned' : 'Ban' }}
            </button>
          </div>
        </div>
        <div v-if="!highRiskUsers.length" class="a-empty">
          <svg width="24" height="24" fill="none" stroke="#16a34a" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          No high-risk users detected
        </div>
      </div>
    </div>

    <!-- Suspicious Transactions -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">
        <svg width="12" height="12" fill="none" stroke="#d97706" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:5px;"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7"/></svg>
        Suspicious Transactions ({{ suspiciousTx.length }})
      </div>
      <div v-for="tx in suspiciousTx.slice(0, 20)" :key="tx.id" class="fraud-tx-row">
        <span class="a-io-badge" :class="tx.type==='deposit'?'badge-in':'badge-out'">{{ tx.type==='deposit'?'IN':'OUT' }}</span>
        <div class="fraud-tx-info">
          <div>{{ tx.username || tx.user_id?.slice(0,8) }} · {{ tx.method }}</div>
          <div class="fraud-tx-flags">{{ tx._flags?.join(' · ') }}</div>
        </div>
        <div class="fraud-tx-right">
          <div class="fraud-tx-amt">{{ fmtNum(tx.amount) }} Ks</div>
          <div class="fraud-tx-date">{{ fmtDate(tx.created_at) }}</div>
        </div>
      </div>
      <div v-if="!suspiciousTx.length" class="a-empty-sm">No suspicious transactions flagged</div>
    </div>

    <!-- IP Blocklist -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">IP Blocklist ({{ blockedIPs.length }})</div>
      <div class="ip-add-row">
        <input v-model="newIpAddr" class="a-input" placeholder="IP address e.g. 192.168.1.1" style="flex:1;" />
        <input v-model="newIpReason" class="a-input" placeholder="Reason" style="flex:1;" />
        <button @click="addBlock" :disabled="blockBusy" class="a-btn-sm a-btn-danger">
          <span v-if="blockBusy" class="a-spinner-sm"></span>
          Block
        </button>
      </div>
      <div v-for="ip in blockedIPs" :key="ip.id" class="ip-row">
        <span class="ip-addr">{{ ip.ip_address }}</span>
        <span class="ip-reason">{{ ip.reason || '—' }}</span>
        <span class="ip-date">{{ fmtDate(ip.created_at) }}</span>
        <button @click="removeBlock(ip.id)" class="a-btn-sm a-btn-ghost">✕</button>
      </div>
      <div v-if="!blockedIPs.length" class="a-empty-sm">No IPs blocked</div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { supabase } from '@/supabase'

const { adminKey, users, txList, ipList, ipLoading, fmtNum, fmtDate, fetchUsers, fetchTx, writeAudit, showToast, doToggleBan } = useAdmin()

const loading     = ref(false)
const rulesSaving = ref(false)
const newIpAddr   = ref('')
const newIpReason = ref('')
const blockBusy   = ref(false)
const blockedIPs  = ref([])
const alertsToday = ref(0)

const fraudRules = reactive([
  { key: 'large_tx',      label: 'Large Transaction Alert',      desc: 'Flag TX above threshold',                hasThreshold: true,  threshold: 500000, enabled: true  },
  { key: 'rapid_wd',      label: 'Rapid Withdrawal Detection',   desc: 'Multiple WD within 1 hour',              hasThreshold: true,  threshold: 3,      enabled: true  },
  { key: 'multi_account', label: 'Multi-Account Detection',      desc: 'Same phone used by multiple accounts',   hasThreshold: false, threshold: 0,      enabled: true  },
  { key: 'bonus_abuse',   label: 'Bonus Abuse Detection',        desc: 'High withdrawal immediately after bonus', hasThreshold: false, threshold: 0,      enabled: true  },
  { key: 'slip_reuse',    label: 'Slip Number Reuse',            desc: 'Same slip_last5 used by different users', hasThreshold: false, threshold: 0,      enabled: true  },
  { key: 'night_tx',      label: 'Night-time Transaction Alert', desc: 'TX between 1am–5am Myanmar time',         hasThreshold: false, threshold: 0,      enabled: false },
  { key: 'zero_turnover', label: 'Zero Turnover Withdraw',       desc: 'Withdraw with no game turnover',          hasThreshold: false, threshold: 0,      enabled: true  },
])

function riskColor(score) {
  if (score >= 80) return '#dc2626'
  if (score >= 50) return '#d97706'
  return '#16a34a'
}

const highRiskUsers = computed(() => {
  return users.value.map(u => {
    const flags = []
    let score = 0
    const userTx = txList.value.filter(t => t.user_id === u.id)
    const dep = userTx.filter(t => t.type === 'deposit' && t.status === 'confirmed').reduce((s, t) => s + Number(t.amount), 0)
    const wd  = userTx.filter(t => t.type !== 'deposit' && t.status === 'confirmed').reduce((s, t) => s + Number(t.amount), 0)
    if (wd > dep * 0.9 && dep > 0) { flags.push('High WD/Dep ratio'); score += 40 }
    if (Number(u.balance) >= 500000) { flags.push('High balance'); score += 20 }
    const wdCount = userTx.filter(t => t.type !== 'deposit').length
    if (wdCount >= 5) { flags.push('Frequent WD'); score += 20 }
    if (!u.phone) { flags.push('No phone'); score += 10 }
    return { ...u, _flags: flags, _riskScore: score }
  }).filter(u => u._riskScore >= 40).sort((a, b) => b._riskScore - a._riskScore)
})

const suspiciousTx = computed(() => {
  return txList.value.map(tx => {
    const flags = []
    if (Number(tx.amount) >= (fraudRules.find(r => r.key === 'large_tx')?.threshold || 500000)) flags.push('Large amount')
    if (tx.slip_last5 === '00000') flags.push('Suspicious slip')
    return { ...tx, _flags: flags }
  }).filter(tx => tx._flags.length > 0)
})

async function refreshFraudData() {
  loading.value = true
  try { await Promise.all([fetchUsers(), fetchTx()]) }
  finally { loading.value = false }
}

async function saveFraudRules() {
  rulesSaving.value = true
  try {
    const rulesObj = {}
    fraudRules.forEach(r => { rulesObj[`fraud_${r.key}`] = JSON.stringify({ enabled: r.enabled, threshold: r.threshold }) })
    const { error } = await supabase.rpc('admin_save_settings', { p_key: adminKey.value, p_settings: rulesObj })
    if (error) throw error
    showToast('Fraud rules saved ✓', 'success')
    writeAudit('SAVE_FRAUD_RULES', '', '')
  } catch (e) { showToast(e.message, 'error') }
  finally { rulesSaving.value = false }
}

async function autoFlag(user) {
  try {
    await supabase.from('audit_log').insert({ action: 'AUTO_FLAG_USER', target: user.username, note: user._flags.join(', '), admin: 'system' }).catch(() => {})
    showToast(`${user.username} flagged for review`, 'success')
    writeAudit('FLAG_USER', user.username, user._flags.join(', '))
  } catch (e) { showToast(e.message, 'error') }
}

async function banUser(user) {
  try {
    await supabase.rpc('admin_ban_user', { p_key: adminKey.value, p_user_id: user.id, p_ban: true })
    user.is_banned = true
    showToast(`${user.username} banned`, 'success')
    writeAudit('BAN_FRAUD_USER', user.username, user._flags.join(', '))
  } catch (e) { showToast(e.message, 'error') }
}

async function loadBlockedIPs() {
  const { data } = await supabase.from('ip_blacklist').select('*').order('created_at', { ascending: false })
  blockedIPs.value = data || []
}

async function addBlock() {
  if (!newIpAddr.value) return
  blockBusy.value = true
  try {
    await supabase.from('ip_blacklist').insert({ ip_address: newIpAddr.value, reason: newIpReason.value })
    showToast(`${newIpAddr.value} blocked`, 'success')
    writeAudit('BLOCK_IP', newIpAddr.value, newIpReason.value)
    newIpAddr.value = ''; newIpReason.value = ''
    await loadBlockedIPs()
  } catch (e) { showToast(e.message, 'error') }
  finally { blockBusy.value = false }
}

async function removeBlock(id) {
  await supabase.from('ip_blacklist').delete().eq('id', id)
  blockedIPs.value = blockedIPs.value.filter(ip => ip.id !== id)
  showToast('IP unblocked', 'success')
}

onMounted(async () => {
  loading.value = true
  await Promise.all([fetchUsers(), fetchTx(), loadBlockedIPs()])
  alertsToday.value = highRiskUsers.value.length + suspiciousTx.value.length
  loading.value = false
})
</script>

<style scoped>
.fraud-summary-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-bottom:12px; }
@media(max-width:380px) { .fraud-summary-grid { grid-template-columns:repeat(2,1fr); } }
.fraud-s-card { border-radius:10px;padding:10px;text-align:center; }
.fraud-s-card--red    { background:#fee2e2;border:1px solid #fecaca; }
.fraud-s-card--yellow { background:#fef9c3;border:1px solid #fde68a; }
.fraud-s-card--blue   { background:#e0f2fe;border:1px solid #bae6fd; }
.fraud-s-card--purple { background:#ede9fe;border:1px solid #ddd6fe; }
.fraud-s-val { font-size:22px;font-weight:900;color:#0f172a;line-height:1; }
.fraud-s-lbl { font-size:8.5px;color:#64748b;font-weight:600;margin-top:3px; }
.fraud-rule-row { display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #f1f5f9; }
.fraud-rule-info { flex:1;min-width:0; }
.fraud-rule-name { font-size:11px;font-weight:700;color:#0f172a;margin-bottom:2px; }
.fraud-rule-desc { font-size:9.5px;color:#94a3b8; }
.fraud-rule-right { display:flex;align-items:center;gap:6px;flex-shrink:0; }
.fraud-user-row { display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid #f1f5f9; }
.fraud-risk-badge { width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;flex-shrink:0; }
.fraud-user-info { flex:1;min-width:0; }
.fraud-username { font-size:12px;font-weight:700;color:#0f172a;margin-bottom:3px; }
.fraud-user-flags { display:flex;flex-wrap:wrap;gap:4px;margin-bottom:2px; }
.fraud-flag-chip { background:#fee2e2;color:#dc2626;font-size:9px;font-weight:700;padding:1px 5px;border-radius:4px; }
.fraud-user-meta { font-size:9px;color:#94a3b8; }
.fraud-user-actions { display:flex;flex-direction:column;gap:4px;flex-shrink:0; }
.fraud-tx-row { display:flex;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid #f1f5f9; }
.fraud-tx-info { flex:1;min-width:0;font-size:10px;color:#0f172a; }
.fraud-tx-flags { font-size:9px;color:#dc2626;margin-top:1px; }
.fraud-tx-right { text-align:right;flex-shrink:0; }
.fraud-tx-amt { font-size:11px;font-weight:700;color:#0f172a; }
.fraud-tx-date { font-size:9px;color:#94a3b8; }
.ip-add-row { display:flex;gap:6px;margin-bottom:8px;flex-wrap:wrap; }
.ip-row { display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #f1f5f9;font-size:11px; }
.ip-addr { font-family:monospace;font-weight:700;flex:1;color:#0f172a; }
.ip-reason { flex:1;color:#64748b;font-size:10px; }
.ip-date { font-size:9px;color:#94a3b8;flex-shrink:0; }
.spinning { animation:spin .8s linear infinite; }
@keyframes spin { from{transform:rotate(0deg)}to{transform:rotate(360deg)} }
</style>
