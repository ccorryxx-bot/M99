<template>
  <Teleport to="body">
    <Transition name="tx-slide">
      <div v-if="visible && txList.length > 0" class="tx-tracker-wrap">
        <div class="tx-tracker">
          <div class="tx-tracker-header">
            <div style="display:flex;align-items:center;gap:7px;">
              <div class="tx-pulse-dot"></div>
              <span style="font-size:12px;font-weight:700;color:#fff;">မှတ်တမ်း အခြေအနေ</span>
            </div>
            <button @click="visible=false" class="tx-close-btn">✕</button>
          </div>
          <div class="tx-list">
            <div v-for="tx in txList" :key="tx.id" class="tx-item">
              <div class="tx-item-left">
                <div :class="['tx-type-icon', tx.type==='deposit'?'tx-icon--dep':'tx-icon--wd']">
                  <svg v-if="tx.type==='deposit'" width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M12 17V7" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M8 13l4 4 4-4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  <svg v-else width="13" height="13" fill="none" viewBox="0 0 24 24"><path d="M12 7v10" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M8 11l4-4 4 4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div>
                  <div class="tx-label">{{ tx.type === 'deposit' ? 'ငွေသွင်း' : 'ငွေထုတ်' }} • {{ tx.method }}</div>
                  <div class="tx-amount">{{ Number(tx.amount).toLocaleString() }} Ks</div>
                </div>
              </div>
              <div class="tx-status-col">
                <div :class="['tx-status-badge', `tx-status--${tx.status}`]">
                  <span v-if="tx.status==='pending'" class="tx-spin-dot"></span>
                  <span v-else-if="tx.status==='confirmed'">✓</span>
                  <span v-else>✕</span>
                  {{ statusLabel(tx.status) }}
                </div>
                <div class="tx-time">{{ fmtTime(tx.created_at) }}</div>
              </div>
            </div>
          </div>
          <div class="tx-steps">
            <div v-for="(step, i) in steps" :key="i" :class="['tx-step', getStepClass(step.status)]">
              <div class="tx-step-dot"></div>
              <span class="tx-step-label">{{ step.label }}</span>
              <div v-if="i < steps.length - 1" class="tx-step-line"></div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { supabase } from '@/supabase'

const visible = ref(false)
const txList = ref([])
let channel = null

const steps = computed(() => {
  const latest = txList.value[0]
  if (!latest) return []
  return [
    { label: 'တင်သွင်း', status: 'done' },
    { label: 'စစ်ဆေးနေ', status: latest.status === 'pending' ? 'active' : 'done' },
    { label: 'အတည်ပြု', status: latest.status === 'confirmed' ? 'done' : latest.status === 'rejected' ? 'fail' : 'wait' },
  ]
})

function getStepClass(s) {
  if (s === 'done') return 'tx-step--done'
  if (s === 'active') return 'tx-step--active'
  if (s === 'fail') return 'tx-step--fail'
  return 'tx-step--wait'
}

function statusLabel(s) {
  if (s === 'pending') return 'စစ်ဆေးနေ'
  if (s === 'confirmed') return 'အတည်ပြု'
  if (s === 'rejected') return 'ငြင်းပယ်'
  return s
}

