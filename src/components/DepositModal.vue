<template>
  <Teleport to="body">
    <Transition name="nova-modal">
      <div v-if="visible" class="nova-overlay" @click.self="close">
        <div class="nova-sheet" :class="step===2&&'nova-sheet--white'">



          <!-- ══ STEP 1 LAYOUT ══ -->
          <template v-if="step===1">
            <div class="nova-content">
              <!-- Header -->
              <div class="nova-header-wrap">
                <div class="nova-header-row">
                  <div style="width:26px;"></div>
                  <span class="nova-title">ငွေသွင်းရန်</span>
                  <button @click="close" class="nova-icon-btn">
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
                <div class="nova-balance-bar">
                  <span class="nova-balance-label">ငွေလွှဲရန် ဘက်အမျိုးအစား ရွေးချယ်ပါ။</span>
                  <div style="display:flex;align-items:center;gap:5px;">
                    <span style="font-size:14px;line-height:1;">🇲🇲</span>
                    <span class="nova-balance-num">{{ walletBalance.toLocaleString() }}</span>
                    <button @click="refreshBalance" class="nova-refresh-btn" :class="refreshing&&'nova-spin'">
                      <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                      </svg>
                    </button>
                  </div>
                </div>
                <div class="nova-divider"></div>
              </div>

              <!-- Body -->
              <div class="nova-body">
                <p class="nova-label">ငွေပေးချေနည်းလမ်း</p>
                <div class="nova-pm-grid">
                  <button v-for="pm in paymentMethods" :key="pm.key"
                    @click="method=pm.key"
                    class="nova-pm-btn"
                    :class="method===pm.key?'nova-pm-active':'nova-pm-idle'">
                    <span v-if="pm.popular" class="nova-popular-badge">လူကြိုက်များ</span>
                    <div class="nova-pm-icon" :style="{background:pm.iconBg}">
                      <img v-if="pm.img" :src="pm.img" style="width:22px;height:22px;object-fit:contain;"/>
                      <span v-else style="font-size:13px;font-weight:900;" :style="{color:pm.iconColor}">{{pm.iconText}}</span>
                    </div>
                    <span class="nova-pm-label" :style="method===pm.key?{color:'#e2e8f0'}:{color:'rgba(148,163,184,0.85)'}">
                      {{pm.label}}
                    </span>
                  </button>
                </div>

                <p class="nova-label">သွင်းမည့်ပမာဏ</p>
                <div class="nova-amt-grid">
                  <button v-for="amt in amountPresets" :key="amt"
                    @click="selectAmount(amt)"
                    class="nova-amt-btn"
                    :class="amount===amt?'nova-amt-active':'nova-amt-idle'">
                    {{formatAmt(amt)}}
                  </button>
                </div>

                <div class="nova-input-wrap">
                  <span class="nova-k-prefix">K</span>
                  <input ref="amtInput" @input="onAmountInput" @focus="onAmountFocus" @blur="onAmountBlur"
                    type="text" inputmode="numeric"
                    placeholder="အနည်းဆုံး: 3,000 ~ အများဆုံး: 1,000,000"
                    class="nova-input"/>
                </div>

                <div class="nova-bonus-card">
                  <div class="nova-bonus-header">
                    <div style="display:flex;align-items:center;gap:5px;">
                      <span style="font-size:12px;">🎁</span>
                      <span class="nova-bonus-title">အားပြည့်သွင်းရန်ကမ်းလှမ်းချက်</span>
                    </div>
                    <div class="nova-countdown-badge">
                      <span style="font-size:9px;">⚡</span>
                      <span class="nova-countdown">{{countdown}}</span>
                    </div>
                  </div>
                  <label class="nova-radio-row" @click="bonusOption='none'">
                    <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0;">
                      <span style="font-size:13px;flex-shrink:0;">😔</span>
                      <span class="nova-radio-text">ပွဲကို မပါဝင်ဘို့ ရွေးချယ်ခဲ့ပါတယ်။</span>
                    </div>
                    <div class="nova-radio" :class="bonusOption==='none'&&'nova-radio-on'"></div>
                  </label>
                  <div class="nova-row-divider"></div>
                  <label class="nova-radio-row" @click="bonusOption='1pct'">
                    <div style="display:flex;align-items:center;gap:6px;flex:1;min-width:0;overflow:hidden;">
                      <span style="font-size:12px;flex-shrink:0;">🎁</span>
                      <span class="nova-radio-title">ဘောနပ် 1%</span>
                      <span class="nova-radio-divline">—</span>
                      <span class="nova-radio-sub">တစ်ကြိမ်ပြန်လည်သွင်း ≥ 3,000</span>
                    </div>
                    <div class="nova-radio" :class="bonusOption==='1pct'&&'nova-radio-on'"></div>
                  </label>
                  <div class="nova-row-divider"></div>
                  <label class="nova-radio-row" @click="bonusOption='20pct'">
                    <div style="display:flex;align-items:center;gap:6px;flex:1;min-width:0;overflow:hidden;">
                      <span style="font-size:12px;flex-shrink:0;">🎁</span>
                      <span class="nova-radio-title">ဘောနပ် 20%</span>
                      <span class="nova-radio-divline">—</span>
                      <span class="nova-radio-sub">ပထမဆုံးငွေသွင်း ≥ 3,000</span>
                    </div>
                    <div class="nova-radio" :class="bonusOption==='20pct'&&'nova-radio-on'"></div>
                  </label>
                </div>
              </div>

              <!-- CTA -->
              <div class="nova-cta-wrap">
                <button @click="nextStep" :disabled="!method||!amount||amount<3000" class="nova-cta">
                  ယခု ငွေသွင်းပါ
                </button>
              </div>
            </div>
          </template>

          <!-- ══ STEP 2 — WHITE PAGE ══ -->
          <template v-else-if="step===2">
            <div class="s2-page">

              <!-- Top bar: step dots + language -->
              <div class="s2-topbar">
                <div class="s2-steps">
                  <div class="s2-dot s2-dot--done">1</div>
                  <div class="s2-dot-line"></div>
                  <div class="s2-dot s2-dot--active">2</div>
                </div>
                <div class="s2-lang-pill">မြန်မာ</div>
              </div>

              <!-- Scrollable body -->
              <div class="s2-body">

                <!-- Method badge + countdown -->
                <div class="s2-method-row">
                  <div class="s2-method-badge">{{ selectedMethod?.label?.toUpperCase() }}</div>
                  <div class="s2-timer-badge">
                    <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="flex-shrink:0;">
                      <circle cx="12" cy="12" r="10" stroke-width="2"/>
                      <path stroke-linecap="round" stroke-width="2" d="M12 6v6l4 2"/>
                    </svg>
                    <span class="s2-timer-text">{{ step2Timer }}</span>
                  </div>
                </div>

                <!-- Account number -->
                <div class="s2-field-label">အကောင့်နံပါတ်</div>
                <div class="s2-account-row">
                  <span class="s2-account-num">{{ recipientAccount }}</span>
                  <button @click="copyText(recipientAccount)" class="s2-copy-btn">
                    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    ကော်ပီ
                  </button>
                </div>

                <!-- Account name -->
                <div class="s2-field-label">အကောင့် နာမည်</div>
                <div class="s2-account-row">
                  <span class="s2-account-name">{{ recipientName }}</span>
                  <button @click="copyText(recipientName)" class="s2-copy-btn">
                    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    ကော်ပီ
                  </button>
                </div>

                <!-- Copy toast -->
                <Transition name="toast">
                  <div v-if="copied" class="s2-toast">✅ ကူးယူပြီးပါပြီ</div>
                </Transition>

                <!-- Big amount -->
                <div class="s2-amount-big">Ks. {{ Number(amount).toLocaleString() }}.00</div>
                <div style="display:flex;justify-content:center;margin-bottom:6px;">
                  <button @click="copyText(String(amount))" class="s2-copy-btn">
                    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    ကော်ပီ
                  </button>
                </div>
                <p class="s2-exact-hint">ညြပမာဏအတိုင်းငွေလွှဲပါ</p>

                <!-- Supported apps -->
                <div class="s2-apps-section">
                  <p class="s2-apps-label">အောက်ပါ အက်ပ်များကို ပံ့ပိုးပါသည်</p>
                  <div class="s2-app-chip">
                    <img v-if="selectedMethod?.img" :src="selectedMethod.img" style="width:20px;height:20px;object-fit:contain;border-radius:4px;"/>
                    <span v-else class="s2-app-text-icon" :style="{background:selectedMethod?.iconBg,color:selectedMethod?.iconColor}">{{ selectedMethod?.iconText }}</span>
                    <span class="s2-app-name">{{ selectedMethod?.label }}</span>
                  </div>
                </div>

                <!-- Tips -->
                <div class="s2-tips-card">
                  <p class="s2-tips-title">အကြံပြုချက်များ</p>
                  <ol class="s2-tips-list">
                    <li>ငွေပေးချေမှုအတွက် သတ်မှတ်ချိန်အတွင်း ငွေအော်ဒါတင်ပါ။ သတ်မှတ်ချိန် ကျော်လွန်သွားပါက ငွေအော်ဒါတင်ထားခြင်း ပျက်ပြယ်သွားမည်။ နောက်တစ်ကြိမ် ငွေထပ်လွှဲရန်မလိုပါ။ ငွေသွင်းပမာဏနှင့် ငွေလွှဲဖုန်းနံပါတ်ကိုမှန်ကန်စွာ ရွေးချယ်ထည့်သွင်းပါ။ ငွေသွင်းနည်းမှန်ကန်မှုမရှိပါက ငွေဝင်မည်မဟုတ်ပါ။</li>
                    <li>ငွေလွှဲရန်အတွက် ဖုန်းနံပါတ်ကိုကော်ပီယူပါ။ ငွေအော်ဒါမှန်ကန်စွာတင်ပြီး ငွေလွှဲပါက ဂိမ်းထဲသို့ ငွေအော်တိုဝင်မည်။ ဂိမ်းထဲမှ ငွေလက်ခံဖုန်းနံပါတ်သည် အမြဲပြောင်းလဲနေသည့်အတွက် ဖုန်းနံပါတ်တစ်ခုတည်းကို အတည်မသတ်မှတ်ပါနှင့်။</li>
                    <li>ငွေအော်ဒါတင်ထားသော ပမာဏနှင့် ငွေသွင်းပမာဏသည် တူညီရမည်။ တူညီမှုမရှိပါက ငွေအော်ဒါပျက်ပြယ်ပြီး အမှတ်ရရှိရန် ကြန့်ကြာနိုင်သည်။ သင့်သွင်းငွေအတွက် ငွေအော်ဒါမှန်ကန်စွာတင်ပြီးပါက မိနစ် ၃၀ အတွင်း အချိန်မီ ငွေသွင်းရမည်ဖြစ်သည်။</li>
                  </ol>
                </div>

              </div><!-- /s2-body -->

              <!-- Back + Confirm -->
              <div class="s2-footer">
                <button @click="step=1" class="s2-back-btn">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <button @click="submitDeposit" class="s2-confirm-btn">
                  အတည်ပြုမည် ✓
                </button>
              </div>

            </div>
          </template>

        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { supabase } from '@/lib/supabase'

