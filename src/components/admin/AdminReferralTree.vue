<template>
  <div class="a-tab-content">

    <!-- Referral Stats -->
    <div class="ref-stats-grid">
      <div class="ref-stat">
        <div class="ref-stat-val" style="color:#4f46e5;">{{ totalReferrals }}</div>
        <div class="ref-stat-lbl">Total Referrals</div>
      </div>
      <div class="ref-stat">
        <div class="ref-stat-val" style="color:#16a34a;">{{ fmtNum(totalCommission) }}</div>
        <div class="ref-stat-lbl">Commission Paid (Ks)</div>
      </div>
      <div class="ref-stat">
        <div class="ref-stat-val" style="color:#d97706;">{{ topReferrers.length }}</div>
        <div class="ref-stat-lbl">Active Agents</div>
      </div>
    </div>

    <!-- Commission Settings -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">
        <svg width="12" height="12" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24" style="vertical-align:middle;margin-right:5px;"><path stroke-linecap="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
        Referral Commission Settings
      </div>
      <div class="ref-sett-grid">
        <div>
          <label class="a-mini-label">Level 1 Commission (%)</label>
          <input v-model.number="commSettings.level1_pct" type="number" class="a-input" placeholder="5" />
        </div>
        <div>
          <label class="a-mini-label">Level 2 Commission (%)</label>
          <input v-model.number="commSettings.level2_pct" type="number" class="a-input" placeholder="2" />
        </div>
        <div>
          <label class="a-mini-label">Level 3 Commission (%)</label>
          <input v-model.number="commSettings.level3_pct" type="number" class="a-input" placeholder="1" />
        </div>
        <div>
          <label class="a-mini-label">Min Payout (Ks)</label>
          <input v-model.number="commSettings.min_payout" type="number" class="a-input" placeholder="10000" />
        </div>
        <div>
          <label class="a-mini-label">Commission Trigger</label>
          <select v-model="commSettings.trigger" class="a-select" style="width:100%;">
            <option value="deposit">On Deposit</option>
            <option value="turnover">On Turnover</option>
            <option value="profit">On House Profit</option>
          </select>
        </div>
        <div>
          <label class="a-mini-label">Auto-payout</label>
          <button @click="commSettings.auto_payout = !commSettings.auto_payout" class="a-tog" :class="commSettings.auto_payout ? 'a-tog-on' : 'a-tog-off'" style="margin-top:18px;">
            {{ commSettings.auto_payout ? 'ON' : 'OFF' }}
          </button>
        </div>
      </div>
      <button @click="saveCommSettings" :disabled="commSaving" class="a-btn-primary" style="width:100%;margin-top:10px;">
        <span v-if="commSaving" class="a-spinner-sm"></span>
        Save Commission Settings
      </button>
    </div>

    <!-- Referral Tree Search -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">Referral Tree Viewer</div>
      <div class="ref-search-row">
        <input v-model="treeSearch" class="a-input" placeholder="Search agent username..." style="flex:1;" />
        <button @click="loadTree" :disabled="treeLoading" class="a-btn-primary a-btn-sm-p">
          <span v-if="treeLoading" class="a-spinner-sm"></span>
          Search
        </button>
      </div>

      <!-- Tree Display -->
      <div v-if="treeLoading" class="a-loading"><span class="a-spinner"></span></div>
      <div v-else-if="selectedAgent" class="ref-tree">
        <!-- Root agent -->
        <div class="ref-tree-root">
          <div class="ref-node ref-node--root">
            <div class="ref-av">{{ (selectedAgent.username||'?')[0].toUpperCase() }}</div>
            <div class="ref-node-info">
              <div class="ref-node-name">{{ selectedAgent.username }}</div>
              <div class="ref-node-meta">{{ selectedAgent.direct_count || 0 }} direct · {{ fmtNum(selectedAgent.available_commission || 0) }} Ks pending</div>
            </div>
            <div class="ref-node-actions">
              <button @click="payCommission(selectedAgent)" :disabled="selectedAgent._busy" class="a-btn-sm a-btn-success">
                <span v-if="selectedAgent._busy" class="a-spinner-sm"></span>
                💸 Pay
              </button>
            </div>
          </div>

          <!-- Level 1 -->
          <div class="ref-children" v-if="treeData.level1?.length">
            <div class="ref-connector">├─ Level 1 ({{ treeData.level1.length }})</div>
            <div v-for="l1 in treeData.level1" :key="l1.id" class="ref-node ref-node--l1">
              <div class="ref-av ref-av--l1">{{ (l1.username||'?')[0].toUpperCase() }}</div>
              <div class="ref-node-info">
                <div class="ref-node-name">{{ l1.username }}</div>
                <div class="ref-node-meta">{{ l1.direct_count || 0 }} refs · {{ fmtNum(l1.balance) }} Ks</div>
              </div>
              <div class="ref-node-comm">+{{ fmtNum(l1._commission) }} Ks</div>
            </div>
            <!-- Level 2 -->
            <div class="ref-children ref-children--l2" v-if="treeData.level2?.length">
              <div class="ref-connector">└─ Level 2 ({{ treeData.level2.length }})</div>
              <div v-for="l2 in treeData.level2.slice(0,5)" :key="l2.id" class="ref-node ref-node--l2">
                <div class="ref-av ref-av--l2">{{ (l2.username||'?')[0].toUpperCase() }}</div>
                <div class="ref-node-info">
                  <div class="ref-node-name">{{ l2.username }}</div>
                  <div class="ref-node-meta">{{ fmtNum(l2.balance) }} Ks</div>
                </div>
                <div class="ref-node-comm" style="color:#0891b2;">+{{ fmtNum(l2._commission) }} Ks</div>
              </div>
              <div v-if="treeData.level2.length > 5" class="ref-more">+{{ treeData.level2.length-5 }} more L2</div>
            </div>
          </div>
          <div v-else class="a-empty-sm">No referrals found</div>
        </div>
      </div>
    </div>

    <!-- Top Referrers -->
    <div class="a-sett-block">
      <div class="a-sett-ttl" style="display:flex;align-items:center;justify-content:space-between;">
        <span>🏆 Top Referrers</span>
        <button @click="payAllPending" :disabled="bulkPayBusy" class="a-btn-sm a-btn-success">
          <span v-if="bulkPayBusy" class="a-spinner-sm"></span>
          💸 Pay All Pending
        </button>
      </div>

      <div v-if="agentsLoading" class="a-loading"><span class="a-spinner"></span></div>
      <div v-else>
        <div v-for="(agent, idx) in topReferrers" :key="agent.id" class="ref-top-row">
          <div class="ref-rank" :class="`rank-${idx+1}`">#{{ idx + 1 }}</div>
          <div class="ref-top-av">{{ (agent.username||'?')[0].toUpperCase() }}</div>
          <div class="ref-top-info">
            <div class="ref-top-name">{{ agent.username }}</div>
            <div class="ref-top-meta">{{ agent.direct_count || 0 }} referrals · {{ fmtNum(agent.total_commission || 0) }} Ks total</div>
          </div>
          <div class="ref-top-right">
            <div class="ref-pending" v-if="(agent.available_commission||0) > 0">
              <span class="ref-pending-amt">{{ fmtNum(agent.available_commission) }} Ks</span>
              <span class="ref-pending-label">pending</span>
            </div>
            <button @click="payCommission(agent)" :disabled="agent._busy || (agent.available_commission||0) < 1" class="a-btn-sm a-btn-success">
              <span v-if="agent._busy" class="a-spinner-sm"></span>
              Pay
            </button>
            <button @click="viewTree(agent)" class="a-btn-sm a-btn-ghost">Tree</button>
          </div>
        </div>
        <div v-if="!topReferrers.length" class="a-empty">No agents found</div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
