<template>
  <Teleport to="body">
    <Transition name="nova-modal">
      <div v-if="visible" class="nova-overlay" :class="step===2&&'nova-overlay--full'" @click.self="close">
        <div class="nova-sheet" :class="[step===2&&'nova-sheet--white', step===2&&'nova-sheet--full']">

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
                    <!-- Active checkmark -->
                    <span v-if="method===pm.key" class="nova-pm-check">
                      <svg width="10" height="10" fill="none" stroke="#f59e0b" stroke-width="3" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    </span>
                    <div class="nova-pm-icon" :style="{background:pm.iconBg}">
                      <img v-if="pm.img" :src="pm.img" style="width:22px;height:22px;object-fit:contain;"/>
                      <span v-else style="font-size:13px;font-weight:900;" :style="{color:pm.iconColor}">{{pm.iconText}}</span>
                    </div>
                    <span class="nova-pm-label" :style="method===pm.key?{color:'#fef9c3'}:{color:'rgba(148,163,184,0.85)'}">
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

          <!-- ══ STEP 2 — FULL WHITE PAGE ══ -->
          <template v-else-if="step===2">
            <div class="s2-page">

              <!-- Top bar -->
              <div class="s2-topbar">
                <div class="s2-steps">
                  <div class="s2-dot s2-dot--done">1</div>
                  <div class="s2-dot-line"></div>
                  <div class="s2-dot s2-dot--active">2</div>
                </div>
                <div class="s2-timer-badge">
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="flex-shrink:0;">
                    <circle cx="12" cy="12" r="10" stroke-width="2"/>
                    <path stroke-linecap="round" stroke-width="2" d="M12 6v6l4 2"/>
                  </svg>
                  <span class="s2-timer-text">{{ step2Timer }}</span>
                </div>
              </div>

              <!-- Scrollable body -->
              <div class="s2-body">
                <div class="s2-body-inner">

                  <!-- Method label -->
                  <div class="s2-method-row">
                    <span class="s2-method-badge">{{ selectedMethod?.label?.toUpperCase() }}</span>
                    <span class="s2-via-hint">မှ လွှဲပါ</span>
                    <img v-if="selectedMethod?.img" :src="selectedMethod.img" style="width:20px;height:20px;object-fit:contain;border-radius:4px;"/>
                  </div>

                  <!-- Account number FIRST -->
                  <div class="s2-field">
                    <div class="s2-field-label">အကောင့်နံပါတ်</div>
                    <div class="s2-field-row">
                      <span class="s2-field-val s2-field-val--num">{{ recipientAccount }}</span>
                      <button @click="copyText(recipientAccount)" class="s2-copy-btn">
                        <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                        ကော်ပီ
                      </button>
                    </div>
                  </div>

                  <!-- Account name SECOND -->
                  <div class="s2-field">
                    <div class="s2-field-label">အကောင့် နာမည်</div>
                    <div class="s2-field-row">
                      <span class="s2-field-val s2-field-val--name">{{ recipientName }}</span>
                      <button @click="copyText(recipientName)" class="s2-copy-btn">
                        <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                        ကော်ပီ
                      </button>
                    </div>
                  </div>

                  <!-- Copy toast -->
                  <Transition name="toast">
                    <div v-if="copied" class="s2-toast">✅ ကူးယူပြီးပါပြီ</div>
                  </Transition>

                  <!-- Amount -->
                  <div class="s2-field">
                    <div class="s2-field-label">သွင်းမည့်ပမာဏ</div>
                    <div class="s2-field-row">
                      <span class="s2-field-val s2-field-val--amt">Ks {{ Number(amount).toLocaleString() }}</span>
                      <button @click="copyText(String(amount))" class="s2-copy-btn s2-copy-btn--amt">
                        <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                        </svg>
                        ကော်ပီ
                      </button>
                      <span class="s2-exact-hint">ပမာဏအတိုင်း</span>
                    </div>
                  </div>

                  <!-- ပြေစာ နံပါတ် -->
                  <div class="s2-ref-section">
                    <label class="s2-ref-label">ပြေစာ နံပါတ် (နောက်ဆုံး ၅ လုံး)</label>
                    <div class="s2-ref-boxes">
                      <input
                        v-for="(_, i) in 5"
                        :key="i"
                        :ref="el => refInputs[i] = el"
                        class="s2-ref-box"
                        type="text"
                        inputmode="numeric"
                        maxlength="1"
                        :value="refDigits[i]"
                        @input="onRefInput(i, $event)"
                        @keydown="onRefKeydown(i, $event)"
                        @paste="onRefPaste($event)"
                      />
                    </div>
                  </div>

                  <!-- Spacer -->
                  <div class="s2-spacer"></div>

                  <!-- Tips -->
                  <div class="s2-tips-section">
                    <p class="s2-tips-title">အကြံပြုချက်များ</p>
                    <ol class="s2-tips-list">
                      <li>ငွေပေးချေမှုအတွက် သတ်မှတ်ချိန်အတွင်း ငွေအော်ဒါတင်ပါ။ သတ်မှတ်ချိန် ကျော်လွန်သွားပါက ငွေအော်ဒါတင်ထားခြင်း ပျက်ပြယ်သွားမည်။</li>
                      <li>ငွေလွှဲရန်အတွက် ဖုန်းနံပါတ်ကိုကော်ပီယူပါ။ ဂိမ်းထဲမှ ငွေလက်ခံဖုန်းနံပါတ်သည် အမြဲပြောင်းလဲနေသည်။</li>
                      <li>ငွေအော်ဒါတင်ထားသော ပမာဏနှင့် ငွေသွင်းပမာဏသည် တူညီရမည်။</li>
                    </ol>
                  </div>

                </div>
              </div>

              <!-- Footer -->
              <div class="s2-footer">
                <button @click="step=1" class="s2-back-btn">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <!-- Slip Image Upload -->
                <div class="s2-slip-section">
                  <div class="s2-ref-label">ငွေလွှဲပြေစာ (Slip Image) — Optional</div>
                  <div class="s2-slip-upload-area" @click="$refs.slipFileInput.click()" @dragover.prevent @drop.prevent="onSlipDrop">
                    <input ref="slipFileInput" type="file" accept="image/*" @change="onSlipSelect" style="display:none;" />
                    <div v-if="!slipPreview" class="s2-slip-placeholder">
                      <svg width="20" height="20" fill="none" stroke="#94a3b8" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                      <span>Slip ပုံ ရွေးချယ်ရန် နှိပ်ပါ</span>
                    </div>
                    <div v-else class="s2-slip-preview">
                      <img :src="slipPreview" class="s2-slip-img" />
                      <button @click.stop="clearSlip" class="s2-slip-clear">✕</button>
                    </div>
                  </div>
                  <div v-if="slipUploading" class="s2-slip-progress">
                    <div class="s2-slip-prog-bar" :style="{width:slipProgress+'%'}"></div>
                  </div>
                </div>
                <button @click="submitDeposit" :disabled="slipUploading" class="s2-confirm-btn">
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
import { supabase } from '@/supabase'

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
const amtInput      = ref(null)

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

