<template>
  <Teleport to="body">
    <Transition name="nova-modal">
      <div v-if="visible" class="nova-overlay"
        @click.self="close"
        @touchmove.prevent>

        <div class="nova-sheet">

          <!-- ░░ BACKGROUND ░░ -->
          <div aria-hidden="true" class="nova-bg">
            <div class="nova-bg-base"></div>
            <div class="nova-orb nova-orb--1"></div>
            <div class="nova-orb nova-orb--2"></div>
            <div class="nova-orb nova-orb--3"></div>
          </div>

          <!-- content wrapper -->
          <div class="nova-content">

            <!-- ── Header ── -->
            <div class="nova-header-wrap">
              <div class="nova-header-row">
                <button v-if="step===2" @click="step=1" class="nova-icon-btn">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <div v-else style="width:26px;"></div>

                <span class="nova-title">ငွေသွင်းရန်</span>

                <button @click="close" class="nova-icon-btn">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <!-- Balance bar -->
              <div v-if="step===1" class="nova-balance-bar">
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

            <!-- ── Scroll body ── -->
            <div class="nova-body">

              <!-- ══ STEP 1 ══ -->
              <div v-if="step===1">

                <p class="nova-label">ငွေပေးချေနည်းလမ်း</p>

                <!-- Payment 2×2 -->
                <div class="nova-pm-grid">
                  <button
                    v-for="pm in paymentMethods"
                    :key="pm.key"
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

                <!-- Amount 4×2 — yellow border -->
                <div class="nova-amt-grid">
                  <button
                    v-for="amt in amountPresets"
                    :key="amt"
                    @click="selectAmount(amt)"
                    class="nova-amt-btn"
                    :class="amount===amt?'nova-amt-active':'nova-amt-idle'">
                    {{formatAmt(amt)}}
                  </button>
                </div>

                <!-- Input — yellow border -->
                <div class="nova-input-wrap">
                  <span class="nova-k-prefix">K</span>
                  <input
                    :value="displayAmount"
                    @input="onAmountInput"
                    @focus="onAmountFocus"
                    @blur="onAmountBlur"
                    type="text"
                    inputmode="numeric"
                    placeholder="အနည်းဆုံး: 3,000 ~ အများဆုံး: 1,000,000"
                    class="nova-input"/>
                </div>

                <!-- Bonus section -->
                <div class="nova-bonus-card">
                  <!-- Header -->
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

                  <!-- Radio: no bonus -->
                  <label class="nova-radio-row" @click="bonusOption='none'">
                    <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0;">
                      <span style="font-size:13px;flex-shrink:0;">😔</span>
                      <span class="nova-radio-text">ပွဲကို မပါဝင်ဘို့ ရွေးချယ်ခဲ့ပါတယ်။</span>
                    </div>
                    <div class="nova-radio" :class="bonusOption==='none'&&'nova-radio-on'"></div>
                  </label>

                  <div class="nova-row-divider"></div>

                  <!-- Radio: 1% -->
                  <label class="nova-radio-row" @click="bonusOption='1pct'">
                    <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0;">
                      <span style="font-size:13px;flex-shrink:0;">🎁</span>
                      <div>
                        <p class="nova-radio-title">ဘောနပ် 1%</p>
                        <p class="nova-radio-sub">တစ်ကြိမ်ပြန်လည်သွင်း ≥ 3,000</p>
                      </div>
                    </div>
                    <div class="nova-radio" :class="bonusOption==='1pct'&&'nova-radio-on'"></div>
                  </label>

                  <div class="nova-row-divider"></div>

                  <!-- Radio: 20% -->
                  <label class="nova-radio-row" @click="bonusOption='20pct'">
                    <div style="display:flex;align-items:center;gap:8px;flex:1;min-width:0;">
                      <span style="font-size:13px;flex-shrink:0;">🎁</span>
                      <div>
                        <p class="nova-radio-title">ဘောနပ် 20%</p>
                        <p class="nova-radio-sub">ပထမဆုံးငွေသွင်း ≥ 3,000</p>
                      </div>
                    </div>
                    <div class="nova-radio" :class="bonusOption==='20pct'&&'nova-radio-on'"></div>
                  </label>
                </div>

              </div><!-- /step 1 -->

              <!-- ══ STEP 2 ══ -->
              <div v-else-if="step===2">

                <div class="nova-method-summary">
                  <div class="nova-pm-icon" style="width:24px;height:24px;border-radius:7px;"
                    :style="{background:selectedMethod?.iconBg}">
                    <img v-if="selectedMethod?.img" :src="selectedMethod.img" style="width:18px;height:18px;object-fit:contain;"/>
                    <span v-else style="font-size:11px;font-weight:900;" :style="{color:selectedMethod?.iconColor}">
                      {{selectedMethod?.iconText}}
                    </span>
                  </div>
                  <span style="font-size:12px;font-weight:600;color:rgba(203,213,225,0.9);">{{selectedMethod?.label}}</span>
                  <span style="margin-left:auto;font-size:12px;font-weight:900;color:#22c55e;">
                    {{amount.toLocaleString()}} Ks
                  </span>
                </div>

                <p class="nova-label">ငွေလွှဲပေးရမည့် အကောင့်</p>

                <div class="nova-recipient-card">
                  <div class="nova-recipient-row">
                    <div>
                      <p class="nova-rec-sub">လက်ခံသူ</p>
                      <p class="nova-rec-name">{{recipientName}}</p>
                    </div>
                    <button @click="copyText(recipientName)" class="nova-copy-btn">
                      <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                      Copy
                    </button>
                  </div>
                  <div class="nova-divider" style="margin:0;"></div>
                  <div class="nova-recipient-row">
                    <div>
                      <p class="nova-rec-sub">ဖုန်းနံပါတ်</p>
                      <p class="nova-rec-phone">{{recipientAccount}}</p>
                    </div>
                    <button @click="copyText(recipientAccount)" class="nova-copy-btn">
                      <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                      Copy
                    </button>
                  </div>
                </div>

                <Transition name="toast">
                  <div v-if="copied" style="text-align:center;margin-bottom:8px;">
                    <span class="nova-copied-toast">✅ ကူးယူပြီးပါပြီ</span>
                  </div>
                </Transition>

                <p class="nova-label">ပြေစာနောက် ၅ လုံး</p>
                <input v-model="slip" maxlength="5" type="text" inputmode="numeric"
                  placeholder="X  X  X  X  X"
                  class="nova-input nova-slip-input"/>

                <div class="nova-amount-row">
                  <span style="font-size:11px;color:rgba(107,114,128,0.8);">သွင်းမည့်ပမာဏ</span>
                  <span style="font-size:12px;font-weight:900;color:#22c55e;">{{amount.toLocaleString()}} Ks</span>
                </div>
              </div><!-- /step 2 -->

            </div><!-- /body -->

            <!-- ── CTA ── -->
            <div class="nova-cta-wrap">
              <button v-if="step===1"
                @click="nextStep"
                :disabled="!method||!amount||amount<3000"
                class="nova-cta">
                ယခု ငွေသွင်းပါ
              </button>
              <button v-else
                @click="submitDeposit"
                :disabled="slip.length<5"
                class="nova-cta nova-cta--green">
                အတည်ပြုမည် ✓
              </button>
            </div>

          </div><!-- /nova-content -->
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/lib/supabase'

