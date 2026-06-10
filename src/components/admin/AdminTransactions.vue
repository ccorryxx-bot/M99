<template>
  <div class="a-tab-content">
    <div class="a-filter-bar">
      <select v-model="txFilter.status" class="a-select">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="rejected">Rejected</option>
      </select>
      <select v-model="txFilter.type" class="a-select">
        <option value="">All Types</option>
        <option value="deposit">Deposit</option>
        <option value="withdraw">Withdraw</option>
      </select>
      <button @click="fetchTx" class="a-btn-primary a-btn-sm-p">Search</button>
    </div>

    <div v-if="txLoading" class="a-loading"><span class="a-spinner"></span></div>
    <div v-else-if="txErr" class="a-err">{{ txErr }}</div>
    <div v-else>
      <div v-for="tx in txList" :key="tx.id" class="a-tx-row">
        <div class="a-tx-top">
          <span class="a-io-badge" :class="tx.type==='deposit'?'badge-in':'badge-out'">{{ tx.type==='deposit'?'IN':'OUT' }}</span>
          <span class="a-tx-amt">{{ Number(tx.amount).toLocaleString() }} Ks</span>
          <span class="a-sbadge" :class="`sb-${tx.status}`">{{ tx.status }}</span>
        </div>
        <div class="a-tx-meta">
          <span>{{ tx.user_id?.slice(0,8) }}...</span>
          <span>{{ tx.method }}</span>
          <span>{{ tx.slip_last5 || tx.phone || '—' }}</span>
          <span>{{ fmtDate(tx.created_at) }}</span>
        </div>
        <div v-if="tx.status==='pending'" class="a-tx-actions">
          <button @click="doApprove(tx.id,'approve')" class="a-btn-sm a-btn-success">Approve</button>
          <button @click="doApprove(tx.id,'reject')"  class="a-btn-sm a-btn-danger">Reject</button>
        </div>
      </div>
      <div v-if="!txList.length" class="a-empty">No transactions</div>
    </div>
  </div>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
const { txFilter, txList, txLoading, txErr, fmtDate, fetchTx, doApprove } = useAdmin()
</script>
