<template>
  <Teleport to="body">
    <Transition name="nova-modal">
      <div v-if="visible" class="fixed inset-0 z-50 flex items-end justify-center"
        style="background: rgba(0,0,0,0.72); backdrop-filter: blur(6px);"
        @click.self="close">

        <div class="nova-deposit-sheet w-full max-w-md relative overflow-hidden"
          style="background: linear-gradient(160deg,rgba(10,20,32,0.97) 0%,rgba(8,16,28,0.98) 50%,rgba(6,14,22,0.99) 100%);
                 border: 1px solid rgba(34,211,238,0.18);
                 border-bottom: none;
                 border-radius: 24px 24px 0 0;
                 box-shadow: 0 -8px 60px rgba(6,182,212,0.18), 0 -2px 20px rgba(0,0,0,0.6);
                 max-height: 92vh;
                 overflow-y: auto;">

          <!-- Background glow orbs matching homepage -->
          <div class="pointer-events-none absolute inset-0 overflow-hidden">
            <div style="position:absolute;top:-60px;right:-40px;width:240px;height:240px;
                        background:radial-gradient(circle,rgba(6,182,212,0.13) 0%,transparent 70%);
                        border-radius:50%;filter:blur(30px);"></div>
            <div style="position:absolute;bottom:-40px;left:-40px;width:200px;height:200px;
                        background:radial-gradient(circle,rgba(20,184,166,0.10) 0%,transparent 70%);
                        border-radius:50%;filter:blur(30px);"></div>
            <div style="position:absolute;top:40%;left:50%;transform:translate(-50%,-50%);width:300px;height:200px;
                        background:radial-gradient(ellipse,rgba(34,211,238,0.05) 0%,transparent 70%);
                        filter:blur(40px);"></div>
          </div>

          <div class="relative z-10 px-4 pt-5 pb-8">

            <!-- Header -->
            <div class="flex items-center justify-between mb-4">
              <button v-if="step === 2" @click="step = 1"
                class="flex items-center gap-1 text-sm active:opacity-50 transition-opacity"
                style="color:rgba(103,232,249,0.7);">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
              </button>
              <div v-else class="w-5"></div>

              <h2 class="text-base font-bold tracking-wide"
                style="background:linear-gradient(90deg,#67e8f9,#22d3ee,#2dd4bf);
                       -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
                ငွေသွင်းရန်
              </h2>

              <button @click="close" class="p-1 active:opacity-50 transition-opacity" style="color:rgba(156,163,175,0.7);">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            <!-- Divider -->
            <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(34,211,238,0.22),transparent);margin-bottom:20px;"></div>

            <!-- ══ STEP 1 ══ -->
            <div v-if="step === 1">

              <!-- Payment Methods label -->
              <p class="text-[11px] font-semibold uppercase tracking-widest mb-3"
                style="color:rgba(103,232,249,0.5);">ငွေပေးချေနည်းလမ်း</p>

              <!-- 2x2 Payment Grid -->
              <div class="grid grid-cols-2 gap-2.5 mb-6">
                <button
                  v-for="pm in paymentMethods"
                  :key="pm.key"
                  @click="method = pm.key"
                  class="nova-pm-btn relative flex items-center gap-3 px-3.5 py-3 rounded-2xl border transition-all active:scale-95"
                  :class="method === pm.key ? 'nova-pm-active' : 'nova-pm-idle'">

                  <span v-if="pm.popular"
                    class="absolute -top-2 -right-1 text-[9px] font-black px-2 py-0.5 rounded-full"
                    style="background:linear-gradient(90deg,#f59e0b,#ef4444);color:#fff;
                           box-shadow:0 2px 8px rgba(245,158,11,0.45);letter-spacing:0.02em;">
                    လူကြိုက်များ
                  </span>

                  <div class="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                    :style="{ background: pm.iconBg }">
                    <img v-if="pm.img" :src="pm.img" :alt="pm.label" class="w-7 h-7 object-contain" />
                    <span v-else class="text-base font-black" :style="{ color: pm.iconColor }">{{ pm.iconText }}</span>
                  </div>

                  <span class="text-sm font-bold leading-tight"
                    :style="method === pm.key ? { color: pm.activeColor } : { color: 'rgba(209,213,219,0.85)' }">
                    {{ pm.label }}
                  </span>
                </button>
              </div>

              <!-- Amount label -->
              <p class="text-[11px] font-semibold uppercase tracking-widest mb-3"
                style="color:rgba(103,232,249,0.5);">သွင်းမည့်ပမာဏ</p>

              <!-- 4x2 Amount presets -->
              <div class="grid grid-cols-4 gap-2 mb-3">
                <button
                  v-for="amt in amountPresets"
                  :key="amt"
                  @click="amount = amt"
                  class="nova-amt-btn py-2.5 rounded-xl text-xs font-bold transition-all active:scale-95 text-center"
                  :class="amount === amt ? 'nova-amt-active' : 'nova-amt-idle'">
                  {{ formatPreset(amt) }}
                </button>
              </div>

              <!-- Custom input -->
              <div class="relative mb-5">
                <span class="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold"
                  style="color:rgba(103,232,249,0.65);">K</span>
                <input
                  v-model.number="amount"
                  type="number"
                  placeholder="စိတ်ကြိုက်ပမာဏ ထည့်ပါ"
                  class="w-full pl-8 pr-4 py-3 rounded-2xl text-sm text-white placeholder-gray-600 focus:outline-none transition-all"
                  style="background:rgba(255,255,255,0.04);border:1px solid rgba(34,211,238,0.14);" />
              </div>

              <!-- Bonus preview -->
              <Transition name="bonus-fade">
                <div v-if="amount && amount > 0"
                  class="mb-5 p-4 rounded-2xl relative overflow-hidden"
                  style="background:linear-gradient(135deg,rgba(234,179,8,0.08),rgba(245,158,11,0.04));
                         border:1px solid rgba(234,179,8,0.22);">
                  <div style="position:absolute;top:-10px;right:-10px;width:80px;height:80px;
                               background:radial-gradient(circle,rgba(234,179,8,0.18),transparent 70%);filter:blur(16px);"></div>
                  <div class="flex items-center justify-between relative z-10">
                    <div>
                      <p class="text-xs font-semibold mb-1" style="color:rgba(253,224,71,0.85);">
                        🎁 {{ bonusPercent }}% ဘောနပ်ရမည်
                      </p>
                      <p class="text-sm text-gray-300">
                        <span class="text-white font-bold">+{{ bonusAmount.toLocaleString() }} Ks</span>
                        <span class="text-gray-500 text-xs mx-1">→ စုစုပေါင်း</span>
                      </p>
                      <p class="text-xl font-black mt-0.5" style="color:#fde047;">
                        {{ totalAmount.toLocaleString() }} Ks
                      </p>
                    </div>
                    <span class="text-3xl opacity-80">💰</span>
                  </div>
                </div>
              </Transition>

              <button
                @click="nextStep"
                :disabled="!method || !amount || amount <= 0"
                class="w-full py-3.5 rounded-2xl font-black text-sm tracking-wide transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
                style="background:linear-gradient(90deg,#0891b2,#06b6d4,#0891b2);
                       background-size:200% 100%;
                       color:#fff;
                       box-shadow:0 4px 20px rgba(6,182,212,0.3);">
                ဆက်လုပ်ရန် →
              </button>
            </div>

            <!-- ══ STEP 2 ══ -->
            <div v-else-if="step === 2">

              <!-- Method + amount summary chip -->
              <div class="flex items-center gap-2.5 mb-5 p-3 rounded-2xl"
                style="background:rgba(255,255,255,0.03);border:1px solid rgba(34,211,238,0.1);">
                <div class="w-8 h-8 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
                  :style="{ background: selectedMethod?.iconBg }">
                  <img v-if="selectedMethod?.img" :src="selectedMethod.img" class="w-6 h-6 object-contain" />
                  <span v-else class="text-sm font-black" :style="{ color: selectedMethod?.iconColor }">{{ selectedMethod?.iconText }}</span>
                </div>
                <span class="text-sm font-bold text-white">{{ selectedMethod?.label }}</span>
                <span class="ml-auto font-black" style="color:#67e8f9;">{{ amount.toLocaleString() }} Ks</span>
              </div>

              <!-- Recipient card -->
              <p class="text-[11px] font-semibold uppercase tracking-widest mb-3"
                style="color:rgba(103,232,249,0.5);">ငွေလွှဲပေးရမည့် အကောင့်</p>

              <div class="rounded-2xl p-4 mb-4 space-y-3.5"
                style="background:rgba(255,255,255,0.03);border:1px solid rgba(34,211,238,0.12);">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-[10px] mb-0.5" style="color:rgba(156,163,175,0.7);">လက်ခံသူ</p>
                    <p class="text-white font-semibold text-sm">{{ recipientName }}</p>
                  </div>
                  <button @click="copyText(recipientName)"
                    class="copy-btn flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all active:scale-95">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    Copy
                  </button>
                </div>
                <div style="height:1px;background:rgba(255,255,255,0.05);"></div>
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-[10px] mb-0.5" style="color:rgba(156,163,175,0.7);">ဖုန်းနံပါတ်</p>
                    <p class="text-white font-mono text-xl tracking-[0.3em] font-black">{{ recipientAccount }}</p>
                  </div>
                  <button @click="copyText(recipientAccount)"
                    class="copy-btn flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg transition-all active:scale-95">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                    Copy
                  </button>
                </div>
              </div>

              <Transition name="bonus-fade">
                <div v-if="copied" class="text-center mb-3">
                  <span class="text-xs px-3 py-1.5 rounded-full font-semibold"
                    style="background:rgba(16,185,129,0.12);color:#6ee7b7;border:1px solid rgba(16,185,129,0.2);">
                    ✅ ကူးယူပြီးပါပြီ
                  </span>
                </div>
              </Transition>

              <!-- Slip digits -->
              <p class="text-[11px] font-semibold uppercase tracking-widest mb-2"
                style="color:rgba(103,232,249,0.5);">ပြေစာနောက် ၅ လုံး</p>
              <input
                v-model="slip"
                maxlength="5"
                type="text"
                inputmode="numeric"
                placeholder="X  X  X  X  X"
                class="w-full py-3.5 rounded-2xl text-white text-center text-xl tracking-[0.5em] font-mono font-black focus:outline-none transition-all mb-5"
                style="background:rgba(255,255,255,0.04);border:1px solid rgba(34,211,238,0.15);" />

              <div class="flex justify-between items-center mb-5 px-1">
                <span class="text-xs" style="color:rgba(156,163,175,0.7);">သွင်းမည့်ပမာဏ</span>
                <span class="font-black text-sm" style="color:#67e8f9;">{{ amount.toLocaleString() }} Ks</span>
              </div>

              <button
                @click="submitDeposit"
                :disabled="slip.length < 5"
                class="w-full py-3.5 rounded-2xl font-black text-sm tracking-wide transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed"
                style="background:linear-gradient(90deg,#059669,#10b981,#059669);
                       color:#fff;
                       box-shadow:0 4px 20px rgba(16,185,129,0.3);">
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
    iconBg: 'rgba(59,130,246,0.18)',
    activeColor: '#93c5fd',
  },
  {
    key: 'wave',
    label: 'WavePay',
    popular: false,
    img: '/images/payments/wave.png',
    iconBg: 'rgba(16,185,129,0.18)',
    activeColor: '#6ee7b7',
  },
  {
    key: 'usdt',
    label: 'USDT',
    popular: false,
    img: null,
    iconText: '₮',
    iconBg: 'rgba(34,197,94,0.18)',
    iconColor: '#4ade80',
    activeColor: '#4ade80',
  },
  {
    key: 'uabpay',
    label: 'UAB Pay',
    popular: false,
    img: null,
    iconText: 'U',
    iconBg: 'rgba(168,85,247,0.18)',
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
    .from('system_settings')
    .select('key, value')
    .in('key', keys)

  const settings = {}
  if (data && !error) data.forEach(row => { settings[row.key] = row.value })

  const m = method.value
  recipientName.value = settings[`${m}_recipient_name`] || 'Ma Khaing Zin Moe'
  recipientAccount.value = settings[`${m}_recipient_account`] || '9446323509'
}

