<template>
  <div class="a-tab-content">
    <div class="a-metrics-grid">
      <div class="a-mcard" v-for="m in metricCards" :key="m.key">
        <div class="a-mcard-icon"><svg width="15" height="15" fill="none" stroke="#4f46e5" stroke-width="2" viewBox="0 0 24 24" v-html="m.svg"></svg></div>
        <div class="a-mcard-val" :class="m.cls">{{ fmtNum(m.val) }}</div>
        <div class="a-mcard-lbl">{{ m.label }}</div>
        <div class="a-mbar"><div class="a-mbar-fill" :style="{ width: m.pct + '%', background: m.color }"></div></div>
      </div>
    </div>

    <div class="a-row-2col">
      <div class="a-chart-area">
        <div class="a-area-hdr">
          <span class="a-area-ttl">7-Day Flow</span>
          <button @click="loadChart" class="a-icon-btn" :class="{ spinning: chartLoading }">
            <svg width="12" height="12" fill="none" stroke="#4f46e5" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          </button>
        </div>
        <svg viewBox="0 0 252 72" class="a-barchart">
          <line v-for="y in [18,36,54]" :key="y" :x1="0" :y1="y" :x2="252" :y2="y" stroke="#e2e8f0" stroke-width="1"/>
          <g v-for="(d,i) in chartData" :key="i">
            <rect :x="i*36+2"  :y="72-d.dH" width="14" :height="d.dH" fill="url(#dg)" rx="2"/>
            <rect :x="i*36+18" :y="72-d.wH" width="14" :height="d.wH" fill="url(#wg)" rx="2"/>
            <text :x="i*36+18" y="71" font-size="5" fill="#94a3b8" text-anchor="middle">{{ d.l }}</text>
          </g>
          <defs>
            <linearGradient id="dg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4f46e5"/><stop offset="100%" stop-color="rgba(79,70,229,0.15)"/></linearGradient>
            <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#dc2626"/><stop offset="100%" stop-color="rgba(220,38,38,0.15)"/></linearGradient>
          </defs>
        </svg>
        <div class="a-legend">
          <span class="a-leg-dot" style="background:#4f46e5"></span><span>Deposits</span>
          <span class="a-leg-dot" style="background:#dc2626;margin-left:10px;"></span><span>Withdrawals</span>
        </div>
      </div>

      <div class="a-gauges">
        <div class="a-g-area">
          <div class="a-area-ttl" style="margin-bottom:6px;">Net Flow</div>
          <svg viewBox="0 0 80 48" class="a-gauge-svg">
            <path d="M10 42 A30 30 0 0 1 70 42" fill="none" stroke="#e2e8f0" stroke-width="9" stroke-linecap="round"/>
            <path d="M10 42 A30 30 0 0 1 70 42" fill="none" stroke="url(#gg)" stroke-width="9" stroke-linecap="round" :stroke-dasharray="`${gaugeArc} 95`"/>
            <text x="40" y="40" font-size="10" font-weight="800" fill="#0f172a" text-anchor="middle">{{ netPct }}%</text>
            <defs><linearGradient id="gg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#4f46e5"/><stop offset="100%" stop-color="#0891b2"/></linearGradient></defs>
          </svg>
          <div style="font-size:9px;color:#64748b;text-align:center;">{{ fmtNum(netFlow) }} Ks net</div>
        </div>
        <div class="a-g-area">
          <div class="a-area-ttl" style="margin-bottom:4px;">Platform</div>
          <div class="a-big-n">{{ fmtNum(stats.total_balance) }}</div>
          <div style="font-size:8px;color:#94a3b8;">Kyat</div>
          <div class="a-pbar"><div class="a-pbar-fill" :style="{ width: Math.min(100,(stats.total_balance||0)/10000000*100)+'%' }"></div></div>
          <div style="font-size:8px;color:#94a3b8;margin-top:2px;">of 10M cap</div>
        </div>
      </div>
    </div>

    <div class="a-area-block" style="margin-bottom:8px;">
      <div class="a-area-hdr"><span class="a-area-ttl">System Health</span><span class="a-live">LIVE</span></div>
      <div v-for="h in healthBars" :key="h.label" class="a-health">
        <span class="a-health-l">{{ h.label }}</span>
        <div class="a-health-t"><div class="a-health-f" :style="{ width: h.pct+'%', background: h.c }"></div></div>
        <span class="a-health-v">{{ h.pct }}%</span>
      </div>
    </div>

    <div class="a-area-block">
      <div class="a-area-hdr">
        <span class="a-area-ttl">Recent Transactions</span>
        <button @click="$emit('switch-tab', 1)" class="a-lnk">View All</button>
      </div>
      <div v-if="recentLoading" class="a-mini-load"><span class="a-spinner-sm"></span></div>
      <div v-else>
        <div v-for="tx in recentTx" :key="tx.id" class="a-rtx">
          <div class="a-rtx-dot" :class="tx.type==='deposit'?'dot-in':'dot-out'"></div>
          <span class="a-io-badge" :class="tx.type==='deposit'?'badge-in':'badge-out'">{{ tx.type==='deposit'?'IN':'OUT' }}</span>
          <span class="a-rtx-user">{{ tx.user_id?.slice(0,8) }}...</span>
          <span class="a-rtx-method">{{ tx.method }}</span>
          <span class="a-rtx-amt" :class="tx.type==='deposit'?'a-val-in':'a-val-out'">{{ fmtNum(tx.amount) }}</span>
        </div>
        <div v-if="!recentTx.length" class="a-empty-sm">No recent transactions</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdmin } from '@/composables/useAdmin'
const {
  stats, chartLoading, chartData, recentLoading, recentTx,
  netFlow, netPct, gaugeArc, healthBars, metricCards,
  fmtNum, loadChart,
} = useAdmin()

defineEmits(['switch-tab'])
</script>