const props = defineProps({ modelValue: Boolean })
const emit  = defineEmits(['update:modelValue', 'submit'])

const visible       = ref(props.modelValue)
const step          = ref(1)
const method        = ref('kpay')
const amount        = ref(5000)
const slip          = ref('')
const copied        = ref(false)
const bonusOption   = ref('none')
const walletBalance = ref(0)
const refreshing    = ref(false)
const focusMode     = ref(false)

// ── Body scroll lock ──────────────────────────────────────────────
function lockScroll()   { document.body.style.overflow = 'hidden'; document.body.style.touchAction = 'none' }
function unlockScroll() { document.body.style.overflow = ''; document.body.style.touchAction = '' }

// ── Countdown ─────────────────────────────────────────────────────
const countdown = ref('00:00:00.0')
let timerInterval = null
function startTimer() {
  let total = 23 * 3600 + 30 * 60 + 57
  timerInterval = setInterval(() => {
    total--; if (total < 0) total = 23 * 3600
    const h = String(Math.floor(total / 3600)).padStart(2,'0')
    const m = String(Math.floor((total % 3600) / 60)).padStart(2,'0')
    const s = String(total % 60).padStart(2,'0')
    countdown.value = `${h}:${m}:${s}.${Math.floor(Math.random()*9)}`
  }, 1000)
}
onMounted(() => startTimer())
onUnmounted(() => { clearInterval(timerInterval); unlockScroll() })

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
watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    step.value=1; amount.value=5000; slip.value=''; bonusOption.value='none'; focusMode.value=false
    fetchPaymentSettings(); fetchBalance(); lockScroll()
  } else {
    unlockScroll()
  }
})

