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
          <span class="a-agent-comm">{{ fmtNum(a.available_commission || 0) }} Ks</span>
          <span class="a-mini-label" style="margin:0;text-align:right;">available</span>
        </div>
        <button class="a-eye-btn" @click="openPlayer(a)" title="View Details">
          <svg width="14" height="14" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Pending commission withdrawals -->
    <div class="a-area-block" style="margin-top:10px;">
      <div class="a-area-hdr">
        <span class="a-area-ttl">Commission Withdrawal Requests</span>
      </div>
      <div v-if="commTxLoading" class="a-mini-load"><span class="a-spinner-sm"></span></div>
      <div v-else>
        <div v-for="tx in commTxList" :key="tx.id" class="a-tx-row">
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
          <div v-if="tx.status==='pending'" class="a-tx-actions">
            <button @click="doApprove(tx.id,'approve')" class="a-btn-sm a-btn-success">✓ Approve</button>
            <button @click="doApprove(tx.id,'reject')" class="a-btn-sm a-btn-danger">✕ Reject</button>
          </div>
        </div>
        <div v-if="!commTxList.length" class="a-empty-sm">No commission withdrawals</div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
const {
  agentsLoading, agentFilter, agentQ, filteredAgents, agentStats,
  commTxList, commTxLoading,
  fmtNum, fmtDate, openPlayer, doApprove
} = useAdmin()
</script>
