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
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:6px;margin-top:7px;">
        <button @click="loadReport" :disabled="reportLoading" class="a-btn-primary a-btn-sm-p">
          <span v-if="reportLoading" class="a-spinner-sm"></span>
          <svg v-else width="11" height="11" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10"/></svg>
          {{ reportLoading ? 'Loading...' : 'Generate' }}
        </button>
        <button @click="exportTxCsv" :disabled="!reportData.txList.length" class="a-btn-sm a-btn-ghost">
          <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
          CSV
        </button>
        <button @click="exportReportXlsx" :disabled="!reportData.txList.length" class="a-btn-sm a-btn-xlsx">
          <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
          XLSX
        </button>
        <button @click="sendTelegramDailySummary" :disabled="!sett.telegram_bot_token" class="a-btn-sm a-btn-tg">
          <svg width="11" height="11" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
          Telegram
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
      <div v-for="tx in reportData.txList.slice(0,100)" :key="tx.id" class="a-ptx-row">
        <span class="a-io-badge" :class="tx.type==='deposit'?'badge-in':'badge-out'">{{ tx.type==='deposit'?'IN':'OUT' }}</span>
        <span class="a-ptx-method">{{ tx.username || tx.user_id?.slice(0,8) }}</span>
        <span class="a-ptx-method">{{ tx.method }}</span>
        <span class="a-ptx-amt" :class="tx.type==='deposit'?'a-val-in':'a-val-out'">{{ fmtNum(tx.amount) }} Ks</span>
        <span class="a-ptx-date">{{ fmtDate(tx.created_at) }}</span>
        <span class="a-ptx-status" :class="'sdot-'+tx.status">{{ tx.status }}</span>
      </div>
      <div v-if="!reportData.txList.length && !reportLoading" class="a-empty-sm">Generate report first</div>
    </div>

    <div v-if="!reportData.ready && !reportLoading" class="a-empty" style="padding:40px 0;">
      <svg width="36" height="36" fill="none" stroke="#e2e8f0" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
      <p style="font-size:11px;color:#94a3b8;margin:0;">Select date range and tap Generate</p>
    </div>
  </div>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
const {
  reportFrom, reportTo, reportData, reportLoading, sett,
  fmtNum, fmtDate,
  loadReport, exportTxCsv, exportReportXlsx, sendTelegramDailySummary
} = useAdmin()
</script>

<style scoped>
.a-btn-xlsx { background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;border:none;padding:9px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px; }
.a-btn-xlsx:disabled { opacity:.4;cursor:not-allowed; }
.a-btn-tg { background:linear-gradient(135deg,#0891b2,#0e7490);color:#fff;border:none;padding:9px;border-radius:7px;font-size:10px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px; }
.a-btn-tg:disabled { opacity:.4;cursor:not-allowed; }
.a-ptx-row { display:flex;align-items:center;gap:6px;padding:6px 0;border-bottom:1px solid #f1f5f9;font-size:10px; }
.a-ptx-method { flex:1;color:#64748b; }
.a-ptx-amt { flex-shrink:0;font-weight:700; }
.a-ptx-date { color:#94a3b8;flex-shrink:0; }
.a-ptx-status { font-size:9px;padding:1px 5px;border-radius:3px;flex-shrink:0; }
.sdot-confirmed { background:#dcfce7;color:#15803d; }
.sdot-pending { background:#fef9c3;color:#854d0e; }
.sdot-rejected { background:#fee2e2;color:#dc2626; }
</style>