// ── Amount display ────────────────────────────────────────────────
const displayAmount = computed(() => {
  if (!amount.value) return ''
  return focusMode.value ? String(amount.value) : amount.value.toLocaleString()
})
function selectAmount(n)  { amount.value = n; focusMode.value = false }
function onAmountInput(e) { const raw = e.target.value.replace(/,/g,'').replace(/[^0-9]/g,''); amount.value = raw ? parseInt(raw,10) : 0 }
function onAmountFocus()  { focusMode.value = true }
function onAmountBlur()   { focusMode.value = false }
function formatAmt(n)     { return n.toLocaleString() }

// ── Actions ───────────────────────────────────────────────────────
const close    = () => emit('update:modelValue', false)
const nextStep = () => { if (!method.value || amount.value < 3000) return; step.value = 2 }
const copyText = async (text) => {
  try { await navigator.clipboard.writeText(text); copied.value=true; setTimeout(()=>{ copied.value=false },1500) }
  catch { prompt('Copy manually:', text) }
}
const submitDeposit = () => {
  if (slip.value.length !== 5) return
  emit('submit', { method:method.value, amount:amount.value, slip:slip.value, bonus:bonusOption.value })
  close()
}
</script>

<style scoped>
/* ── Overlay ── */
.nova-overlay {
  position:fixed;inset:0;z-index:50;
  display:flex;align-items:flex-end;justify-content:center;
  background:rgba(0,0,0,0.75);
  backdrop-filter:blur(8px);
  -webkit-backdrop-filter:blur(8px);
  /* prevent background page scroll */
  touch-action:none;
  overscroll-behavior:contain;
}

/* ── Sheet ── */
.nova-sheet {
  position:relative;
  width:100%;
  max-width:480px;
  /* Use dvh so it doesn't overlap nav bar */
  height:82dvh;
  border-radius:20px 20px 0 0;
  overflow:hidden;
  display:flex;
  flex-direction:column;
}

