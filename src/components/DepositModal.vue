<template>
  <Teleport to="body">
    <Transition name="nova-modal">
      <div v-if="visible" class="fixed inset-0 z-50 flex items-end justify-center"
        style="background:rgba(0,0,0,0.75);backdrop-filter:blur(8px);"
        @click.self="close">

        <div class="nova-deposit-sheet w-full max-w-md relative"
          style="border-radius:20px 20px 0 0;
                 max-height:92vh;overflow-y:auto;
                 border:1px solid rgba(255,255,255,0.08);
                 border-bottom:none;">

          <!-- ░░ Vivid glassmorphism background ░░
               Bright saturated orbs make glass effect visible on dark bg -->
          <div class="nova-glass-bg">
            <!-- Cyan orb top-right -->
            <div style="position:absolute;top:-80px;right:-60px;width:280px;height:280px;
                        background:radial-gradient(circle,rgba(0,210,255,0.45) 0%,rgba(0,170,220,0.25) 35%,transparent 70%);
                        border-radius:50%;filter:blur(40px);animation:orb1 8s ease-in-out infinite alternate;"></div>
            <!-- Purple orb bottom-left -->
            <div style="position:absolute;bottom:-60px;left:-50px;width:260px;height:260px;
                        background:radial-gradient(circle,rgba(139,92,246,0.4) 0%,rgba(109,40,217,0.2) 40%,transparent 70%);
                        border-radius:50%;filter:blur(45px);animation:orb2 10s ease-in-out infinite alternate;"></div>
            <!-- Pink/magenta accent center -->
            <div style="position:absolute;top:35%;left:40%;width:200px;height:160px;
                        background:radial-gradient(ellipse,rgba(236,72,153,0.2) 0%,rgba(168,85,247,0.12) 50%,transparent 75%);
                        filter:blur(50px);animation:orb3 12s ease-in-out infinite alternate;"></div>
            <!-- Teal glow bottom-right -->
            <div style="position:absolute;bottom:0;right:0;width:180px;height:180px;
                        background:radial-gradient(circle,rgba(20,184,166,0.3) 0%,transparent 65%);
                        border-radius:50%;filter:blur(35px);"></div>
            <!-- Glass overlay — the actual frosted-glass layer -->
            <div style="position:absolute;inset:0;
                        background:rgba(8,14,26,0.78);
                        backdrop-filter:blur(24px) saturate(160%);
                        -webkit-backdrop-filter:blur(24px) saturate(160%);"></div>
          </div>

          <!-- Content above glass -->
          <div class="relative z-10 px-4 pt-4 pb-6">

            <!-- Header -->
            <div class="flex items-center justify-between mb-3">
              <button v-if="step===2" @click="step=1"
                class="p-1 active:opacity-50 transition-opacity"
                style="color:rgba(148,163,184,0.8);">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <div v-else class="w-6"></div>

              <h2 class="text-sm font-bold" style="color:rgba(226,232,240,0.95);letter-spacing:0.03em;">
                ငွေသွင်းရန်
              </h2>

              <button @click="close" class="p-1 active:opacity-50 transition-opacity"
                style="color:rgba(148,163,184,0.7);">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Divider -->
            <div style="height:1px;background:rgba(255,255,255,0.07);margin-bottom:14px;"></div>

            <!-- ══ STEP 1 ══ -->
            <div v-if="step===1">

              <!-- Payment method label -->
              <p class="text-[11px] font-semibold mb-2" style="color:rgba(148,163,184,0.7);">
                ငွေပေးချေနည်းလမ်း
              </p>

              <!-- 2×2 Payment Grid — compact -->
              <div class="grid grid-cols-2 gap-2 mb-4">
                <button
                  v-for="pm in paymentMethods"
                  :key="pm.key"
                  @click="method=pm.key"
                  class="nova-pm-btn relative flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all active:scale-95"
                  :class="method===pm.key ? 'nova-pm-active' : 'nova-pm-idle'">

                  <!-- Popular badge -->
                  <span v-if="pm.popular"
                    class="absolute -top-1.5 left-1/2 -translate-x-1/2 text-[8px] font-black px-2 py-0.5 rounded-full whitespace-nowrap"
                    style="background:linear-gradient(90deg,#f97316,#ef4444);color:#fff;
                           box-shadow:0 1px 6px rgba(249,115,22,0.55);">
                    လူကြိုက်များ
                  </span>

                  <!-- Icon -->
                  <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
                    :style="{background:pm.iconBg}">
                    <img v-if="pm.img" :src="pm.img" :alt="pm.label" class="w-5 h-5 object-contain"/>
                    <span v-else class="text-xs font-black" :style="{color:pm.iconColor}">{{pm.iconText}}</span>
                  </div>

                  <span class="text-xs font-semibold leading-none"
                    :style="method===pm.key?{color:pm.activeColor}:{color:'rgba(203,213,225,0.85)'}">
                    {{pm.label}}
                  </span>
                </button>
              </div>

              <!-- Amount label -->
              <p class="text-[11px] font-semibold mb-2" style="color:rgba(148,163,184,0.7);">
                သွင်းမည့်ပမာဏ
              </p>

              <!-- 4×2 Amount presets — compact -->
              <div class="grid grid-cols-4 gap-1.5 mb-2.5">
                <button
                  v-for="amt in amountPresets"
                  :key="amt"
                  @click="amount=amt"
                  class="nova-amt-btn py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-95 text-center"
                  :class="amount===amt ? 'nova-amt-active' : 'nova-amt-idle'">
                  {{formatPreset(amt)}}
                </button>
              </div>

              <!-- K input -->
              <div class="relative mb-3">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold"
                  style="color:rgba(100,116,139,0.9);">K</span>
                <input
                  v-model.number="amount"
                  type="number"
                  :placeholder="'အနည်းဆုံး:3,000 ~ အများဆုံး:1,000,000'"
                  class="w-full pl-7 pr-3 py-2.5 rounded-xl text-xs text-white focus:outline-none transition-all"
                  style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);
                         color:rgba(226,232,240,0.9);" />
              </div>

              <!-- Bonus section — matching pic 1 style -->
              <div class="rounded-xl mb-3 overflow-hidden"
                style="border:1px solid rgba(234,179,8,0.2);">
                <!-- Header row -->
                <div class="flex items-center justify-between px-3 py-2"
                  style="background:rgba(234,179,8,0.08);">
                  <span class="text-[11px] font-bold" style="color:rgba(253,224,71,0.9);">
                    🎁 အားပြည့်သွင်းရန်ကမ်းလှမ်းချက်
                  </span>
                </div>
                <!-- Bonus rows -->
                <div v-if="amount && amount > 0" class="px-3 py-2 space-y-1.5"
                  style="background:rgba(0,0,0,0.2);">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="text-sm">🎁</span>
                      <span class="text-[11px] font-semibold" style="color:rgba(253,224,71,0.85);">
                        ဘောနပ် {{bonusPercent}}%
                      </span>
                    </div>
                    <span class="text-[11px] font-black" style="color:#fde047;">
                      +{{bonusAmount.toLocaleString()}} Ks
                    </span>
                  </div>
                  <div style="height:1px;background:rgba(255,255,255,0.05);"></div>
                  <div class="flex items-center justify-between">
                    <span class="text-[11px]" style="color:rgba(148,163,184,0.7);">စုစုပေါင်း</span>
                    <span class="text-sm font-black" style="color:#fde047;">
                      {{totalAmount.toLocaleString()}} Ks
                    </span>
                  </div>
                </div>
                <div v-else class="px-3 py-2" style="background:rgba(0,0,0,0.2);">
                  <p class="text-[11px]" style="color:rgba(148,163,184,0.6);">ပမာဏ ကို မူဝိပ် ရွေးချောင်ပို မ ပါ</p>
                </div>
              </div>

              <!-- CTA — pill style matching pic 1 -->
              <button
                @click="nextStep"
                :disabled="!method||!amount||amount<=0"
                class="w-full py-3 rounded-full text-sm font-bold tracking-wide transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
                style="background:rgba(51,65,85,0.9);
                       color:rgba(226,232,240,0.9);
                       border:1px solid rgba(255,255,255,0.1);
                       box-shadow:0 2px 12px rgba(0,0,0,0.4);">
                ယခု ငွေသွင်းမည်
              </button>
            </div>

            <!-- ══ STEP 2 ══ -->
            <div v-else-if="step===2">

              <!-- Summary chip -->
              <div class="flex items-center gap-2 mb-4 px-3 py-2 rounded-xl"
                style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);">
                <div class="w-6 h-6 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0"
                  :style="{background:selectedMethod?.iconBg}">
                  <img v-if="selectedMethod?.img" :src="selectedMethod.img" class="w-5 h-5 object-contain"/>
                  <span v-else class="text-[10px] font-black" :style="{color:selectedMethod?.iconColor}">
                    {{selectedMethod?.iconText}}
                  </span>
                </div>
                <span class="text-xs font-semibold" style="color:rgba(203,213,225,0.9);">
                  {{selectedMethod?.label}}
                </span>
                <span class="ml-auto text-xs font-black" style="color:#67e8f9;">
                  {{amount.toLocaleString()}} Ks
                </span>
              </div>

              <!-- Recipient card -->
              <p class="text-[11px] font-semibold mb-2" style="color:rgba(148,163,184,0.7);">
                ငွေလွှဲပေးရမည့် အကောင့်
              </p>
              <div class="rounded-xl p-3 mb-3 space-y-2.5"
                style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-[10px] mb-0.5" style="color:rgba(100,116,139,0.9);">လက်ခံသူ</p>
                    <p class="text-xs font-semibold" style="color:rgba(226,232,240,0.95);">{{recipientName}}</p>
                  </div>
                  <button @click="copyText(recipientName)"
                    class="copy-btn text-[10px] px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all active:scale-95">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    Copy
                  </button>
                </div>
                <div style="height:1px;background:rgba(255,255,255,0.06);"></div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-[10px] mb-0.5" style="color:rgba(100,116,139,0.9);">ဖုန်းနံပါတ်</p>
                    <p class="font-mono text-base font-black tracking-widest" style="color:#e2e8f0;">
                      {{recipientAccount}}
                    </p>
                  </div>
                  <button @click="copyText(recipientAccount)"
                    class="copy-btn text-[10px] px-2.5 py-1 rounded-lg flex items-center gap-1 transition-all active:scale-95">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    Copy
                  </button>
                </div>
              </div>

              <Transition name="bonus-fade">
                <div v-if="copied" class="text-center mb-2">
                  <span class="text-[10px] px-3 py-1 rounded-full font-semibold"
                    style="background:rgba(16,185,129,0.12);color:#6ee7b7;border:1px solid rgba(16,185,129,0.2);">
                    ✅ ကူးယူပြီးပါပြီ
                  </span>
                </div>
              </Transition>

              <!-- Slip -->
              <p class="text-[11px] font-semibold mb-1.5" style="color:rgba(148,163,184,0.7);">
                ပြေစာနောက် ၅ လုံး
              </p>
              <input
                v-model="slip"
                maxlength="5"
                type="text"
                inputmode="numeric"
                placeholder="X  X  X  X  X"
                class="w-full py-2.5 rounded-xl text-center text-base font-mono font-black focus:outline-none transition-all mb-4"
                style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);
                       color:#e2e8f0;letter-spacing:0.4em;" />

              <div class="flex justify-between items-center mb-3 px-1">
                <span class="text-[11px]" style="color:rgba(100,116,139,0.8);">သွင်းမည့်ပမာဏ</span>
                <span class="text-xs font-black" style="color:#67e8f9;">{{amount.toLocaleString()}} Ks</span>
              </div>

              <!-- Confirm CTA — pill style -->
              <button
                @click="submitDeposit"
                :disabled="slip.length<5"
                class="w-full py-3 rounded-full text-sm font-bold tracking-wide transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
                style="background:rgba(5,150,105,0.85);
                       color:#fff;
                       border:1px solid rgba(16,185,129,0.3);
                       box-shadow:0 2px 16px rgba(16,185,129,0.25);">
                အတည်ပြုမည် ✓
              </button>
            </div>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { supabase } from '@/lib/supabase'