function handlePopState() {
  if (!visible.value) return
  if (step.value === 2) {
    step.value = 1
    history.pushState({ novaDeposit: true }, '')
  } else {
    emit('update:modelValue', false)
  }
}
watch(visible, (val) => {
  if (val) history.pushState({ novaDeposit: true }, '')
  else if (history.state?.novaDeposit) history.back()
})

onMounted(() => { startTimer(); window.addEventListener('popstate', handlePopState) })
onUnmounted(() => { clearInterval(timerInterval); stopStep2Timer(); unlockScroll(); window.removeEventListener('popstate', handlePopState) })

async function fetchBalance() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  const { data } = await supabase.from('wallets').select('main_balance').eq('user_id', user.id).maybeSingle()
  if (data) walletBalance.value = Number(data.main_balance) || 0
}
async function refreshBalance() {
  refreshing.value = true
  await fetchBalance()
  setTimeout(() => { refreshing.value = false }, 600)
}

const amountPresets = [3000,5000,10000,30000,50000,100000,500000,1000000]
const paymentMethods = [
  { key:'kpay',   label:'KBZ Pay', popular:true,  img:'https://ik.imagekit.io/tdpebgueq/Payment%20Method%20/Screenshot_2026-06-04-00-35-27-327_mark.via.gp_1780510112167edit.jpg?tr=f-auto', iconBg:'rgba(37,99,235,0.3)' },
  { key:'wave',   label:'WavePay', popular:false, img:'https://ik.imagekit.io/tdpebgueq/Payment%20Method%20/Screenshot_2026-06-04-00-35-34-166_mark.via.gp_1780510124725edit.jpg?tr=f-auto', iconBg:'rgba(5,150,105,0.25)' },
  { key:'usdt',   label:'USDT',    popular:false, img:'https://ik.imagekit.io/tdpebgueq/Payment%20Method%20/61e20ad43bafe0ca2b7ada87f1792a4c.jpg?tr=f-auto', iconText:'₮', iconBg:'rgba(34,197,94,0.25)', iconColor:'#4ade80' },
  { key:'uabpay', label:'UAB Pay', popular:false, img:'https://ik.imagekit.io/0xfxtkccz/Uab/1781043612091.png?tr=f-auto', iconText:'U', iconBg:'rgba(139,92,246,0.25)', iconColor:'#c084fc' },
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
  recipientName.value    = s[`${m}_recipient_name`]    || 'KYAW GYII'
  recipientAccount.value = s[`${m}_recipient_account`] || '09443913532'
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

const refDigits  = ref(['','','','',''])
const refInputs  = ref([])
function onRefInput(i, e) {
  const v = e.target.value.replace(/\D/g,'').slice(-1)
  refDigits.value[i] = v
  e.target.value = v
  if (v && i < 4) nextTick(() => refInputs.value[i+1]?.focus())
}
function onRefKeydown(i, e) {
  if (e.key === 'Backspace' && !refDigits.value[i] && i > 0) {
    nextTick(() => { refInputs.value[i-1]?.focus() })
  }
}
function onRefPaste(e) {
  e.preventDefault()
  const digits = (e.clipboardData.getData('text') || '').replace(/\D/g,'').slice(0,5)
  digits.split('').forEach((d, i) => { refDigits.value[i] = d })
  nextTick(() => {
    const last = Math.min(digits.length, 4)
    refInputs.value[last]?.focus()
  })
}
const transactionRef = computed(() => refDigits.value.join(''))

const close    = () => emit('update:modelValue', false)
const nextStep = () => { if (!method.value || amount.value < 3000) return; step.value = 2 }
const copyText = async (text) => {
  try { await navigator.clipboard.writeText(text); copied.value=true; setTimeout(()=>{ copied.value=false },1500) }
  catch { prompt('Copy manually:', text) }
}
const slipPreview  = ref(null)
const slipFile     = ref(null)
const slipUploading = ref(false)
const slipProgress  = ref(0)

function onSlipSelect(e) {
  const file = e.target.files?.[0]
  if (!file) return
  slipFile.value = file
  const reader = new FileReader()
  reader.onload = (ev) => { slipPreview.value = ev.target.result }
  reader.readAsDataURL(file)
}
function onSlipDrop(e) {
  const file = e.dataTransfer.files?.[0]
  if (!file || !file.type.startsWith('image/')) return
  slipFile.value = file
  const reader = new FileReader()
  reader.onload = (ev) => { slipPreview.value = ev.target.result }
  reader.readAsDataURL(file)
}
function clearSlip() { slipPreview.value = null; slipFile.value = null; slipProgress.value = 0 }

const submitDeposit = async () => {
  let slipUrl = null
  if (slipFile.value) {
    try {
      slipUploading.value = true; slipProgress.value = 30
      const { supabase } = await import('@/supabase')
      const ext  = slipFile.value.name.split('.').pop() || 'jpg'
      const path = `slips/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
      const { error } = await supabase.storage.from('slip-uploads').upload(path, slipFile.value, { upsert: false })
      slipProgress.value = 80
      if (!error) slipUrl = path
      slipProgress.value = 100
    } catch(e) {} finally { slipUploading.value = false }
  }
  emit('submit', { method:method.value, amount:amount.value, bonus:bonusOption.value, ref:transactionRef.value, slip_url: slipUrl })
  close()
}
</script>

<style scoped>
/* ── Overlay ── */
.nova-overlay {
  position:fixed;inset:0;z-index:9999;
  display:flex;align-items:stretch;justify-content:center;
  background:rgba(0,0,0,0.88);
}

/* ── Sheet ── */
.nova-sheet {
  position:relative;
  width:100%;max-width:480px;
  height:100vh;
  height:100dvh;
  border-radius:0;
  overflow:hidden;
  display:flex;flex-direction:column;
  background:linear-gradient(160deg, #16183a 0%, #252870 55%, #16183a 100%);
}
.nova-sheet--white { background:#ffffff; }
.nova-sheet--full  { max-width:100%; }

/* ── Step 1 Content ── */
.nova-content { position:relative;z-index:1;display:flex;flex-direction:column;height:100%; }
.nova-header-wrap { flex-shrink:0;padding:16px 16px 0; }
.nova-header-row  { display:flex;align-items:center;justify-content:space-between;margin-bottom:10px; }
.nova-title       { font-size:13px;font-weight:700;color:#22c55e;letter-spacing:0.04em; }
.nova-balance-bar { display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;padding:6px 10px;border-radius:9px;background:rgba(255,255,255,0.07); }
.nova-balance-label { font-size:10px;color:rgba(255,255,255,0.8); }
.nova-balance-num   { font-size:12px;font-weight:700;color:rgba(253,224,71,0.9); }
.nova-divider       { height:1px;background:rgba(255,255,255,0.07);margin-bottom:8px; }
.nova-body { flex:1;overflow-y:auto;padding:0 16px 80px;overscroll-behavior:contain;-webkit-overflow-scrolling:touch; }
.nova-body::-webkit-scrollbar { width:2px; }
.nova-body::-webkit-scrollbar-thumb { background:rgba(100,116,139,0.22);border-radius:10px; }
.nova-cta-wrap {
  position:absolute;left:0;right:0;bottom:0;
  padding:8px 16px calc(16px + env(safe-area-inset-bottom, 0px));
  background:linear-gradient(to top, rgba(22,24,58,0.98) 80%, transparent);
  z-index:2;
}
.nova-label { font-size:11px;color:#fff;margin:0 0 5px 0;font-weight:700; }

/* Payment method grid */
.nova-pm-grid { display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-bottom:8px; }
.nova-pm-btn {
  position:relative;display:flex;align-items:center;gap:8px;
  padding:8px 10px;border-radius:12px;cursor:pointer;
  outline:none;transition:border-color 0.15s,background 0.15s,box-shadow 0.15s;
  text-align:left;user-select:none;-webkit-tap-highlight-color:transparent;
}
.nova-pm-idle   { background:#2e3375;border:1.5px solid rgba(255,255,255,0.1); }
.nova-pm-active {
  background:#2e3375;
  border:2px solid #f59e0b;
  box-shadow:0 0 0 1px rgba(245,158,11,0.25), inset 0 0 12px rgba(245,158,11,0.06);
}
.nova-pm-btn:active { opacity:0.78; }
.nova-pm-check {
  position:absolute;top:5px;right:6px;
  width:16px;height:16px;border-radius:50%;
  background:#f59e0b;
  display:flex;align-items:center;justify-content:center;
}
.nova-pm-icon  { width:28px;height:28px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;overflow:hidden; }
.nova-pm-label { font-size:12px;font-weight:600;padding-left:8px;border-left:1.5px solid rgba(255,255,255,0.18);line-height:1; }
.nova-pm-active .nova-pm-label { border-left-color:rgba(245,158,11,0.5); }
.nova-popular-badge { position:absolute;top:-7px;left:50%;transform:translateX(-50%);font-size:8px;font-weight:900;padding:2px 8px;border-radius:99px;background:linear-gradient(90deg,#f97316,#ef4444);color:#fff;white-space:nowrap; }

/* Amount grid */
.nova-amt-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:5px;margin-bottom:6px; }
.nova-amt-btn {
  padding:7px 2px;border-radius:10px;outline:none;
  font-size:11px;font-weight:700;cursor:pointer;
  transition:background 0.12s,border-color 0.12s,color 0.12s;
  text-align:center;user-select:none;-webkit-tap-highlight-color:transparent;
}
.nova-amt-idle   { background:#2e3375;color:rgba(255,255,255,0.7);border:1.5px solid rgba(255,255,255,0.1); }
.nova-amt-active {
  background:rgba(245,158,11,0.15);
  color:#fef9c3;
  border:2px solid #f59e0b;
  box-shadow:0 0 0 1px rgba(245,158,11,0.15);
}
.nova-amt-btn:active { opacity:0.68; }

.nova-input-wrap { position:relative;margin-bottom:8px; }
.nova-k-prefix { position:absolute;left:12px;top:50%;transform:translateY(-50%);font-size:11px;font-weight:700;color:rgba(156,163,175,0.6);z-index:1; }
.nova-input { width:100%;padding:10px 12px 10px 26px;border-radius:11px;border:1.5px solid rgba(245,158,11,0.3);outline:none;font-size:12px;font-weight:600;box-sizing:border-box;background:#2e3375;color:#fff;caret-color:#ffffff;transition:border-color 0.15s; }
.nova-input:focus { border-color:rgba(245,158,11,0.7); }
.nova-input::placeholder { color:rgba(107,114,128,0.45); }

.nova-bonus-card { border-radius:13px;overflow:hidden;margin-bottom:8px;background:#2e3375; }
.nova-bonus-header { display:flex;align-items:center;justify-content:space-between;padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05); }
.nova-bonus-title    { font-size:11px;font-weight:700;color:rgba(253,224,71,0.85); }
.nova-countdown-badge { display:flex;align-items:center;gap:3px;padding:2px 7px;border-radius:99px;background:rgba(239,68,68,0.18); }
.nova-countdown      { font-size:9px;font-weight:700;color:#fca5a5;font-variant-numeric:tabular-nums; }
.nova-radio-row  { display:flex;align-items:center;justify-content:space-between;padding:6px 12px;cursor:pointer;user-select:none; }
.nova-radio-text  { font-size:11px;font-weight:500;color:rgba(255,255,255,0.9); }
.nova-radio-title { font-size:11px;font-weight:700;color:rgba(203,213,225,0.9);white-space:nowrap;flex-shrink:0; }
.nova-radio-sub   { font-size:10px;color:rgba(255,255,255,0.65);white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.nova-radio-divline { font-size:10px;color:rgba(100,116,139,0.45);flex-shrink:0; }
.nova-row-divider { height:1px;background:rgba(255,255,255,0.04);margin:0 12px; }
.nova-radio { width:16px;height:16px;border-radius:50%;flex-shrink:0;border:1.5px solid rgba(100,116,139,0.5);background:transparent;transition:border-color 0.15s,background 0.15s; }
.nova-radio-on { border-color:#22c55e;background:radial-gradient(circle,#22c55e 0%,#22c55e 40%,transparent 60%);box-shadow:0 0 6px rgba(34,197,94,0.5); }
.nova-cta { width:100%;padding:13px;border-radius:99px;border:none;outline:none;font-size:13px;font-weight:700;letter-spacing:0.04em;cursor:pointer;background:linear-gradient(135deg,#16a34a,#15803d);color:#fff;transition:opacity 0.15s;-webkit-tap-highlight-color:transparent; }
.nova-cta:disabled { opacity:0.3;cursor:not-allowed; }
.nova-icon-btn { width:26px;height:26px;border-radius:8px;border:none;outline:none;cursor:pointer;background:rgba(255,255,255,0.07);color:rgba(156,163,175,0.8);display:flex;align-items:center;justify-content:center; }
.nova-refresh-btn { width:22px;height:22px;border-radius:6px;border:none;outline:none;cursor:pointer;background:rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:center;color:rgba(156,163,175,0.8); }
.nova-spin svg { animation:spin 0.6s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }

/* ══ STEP 2 — CLEAN WHITE ══ */
.s2-page {
  position:relative;
  display:flex;flex-direction:column;height:100%;
  background:#ffffff;
}

/* Top bar */
.s2-topbar {
  flex-shrink:0;display:flex;align-items:center;justify-content:space-between;
  padding:14px 16px 12px;
  border-bottom:1px solid #f0f0f0;
}
.s2-steps { display:flex;align-items:center;gap:0; }
.s2-dot {
  width:22px;height:22px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:11px;font-weight:700;
}
.s2-dot--done   { background:#16a34a;color:#fff; }
.s2-dot--active { background:#111827;color:#fff; }
.s2-dot-line { width:22px;height:1.5px;background:#16a34a; }
.s2-timer-badge {
  display:flex;align-items:center;gap:4px;
  color:#dc2626;
}
.s2-timer-text { font-size:12px;font-weight:700;font-variant-numeric:tabular-nums;color:#dc2626; }

/* Method row */
.s2-method-row {
  display:flex;align-items:center;gap:6px;
  padding:12px 0 4px;
}
.s2-method-badge {
  font-size:12px;font-weight:800;color:#111827;letter-spacing:0.03em;
}
.s2-via-hint { font-size:11px;color:#9ca3af; }

/* Scrollable body */
.s2-body {
  flex:1;overflow-y:auto;
  padding:0 18px 100px;
  -webkit-overflow-scrolling:touch;
  overscroll-behavior:contain;
}
.s2-body::-webkit-scrollbar { width:0; }
.s2-body-inner {
  display:flex;flex-direction:column;padding-bottom:0;
}
.s2-spacer { height:16px;flex-shrink:0; }

/* Field rows — plain underline style */
.s2-field {
  margin-bottom:14px;
}
.s2-field-label {
  font-size:10px;font-weight:600;color:#9ca3af;
  margin:0 0 4px 0;letter-spacing:0.04em;text-transform:uppercase;
}
.s2-field-row {
  display:flex;align-items:center;justify-content:space-between;
  padding-bottom:8px;
  border-bottom:1px solid #e5e7eb;
}
.s2-field-val { font-size:14px;font-weight:700;color:#111827; }
.s2-field-val--name { color:#111827;letter-spacing:0.04em; }
.s2-field-val--num  { font-family:monospace;font-size:15px;color:#dc2626;letter-spacing:0.06em; }
.s2-field-val--amt  { font-size:18px;font-weight:900;color:#111827; }

.s2-copy-btn {
  display:flex;align-items:center;gap:3px;
  padding:4px 10px;border-radius:5px;border:none;outline:none;cursor:pointer;
  background:#2563eb;color:#fff;
  font-size:10px;font-weight:700;
  flex-shrink:0;
  transition:opacity 0.12s;
}
.s2-copy-btn:active { opacity:0.75; }
.s2-copy-btn--amt { background:#d97706; }
.s2-exact-hint { font-size:10px;color:#9ca3af;font-weight:500; }

/* Copy toast */
.s2-toast {
  text-align:center;margin:0 0 8px 0;
  font-size:10px;font-weight:600;color:#16a34a;
}

/* ပြေစာ — single underline style */
.s2-ref-section {
  margin-bottom:10px;
  padding-top:4px;
}
.s2-ref-label {
  display:block;font-size:10px;font-weight:600;color:#9ca3af;
  margin-bottom:12px;letter-spacing:0.04em;text-transform:uppercase;
}
.s2-ref-boxes {
  display:flex;gap:0;justify-content:center;
  border-bottom:2px solid #111827;
  padding-bottom:4px;
  transition:border-color 0.15s;
}
.s2-ref-boxes:focus-within {
  border-bottom-color:#2563eb;
}
.s2-ref-box {
  width:44px;height:40px;
  border:none;
  background:transparent;
  font-size:22px;font-weight:800;color:#111827;
  text-align:center;
  outline:none;
  border-radius:0;
  -webkit-appearance:none;
  caret-color:transparent;
}

/* Tips — plain text */
.s2-tips-section { padding-top:8px; }
.s2-tips-title {
  font-size:10px;font-weight:700;color:#374151;
  margin:0 0 6px 0;text-transform:uppercase;letter-spacing:0.04em;
}
.s2-tips-list {
  padding-left:14px;margin:0;
  display:flex;flex-direction:column;gap:5px;
}
.s2-tips-list li {
  font-size:10px;line-height:1.55;color:#6b7280;
}

/* Footer — anchored to bottom, never rises with keyboard */
.s2-footer {
  position:absolute;left:0;right:0;bottom:0;
  display:flex;align-items:center;gap:10px;
  padding:10px 16px calc(12px + env(safe-area-inset-bottom, 0px));
  border-top:1px solid #f0f0f0;
  background:#ffffff;
  z-index:2;
}
.s2-back-btn {
  width:44px;height:44px;border-radius:10px;
  border:1px solid #e5e7eb;background:#f9fafb;
  display:flex;align-items:center;justify-content:center;
  color:#374151;cursor:pointer;flex-shrink:0;
}
.s2-back-btn:active { opacity:0.7; }
.s2-confirm-btn {
  flex:1;padding:13px;border-radius:10px;
  border:none;outline:none;cursor:pointer;
  background:#111827;
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

.s2-slip-section { margin-bottom:12px; }
.s2-slip-upload-area { border:2px dashed #e2e8f0;border-radius:10px;cursor:pointer;min-height:80px;display:flex;align-items:center;justify-content:center;transition:border-color .2s;overflow:hidden;position:relative; }
.s2-slip-upload-area:hover { border-color:#4f46e5; }
.s2-slip-placeholder { display:flex;flex-direction:column;align-items:center;gap:6px;padding:16px;color:#94a3b8;font-size:11px; }
.s2-slip-preview { width:100%;position:relative; }
.s2-slip-img { width:100%;max-height:140px;object-fit:cover;display:block; }
.s2-slip-clear { position:absolute;top:6px;right:6px;background:rgba(0,0,0,.6);border:none;color:#fff;border-radius:50%;width:24px;height:24px;cursor:pointer;font-size:12px; }
.s2-slip-progress { height:3px;background:#e2e8f0;border-radius:2px;overflow:hidden;margin-top:4px; }
.s2-slip-prog-bar { height:100%;background:#4f46e5;transition:width .3s; }
</style>