/* ── BG ── */
.nova-bg { position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;border-radius:20px 20px 0 0; }
.nova-bg-base { position:absolute;inset:0;background:linear-gradient(160deg,#08102a 0%,#0d1a36 25%,#0c1828 50%,#091420 75%,#07101a 100%); }
.nova-orb { position:absolute;border-radius:50%;pointer-events:none; }
.nova-orb--1 { top:-60px;left:-60px;width:280px;height:280px;background:radial-gradient(circle,rgba(34,197,94,0.22) 0%,rgba(34,197,94,0.07) 50%,transparent 70%);animation:orbA 12s ease-in-out infinite; }
.nova-orb--2 { top:15%;right:-70px;width:300px;height:300px;background:radial-gradient(circle,rgba(99,102,241,0.22) 0%,rgba(56,189,248,0.1) 45%,transparent 70%);animation:orbB 16s ease-in-out infinite; }
.nova-orb--3 { bottom:40px;left:-20px;width:220px;height:220px;background:radial-gradient(circle,rgba(168,85,247,0.18) 0%,rgba(236,72,153,0.08) 50%,transparent 70%);animation:orbC 14s ease-in-out infinite; }
@keyframes orbA { 0%{transform:translate(0,0);}50%{transform:translate(12px,-18px);}100%{transform:translate(0,0);} }
@keyframes orbB { 0%{transform:translate(0,0);}50%{transform:translate(-15px,14px);}100%{transform:translate(0,0);} }
@keyframes orbC { 0%{transform:translate(0,0);}50%{transform:translate(10px,-12px);}100%{transform:translate(0,0);} }

/* ── Content ── */
.nova-content { position:relative;z-index:1;display:flex;flex-direction:column;height:100%; }

/* ── Header ── */
.nova-header-wrap { flex-shrink:0;padding:12px 16px 0; }
.nova-header-row  { display:flex;align-items:center;justify-content:space-between;margin-bottom:8px; }
.nova-title       { font-size:13px;font-weight:700;color:rgba(226,232,240,0.95);letter-spacing:0.04em; }
.nova-balance-bar {
  display:flex;align-items:center;justify-content:space-between;
  margin-bottom:8px;padding:5px 10px;border-radius:9px;
  background:rgba(255,255,255,0.04);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.07);
}
.nova-balance-label { font-size:10px;color:rgba(148,163,184,0.7); }
.nova-balance-num   { font-size:12px;font-weight:700;color:rgba(253,224,71,0.9); }
.nova-divider       { height:1px;background:rgba(255,255,255,0.07);margin-bottom:10px; }

/* ── Scroll body ── */
.nova-body {
  flex:1;overflow-y:auto;padding:0 16px;
  overscroll-behavior:contain;
  -webkit-overflow-scrolling:touch;
}
.nova-body::-webkit-scrollbar { width:2px; }
.nova-body::-webkit-scrollbar-track { background:transparent; }
.nova-body::-webkit-scrollbar-thumb { background:rgba(100,116,139,0.22);border-radius:10px; }

/* ── CTA strip ── */
.nova-cta-wrap { flex-shrink:0;padding:8px 16px 12px; }

/* ── Labels ── */
.nova-label { font-size:11px;color:rgba(156,163,175,0.75);margin:0 0 7px 0; }

/* ── Payment grid ── */
.nova-pm-grid { display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px; }
.nova-pm-btn {
  position:relative;display:flex;align-items:center;gap:9px;
  padding:9px 11px;border-radius:12px;cursor:pointer;border:none;outline:none;
  transition:all 0.18s ease;text-align:left;user-select:none;
}
.nova-pm-idle   { background:rgba(255,255,255,0.05);box-shadow:inset 0 1px 0 rgba(255,255,255,0.09),0 1px 4px rgba(0,0,0,0.3); }
.nova-pm-active { background:rgba(255,255,255,0.09);box-shadow:inset 0 1px 0 rgba(255,255,255,0.15),inset 0 0 0 1px rgba(34,197,94,0.4),0 0 12px rgba(34,197,94,0.15); }
.nova-pm-btn:active { transform:scale(0.97); }
.nova-pm-icon  { width:28px;height:28px;border-radius:8px;flex-shrink:0;display:flex;align-items:center;justify-content:center;overflow:hidden; }
.nova-pm-label { font-size:12px;font-weight:600; }
.nova-popular-badge {
  position:absolute;top:-7px;left:50%;transform:translateX(-50%);
  font-size:8px;font-weight:900;padding:2px 8px;border-radius:99px;
  background:linear-gradient(90deg,#f97316,#ef4444);color:#fff;
  white-space:nowrap;box-shadow:0 1px 6px rgba(249,115,22,0.5);
}

/* ── Amount grid — yellow frame ── */
.nova-amt-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:8px; }
.nova-amt-btn {
  padding:8px 2px;border-radius:10px;border:none;outline:none;
  font-size:11px;font-weight:700;cursor:pointer;
  transition:all 0.15s ease;text-align:center;user-select:none;
}
.nova-amt-idle {
  background:rgba(255,255,255,0.05);
  color:rgba(203,213,225,0.85);
  border:1px solid rgba(234,179,8,0.25);
}
.nova-amt-active {
  background:rgba(6,182,212,0.82);color:#fff;
  border:1px solid rgba(6,182,212,0.6);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 2px 10px rgba(6,182,212,0.4);
}
.nova-amt-btn:hover { filter:brightness(1.12); }
.nova-amt-btn:active { transform:scale(0.95); }

/* ── Input wrap — yellow frame ── */
.nova-input-wrap { position:relative;margin-bottom:12px; }
.nova-k-prefix {
  position:absolute;left:12px;top:50%;transform:translateY(-50%);
  font-size:11px;font-weight:700;color:rgba(156,163,175,0.6);z-index:1;
}
.nova-input {
  width:100%;padding:10px 12px 10px 26px;border-radius:11px;
  border:1px solid rgba(234,179,8,0.3);outline:none;
  font-size:12px;font-weight:600;box-sizing:border-box;
  background:rgba(255,255,255,0.06);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.07);
  color:rgba(226,232,240,0.9);
  caret-color:#22c55e;
  transition:border-color 0.15s;
}
.nova-input:focus {
  border-color:rgba(234,179,8,0.6);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.09),0 0 0 1.5px rgba(234,179,8,0.15);
}
.nova-input::placeholder { color:rgba(107,114,128,0.45); }