const props = defineProps({ modelValue: Boolean })
const emit = defineEmits(['update:modelValue', 'submit'])

const visible = ref(props.modelValue)
const step = ref(1)
const method = ref('kpay')
const amount = ref(5000)
const slip = ref('')
const copied = ref(false)

const amountPresets = [3000, 5000, 10000, 30000, 50000, 100000, 500000, 1000000]

const paymentMethods = [
  {
    key: 'kpay',
    label: 'KBZ Pay',
    popular: true,
    img: '/images/payments/kpay.png',
    iconBg: 'rgba(37,99,235,0.25)',
    activeColor: '#93c5fd',
  },
  {
    key: 'wave',
    label: 'WavePay',
    popular: false,
    img: '/images/payments/wave.png',
    iconBg: 'rgba(5,150,105,0.22)',
    activeColor: '#6ee7b7',
  },
  {
    key: 'usdt',
    label: 'USDT',
    popular: false,
    img: null,
    iconText: '₮',
    iconBg: 'rgba(34,197,94,0.22)',
    iconColor: '#4ade80',
    activeColor: '#4ade80',
  },
  {
    key: 'uabpay',
    label: 'UAB Pay',
    popular: false,
    img: null,
    iconText: 'U',
    iconBg: 'rgba(139,92,246,0.22)',
    iconColor: '#c084fc',
    activeColor: '#c084fc',
  },
]

