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

    <!-- GGR Section -->
    <div class="a-area-block" style="margin-bottom:8px;">
      <div class="a-area-hdr">
        <span class="a-area-ttl">GGR — Gross Gaming Revenue</span>
        <div style="display:flex;align-items:center;gap:6px;">
          <input v-model="ggrFrom" type="date" style="font-size:9px;border:1px solid #e2e8f0;border-radius:5px;padding:2px 5px;width:90px;outline:none;" />
          <input v-model="ggrTo" type="date" style="font-size:9px;border:1px solid #e2e8f0;border-radius:5px;padding:2px 5px;width:90px;outline:none;" />
          <button @click="loadGGR" :disabled="ggrLoading" class="a-icon-btn">
            <svg width="11" height="11" fill="none" stroke="#4f46e5" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
          </button>
        </div>
      </div>
      <div v-if="ggrLoading" class="a-mini-load"><span class="a-spinner-sm"></span></div>
      <div v-else>
        <!-- GGR Summary Cards -->
        <div class="ggr-cards" style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:8px;">
          <div class="ggr-card">
            <div class="ggr-card-val" style="color:#4f46e5;">{{ fmtNum(ggrData.totalBet) }}</div>
            <div class="ggr-card-lbl">Total Bets (Ks)</div>
          </div>
          <div class="ggr-card">
            <div class="ggr-card-val" style="color:#dc2626;">{{ fmtNum(ggrData.totalWin) }}</div>
            <div class="ggr-card-lbl">Total Wins (Ks)</div>
          </div>
          <div class="ggr-card" :style="`border-color:${ggrData.ggr>=0?'#16a34a':'#dc2626'}`">
            <div class="ggr-card-val" :style="`color:${ggrData.ggr>=0?'#16a34a':'#dc2626'}`">{{ fmtNum(Math.abs(ggrData.ggr)) }}</div>
            <div class="ggr-card-lbl">GGR ({{ ggrData.ggrPct }}%)</div>
          </div>
        </div>

        <!-- No data state -->
        <div v-if="!ggrData.ready || !ggrData.byGame.length" class="ggr-empty">
          <svg width="28" height="28" fill="none" stroke="#e2e8f0" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
          <p style="font-size:10px;color:#94a3b8;margin:6px 0 0;">No betting data yet.<br>Games will appear here when players start betting.</p>
          <button @click="loadGGR" class="a-btn-sm a-btn-ghost" style="margin-top:8px;">Load Now</button>
        </div>

        <!-- By Game Breakdown -->
        <div v-else>
          <div style="font-size:9px;font-weight:700;color:#94a3b8;margin-bottom:4px;text-transform:uppercase;">By Game</div>
          <div v-for="g in ggrData.byGame.slice(0,8)" :key="g.name" class="ggr-game-row">
            <div class="ggr-game-info">
              <span class="ggr-game-name">{{ g.name }}</span>
              <span class="ggr-game-prov">{{ g.provider }}</span>
              <span class="ggr-rounds">{{ g.rounds }} rounds</span>
            </div>
            <div class="ggr-game-nums">
              <span style="color:#4f46e5;font-size:9px;">{{ fmtNum(g.bet) }}</span>
              <span style="color:#94a3b8;font-size:8px;">→</span>
              <span :style="`color:${g.ggr>=0?'#16a34a':'#dc2626'};font-size:10px;font-weight:800;`">{{ fmtNum(g.ggr) }}</span>
            </div>
          </div>
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
import { onMounted } from 'vue'
import { useAdmin } from '@/composables/useAdmin'
const {
  stats, chartLoading, chartData, recentLoading, recentTx,
  netFlow, netPct, gaugeArc, healthBars, metricCards,
  ggrData, ggrLoading, ggrFrom, ggrTo,
  fmtNum, loadChart, loadGGR,
} = useAdmin()

defineEmits(['switch-tab'])
onMounted(() => loadGGR())
</script>

<style scoped>
.ggr-cards .ggr-card { background:#f8fafc;border-radius:8px;padding:8px;text-align:center;border:1px solid #e2e8f0; }
.ggr-card-val { font-size:16px;font-weight:900;line-height:1;margin-bottom:3px; }
.ggr-card-lbl { font-size:8px;color:#94a3b8;font-weight:600;text-transform:uppercase; }
.ggr-game-row { display:flex;align-items:center;justify-content:space-between;padding:5px 0;border-bottom:1px solid #f1f5f9; }
.ggr-game-info { display:flex;flex-direction:column;gap:1px;flex:1;min-width:0; }
.ggr-game-name { font-size:11px;font-weight:700;color:#0f172a;white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.ggr-game-prov { font-size:9px;color:#94a3b8; }
.ggr-rounds { font-size:9px;color:#64748b; }
.ggr-game-nums { display:flex;align-items:center;gap:4px;flex-shrink:0; }
.ggr-empty { display:flex;flex-direction:column;align-items:center;padding:16px;text-align:center; }
</style>