/* Slip input (full width, centered) */
.nova-slip-input {
  padding:10px;text-align:center;letter-spacing:0.45em;
  font-family:monospace;font-size:17px;font-weight:900;
  margin-bottom:10px;
}

/* ── Bonus card ── */
.nova-bonus-card {
  border-radius:13px;overflow:hidden;margin-bottom:8px;
  background:rgba(255,255,255,0.04);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.07),0 2px 8px rgba(0,0,0,0.3);
}
.nova-bonus-header {
  display:flex;align-items:center;justify-content:space-between;
  padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);
}
.nova-bonus-title    { font-size:11px;font-weight:700;color:rgba(253,224,71,0.85); }
.nova-countdown-badge { display:flex;align-items:center;gap:3px;padding:2px 7px;border-radius:99px;background:rgba(239,68,68,0.18); }
.nova-countdown      { font-size:9px;font-weight:700;color:#fca5a5;font-variant-numeric:tabular-nums; }
.nova-radio-row  { display:flex;align-items:center;justify-content:space-between;padding:9px 12px;cursor:pointer;user-select:none;transition:background 0.15s; }
.nova-radio-row:hover { background:rgba(255,255,255,0.03); }
.nova-radio-text  { font-size:11px;font-weight:500;color:rgba(148,163,184,0.85);white-space:nowrap;overflow:hidden;text-overflow:ellipsis; }
.nova-radio-title { font-size:11px;font-weight:600;color:rgba(203,213,225,0.9);margin:0 0 1px 0; }
.nova-radio-sub   { font-size:9px;color:rgba(107,114,128,0.75);margin:0; }
.nova-row-divider { height:1px;background:rgba(255,255,255,0.04);margin:0 12px; }
.nova-radio {
  width:16px;height:16px;border-radius:50%;flex-shrink:0;
  border:1.5px solid rgba(100,116,139,0.5);
  background:transparent;transition:all 0.18s;
}
.nova-radio-on {
  border-color:#22c55e;
  background:radial-gradient(circle,#22c55e 0%,#22c55e 40%,transparent 60%);
  box-shadow:0 0 6px rgba(34,197,94,0.5);
}

/* ── Step 2 ── */
.nova-method-summary {
  display:flex;align-items:center;gap:8px;margin-bottom:12px;
  padding:8px 11px;border-radius:11px;
  background:rgba(255,255,255,0.05);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);
}
.nova-recipient-card {
  border-radius:13px;overflow:hidden;margin-bottom:10px;
  background:rgba(255,255,255,0.05);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.09),0 2px 8px rgba(0,0,0,0.25);
}
.nova-recipient-row { display:flex;align-items:center;justify-content:space-between;padding:10px 12px; }
.nova-rec-sub   { font-size:9px;color:rgba(107,114,128,0.8);margin:0 0 2px 0; }
.nova-rec-name  { font-size:12px;font-weight:600;color:rgba(226,232,240,0.95);margin:0; }
.nova-rec-phone { font-family:monospace;font-size:17px;font-weight:900;letter-spacing:0.2em;color:#e2e8f0;margin:0; }
.nova-copy-btn {
  display:flex;align-items:center;gap:4px;font-size:10px;font-weight:600;
  padding:4px 9px;border-radius:7px;border:none;outline:none;cursor:pointer;
  background:rgba(255,255,255,0.07);box-shadow:inset 0 1px 0 rgba(255,255,255,0.1);
  color:rgba(148,163,184,0.9);transition:all 0.15s;
}
.nova-copy-btn:hover { background:rgba(255,255,255,0.11); }
.nova-copy-btn:active { transform:scale(0.95); }
.nova-copied-toast {
  font-size:10px;padding:3px 12px;border-radius:99px;font-weight:600;
  background:rgba(34,197,94,0.12);color:#86efac;
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);
}
.nova-amount-row { display:flex;justify-content:space-between;margin-bottom:10px;padding:0 2px; }

