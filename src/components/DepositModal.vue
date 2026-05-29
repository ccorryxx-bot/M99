<template>
  <Teleport to="body">
    <Transition name="nova-modal">
      <div v-if="visible" class="fixed inset-0 z-50 flex items-end justify-center"
        style="background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);"
        @click.self="close">

        <div class="nova-sheet w-full max-w-md"
          style="height:88vh;border-radius:20px 20px 0 0;overflow:hidden;
                 position:relative;display:flex;flex-direction:column;">

          <!-- ░░ BACKGROUND — exact homepage gradient + orbs ░░ -->
          <div aria-hidden="true" style="position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;border-radius:20px 20px 0 0;">
            <div style="position:absolute;inset:0;background:linear-gradient(160deg,#08102a 0%,#0d1a36 25%,#0c1828 50%,#091420 75%,#07101a 100%);"></div>
            <div style="position:absolute;top:-60px;left:-60px;width:280px;height:280px;border-radius:50%;
                        background:radial-gradient(circle,rgba(34,197,94,0.22) 0%,rgba(34,197,94,0.07) 50%,transparent 70%);
                        animation:orbA 12s ease-in-out infinite;"></div>
            <div style="position:absolute;top:15%;right:-70px;width:300px;height:300px;border-radius:50%;
                        background:radial-gradient(circle,rgba(99,102,241,0.22) 0%,rgba(56,189,248,0.1) 45%,transparent 70%);
                        animation:orbB 16s ease-in-out infinite;"></div>
            <div style="position:absolute;bottom:40px;left:-20px;width:220px;height:220px;border-radius:50%;
                        background:radial-gradient(circle,rgba(168,85,247,0.18) 0%,rgba(236,72,153,0.08) 50%,transparent 70%);
                        animation:orbC 14s ease-in-out infinite;"></div>
          </div>

          <div style="position:relative;z-index:1;display:flex;flex-direction:column;height:100%;">

            <!-- ── Header ── -->
            <div style="flex-shrink:0;padding:12px 16px 8px;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">

                <!-- Left: back (step2) or spacer -->
                <button v-if="step===2" @click="step=1" class="nova-icon-btn">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <div v-else style="width:26px;"></div>

                <!-- Center: title -->
                <span style="font-size:13px;font-weight:700;color:rgba(226,232,240,0.95);letter-spacing:0.04em;">
                  ငွေသွင်းရန်
                </span>

                <!-- Right: close -->
                <button @click="close" class="nova-icon-btn">
                  <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <!-- ── Balance bar (Myanmar flag + balance + refresh) ── -->
              <div v-if="step===1" style="display:flex;align-items:center;justify-content:space-between;
                          margin-bottom:8px;padding:6px 10px;border-radius:10px;
                          background:rgba(255,255,255,0.04);
                          box-shadow:inset 0 1px 0 rgba(255,255,255,0.07);">
                <span style="font-size:11px;color:rgba(148,163,184,0.7);">
                  ငွေလွှဲရန် ဘက်အမျိုးအစား ရွေးချယ်ပါ။
                </span>
                <div style="display:flex;align-items:center;gap:5px;">
                  <!-- Myanmar flag emoji as circle badge -->
                  <div style="width:18px;height:18px;border-radius:50%;overflow:hidden;flex-shrink:0;
                              background:linear-gradient(135deg,#f9c74f,#f3722c);
                              display:flex;align-items:center;justify-content:center;font-size:12px;">
                    🇲🇲
                  </div>
                  <span style="font-size:12px;font-weight:700;color:rgba(253,224,71,0.9);">
                    {{ walletBalance.toLocaleString() }}
                  </span>
                  <!-- Refresh button -->
                  <button @click="refreshBalance" class="nova-refresh-btn" :class="refreshing&&'nova-spin'">
                    <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5"
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                    </svg>
                  </button>
                </div>
              </div>

              <div style="height:1px;background:rgba(255,255,255,0.07);"></div>
            </div>

            <!-- ── Scrollable body ── -->
            <div style="flex:1;overflow-y:auto;padding:0 16px 8px;" class="nova-scroll">

              <!-- ══ STEP 1 ══ -->
              <div v-if="step===1">

                <!-- Payment label -->
                <p style="font-size:11px;color:rgba(156,163,175,0.75);margin:0 0 7px 0;">
                  ငွေပေးချေနည်းလမ်း
                </p>

                <!-- 2×2 Payment grid -->
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;">
                  <button
                    v-for="pm in paymentMethods"
                    :key="pm.key"
                    @click="method=pm.key"
                    class="nova-pm-btn"
                    :class="method===pm.key ? 'nova-pm-active' : 'nova-pm-idle'"
                    style="position:relative;display:flex;align-items:center;gap:9px;
                           padding:9px 11px;border-radius:12px;cursor:pointer;
                           border:none;outline:none;transition:all 0.18s ease;text-align:left;">

                    <span v-if="pm.popular"
                      style="position:absolute;top:-7px;left:50%;transform:translateX(-50%);
                             font-size:8px;font-weight:900;padding:2px 8px;border-radius:99px;
                             background:linear-gradient(90deg,#f97316,#ef4444);color:#fff;
                             white-space:nowrap;box-shadow:0 1px 6px rgba(249,115,22,0.5);">
                      လူကြိုက်များ
                    </span>

                    <div style="width:28px;height:28px;border-radius:8px;flex-shrink:0;
                                display:flex;align-items:center;justify-content:center;overflow:hidden;"
                      :style="{background:pm.iconBg}">
                      <img v-if="pm.img" :src="pm.img" style="width:22px;height:22px;object-fit:contain;"/>
                      <span v-else style="font-size:13px;font-weight:900;" :style="{color:pm.iconColor}">{{pm.iconText}}</span>
                    </div>

                    <span style="font-size:12px;font-weight:600;"
                      :style="method===pm.key?{color:'#e2e8f0'}:{color:'rgba(148,163,184,0.85)'}">
                      {{pm.label}}
                    </span>
                  </button>
                </div>

                <!-- Amount label -->
                <p style="font-size:11px;color:rgba(156,163,175,0.75);margin:0 0 7px 0;">
                  သွင်းမည့်ပမာဏ
                </p>

                <!-- 4×2 Amount grid - full number format -->
                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:8px;">
                  <button
                    v-for="amt in amountPresets"
                    :key="amt"
                    @click="selectAmount(amt)"
                    class="nova-amt-btn"
                    :class="amount===amt ? 'nova-amt-active' : 'nova-amt-idle'"
                    style="padding:8px 2px;border-radius:10px;border:none;outline:none;
                           font-size:11px;font-weight:700;cursor:pointer;
                           transition:all 0.15s ease;text-align:center;">
                    {{formatAmt(amt)}}
                  </button>
                </div>

                <!-- K input — shows formatted value with commas -->
                <div style="position:relative;margin-bottom:12px;">
                  <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);
                               font-size:11px;font-weight:700;color:rgba(156,163,175,0.6);z-index:1;">K</span>
                  <input
                    :value="displayAmount"
                    @input="onAmountInput"
                    @focus="onAmountFocus"
                    @blur="onAmountBlur"
                    type="text"
                    inputmode="numeric"
                    placeholder="အနည်းဆုံး: 3,000 ~ အများဆုံး: 1,000,000"
                    ref="amountInput"
                    style="width:100%;padding:10px 12px 10px 26px;border-radius:11px;
                           border:none;outline:none;font-size:12px;font-weight:600;
                           box-sizing:border-box;
                           background:rgba(255,255,255,0.06);
                           box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);
                           color:rgba(226,232,240,0.9);
                           caret-color:#22c55e;"
                    class="nova-input"/>
                </div>

                <!-- ── Bonus section ── -->
                <div style="border-radius:13px;overflow:hidden;margin-bottom:8px;
                            background:rgba(255,255,255,0.04);
                            box-shadow:inset 0 1px 0 rgba(255,255,255,0.07),0 2px 8px rgba(0,0,0,0.3);">

                  <!-- Bonus header -->
                  <div style="display:flex;align-items:center;justify-content:space-between;
                              padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.05);">
                    <div style="display:flex;align-items:center;gap:5px;">
                      <span style="font-size:12px;">🎁</span>
                      <span style="font-size:11px;font-weight:700;color:rgba(253,224,71,0.85);">
                        အားပြည့်သွင်းရန်ကမ်းလှမ်းချက်
                      </span>
                    </div>
                    <!-- Countdown timer badge -->
                    <div style="display:flex;align-items:center;gap:3px;padding:2px 7px;border-radius:99px;
                                background:rgba(239,68,68,0.18);">
                      <span style="font-size:9px;">⚡</span>
                      <span style="font-size:9px;font-weight:700;color:#fca5a5;font-variant-numeric:tabular-nums;">
                        {{countdown}}
                      </span>
                    </div>
                  </div>

                  <!-- Radio options -->
                  <div>
                    <!-- Option 0: No bonus -->
                    <label class="nova-radio-row" @click="bonusOption='none'">
                      <div style="display:flex;align-items:center;gap:8px;flex:1;">
                        <span style="font-size:13px;">😔</span>
                        <span style="font-size:11px;font-weight:500;color:rgba(148,163,184,0.85);">
                          ပွဲကို မပါဝင်ဘို့ ရွေးချယ်ခဲ့ပါတယ်။
                        </span>
                      </div>
                      <div class="nova-radio" :class="bonusOption==='none'&&'nova-radio-on'"></div>
                    </label>

                    <div style="height:1px;background:rgba(255,255,255,0.04);margin:0 12px;"></div>

                    <!-- Option 1: 1% bonus -->
                    <label class="nova-radio-row" @click="bonusOption='1pct'">
                      <div style="display:flex;align-items:center;gap:8px;flex:1;">
                        <span style="font-size:13px;">🎁</span>
                        <div>
                          <p style="font-size:11px;font-weight:600;color:rgba(203,213,225,0.9);margin:0 0 1px 0;">
                            ဘောနပ် 1%
                          </p>
                          <p style="font-size:9px;color:rgba(107,114,128,0.75);margin:0;">
                            တစ်ကြိမ်ပြန်လည်သွင်းရန် ≥ 3,000
                          </p>
                        </div>
                      </div>
                      <div class="nova-radio" :class="bonusOption==='1pct'&&'nova-radio-on'"></div>
                    </label>

                    <div style="height:1px;background:rgba(255,255,255,0.04);margin:0 12px;"></div>

                    <!-- Option 2: 20% bonus -->
                    <label class="nova-radio-row" @click="bonusOption='20pct'">
                      <div style="display:flex;align-items:center;gap:8px;flex:1;">
                        <span style="font-size:13px;">🎁</span>
                        <div>
                          <p style="font-size:11px;font-weight:600;color:rgba(203,213,225,0.9);margin:0 0 1px 0;">
                            ဘောနပ် 20%
                          </p>
                          <p style="font-size:9px;color:rgba(107,114,128,0.75);margin:0;">
                            ပထမဆုံးငွေသွင်း ≥ 3,000
                          </p>
                        </div>
                      </div>
                      <div class="nova-radio" :class="bonusOption==='20pct'&&'nova-radio-on'"></div>
                    </label>
                  </div>

                  <!-- Bonus summary (show when bonus selected) -->
                  <div v-if="bonusOption!=='none' && amount>0"
                    style="border-top:1px solid rgba(255,255,255,0.06);padding:8px 12px;">
                    <div style="display:flex;justify-content:space-between;margin-bottom:4px;">
                      <span style="font-size:11px;font-weight:600;color:rgba(253,224,71,0.7);">
                        ဘောနပ် {{activeBonusPercent}}%
                      </span>
                      <span style="font-size:11px;font-weight:700;color:#fde047;">
                        +{{bonusAmount.toLocaleString()}} Ks
                      </span>
                    </div>
                    <div style="display:flex;justify-content:space-between;">
                      <span style="font-size:11px;color:rgba(148,163,184,0.6);">စုစုပေါင်း</span>
                      <span style="font-size:15px;font-weight:900;color:#fde047;">
                        {{totalAmount.toLocaleString()}} Ks
                      </span>
                    </div>
                  </div>
                </div>

              </div><!-- /step 1 -->

              <!-- ══ STEP 2 ══ -->
              <div v-else-if="step===2">

                <!-- Method + amount summary -->
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;
                            padding:8px 11px;border-radius:11px;
                            background:rgba(255,255,255,0.05);
                            box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);">
                  <div style="width:24px;height:24px;border-radius:7px;overflow:hidden;flex-shrink:0;
                              display:flex;align-items:center;justify-content:center;"
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

                <!-- Recipient label -->
                <p style="font-size:11px;color:rgba(156,163,175,0.75);margin:0 0 7px 0;">
                  ငွေလွှဲပေးရမည့် အကောင့်
                </p>

                <!-- Recipient card -->
                <div style="border-radius:13px;overflow:hidden;margin-bottom:12px;
                            background:rgba(255,255,255,0.05);
                            box-shadow:inset 0 1px 0 rgba(255,255,255,0.09),0 2px 8px rgba(0,0,0,0.25);">
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;">
                    <div>
                      <p style="font-size:9px;color:rgba(107,114,128,0.8);margin:0 0 2px 0;">လက်ခံသူ</p>
                      <p style="font-size:12px;font-weight:600;color:rgba(226,232,240,0.95);margin:0;">{{recipientName}}</p>
                    </div>
                    <button @click="copyText(recipientName)" class="nova-copy-btn">
                      <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                      Copy
                    </button>
                  </div>
                  <div style="height:1px;background:rgba(255,255,255,0.05);"></div>
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;">
                    <div>
                      <p style="font-size:9px;color:rgba(107,114,128,0.8);margin:0 0 2px 0;">ဖုန်းနံပါတ်</p>
                      <p style="font-family:monospace;font-size:18px;font-weight:900;
                                letter-spacing:0.2em;color:#e2e8f0;margin:0;">{{recipientAccount}}</p>
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
                    <span style="font-size:10px;padding:3px 12px;border-radius:99px;font-weight:600;
                                 background:rgba(34,197,94,0.12);color:#86efac;
                                 box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);">
                      ✅ ကူးယူပြီးပါပြီ
                    </span>
                  </div>
                </Transition>

                <p style="font-size:11px;color:rgba(156,163,175,0.75);margin:0 0 6px 0;">
                  ပြေစာနောက် ၅ လုံး
                </p>
                <input
                  v-model="slip"
                  maxlength="5" type="text" inputmode="numeric"
                  placeholder="X  X  X  X  X"
                  class="nova-input"
                  style="width:100%;padding:10px;border-radius:11px;border:none;outline:none;
                         font-family:monospace;font-size:17px;font-weight:900;text-align:center;
                         letter-spacing:0.45em;background:rgba(255,255,255,0.06);
                         box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);
                         color:#e2e8f0;margin-bottom:10px;box-sizing:border-box;
                         caret-color:#22c55e;"/>

                <div style="display:flex;justify-content:space-between;margin-bottom:10px;padding:0 2px;">
                  <span style="font-size:11px;color:rgba(107,114,128,0.8);">သွင်းမည့်ပမာဏ</span>
                  <span style="font-size:12px;font-weight:900;color:#22c55e;">{{amount.toLocaleString()}} Ks</span>
                </div>
              </div><!-- /step 2 -->

            </div><!-- /scroll body -->

            <!-- ── Sticky CTA ── -->
            <div style="flex-shrink:0;padding:6px 16px 22px;">
              <button v-if="step===1"
                @click="nextStep"
                :disabled="!method||!amount||amount<3000"
                class="nova-cta"
                style="width:100%;padding:13px;border-radius:99px;border:none;outline:none;
                       font-size:13px;font-weight:700;letter-spacing:0.04em;cursor:pointer;">
                ယခု ငွေသွင်းပါ
              </button>
              <button v-else
                @click="submitDeposit"
                :disabled="slip.length<5"
                class="nova-cta nova-cta--green"
                style="width:100%;padding:13px;border-radius:99px;border:none;outline:none;
                       font-size:13px;font-weight:700;letter-spacing:0.04em;cursor:pointer;">
                အတည်ပြုမည် ✓
              </button>
            </div>

          </div><!-- /content -->
        </div><!-- /sheet -->
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
const amountInput   = ref(null)
const focusMode     = ref(false)