const props = defineProps({ modelValue: Boolean })
const emit  = defineEmits(['update:modelValue', 'submit'])

const visible       = ref(props.modelValue)
const step          = ref(1)
const method        = ref('kpay')
const amount        = ref(5000)
const copied        = ref(false)
const bonusOption   = ref('none')
const walletBalance = ref(0)
const refreshing    = ref(false)
const focusMode     = ref(false)
const amtInput      = ref(null)  // uncontrolled input ref

let _savedScrollY = 0
function lockScroll() {
  _savedScrollY = window.scrollY
  document.body.style.overflow  = 'hidden'
  document.body.style.position  = 'fixed'
  document.body.style.top       = `-${_savedScrollY}px`
  document.body.style.width     = '100%'
}
function unlockScroll() {
  document.body.style.overflow  = ''
  document.body.style.position  = ''
  document.body.style.top       = ''
  document.body.style.width     = ''
  window.scrollTo(0, _savedScrollY)
}

// ── Bonus countdown (step 1) ───────────────────────────────────────
const countdown = ref('00:00:00')
let timerInterval = null
function startTimer() {
  let total = 23 * 3600 + 30 * 60 + 57
  timerInterval = setInterval(() => {
    total--; if (total < 0) total = 23 * 3600
    const h = String(Math.floor(total / 3600)).padStart(2,'0')
    const m = String(Math.floor((total % 3600) / 60)).padStart(2,'0')
    const s = String(total % 60).padStart(2,'0')
    countdown.value = `${h}:${m}:${s}`
  }, 1000)
}