const selectedMethod = computed(() => paymentMethods.find(p => p.key === method.value))
const recipientName = ref('')
const recipientAccount = ref('')

async function fetchPaymentSettings() {
  const keys = [
    'wave_recipient_name', 'wave_recipient_account',
    'kpay_recipient_name', 'kpay_recipient_account',
    'usdt_recipient_name', 'usdt_recipient_account',
    'uabpay_recipient_name', 'uabpay_recipient_account',
  ]
  const { data, error } = await supabase
    .from('system_settings').select('key, value').in('key', keys)
  const settings = {}
  if (data && !error) data.forEach(row => { settings[row.key] = row.value })
  const m = method.value
  recipientName.value = settings[`${m}_recipient_name`] || 'Ma Khaing Zin Moe'
  recipientAccount.value = settings[`${m}_recipient_account`] || '9446323509'
}

watch(method, () => fetchPaymentSettings())
watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) { step.value = 1; amount.value = 5000; slip.value = ''; fetchPaymentSettings() }
})

const bonusPercent = 70
const bonusAmount = computed(() => Math.round(amount.value * bonusPercent / 100))
const totalAmount = computed(() => amount.value + bonusAmount.value)

function formatPreset(n) {
  if (n >= 1000000) return (n / 1000000) + 'M'
  if (n >= 1000) return (n / 1000) + 'K'
  return n.toLocaleString()
}