// ── Countdown timer ──────────────────────────────────────────────
const countdown = ref('00:00:00.0')
let timerInterval = null
function startTimer() {
  let total = 23 * 3600 + 30 * 60 + 57
  timerInterval = setInterval(() => {
    total--
    if (total < 0) total = 23 * 3600
    const h = String(Math.floor(total / 3600)).padStart(2, '0')
    const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0')
    const s = String(total % 60).padStart(2, '0')
    countdown.value = `${h}:${m}:${s}.${Math.floor(Math.random() * 9)}`
  }, 1000)
}
onMounted(() => startTimer())
onUnmounted(() => clearInterval(timerInterval))

// ── Wallet balance ─────────────────────────────────────────────────
async function fetchBalance() {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return
  const { data } = await supabase
    .from('wallets').select('balance').eq('user_id', user.id).maybeSingle()
  if (data) walletBalance.value = Number(data.balance) || 0
}
async function refreshBalance() {
  refreshing.value = true
  await fetchBalance()
  setTimeout(() => { refreshing.value = false }, 600)
}

// ── Payment methods ────────────────────────────────────────────────
const amountPresets = [3000, 5000, 10000, 30000, 50000, 100000, 500000, 1000000]

const paymentMethods = [
  { key:'kpay',   label:'KBZ Pay', popular:true,  img:'/images/payments/kpay.png', iconBg:'rgba(37,99,235,0.3)' },
  { key:'wave',   label:'WavePay', popular:false, img:'/images/payments/wave.png', iconBg:'rgba(5,150,105,0.25)' },
  { key:'usdt',   label:'USDT',    popular:false, img:null, iconText:'₮', iconBg:'rgba(34,197,94,0.25)',  iconColor:'#4ade80' },
  { key:'uabpay', label:'UAB Pay', popular:false, img:null, iconText:'U', iconBg:'rgba(139,92,246,0.25)', iconColor:'#c084fc' },
]