function fmtTime(d) {
  if (!d) return ''
  return new Date(d).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

async function loadRecentTx(userId) {
  const { data } = await supabase
    .from('transactions')
    .select('id, type, amount, method, status, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(3)
  if (data && data.length > 0) {
    txList.value = data
    const hasPending = data.some(t => t.status === 'pending')
    visible.value = hasPending
  }
}

function subscribe(userId) {
  channel = supabase.channel('tx-tracker-' + userId)
    .on('postgres_changes', {
      event: '*',
      schema: 'public',
      table: 'transactions',
      filter: `user_id=eq.${userId}`
    }, (payload) => {
      loadRecentTx(userId)
      if (payload.new?.status === 'confirmed') {
        visible.value = true
        setTimeout(() => { visible.value = false }, 6000)
      }
    })
    .subscribe()
}

async function init() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return
  await loadRecentTx(session.user.id)
  subscribe(session.user.id)
}

onMounted(init)
onUnmounted(() => {
  if (channel) supabase.removeChannel(channel)
})
</script>

<style scoped>
.tx-tracker-wrap {
  position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
  z-index: 900; width: calc(100% - 28px); max-width: 420px;
}
.tx-tracker {
  background: #0e1338; border: 1px solid rgba(34,197,94,0.3);
  border-radius: 16px; overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(34,197,94,0.1);
}
.tx-tracker-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 14px; background: rgba(34,197,94,0.08);
  border-bottom: 1px solid rgba(34,197,94,0.15);
}
.tx-pulse-dot {
  width: 8px; height: 8px; border-radius: 50%; background: #4ade80;
  box-shadow: 0 0 0 0 rgba(74,222,128,0.5);
  animation: pulse-ring 1.4s ease-out infinite;
}
@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(74,222,128,0.5); }
  70% { box-shadow: 0 0 0 8px rgba(74,222,128,0); }
  100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); }
}
.tx-close-btn {
  background: none; border: none; color: rgba(255,255,255,0.4);
  font-size: 13px; cursor: pointer; padding: 2px 4px;
}
.tx-list { padding: 8px 12px; }
.tx-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.05);
}
.tx-item:last-child { border-bottom: none; }
.tx-item-left { display: flex; align-items: center; gap: 8px; }
.tx-type-icon {
  width: 28px; height: 28px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.tx-icon--dep { background: rgba(34,197,94,0.15); color: #4ade80; }
.tx-icon--wd  { background: rgba(248,113,113,0.15); color: #f87171; }
.tx-label { font-size: 10px; color: rgba(255,255,255,0.5); }
.tx-amount { font-size: 13px; font-weight: 800; color: #fff; }
.tx-status-col { text-align: right; }
.tx-status-badge {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 9px; font-weight: 700; padding: 3px 8px; border-radius: 20px;
}
.tx-status--pending  { background: rgba(251,191,36,0.15); color: #fbbf24; border: 1px solid rgba(251,191,36,0.3); }
.tx-status--confirmed { background: rgba(74,222,128,0.15); color: #4ade80; border: 1px solid rgba(74,222,128,0.3); }
.tx-status--rejected  { background: rgba(248,113,113,0.15); color: #f87171; border: 1px solid rgba(248,113,113,0.3); }
.tx-spin-dot {
  width: 6px; height: 6px; border-radius: 50%; border: 1.5px solid #fbbf24; border-top-color: transparent;
  animation: spin 0.7s linear infinite; display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }
.tx-time { font-size: 9px; color: rgba(255,255,255,0.3); margin-top: 2px; }
.tx-steps {
  display: flex; align-items: center; justify-content: center;
  padding: 10px 14px; gap: 0; border-top: 1px solid rgba(255,255,255,0.05);
}
.tx-step { display: flex; align-items: center; flex-direction: column; position: relative; gap: 4px; flex: 1; }
.tx-step-dot {
  width: 10px; height: 10px; border-radius: 50%; border: 2px solid rgba(255,255,255,0.2);
}
.tx-step--done .tx-step-dot  { background: #4ade80; border-color: #4ade80; }
.tx-step--active .tx-step-dot { background: #fbbf24; border-color: #fbbf24; box-shadow: 0 0 8px rgba(251,191,36,0.6); animation: pulse-ring 1.2s infinite; }
.tx-step--fail .tx-step-dot  { background: #f87171; border-color: #f87171; }
.tx-step--wait .tx-step-dot  { background: transparent; }
.tx-step-label { font-size: 9px; color: rgba(255,255,255,0.45); white-space: nowrap; }
.tx-step--done .tx-step-label  { color: #4ade80; }
.tx-step--active .tx-step-label { color: #fbbf24; font-weight: 700; }
.tx-step-line {
  position: absolute; top: 4px; left: 70%; width: 60%; height: 2px;
  background: rgba(255,255,255,0.1); border-radius: 1px;
}
.tx-step--done + .tx-step .tx-step-line { background: #4ade80; }
.tx-slide-enter-active { animation: slideUp 0.3s cubic-bezier(0.22,1,0.36,1); }
.tx-slide-leave-active { animation: slideUp 0.2s ease-in reverse; }
@keyframes slideUp { from { transform: translateX(-50%) translateY(20px); opacity: 0; } to { transform: translateX(-50%) translateY(0); opacity: 1; } }
</style>
