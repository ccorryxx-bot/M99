<template>
  <Teleport to="body">
    <Transition name="stats-slide">
      <div v-if="visible" class="st-root">
        <header class="st-header">
          <button @click="visible=false" class="st-back">
            <svg width="18" height="18" fill="none" stroke="rgba(255,255,255,0.8)" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <span class="st-title">ကိုယ်ရေးကိုယ်တာ စာရင်းဇယား</span>
          <div style="width:32px;"></div>
        </header>

        <div class="st-body">
          <div v-if="loading" class="st-loading">
            <div class="st-spinner"></div>
          </div>

          <template v-else>
            <div class="st-period-row">
              <button v-for="p in periods" :key="p.key"
                :class="['st-period-btn', period===p.key?'st-period-btn--on':'']"
                @click="period=p.key; load()">{{ p.label }}</button>
            </div>

            <div class="st-grid4">
              <div class="st-card st-card--dep">
                <div class="st-card-icon">💰</div>
                <div class="st-card-val">{{ fmt(stats.totalDeposit) }}</div>
                <div class="st-card-label">သွင်းငွေ</div>
              </div>
              <div class="st-card st-card--wd">
                <div class="st-card-icon">💸</div>
                <div class="st-card-val">{{ fmt(stats.totalWithdraw) }}</div>
                <div class="st-card-label">ထုတ်ငွေ</div>
              </div>
              <div class="st-card st-card--net">
                <div class="st-card-icon">📊</div>
                <div :class="['st-card-val', stats.net >= 0 ? 'st-val-green' : 'st-val-red']">{{ fmt(Math.abs(stats.net)) }}</div>
                <div class="st-card-label">{{ stats.net >= 0 ? 'ကျန်ငွေ+' : 'ကုန်ငွေ' }}</div>
              </div>
              <div class="st-card st-card--tx">
                <div class="st-card-icon">🔄</div>
                <div class="st-card-val">{{ stats.txCount }}</div>
                <div class="st-card-label">ငွေလွှဲ အကြိမ်</div>
              </div>
            </div>

            <div class="st-section-title">ငွေလွှဲ မှတ်တမ်း</div>
            <div v-if="txRows.length === 0" class="st-empty">မှတ်တမ်း မရှိသေးပါ</div>
            <div v-for="tx in txRows" :key="tx.id" class="st-tx-row">
              <div :class="['st-tx-dot', tx.type==='deposit'?'st-dot--dep':'st-dot--wd']"></div>
              <div class="st-tx-info">
                <div class="st-tx-type">{{ tx.type==='deposit'?'ငွေသွင်း':'ငွေထုတ်' }} — {{ tx.method }}</div>
                <div class="st-tx-date">{{ fmtDate(tx.created_at) }}</div>
              </div>
              <div class="st-tx-right">
                <div :class="['st-tx-amt', tx.type==='deposit'?'st-amt--dep':'st-amt--wd']">
                  {{ tx.type==='deposit'?'+':'-' }}{{ Number(tx.amount).toLocaleString() }}
                </div>
                <div :class="['st-tx-status', `st-s-${tx.status}`]">{{ statusLabel(tx.status) }}</div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import { supabase } from '@/supabase'

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue'])
const visible = ref(props.modelValue)
watch(() => props.modelValue, v => { visible.value = v; if (v) load() })
watch(visible, v => emit('update:modelValue', v))

const loading = ref(false)
const period = ref('month')
const periods = [
  { key: 'today', label: 'ဒီနေ့' },
  { key: 'week', label: 'ဒီပတ်' },
  { key: 'month', label: 'ဒီလ' },
  { key: 'all', label: 'အားလုံး' },
]
const stats = ref({ totalDeposit: 0, totalWithdraw: 0, net: 0, txCount: 0 })
const txRows = ref([])