// ── Step 2 countdown (3 min) ──────────────────────────────────────
const step2Secs = ref(180)
let step2Interval = null
const step2Timer = computed(() => {
  const m = String(Math.floor(step2Secs.value / 60)).padStart(2,'0')
  const s = String(step2Secs.value % 60).padStart(2,'0')
  return `${m}:${s}`
})
function startStep2Timer() {
  step2Secs.value = 180
  clearInterval(step2Interval)
  step2Interval = setInterval(() => {
    if (step2Secs.value > 0) step2Secs.value--
  }, 1000)
}
function stopStep2Timer() {
  clearInterval(step2Interval)
  step2Interval = null
}

onMounted(() => startTimer())
onUnmounted(() => { clearInterval(timerInterval); stopStep2Timer(); unlockScroll() })

// ── Balance ───────────────────────────────────────────────────────
async function fetchBalance() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  const { data } = await supabase.from('wallets').select('balance').eq('user_id', user.id).maybeSingle()
  if (data) walletBalance.value = Number(data.balance) || 0
}
async function refreshBalance() {
  refreshing.value = true
  await fetchBalance()
  setTimeout(() => { refreshing.value = false }, 600)
}

// ── Payment ───────────────────────────────────────────────────────
const amountPresets = [3000,5000,10000,30000,50000,100000,500000,1000000]
const paymentMethods = [
  { key:'kpay',   label:'KBZ Pay', popular:true,  img:'/images/payments/kpay.png', iconBg:'rgba(37,99,235,0.3)' },
  { key:'wave',   label:'WavePay', popular:false, img:'/images/payments/wave.png', iconBg:'rgba(5,150,105,0.25)' },
  { key:'usdt',   label:'USDT',    popular:false, img:null, iconText:'₮', iconBg:'rgba(34,197,94,0.25)', iconColor:'#4ade80' },
  { key:'uabpay', label:'UAB Pay', popular:false, img:null, iconText:'U', iconBg:'rgba(139,92,246,0.25)', iconColor:'#c084fc' },
]