const selectedMethod  = computed(() => paymentMethods.find(p => p.key === method.value))
const recipientName   = ref('')
const recipientAccount = ref('')

async function fetchPaymentSettings() {
  const keys = ['wave_recipient_name','wave_recipient_account','kpay_recipient_name','kpay_recipient_account',
                 'usdt_recipient_name','usdt_recipient_account','uabpay_recipient_name','uabpay_recipient_account']
  const { data, error } = await supabase.from('system_settings').select('key,value').in('key', keys)
  const s = {}
  if (data && !error) data.forEach(r => { s[r.key] = r.value })
  const m = method.value
  recipientName.value    = s[`${m}_recipient_name`]    || 'Ma Khaing Zin Moe'
  recipientAccount.value = s[`${m}_recipient_account`] || '9446323509'
}

watch(method, fetchPaymentSettings)
watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    step.value = 1; amount.value = 5000; slip.value = ''
    bonusOption.value = 'none'; focusMode.value = false
    fetchPaymentSettings(); fetchBalance()
  }
})

// ── Amount display (formatted with commas) ──────────────────────────
const displayAmount = computed(() => {
  if (!amount.value) return ''
  if (focusMode.value) return String(amount.value)
  return amount.value.toLocaleString()
})

function selectAmount(n) {
  amount.value = n
  focusMode.value = false
}
function onAmountInput(e) {
  const raw = e.target.value.replace(/,/g, '').replace(/[^0-9]/g, '')
  amount.value = raw ? parseInt(raw, 10) : 0
}
function onAmountFocus() {
  focusMode.value = true
}
function onAmountBlur() {
  focusMode.value = false
}

