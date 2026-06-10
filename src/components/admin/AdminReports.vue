<template>
  <div class="a-tab-content">

    <!-- Date Filter -->
    <div class="a-sett-block">
      <div class="a-sett-ttl">Report Range</div>
      <div class="a-form-row">
        <div class="a-form-col">
          <label class="a-mini-label">From</label>
          <input v-model="reportFrom" type="date" class="a-input a-input-sm" />
        </div>
        <div class="a-form-col">
          <label class="a-mini-label">To</label>
          <input v-model="reportTo" type="date" class="a-input a-input-sm" />
        </div>
      </div>
      <div class="a-form-row" style="margin-top:7px;">
        <button @click="loadReport" :disabled="reportLoading" class="a-btn-primary a-btn-sm a-btn-primary-sm" style="flex:1;padding:9px;">
          <span v-if="reportLoading" class="a-spinner-sm"></span>
          <svg v-else width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10"/></svg>
          {{ reportLoading ? 'Loading...' : 'Generate Report' }}
        </button>
        <button @click="exportTxCsv" :disabled="!reportData.txList.length" class="a-btn-sm a-btn-ghost" style="flex:1;padding:9px;">
          <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          Export CSV
        </button>
      </div>
    </div>

    <!-- Summary Cards -->
    <div v-if="reportData.ready" class="a-metrics-grid" style="margin-bottom:10px;">
      <div class="a-mcard">
        <div class="a-mcard-val" style="color:#0891b2;">{{ fmtNum(reportData.totalDeposit) }}</div>
        <div class="a-mcard-lbl">Total IN (Ks)</div>
        <div class="a-mbar"><div class="a-mbar-fill" style="width:100%;background:#0891b2;"></div></div>
      </div>
      <div class="a-mcard">
        <div class="a-mcard-val" style="color:#dc2626;">{{ fmtNum(reportData.totalWithdraw) }}</div>
        <div class="a-mcard-lbl">Total OUT (Ks)</div>
        <div class="a-mbar"><div class="a-mbar-fill" :style="{width: Math.min(100,Math.round(reportData.totalWithdraw/Math.max(reportData.totalDeposit,1)*100))+'%', background:'#dc2626'}"></div></div>
      </div>
      <div class="a-mcard">
        <div class="a-mcard-val" :style="{color:(reportData.totalDeposit-reportData.totalWithdraw)>=0?'#16a34a':'#dc2626'}">{{ fmtNum(reportData.totalDeposit - reportData.totalWithdraw) }}</div>
        <div class="a-mcard-lbl">Net Flow (Ks)</div>
        <div class="a-mbar"><div class="a-mbar-fill" style="width:50%;background:#16a34a;"></div></div>
      </div>
      <div class="a-mcard">
        <div class="a-mcard-val">{{ reportData.newUsers }}</div>
        <div class="a-mcard-lbl">New Users</div>
        <div class="a-mbar"><div class="a-mbar-fill" style="width:40%;background:#4f46e5;"></div></div>
      </div>
    </div>

    <!-- Method breakdown -->
    <div v-if="reportData.ready" class="a-area-block" style="margin-bottom:8px;">
      <div class="a-area-hdr"><span class="a-area-ttl">By Payment Method</span></div>
      <div v-for="m in reportData.byMethod" :key="m.method" class="a-method-row">
        <div class="a-method-badge a-method-badge--in">{{ m.method }}</div>
        <div class="a-method-stats">
          <span class="a-method-count">{{ m.depCount }}x IN</span>
          <span class="a-val-in">{{ fmtNum(m.depTotal) }} Ks</span>
          <span class="a-method-count" style="margin-left:8px;">{{ m.wdCount }}x OUT</span>
          <span class="a-val-out">{{ fmtNum(m.wdTotal) }} Ks</span>
        </div>
      </div>
      <div v-if="!reportData.byMethod.length" class="a-empty-sm">No data in range</div>
    </div>

    <!-- TX table -->
    <div v-if="reportData.ready" class="a-area-block">
      <div class="a-area-hdr">
        <span class="a-area-ttl">Transactions ({{ reportData.txList.length }})</span>
      </div>
      <div v-for="tx in reportData.txList.slice(0,50)" :key="tx.id" class="a-ptx-row">
        <span class="a-io-badge" :class="tx.type==='deposit'?'badge-in':'badge-out'">{{ tx.type==='deposit'?'IN':'OUT' }}</span>
        <span class="a-ptx-method">{{ tx.username || tx.user_id?.slice(0,8) }}</span>
        <span class="a-ptx-method">{{ tx.method }}</span>
        <span class="a-ptx-amt" :class="tx.type==='deposit'?'a-val-in':'a-val-out'">{{ fmtNum(tx.amount) }} Ks</span>
        <span class="a-ptx-date">{{ fmtDate(tx.created_at) }}</span>
        <span class="a-ptx-status" :class="'sdot-'+tx.status">{{ tx.status }}</span>
      </div>
      <div v-if="reportData.txList.length > 50" class="a-empty-sm">Showing first 50 — export CSV for full list</div>
      <div v-if="!reportData.txList.length" class="a-empty-sm">No transactions in range</div>
    </div>

  </div>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
const { reportFrom, reportTo, reportData, reportLoading, fmtNum, fmtDate, loadReport, exportTxCsv } = useAdmin()
</script>