const selectedMethod   = computed(() => paymentMethods.find(p => p.key === method.value))
const recipientName    = ref('')
const recipientAccount = ref('')

async function fetchPaymentSettings() {
  const keys = ['wave_recipient_name','wave_recipient_account','kpay_recipient_name','kpay_recipient_account',
                 'usdt_recipient_name','usdt_recipient_account','uabpay_recipient_name','uabpay_recipient_account']
  const { data, error } = await supabase.from('system_settings').select('key,value').in('key',keys)
  const s = {}; if (data && !error) data.forEach(r => { s[r.key]=r.value })
  const m = method.value
  recipientName.value    = s[`${m}_recipient_name`]    || 'Ma Khaing Zin Moe'
  recipientAccount.value = s[`${m}_recipient_account`] || '9446323509'
}

watch(method, fetchPaymentSettings)
watch(step, (val) => {
  if (val === 2) startStep2Timer()
  else stopStep2Timer()
})
watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    step.value=1; amount.value=5000; bonusOption.value='none'; focusMode.value=false
    fetchPaymentSettings(); fetchBalance(); lockScroll()
    nextTick(() => { if (amtInput.value) amtInput.value.value = (5000).toLocaleString() })
  } else {
    stopStep2Timer(); unlockScroll()
  }
})