// ── Bonus ──────────────────────────────────────────────────────────
const activeBonusPercent = computed(() =>
  bonusOption.value === '1pct' ? 1 : bonusOption.value === '20pct' ? 20 : 0)
const bonusAmount = computed(() =>
  Math.round(amount.value * activeBonusPercent.value / 100))
const totalAmount = computed(() =>
  amount.value + bonusAmount.value)

// ── Amount format (preset buttons) ────────────────────────────────
function formatAmt(n) {
  if (n >= 1000000) return '1,000,000'
  return n.toLocaleString()
}

// ── Actions ──────────────────────────────────────────────────────
const close = () => emit('update:modelValue', false)
const nextStep = () => {
  if (!method.value || amount.value < 3000) return
  step.value = 2
}
const copyText = async (text) => {
  try { await navigator.clipboard.writeText(text); copied.value = true; setTimeout(() => { copied.value = false }, 1500) }
  catch { prompt('Copy manually:', text) }
}
const submitDeposit = () => {
  if (slip.value.length !== 5) return
  emit('submit', { method: method.value, amount: amount.value, slip: slip.value, bonus: bonusOption.value })
  close()
}
</script>

<style scoped>
/* Slide-up */
.nova-modal-enter-active { animation: sheetUp 0.28s cubic-bezier(0.22,1,0.36,1); }
.nova-modal-leave-active { animation: sheetUp 0.18s cubic-bezier(0.55,0,1,0.45) reverse; }
@keyframes sheetUp { from{transform:translateY(100%);} to{transform:translateY(0);} }