import { supabase } from '@/supabase'

const { adminKey, agents, agentsLoading, users, fmtNum, fetchAgents, showToast, writeAudit } = useAdmin()

const treeSearch    = ref('')
const treeLoading   = ref(false)
const selectedAgent = ref(null)
const treeData      = ref({ level1: [], level2: [] })
const commSaving    = ref(false)
const bulkPayBusy   = ref(false)

const commSettings = reactive({ level1_pct: 5, level2_pct: 2, level3_pct: 1, min_payout: 10000, trigger: 'deposit', auto_payout: false })

const totalReferrals  = computed(() => agents.value.reduce((s, a) => s + (a.direct_count || 0), 0))
const totalCommission = computed(() => agents.value.reduce((s, a) => s + (a.total_commission || 0), 0))
const topReferrers    = computed(() => [...agents.value].filter(a => (a.direct_count || 0) > 0).sort((a, b) => (b.total_commission || 0) - (a.total_commission || 0)).slice(0, 20))

async function loadTree() {
  if (!treeSearch.value) return
  treeLoading.value = true
  try {
    const agent = agents.value.find(a => (a.username || '').toLowerCase() === treeSearch.value.toLowerCase()) ||
                  users.value.find(u => (u.username || '').toLowerCase() === treeSearch.value.toLowerCase())
    if (!agent) { showToast('Agent not found', 'error'); return }
    selectedAgent.value = { ...agent }

    const { data: l1 } = await supabase.from('profiles').select('id,username,balance,direct_count').eq('referred_by', agent.id)
    const l1Users = (l1 || []).map(u => ({ ...u, _commission: (Number(u.balance) || 0) * commSettings.level1_pct / 100 }))

    const l1Ids = l1Users.map(u => u.id)
    let l2Users = []
    if (l1Ids.length > 0) {
      const { data: l2 } = await supabase.from('profiles').select('id,username,balance').in('referred_by', l1Ids)
      l2Users = (l2 || []).map(u => ({ ...u, _commission: (Number(u.balance) || 0) * commSettings.level2_pct / 100 }))
    }
    treeData.value = { level1: l1Users, level2: l2Users }
  } catch (e) { showToast(e.message, 'error') }
  finally { treeLoading.value = false }
}

function viewTree(agent) {
  treeSearch.value = agent.username
  loadTree()
}