// ── Amount ────────────────────────────────────────────────────────
const displayAmount = computed(() => {
  if (!amount.value) return ''
  return focusMode.value ? String(amount.value) : amount.value.toLocaleString()
})
function selectAmount(n)  { amount.value = n; focusMode.value = false; nextTick(() => { if (amtInput.value) amtInput.value.value = n.toLocaleString() }) }
function onAmountInput(e) { const raw = e.target.value.replace(/,/g,'').replace(/[^0-9]/g,''); amount.value = raw ? parseInt(raw,10) : 0 }
function onAmountFocus(e)  {
  focusMode.value = true
  if (amtInput.value) amtInput.value.value = amount.value ? String(amount.value) : ''
  setTimeout(() => { e.target.scrollIntoView({ behavior: 'smooth', block: 'nearest' }) }, 320)
}
function onAmountBlur()   { focusMode.value = false; if (amtInput.value) amtInput.value.value = amount.value ? amount.value.toLocaleString() : '' }
function formatAmt(n)     { return n.toLocaleString() }

// ── Actions ───────────────────────────────────────────────────────
const close    = () => emit('update:modelValue', false)
const nextStep = () => { if (!method.value || amount.value < 3000) return; step.value = 2 }
const copyText = async (text) => {
  try { await navigator.clipboard.writeText(text); copied.value=true; setTimeout(()=>{ copied.value=false },1500) }
  catch { prompt('Copy manually:', text) }
}
const submitDeposit = () => {
  emit('submit', { method:method.value, amount:amount.value, bonus:bonusOption.value })
  close()
}
</script>

<style scoped>
/* ── Overlay ── */
.nova-overlay {
  position:fixed;inset:0;z-index:50;
  display:flex;align-items:flex-end;justify-content:center;
  background:rgba(0,0,0,0.84);
  padding-bottom:80px;
}

