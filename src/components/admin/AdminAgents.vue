<template>
  <div class="a-tab-content">

    <!-- Summary cards -->
    <div class="a-metrics-grid" style="margin-bottom:10px;">
      <div class="a-mcard">
        <div class="a-mcard-icon"><svg width="14" height="14" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0"/></svg></div>
        <div class="a-mcard-val">{{ agentStats.total_agents }}</div>
        <div class="a-mcard-lbl">Total Agents</div>
        <div class="a-mbar"><div class="a-mbar-fill" style="width:100%;background:#4f46e5;"></div></div>
      </div>
      <div class="a-mcard">
        <div class="a-mcard-icon" style="background:#fef9c3;"><svg width="14" height="14" fill="none" stroke="#d97706" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1"/></svg></div>
        <div class="a-mcard-val" style="color:#d97706;">{{ agentStats.pending_commission }}</div>
        <div class="a-mcard-lbl">Pending Payouts</div>
        <div class="a-mbar"><div class="a-mbar-fill" style="width:60%;background:#d97706;"></div></div>
      </div>
      <div class="a-mcard">
        <div class="a-mcard-icon" style="background:#dcfce7;"><svg width="14" height="14" fill="none" stroke="#16a34a" stroke-width="2" viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
        <div class="a-mcard-val" style="color:#16a34a;">{{ fmtNum(agentStats.total_paid) }}</div>
        <div class="a-mcard-lbl">Total Paid (Ks)</div>
        <div class="a-mbar"><div class="a-mbar-fill" style="width:75%;background:#16a34a;"></div></div>
      </div>
      <div class="a-mcard">
        <div class="a-mcard-icon" style="background:#e0f2fe;"><svg width="14" height="14" fill="none" stroke="#0891b2" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg></div>
        <div class="a-mcard-val" style="color:#0891b2;">{{ fmtNum(agentStats.total_commission) }}</div>
        <div class="a-mcard-lbl">Total Earned (Ks)</div>
        <div class="a-mbar"><div class="a-mbar-fill" style="width:50%;background:#0891b2;"></div></div>
      </div>
    </div>

    <!-- Filter -->
    <div class="a-filter-bar">
      <select v-model="agentFilter" class="a-select">
        <option value="all">All Agents</option>
        <option value="pending">Pending Payout</option>
        <option value="high">High Earners</option>
      </select>
      <input v-model="agentQ" class="a-input a-srch" placeholder="Search agent..." />
      <button @click="fetchAgents" class="a-btn-primary a-btn-sm-p">↻</button>
    </div>

    <div v-if="agentsLoading" class="a-loading"><span class="a-spinner"></span></div>
    <div v-else>
      <div v-if="!filteredAgents.length" class="a-empty">No agents found</div>
      <div v-for="a in filteredAgents" :key="a.id" class="a-agent-row">
        <div class="a-uav" style="background:linear-gradient(135deg,#d97706,#f59e0b);">{{ (a.username||'?')[0].toUpperCase() }}</div>
        <div class="a-uinfo">
          <span class="a-uname">{{ a.username }}</span>
          <span class="a-umeta">{{ a.direct_count || 0 }} directs · Level {{ a.agent_level || 1 }}</span>
        </div>
        <div class="a-agent-right">
          <span class="a-agent-comm" :class="(a.available_commission||0)>0?'comm-pos':'comm-zero'">
            {{ fmtNum(a.available_commission || 0) }} Ks
          </span>
          <span class="a-mini-label" style="margin:0;text-align:right;">available</span>
        </div>
        <!-- Pay Commission Button -->
        <button
          v-if="(a.available_commission||0) > 0"
          @click="openPayModal(a)"
          class="a-btn-sm a-btn-pay"
          :disabled="payBusy[a.id]"
        >
          <span v-if="payBusy[a.id]" class="a-spinner-sm"></span>
          <template v-else>💸 Pay</template>
        </button>
        <button class="a-eye-btn" @click="openPlayer(a)" title="View Details">
          <svg width="14" height="14" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Commission Withdrawal Requests -->
    <div class="a-area-block" style="margin-top:10px;">
      <div class="a-area-hdr">
        <span class="a-area-ttl">Commission Withdrawal Requests</span>
        <button @click="fetchCommTx" class="a-icon-btn">↻</button>
      </div>
      <div v-if="commTxLoading" class="a-mini-load"><span class="a-spinner-sm"></span></div>
      <div v-else>
        <div v-for="tx in commTxList" :key="tx.id" class="a-tx-row">
          <div style="flex:1;">
            <div class="a-tx-top">
              <span class="a-io-badge badge-out">OUT</span>
              <span class="a-tx-amt">{{ fmtNum(tx.amount) }} Ks</span>
              <span class="a-sbadge" :class="'sb-'+tx.status">{{ tx.status }}</span>
            </div>
            <div class="a-tx-meta">
              <span>{{ tx.username || tx.user_id?.slice(0,8) }}</span>
              <span>{{ tx.method }}</span>
              <span>{{ fmtDate(tx.created_at) }}</span>
            </div>
          </div>
          <div v-if="tx.status==='pending'" style="display:flex;gap:4px;">
            <button @click="doApprove(tx.id,'approve')" class="a-btn-sm a-btn-success">✓</button>
            <button @click="doApprove(tx.id,'reject')" class="a-btn-sm a-btn-danger">✗</button>
          </div>
        </div>
        <div v-if="!commTxList.length" class="a-empty-sm">No pending commission withdrawals</div>
      </div>
    </div>

    <!-- Payout History -->
    <div class="a-area-block" style="margin-top:10px;">
      <div class="a-area-hdr">
        <span class="a-area-ttl">Recent Payouts</span>
        <button @click="loadPayoutHistory" class="a-icon-btn">↻</button>
      </div>
      <div v-if="payHistLoading" class="a-mini-load"><span class="a-spinner-sm"></span></div>
      <div v-else>
        <div v-for="p in payoutHistory" :key="p.id" class="payout-row">
          <span class="payout-agent">{{ p.agent_username || p.agent_id?.slice(0,8) }}</span>
          <span class="payout-amt">{{ fmtNum(p.amount) }} Ks</span>
          <span class="payout-note">{{ p.note || 'Commission payout' }}</span>
          <span class="payout-date">{{ fmtDate(p.created_at) }}</span>
        </div>
        <div v-if="!payoutHistory.length" class="a-empty-sm">No payout history</div>
      </div>
    </div>

    <!-- Pay Modal -->
    <Transition name="bulk-slide">
      <div v-if="payModal.open" class="tx-overlay" @click.self="payModal.open=false">
        <div class="tx-card">
          <h3 class="tx-card-title">💸 Pay Commission</h3>
          <p class="tx-card-sub">Agent: <strong>{{ payModal.agent?.username }}</strong></p>
          <div class="detail-row">
            <span class="dl">Available</span>
            <span class="dv" style="color:#16a34a;">{{ fmtNum(payModal.agent?.available_commission||0) }} Ks</span>
          </div>
          <label class="a-mini-label" style="margin-top:12px;">Amount (Ks)</label>
          <input v-model.number="payModal.amount" type="number" class="a-input"
            :max="payModal.agent?.available_commission" placeholder="Enter amount..." />
          <div style="display:flex;gap:6px;margin-top:4px;">
            <button @click="payModal.amount=Math.floor(payModal.agent?.available_commission||0)" class="a-btn-sm a-btn-ghost" style="font-size:10px;">Full</button>
            <button @click="payModal.amount=Math.floor((payModal.agent?.available_commission||0)/2)" class="a-btn-sm a-btn-ghost" style="font-size:10px;">Half</button>
          </div>
          <label class="a-mini-label" style="margin-top:8px;">Note (optional)</label>
          <input v-model="payModal.note" class="a-input" placeholder="e.g. June commission payout" />
          <p v-if="payModal.msg" :class="payModal.ok?'a-ok':'a-err'" style="font-size:10px;margin-top:6px;">{{ payModal.msg }}</p>
          <div style="display:flex;gap:8px;margin-top:12px;">
            <button @click="payModal.open=false" class="a-btn-sm a-btn-ghost" style="flex:1;">Cancel</button>
            <button @click="confirmPay" :disabled="payModal.busy||!payModal.amount" class="a-btn-sm a-btn-success" style="flex:2;">
              <span v-if="payModal.busy" class="a-spinner-sm"></span>
              {{ payModal.busy ? 'Processing...' : 'Confirm Pay' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { supabase } from '@/supabase'
import { useAdmin } from '@/composables/useAdmin'

const {
  agents, agentsLoading, agentQ, agentFilter, agentStats, filteredAgents,
  commTxList, commTxLoading,
  fmtNum, fmtDate, showToast, writeAudit,
  fetchAgents, fetchCommTx, openPlayer, doApprove, SUPA_URL, adminKey
} = useAdmin()

const payBusy = reactive({})
const payModal = reactive({ open: false, agent: null, amount: 0, note: '', busy: false, msg: '', ok: false })
const payoutHistory = ref([])
const payHistLoading = ref(false)

function openPayModal(agent) {
  Object.assign(payModal, {
    open: true, agent,
    amount: Math.floor(agent.available_commission || 0),
    note: '', busy: false, msg: '', ok: false
  })
}

async function confirmPay() {
  if (!payModal.amount || payModal.amount <= 0) return
  payModal.busy = true; payModal.msg = ''
  try {
    const res = await fetch(`${SUPA_URL}/functions/v1/admin_pay_commission`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${adminKey.value}` },
      body: JSON.stringify({ agent_id: payModal.agent.id, amount: payModal.amount, note: payModal.note })
    })
    const d = await res.json()
    if (d.error) throw new Error(d.error)
    payModal.ok = true; payModal.msg = `✓ Paid ${fmtNum(payModal.amount)} Ks successfully!`
    showToast(`Paid ${fmtNum(payModal.amount)} Ks to ${payModal.agent.username}`, 'success')
    writeAudit('PAY_COMMISSION', payModal.agent.username, `${payModal.amount} Ks`)
    // Update local state
    const ag = agents.value.find(a => a.id === payModal.agent.id)
    if (ag) {
      ag.available_commission = (Number(ag.available_commission) - payModal.amount)
      ag.total_commission_paid = (Number(ag.total_commission_paid || 0) + payModal.amount)
    }
    await loadPayoutHistory()
    setTimeout(() => { payModal.open = false }, 2000)
  } catch (e) { payModal.ok = false; payModal.msg = e.message }
  finally { payModal.busy = false }
}

async function loadPayoutHistory() {
  payHistLoading.value = true
  try {
    const { data } = await supabase.from('agent_payouts')
      .select('*, users!agent_payouts_agent_id_fkey(username)')
      .order('created_at', { ascending: false }).limit(20)
    payoutHistory.value = (data || []).map(p => ({ ...p, agent_username: p.users?.username }))
  } catch (e) {} finally { payHistLoading.value = false }
}

onMounted(() => { fetchAgents(); fetchCommTx(); loadPayoutHistory() })
</script>

<style scoped>
.a-agent-row { display:flex;align-items:center;gap:8px;padding:9px 4px;border-bottom:1px solid #f1f5f9; }
.a-agent-right { display:flex;flex-direction:column;align-items:flex-end;gap:2px;flex-shrink:0; }
.a-agent-comm { font-size:12px;font-weight:900; }
.comm-pos { color:#16a34a; }
.comm-zero { color:#94a3b8; }
.a-btn-pay { background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;border:none;padding:5px 10px;border-radius:6px;font-size:10px;font-weight:700;cursor:pointer;flex-shrink:0; }
.a-btn-pay:disabled { opacity:.6;cursor:not-allowed; }
.payout-row { display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid #f8fafc;font-size:10px; }
.payout-agent { font-weight:700;color:#0f172a;flex:1; }
.payout-amt { font-weight:800;color:#16a34a;flex-shrink:0; }
.payout-note { color:#94a3b8;flex:2;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
.payout-date { color:#94a3b8;flex-shrink:0; }
.tx-overlay { position:fixed;inset:0;z-index:9000;background:rgba(15,23,42,.5);display:flex;align-items:center;justify-content:center;padding:16px; }
.tx-card { background:#fff;border-radius:12px;padding:18px;width:100%;max-width:340px;box-shadow:0 20px 60px rgba(0,0,0,.3); }
.tx-card-title { font-size:15px;font-weight:800;color:#0f172a;margin:0 0 4px; }
.tx-card-sub { font-size:11px;color:#64748b;margin:0 0 10px; }
.detail-row { display:flex;align-items:center;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f1f5f9; }
.dl { font-size:10px;color:#94a3b8;font-weight:600; }
.dv { font-size:11px;color:#0f172a;font-weight:700; }
.bulk-slide-enter-active,.bulk-slide-leave-active { transition:all .2s; }
.bulk-slide-enter-from,.bulk-slide-leave-to { opacity:0;transform:scale(0.96); }
</style>