const close = () => emit('update:modelValue', false)
const nextStep = () => { if (!method.value || amount.value <= 0) return; step.value = 2 }
const copyText = async (text) => {
  try { await navigator.clipboard.writeText(text); copied.value = true; setTimeout(() => { copied.value = false }, 1500) }
  catch { prompt('Copy manually:', text) }
}
const submitDeposit = () => {
  if (slip.value.length !== 5) return
  emit('submit', { method: method.value, amount: amount.value, slip: slip.value })
  close()
}
</script>

<style scoped>
/* Slide-up animation */
.nova-modal-enter-active { animation: novaUp 0.30s cubic-bezier(0.22,1,0.36,1); }
.nova-modal-leave-active { animation: novaUp 0.18s cubic-bezier(0.55,0,1,0.45) reverse; }
@keyframes novaUp {
  from { transform:translateY(100%); opacity:0; }
  to   { transform:translateY(0);    opacity:1; }
}

/* Bonus fade */
.bonus-fade-enter-active { transition:all 0.22s ease; }
.bonus-fade-leave-active { transition:all 0.14s ease; }
.bonus-fade-enter-from   { opacity:0; transform:translateY(4px); }
.bonus-fade-leave-to     { opacity:0; }

/* Orb animations for visible glassmorphism */
@keyframes orb1 { from{transform:translate(0,0) scale(1);} to{transform:translate(-20px,15px) scale(1.1);} }
@keyframes orb2 { from{transform:translate(0,0) scale(1);} to{transform:translate(15px,-20px) scale(1.08);} }
@keyframes orb3 { from{transform:translate(-50%,-50%) scale(1);} to{transform:translate(-50%,-50%) scale(1.15);} }

/* Glass background container */
.nova-glass-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
}

/* Payment method buttons */
.nova-pm-btn { user-select:none; }
.nova-pm-active {
  background: rgba(6,182,212,0.12);
  border-color: rgba(6,182,212,0.45) !important;
  box-shadow: 0 0 14px rgba(6,182,212,0.2);
}
.nova-pm-idle {
  background: rgba(255,255,255,0.04);
  border-color: rgba(255,255,255,0.09) !important;
}

/* Amount buttons */
.nova-amt-active {
  background: rgba(6,182,212,0.85);
  color: #fff;
  border: 1px solid rgba(6,182,212,0.6);
  box-shadow: 0 1px 8px rgba(6,182,212,0.4);
}
.nova-amt-idle {
  background: rgba(30,41,59,0.8);
  color: rgba(203,213,225,0.85);
  border: 1px solid rgba(255,255,255,0.08);
}

/* Copy buttons */
.copy-btn {
  background: rgba(255,255,255,0.06);
  color: rgba(148,163,184,0.9);
  border: 1px solid rgba(255,255,255,0.09);
}

/* Scrollbar */
.nova-deposit-sheet::-webkit-scrollbar { width:2px; }
.nova-deposit-sheet::-webkit-scrollbar-track { background:transparent; }
.nova-deposit-sheet::-webkit-scrollbar-thumb { background:rgba(100,116,139,0.3); border-radius:10px; }
</style>