/* Toast */
.toast-enter-active { transition:all 0.2s ease; }
.toast-leave-active { transition:all 0.12s ease; }
.toast-enter-from   { opacity:0; transform:translateY(4px); }
.toast-leave-to     { opacity:0; }

/* Orbs */
@keyframes orbA { 0%{transform:translate(0,0);} 50%{transform:translate(12px,-18px);} 100%{transform:translate(0,0);} }
@keyframes orbB { 0%{transform:translate(0,0);} 50%{transform:translate(-15px,14px);} 100%{transform:translate(0,0);} }
@keyframes orbC { 0%{transform:translate(0,0);} 50%{transform:translate(10px,-12px);} 100%{transform:translate(0,0);} }

/* Icon button */
.nova-icon-btn {
  width:26px;height:26px;border-radius:8px;border:none;outline:none;cursor:pointer;
  background:rgba(255,255,255,0.07);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.1);
  color:rgba(156,163,175,0.8);
  display:flex;align-items:center;justify-content:center;
  transition:background 0.15s;
}
.nova-icon-btn:hover { background:rgba(255,255,255,0.12); }

/* Refresh spin */
.nova-refresh-btn {
  width:22px;height:22px;border-radius:6px;border:none;outline:none;cursor:pointer;
  background:rgba(255,255,255,0.07);
  display:flex;align-items:center;justify-content:center;
  color:rgba(156,163,175,0.8);
  transition:all 0.15s;
}
.nova-refresh-btn:hover { background:rgba(255,255,255,0.12); }
.nova-spin svg { animation:spin 0.6s linear infinite; }
@keyframes spin { to { transform:rotate(360deg); } }