/* ── CTA ── */
.nova-cta {
  width:100%;padding:11px;border-radius:99px;border:none;outline:none;
  font-size:13px;font-weight:700;letter-spacing:0.04em;cursor:pointer;
  background:rgba(30,41,59,0.95);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.12),0 3px 10px rgba(0,0,0,0.4);
  color:rgba(226,232,240,0.9);transition:all 0.2s;
}
.nova-cta:hover   { background:rgba(51,65,85,0.95); }
.nova-cta:active  { transform:scale(0.98); }
.nova-cta:disabled { opacity:0.3;cursor:not-allowed; }
.nova-cta--green {
  background:rgba(5,150,105,0.9);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.18),0 3px 12px rgba(34,197,94,0.3);
  color:#fff;
}
.nova-cta--green:hover    { background:rgba(4,120,87,0.95); }
.nova-cta--green:disabled { opacity:0.3;cursor:not-allowed; }

/* ── Buttons ── */
.nova-icon-btn {
  width:26px;height:26px;border-radius:8px;border:none;outline:none;cursor:pointer;
  background:rgba(255,255,255,0.07);box-shadow:inset 0 1px 0 rgba(255,255,255,0.1);
  color:rgba(156,163,175,0.8);display:flex;align-items:center;justify-content:center;transition:background 0.15s;
}
.nova-icon-btn:hover { background:rgba(255,255,255,0.12); }
.nova-refresh-btn {
  width:22px;height:22px;border-radius:6px;border:none;outline:none;cursor:pointer;
  background:rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:center;
  color:rgba(156,163,175,0.8);transition:all 0.15s;
}
.nova-refresh-btn:hover { background:rgba(255,255,255,0.12); }
.nova-spin svg { animation:spin 0.6s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }

/* ── Transitions ── */
.nova-modal-enter-active { animation:sheetUp 0.28s cubic-bezier(0.22,1,0.36,1); }
.nova-modal-leave-active { animation:sheetUp 0.18s cubic-bezier(0.55,0,1,0.45) reverse; }
@keyframes sheetUp { from{transform:translateY(100%);} to{transform:translateY(0);} }
.toast-enter-active { transition:all 0.2s ease; }
.toast-leave-active { transition:all 0.12s ease; }
.toast-enter-from   { opacity:0;transform:translateY(4px); }
.toast-leave-to     { opacity:0; }
</style>