/* ── Sheet ── */
.nova-sheet {
  position:relative;
  width:100%;max-width:480px;
  height:calc(100lvh - 80px);
  border-radius:20px 20px 0 0;
  overflow:hidden;
  display:flex;flex-direction:column;
  background:linear-gradient(160deg,#08102a 0%,#0d1a36 25%,#0c1828 50%,#091420 75%,#07101a 100%);
}
.nova-sheet--white { background:#f5f6fa; }

/* ── BG ── */
/* bg handled by .nova-sheet */

/* ── Step 1 Content ── */
.nova-content { position:relative;z-index:1;display:flex;flex-direction:column;height:100%; }
.nova-header-wrap { flex-shrink:0;padding:18px 16px 0; }
.nova-header-row  { display:flex;align-items:center;justify-content:space-between;margin-bottom:10px; }
.nova-title       { font-size:13px;font-weight:700;color:rgba(226,232,240,0.95);letter-spacing:0.04em; }
.nova-balance-bar { display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding:6px 10px;border-radius:9px;background:rgba(255,255,255,0.04);box-shadow:inset 0 1px 0 rgba(255,255,255,0.07); }
.nova-balance-label { font-size:10px;color:rgba(148,163,184,0.7); }
.nova-balance-num   { font-size:12px;font-weight:700;color:rgba(253,224,71,0.9); }
.nova-divider       { height:1px;background:rgba(255,255,255,0.07);margin-bottom:8px; }
.nova-body { flex:1;overflow-y:auto;padding:0 16px;overscroll-behavior:contain;-webkit-overflow-scrolling:touch; }
.nova-body::-webkit-scrollbar { width:2px; }
.nova-body::-webkit-scrollbar-thumb { background:rgba(100,116,139,0.22);border-radius:10px; }
.nova-cta-wrap { flex-shrink:0;padding:6px 16px 10px; }
.nova-label { font-size:11px;color:rgba(156,163,175,0.75);margin:0 0 5px 0; }
.nova-pm-grid { display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:8px; }
.nova-pm-btn { position:relative;display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:12px;cursor:pointer;border:1px solid rgba(255,255,255,0.08);outline:none;transition:border-color 0.15s,background 0.15s;text-align:left;user-select:none;-webkit-tap-highlight-color:transparent; }
.nova-pm-idle   { background:rgba(255,255,255,0.04); }
.nova-pm-active { background:rgba(34,197,94,0.06);border-color:rgba(34,197,94,0.32); }
.nova-pm-btn:active { opacity:0.72; }
.nova-pm-icon  { width:28px;height:28px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;overflow:hidden; }
.nova-pm-label { font-size:12px;font-weight:600;padding-left:8px;border-left:1.5px solid rgba(255,255,255,0.18);line-height:1; }
.nova-pm-active .nova-pm-label { border-left-color:rgba(34,197,94,0.55); }
.nova-popular-badge { position:absolute;top:-7px;left:50%;transform:translateX(-50%);font-size:8px;font-weight:900;padding:2px 8px;border-radius:99px;background:linear-gradient(90deg,#f97316,#ef4444);color:#fff;white-space:nowrap;box-shadow:0 1px 6px rgba(249,115,22,0.5); }
.nova-amt-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:6px; }
.nova-amt-btn { padding:7px 2px;border-radius:10px;border:1px solid rgba(234,179,8,0.2);outline:none;font-size:11px;font-weight:700;cursor:pointer;transition:background 0.12s,border-color 0.12s,color 0.12s;text-align:center;user-select:none;-webkit-tap-highlight-color:transparent; }
.nova-amt-idle  { background:rgba(255,255,255,0.04);color:rgba(203,213,225,0.85); }
.nova-amt-active { background:rgba(6,182,212,0.12);color:rgba(6,182,212,1);border-color:rgba(6,182,212,0.45); }
.nova-amt-btn:active { opacity:0.68; }
.nova-input-wrap { position:relative;margin-bottom:8px; }
.nova-k-prefix { position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:11px;font-weight:700;color:rgba(156,163,175,0.6);z-index:1; }
.nova-input { width:100%;padding:10px 12px 10px 26px;border-radius:11px;border:1px solid rgba(234,179,8,0.3);outline:none;font-size:12px;font-weight:600;box-sizing:border-box;background:rgba(255,255,255,0.06);box-shadow:inset 0 1px 0 rgba(255,255,255,0.07);color:rgba(226,232,240,0.9);caret-color:#ffffff;transition:border-color 0.15s; }
.nova-input:focus { border-color:rgba(234,179,8,0.6);box-shadow:inset 0 1px 0 rgba(255,255,255,0.09),0 0 0 1.5px rgba(234,179,8,0.15); }
.nova-input::placeholder { color:rgba(107,114,128,0.45); }
.nova-bonus-card { border-radius:13px;overflow:hidden;margin-bottom:4px;background:rgba(255,255,255,0.04);box-shadow:inset 0 1px 0 rgba(255,255,255,0.07); }
.nova-bonus-header { display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05); }
.nova-bonus-title    { font-size:11px;font-weight:700;color:rgba(253,224,71,0.85); }
.nova-countdown-badge { display:flex;align-items:center;gap:3px;padding:2px 7px;border-radius:99px;background:rgba(239,68,68,0.18); }
.nova-countdown      { font-size:9px;font-weight:700;color:#fca5a5;font-variant-numeric:tabular-nums; }
.nova-radio-row  { display:flex;align-items:center;justify-content:space-between;padding:6px 12px;cursor:pointer;user-select:none;transition:background 0.15s; }
.nova-radio-row:hover { background:rgba(255,255,255,0.03); }
.nova-radio-text  { font-size:11px;font-weight:500;color:rgba(148,163,184,0.85);white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.nova-radio-title { font-size:11px;font-weight:700;color:rgba(203,213,225,0.9);white-space:nowrap;flex-shrink:0; }
.nova-radio-sub   { font-size:10px;color:rgba(107,114,128,0.85);white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.nova-radio-divline { font-size:10px;color:rgba(100,116,139,0.45);flex-shrink:0; }
.nova-row-divider { height:1px;background:rgba(255,255,255,0.04);margin:0 12px; }
.nova-radio { width:16px;height:16px;border-radius:50%;flex-shrink:0;border:1.5px solid rgba(100,116,139,0.5);background:transparent;transition:border-color 0.15s,background 0.15s; }
.nova-radio-on { border-color:#22c55e;background:radial-gradient(circle,#22c55e 0%,#22c55e 40%,transparent 60%);box-shadow:0 0 6px rgba(34,197,94,0.5); }
.nova-cta { width:100%;padding:11px;border-radius:99px;border:1px solid rgba(34,197,94,0.35);outline:none;font-size:13px;font-weight:700;letter-spacing:0.04em;cursor:pointer;background:rgba(34,197,94,0.1);color:rgba(226,232,240,0.92);transition:opacity 0.15s;-webkit-tap-highlight-color:transparent; }
.nova-cta:disabled { opacity:0.3;cursor:not-allowed; }
.nova-icon-btn { width:26px;height:26px;border-radius:8px;border:none;outline:none;cursor:pointer;background:rgba(255,255,255,0.07);box-shadow:inset 0 1px 0 rgba(255,255,255,0.1);color:rgba(156,163,175,0.8);display:flex;align-items:center;justify-content:center;transition:background 0.15s; }
.nova-refresh-btn { width:22px;height:22px;border-radius:6px;border:none;outline:none;cursor:pointer;background:rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:center;color:rgba(156,163,175,0.8);transition:opacity 0.15s; }
.nova-spin svg { animation:spin 0.6s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }

/* ══ STEP 2 WHITE PAGE ══ */
.s2-page {
  display:flex;flex-direction:column;height:100%;
  background:#f5f6fa;border-radius:20px 20px 0 0;
}

/* Top bar */
.s2-topbar {
  flex-shrink:0;display:flex;align-items:center;justify-content:space-between;
  padding:14px 18px 10px;
  background:#fff;
  border-bottom:1px solid #eaecf0;
}
.s2-steps { display:flex;align-items:center;gap:0; }
.s2-dot {
  width:28px;height:28px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:13px;font-weight:700;
}
.s2-dot--done   { background:#22c55e;color:#fff; }
.s2-dot--active { background:#1e293b;color:#fff; }
.s2-dot-line { width:32px;height:2px;background:#22c55e; }
.s2-lang-pill {
  font-size:12px;font-weight:600;color:#374151;
  padding:4px 11px;border-radius:99px;
  border:1.5px solid #d1d5db;background:#fff;
}

/* Scrollable body */
.s2-body {
  flex:1;overflow-y:auto;padding:16px;
  -webkit-overflow-scrolling:touch;
  overscroll-behavior:contain;
}
.s2-body::-webkit-scrollbar { width:2px; }
.s2-body::-webkit-scrollbar-thumb { background:#d1d5db;border-radius:10px; }

/* Method + timer row */
.s2-method-row {
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:16px;
}
.s2-method-badge {
  padding:6px 14px;border-radius:8px;
  background:#1e293b;color:#fff;
  font-size:13px;font-weight:800;letter-spacing:0.04em;
}
.s2-timer-badge {
  display:flex;align-items:center;gap:5px;
  padding:6px 12px;border-radius:8px;
  background:#fef2f2;border:1.5px solid #fecaca;
  color:#dc2626;
}
.s2-timer-text { font-size:13px;font-weight:700;font-variant-numeric:tabular-nums; }

/* Account rows */
.s2-field-label {
  font-size:11px;font-weight:600;color:#6b7280;
  margin:0 0 5px 0;
}
.s2-account-row {
  display:flex;align-items:center;justify-content:space-between;
  padding:10px 14px;border-radius:12px;
  background:#fff;
  border:1.5px solid #e5e7eb;
  margin-bottom:12px;
  box-shadow:0 1px 3px rgba(0,0,0,0.06);
}
.s2-account-num {
  font-family:monospace;font-size:18px;font-weight:800;
  color:#dc2626;letter-spacing:0.06em;
}
.s2-account-name {
  font-size:15px;font-weight:700;color:#111827;
  letter-spacing:0.08em;
}
.s2-copy-btn {
  display:flex;align-items:center;gap:4px;
  padding:5px 12px;border-radius:7px;border:none;outline:none;cursor:pointer;
  background:#2563eb;color:#fff;
  font-size:11px;font-weight:700;
  transition:opacity 0.12s;
  flex-shrink:0;
}
.s2-copy-btn:active { transform:scale(0.95);background:#1d4ed8; }

/* Toast */
.s2-toast {
  text-align:center;margin:0 0 10px 0;
  font-size:11px;font-weight:600;color:#16a34a;
  padding:4px 0;
}

/* Big amount */
.s2-amount-big {
  text-align:center;
  font-size:32px;font-weight:900;color:#111827;
  margin:8px 0 8px 0;letter-spacing:-0.01em;
}
.s2-exact-hint {
  text-align:center;font-size:11px;color:#6b7280;
  margin:0 0 16px 0;
}

/* Supported apps */
.s2-apps-section {
  margin-bottom:16px;
  padding:12px 14px;border-radius:12px;
  background:#fff;border:1.5px solid #e5e7eb;
  box-shadow:0 1px 3px rgba(0,0,0,0.05);
}
.s2-apps-label { font-size:11px;font-weight:600;color:#374151;margin:0 0 10px 0; }
.s2-app-chip {
  display:inline-flex;align-items:center;gap:8px;
  padding:6px 12px;border-radius:8px;
  background:#f1f5f9;border:1px solid #e2e8f0;
}
.s2-app-text-icon {
  width:20px;height:20px;border-radius:4px;
  display:flex;align-items:center;justify-content:center;
  font-size:11px;font-weight:900;
}
.s2-app-name { font-size:12px;font-weight:700;color:#374151; }

/* Tips card */
.s2-tips-card {
  padding:14px 16px;border-radius:14px;
  background:#fff;
  border:1.5px solid #fde68a;
  box-shadow:0 1px 3px rgba(0,0,0,0.05);
  margin-bottom:8px;
}
.s2-tips-title {
  font-size:13px;font-weight:800;color:#92400e;
  margin:0 0 10px 0;
}
.s2-tips-list {
  padding-left:18px;margin:0;
  display:flex;flex-direction:column;gap:10px;
}
.s2-tips-list li {
  font-size:12px;line-height:1.65;color:#374151;
}

/* Footer */
.s2-footer {
  flex-shrink:0;
  display:flex;align-items:center;gap:10px;
  padding:10px 16px 14px;
  background:#fff;
  border-top:1px solid #eaecf0;
}
.s2-back-btn {
  width:44px;height:44px;border-radius:12px;
  border:1.5px solid #d1d5db;background:#f9fafb;
  display:flex;align-items:center;justify-content:center;
  color:#374151;cursor:pointer;flex-shrink:0;
  transition:opacity 0.12s;
}
.s2-back-btn:active { opacity:0.7; }
.s2-confirm-btn {
  flex:1;padding:13px;border-radius:12px;
  border:none;outline:none;cursor:pointer;
  background:linear-gradient(135deg,#16a34a,#15803d);
  color:#fff;font-size:14px;font-weight:700;
  transition:opacity 0.15s;
}
.s2-confirm-btn:active { opacity:0.8; }

/* ── Transitions ── */
.nova-modal-enter-active { animation:sheetUp 0.28s cubic-bezier(0.22,1,0.36,1); }
.nova-modal-leave-active { animation:sheetUp 0.18s cubic-bezier(0.55,0,1,0.45) reverse; }
@keyframes sheetUp { from{transform:translateY(100%);} to{transform:translateY(0);} }
.toast-enter-active { transition:all 0.2s ease; }
.toast-leave-active { transition:all 0.12s ease; }
.toast-enter-from   { opacity:0;transform:translateY(4px); }
.toast-leave-to     { opacity:0; }
</style>