async function payCommission(agent) {
  if ((agent.available_commission || 0) < 1) { showToast('No commission to pay', 'error'); return }
  agent._busy = true
  try {
    const { error } = await supabase.rpc('admin_pay_commission', { p_key: adminKey.value, p_agent_id: agent.id }).catch(() => ({}))
    if (error) {
      await supabase.rpc('admin_adjust_balance', { p_key: adminKey.value, p_user_id: agent.id, p_amount: agent.available_commission })
    }
    showToast(`Paid ${fmtNum(agent.available_commission)} Ks to ${agent.username} ✓`, 'success')
    writeAudit('PAY_COMMISSION', agent.username, `${agent.available_commission} Ks`)
    agent.available_commission = 0
  } catch (e) { showToast(e.message, 'error') }
  finally { agent._busy = false }
}

async function payAllPending() {
  const pending = agents.value.filter(a => (a.available_commission || 0) > 0)
  if (!pending.length) { showToast('No pending commission', 'error'); return }
  bulkPayBusy.value = true
  try {
    for (const a of pending) { await payCommission(a).catch(() => {}) }
    showToast(`Paid commission to ${pending.length} agents ✓`, 'success')
    writeAudit('BULK_PAY_COMMISSION', '', `${pending.length} agents`)
  } finally { bulkPayBusy.value = false }
}

async function saveCommSettings() {
  commSaving.value = true
  try {
    await supabase.rpc('admin_save_settings', { p_key: adminKey.value, p_settings: { referral_level1_pct: commSettings.level1_pct, referral_level2_pct: commSettings.level2_pct, referral_level3_pct: commSettings.level3_pct, referral_min_payout: commSettings.min_payout, referral_trigger: commSettings.trigger, referral_auto_payout: commSettings.auto_payout } })
    showToast('Commission settings saved ✓', 'success')
    writeAudit('SAVE_COMMISSION_SETTINGS', '', '')
  } catch (e) { showToast(e.message, 'error') }
  finally { commSaving.value = false }
}

onMounted(async () => { await fetchAgents() })
</script>

<style scoped>
.ref-stats-grid { display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:12px; }
.ref-stat { background:#fff;border-radius:10px;padding:10px;text-align:center; }
.ref-stat-val { font-size:22px;font-weight:900;line-height:1;margin-bottom:3px; }
.ref-stat-lbl { font-size:9px;color:#94a3b8;font-weight:600; }
.ref-sett-grid { display:grid;grid-template-columns:1fr 1fr;gap:8px; }
.ref-search-row { display:flex;gap:8px;margin-bottom:12px; }
.ref-tree { padding-left:4px; }
.ref-tree-root { position:relative; }
.ref-node { display:flex;align-items:center;gap:10px;padding:8px 6px;background:#fff;border-radius:8px;margin-bottom:4px; }
.ref-node--root { border:2px solid #4f46e5;background:#f5f3ff; }
.ref-node--l1 { border-left:3px solid #0891b2;margin-left:16px; }
.ref-node--l2 { border-left:3px solid #16a34a;margin-left:32px; }
.ref-av { width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#4f46e5,#0891b2);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;flex-shrink:0; }
.ref-av--l1 { background:linear-gradient(135deg,#0891b2,#16a34a); }
.ref-av--l2 { background:linear-gradient(135deg,#16a34a,#d97706); }
.ref-node-info { flex:1;min-width:0; }
.ref-node-name { font-size:11px;font-weight:700;color:#0f172a; }
.ref-node-meta { font-size:9px;color:#94a3b8;margin-top:1px; }
.ref-node-comm { font-size:10px;font-weight:700;color:#16a34a;flex-shrink:0; }
.ref-node-actions { flex-shrink:0; }
.ref-children { padding-left:16px;margin-top:4px; }
.ref-children--l2 { padding-left:32px; }
.ref-connector { font-size:9px;color:#94a3b8;padding:3px 0;font-family:monospace; }
.ref-more { font-size:9px;color:#94a3b8;padding:4px 8px; }
.ref-top-row { display:flex;align-items:center;gap:8px;padding:9px 0;border-bottom:1px solid #f1f5f9; }
.ref-rank { font-size:11px;font-weight:900;color:#94a3b8;width:24px;flex-shrink:0;text-align:center; }
.rank-1 { color:#d97706; } .rank-2 { color:#64748b; } .rank-3 { color:#b45309; }
.ref-top-av { width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#4f46e5,#0891b2);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:#fff;flex-shrink:0; }
.ref-top-info { flex:1;min-width:0; }
.ref-top-name { font-size:11px;font-weight:700;color:#0f172a; }
.ref-top-meta { font-size:9px;color:#94a3b8; }
.ref-top-right { display:flex;align-items:center;gap:4px;flex-shrink:0; }
.ref-pending { display:flex;flex-direction:column;align-items:flex-end; }
.ref-pending-amt { font-size:10px;font-weight:700;color:#16a34a; }
.ref-pending-label { font-size:8px;color:#94a3b8; }
</style>