/* Payment buttons */
.nova-pm-btn { user-select:none; }
.nova-pm-idle {
  background:rgba(255,255,255,0.05);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.09),0 1px 4px rgba(0,0,0,0.3);
}
.nova-pm-idle:hover { background:rgba(255,255,255,0.08); }
.nova-pm-active {
  background:rgba(255,255,255,0.09);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.15),
             inset 0 0 0 1px rgba(34,197,94,0.4),
             0 0 12px rgba(34,197,94,0.15);
}
.nova-pm-btn:active { transform:scale(0.97); }

/* Amount buttons */
.nova-amt-btn { user-select:none; }
.nova-amt-idle {
  background:rgba(255,255,255,0.05);color:rgba(203,213,225,0.85);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.07);
}
.nova-amt-active {
  background:rgba(6,182,212,0.82);color:#fff;
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.2),0 2px 10px rgba(6,182,212,0.4);
}
.nova-amt-btn:hover { filter:brightness(1.12); }
.nova-amt-btn:active { transform:scale(0.95); }

/* Input */
.nova-input::placeholder { color:rgba(107,114,128,0.45); }
.nova-input:focus {
  box-shadow:inset 0 1px 0 rgba(34,197,94,0.25),
             0 0 0 1.5px rgba(34,197,94,0.2) !important;
}

/* Radio row */
.nova-radio-row {
  display:flex;align-items:center;justify-content:space-between;
  padding:9px 12px;cursor:pointer;user-select:none;transition:background 0.15s;
}
.nova-radio-row:hover { background:rgba(255,255,255,0.03); }

/* Radio circle */
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

/* Copy button */
.nova-copy-btn {
  display:flex;align-items:center;gap:4px;font-size:10px;font-weight:600;
  padding:4px 9px;border-radius:7px;border:none;outline:none;cursor:pointer;
  background:rgba(255,255,255,0.07);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.1);
  color:rgba(148,163,184,0.9);transition:all 0.15s;
}
.nova-copy-btn:hover { background:rgba(255,255,255,0.11); }
.nova-copy-btn:active { transform:scale(0.95); }

/* CTA pill */
.nova-cta {
  background:rgba(30,41,59,0.95);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.12),0 3px 10px rgba(0,0,0,0.4);
  color:rgba(226,232,240,0.9);transition:all 0.2s;
}
.nova-cta:hover { background:rgba(51,65,85,0.95); }
.nova-cta:active { transform:scale(0.98); }
.nova-cta:disabled { opacity:0.3;cursor:not-allowed; }
.nova-cta--green {
  background:rgba(5,150,105,0.9);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.18),0 3px 12px rgba(34,197,94,0.3);
  color:#fff;
}
.nova-cta--green:hover { background:rgba(4,120,87,0.95); }
.nova-cta--green:disabled { opacity:0.3;cursor:not-allowed; }

/* Scrollbar */
.nova-scroll::-webkit-scrollbar { width:2px; }
.nova-scroll::-webkit-scrollbar-track { background:transparent; }
.nova-scroll::-webkit-scrollbar-thumb { background:rgba(100,116,139,0.22);border-radius:10px; }
</style>