function fmt(n) {
  const v = Number(n) || 0
  if (v >= 1000000) return (v / 1000000).toFixed(1) + 'M'
  if (v >= 1000)    return (v / 1000).toFixed(0) + 'K'
  return v.toLocaleString()
}
function fmtDate(d) {
  return d ? new Date(d).toLocaleDateString('en-GB', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' }) : '—'
}
function statusLabel(s) {
  return s === 'confirmed' ? '✓ ပြီး' : s === 'pending' ? '⏳ ကြာ' : '✕ ငြင်း'
}

async function load() {
  loading.value = true
  try {
    const { data: { session } } = await supabase.auth.getSession()
    if (!session) return
    let query = supabase.from('transactions').select('id,type,amount,method,status,created_at')
      .eq('user_id', session.user.id).order('created_at', { ascending: false })
    const now = new Date()
    if (period.value === 'today') {
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString()
      query = query.gte('created_at', start)
    } else if (period.value === 'week') {
      const d = new Date(); d.setDate(d.getDate() - 7)
      query = query.gte('created_at', d.toISOString())
    } else if (period.value === 'month') {
      const d = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
      query = query.gte('created_at', d)
    }
    const { data } = await query.limit(50)
    txRows.value = data || []
    const confirmed = txRows.value.filter(t => t.status === 'confirmed')
    const dep  = confirmed.filter(t => t.type === 'deposit').reduce((s, t) => s + Number(t.amount), 0)
    const wd   = confirmed.filter(t => t.type !== 'deposit').reduce((s, t) => s + Number(t.amount), 0)
    stats.value = { totalDeposit: dep, totalWithdraw: wd, net: dep - wd, txCount: confirmed.length }
  } finally { loading.value = false }
}
</script>

<style scoped>
.st-root { position: fixed; inset: 0; z-index: 1100; background: #07091b; display: flex; flex-direction: column; overflow: hidden; }
.st-header { display: flex; align-items: center; justify-content: space-between; padding: 12px 14px; border-bottom: 1px solid rgba(255,255,255,0.07); }
.st-back { background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12); border-radius: 10px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.st-title { font-size: 15px; font-weight: 800; color: #fff; }
.st-body { flex: 1; overflow-y: auto; padding: 14px 14px 80px; }
.st-loading { display: flex; align-items: center; justify-content: center; padding: 80px 0; }
.st-spinner { width: 32px; height: 32px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.1); border-top-color: #4ade80; animation: spin 0.7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }
.st-period-row { display: flex; gap: 6px; margin-bottom: 16px; overflow-x: auto; }
.st-period-btn { flex-shrink: 0; padding: 7px 16px; border-radius: 20px; border: 1px solid rgba(255,255,255,0.12); background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.55); font-size: 12px; font-weight: 600; cursor: pointer; }
.st-period-btn--on { background: rgba(74,222,128,0.15); border-color: rgba(74,222,128,0.4); color: #4ade80; font-weight: 700; }
.st-grid4 { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 20px; }
.st-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px 12px; display: flex; flex-direction: column; gap: 4px; }
.st-card--dep { border-color: rgba(74,222,128,0.2); }
.st-card--wd  { border-color: rgba(248,113,113,0.2); }
.st-card-icon { font-size: 20px; }
.st-card-val  { font-size: 18px; font-weight: 900; color: #fff; }
.st-val-green { color: #4ade80; }
.st-val-red   { color: #f87171; }
.st-card-label { font-size: 10px; color: rgba(255,255,255,0.4); }
.st-section-title { font-size: 13px; font-weight: 800; color: rgba(255,255,255,0.8); margin-bottom: 10px; }
.st-empty { text-align: center; color: rgba(255,255,255,0.3); font-size: 12px; padding: 30px 0; }
.st-tx-row { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
.st-tx-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.st-dot--dep { background: #4ade80; box-shadow: 0 0 6px rgba(74,222,128,0.5); }
.st-dot--wd  { background: #f87171; box-shadow: 0 0 6px rgba(248,113,113,0.5); }
.st-tx-info { flex: 1; min-width: 0; }
.st-tx-type { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.8); }
.st-tx-date { font-size: 10px; color: rgba(255,255,255,0.35); margin-top: 2px; }
.st-tx-right { text-align: right; flex-shrink: 0; }
.st-tx-amt  { font-size: 13px; font-weight: 800; }
.st-amt--dep { color: #4ade80; }
.st-amt--wd  { color: #f87171; }
.st-tx-status { font-size: 9px; margin-top: 2px; }
.st-s-confirmed { color: #4ade80; }
.st-s-pending   { color: #fbbf24; }
.st-s-rejected  { color: #f87171; }
.stats-slide-enter-active { animation: slideIn 0.3s cubic-bezier(0.22,1,0.36,1); }
.stats-slide-leave-active { animation: slideIn 0.2s ease-in reverse; }
@keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
</style>