watch(method, () => fetchPaymentSettings())

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    step.value = 1
    amount.value = 5000
    slip.value = ''
    fetchPaymentSettings()
  }
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
  try {
    await navigator.clipboard.writeText(text)
    copied.value = true
    setTimeout(() => { copied.value = false }, 1500)
  } catch {
    prompt('Copy manually:', text)
  }
}

const submitDeposit = () => {
  if (slip.value.length !== 5) return
  emit('submit', { method: method.value, amount: amount.value, slip: slip.value })
  close()
}
</script>

<style scoped>
.nova-modal-enter-active { animation: novaSlideUp 0.32s cubic-bezier(0.22,1,0.36,1); }
.nova-modal-leave-active { animation: novaSlideUp 0.2s cubic-bezier(0.55,0,1,0.45) reverse; }
@keyframes novaSlideUp {
  from { transform: translateY(100%); opacity: 0; }
  to   { transform: translateY(0);    opacity: 1; }
}

.bonus-fade-enter-active { transition: all 0.25s ease; }
.bonus-fade-leave-active { transition: all 0.15s ease; }
.bonus-fade-enter-from  { opacity: 0; transform: translateY(6px); }
.bonus-fade-leave-to    { opacity: 0; }

.nova-pm-btn { user-select: none; }
.nova-pm-active {
  background: rgba(6,182,212,0.1);
  border-color: rgba(6,182,212,0.5) !important;
  box-shadow: 0 0 18px rgba(6,182,212,0.18), inset 0 0 10px rgba(6,182,212,0.06);
}
.nova-pm-idle {
  background: rgba(255,255,255,0.03);
  border-color: rgba(255,255,255,0.07) !important;
}
.nova-pm-idle:hover {
  background: rgba(255,255,255,0.05);
  border-color: rgba(34,211,238,0.2) !important;
}

.nova-amt-active {
  background: linear-gradient(135deg,#0e7490,#0891b2);
  color: #fff;
  border: 1px solid rgba(6,182,212,0.5);
  box-shadow: 0 2px 12px rgba(6,182,212,0.35);
}
.nova-amt-idle {
  background: rgba(255,255,255,0.04);
  color: rgba(209,213,219,0.85);
  border: 1px solid rgba(255,255,255,0.07);
}
.nova-amt-idle:hover {
  background: rgba(6,182,212,0.08);
  border-color: rgba(34,211,238,0.18);
}

.copy-btn {
  background: rgba(34,211,238,0.08);
  color: rgba(103,232,249,0.85);
  border: 1px solid rgba(34,211,238,0.15);
}
.copy-btn:hover { background: rgba(34,211,238,0.14); }

.nova-deposit-sheet::-webkit-scrollbar { width: 3px; }
.nova-deposit-sheet::-webkit-scrollbar-track { background: transparent; }
.nova-deposit-sheet::-webkit-scrollbar-thumb { background: rgba(34,211,238,0.18); border-radius:10px; }
</style>
