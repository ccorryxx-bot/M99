<template>
  <Teleport to="body">
    <Transition name="nova-modal">
      <div v-if="visible" class="fixed inset-0 z-50 flex items-end justify-center"
        style="background:rgba(0,0,0,0.8);backdrop-filter:blur(10px);"
        @click.self="close">

        <!-- Sheet — full height, scrollable -->
        <div class="nova-sheet w-full max-w-md flex flex-col"
          style="height:90vh;border-radius:20px 20px 0 0;overflow:hidden;position:relative;">

          <!-- ░░ Vivid orb layer — makes glass visible ░░ -->
          <div aria-hidden="true" style="position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;">
            <!-- bright cyan top-right -->
            <div style="position:absolute;top:-100px;right:-80px;width:320px;height:320px;
                        background:radial-gradient(circle,rgba(0,220,255,0.5) 0%,rgba(0,180,230,0.2) 40%,transparent 70%);
                        border-radius:50%;filter:blur(45px);
                        animation:orbA 9s ease-in-out infinite alternate;"></div>
            <!-- vivid purple bottom-left -->
            <div style="position:absolute;bottom:-80px;left:-60px;width:300px;height:300px;
                        background:radial-gradient(circle,rgba(139,92,246,0.5) 0%,rgba(109,40,217,0.22) 40%,transparent 68%);
                        border-radius:50%;filter:blur(50px);
                        animation:orbB 11s ease-in-out infinite alternate;"></div>
            <!-- pink center-right -->
            <div style="position:absolute;top:30%;right:-40px;width:220px;height:220px;
                        background:radial-gradient(circle,rgba(236,72,153,0.28) 0%,transparent 65%);
                        border-radius:50%;filter:blur(40px);
                        animation:orbC 13s ease-in-out infinite alternate;"></div>
            <!-- teal bottom-right -->
            <div style="position:absolute;bottom:60px;right:20px;width:180px;height:180px;
                        background:radial-gradient(circle,rgba(20,184,166,0.32) 0%,transparent 65%);
                        border-radius:50%;filter:blur(35px);"></div>
            <!-- Frosted glass overlay — sits on top of orbs -->
            <div style="position:absolute;inset:0;
                        background:rgba(7,12,22,0.82);
                        backdrop-filter:blur(28px) saturate(180%);
                        -webkit-backdrop-filter:blur(28px) saturate(180%);"></div>
          </div>

          <!-- Content layer -->
          <div style="position:relative;z-index:1;display:flex;flex-direction:column;height:100%;">

            <!-- ── Header (fixed) ── -->
            <div style="flex-shrink:0;padding:16px 16px 0;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;">
                <button v-if="step===2" @click="step=1" class="nova-icon-btn">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <div v-else style="width:28px;"></div>

                <span style="font-size:13px;font-weight:700;color:rgba(226,232,240,0.95);letter-spacing:0.04em;">
                  ငွေသွင်းရန်
                </span>

                <button @click="close" class="nova-icon-btn">
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <!-- subtle separator — a single inset line, no hard border -->
              <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);"></div>
            </div>

            <!-- ── Scrollable body ── -->
            <div style="flex:1;overflow-y:auto;padding:14px 16px 0;overscroll-behavior:contain;" class="nova-scroll">

              <!-- ══ STEP 1 ══ -->
              <div v-if="step===1">

                <p class="nova-label">ငွေပေးချေနည်းလမ်း</p>

                <!-- 2×2 Payment grid — glass surface tiles, no border outline -->
                <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px;">
                  <button
                    v-for="pm in paymentMethods"
                    :key="pm.key"
                    @click="method=pm.key"
                    class="nova-tile"
                    :class="method===pm.key ? 'nova-tile--on' : 'nova-tile--off'"
                    style="position:relative;display:flex;align-items:center;gap:10px;
                           padding:10px 12px;border-radius:14px;border:none;outline:none;
                           cursor:pointer;transition:all 0.18s ease;">

                    <span v-if="pm.popular" style="
                      position:absolute;top:-7px;left:50%;transform:translateX(-50%);
                      font-size:8px;font-weight:900;padding:2px 8px;border-radius:99px;
                      background:linear-gradient(90deg,#f97316,#ef4444);color:#fff;
                      white-space:nowrap;box-shadow:0 2px 6px rgba(249,115,22,0.5);">
                      လူကြိုက်များ
                    </span>

                    <div style="width:28px;height:28px;border-radius:8px;flex-shrink:0;
                                display:flex;align-items:center;justify-content:center;overflow:hidden;"
                      :style="{background:pm.iconBg}">
                      <img v-if="pm.img" :src="pm.img" :alt="pm.label" style="width:22px;height:22px;object-fit:contain;"/>
                      <span v-else style="font-size:11px;font-weight:900;" :style="{color:pm.iconColor}">{{pm.iconText}}</span>
                    </div>

                    <span style="font-size:12px;font-weight:600;"
                      :style="method===pm.key ? {color:pm.activeColor} : {color:'rgba(203,213,225,0.85)'}">
                      {{pm.label}}
                    </span>
                  </button>
                </div>

                <p class="nova-label">သွင်းမည့်ပမာဏ</p>

                <!-- 4×2 amount presets — glass tiles -->
                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:8px;">
                  <button
                    v-for="amt in amountPresets"
                    :key="amt"
                    @click="amount=amt"
                    class="nova-amt"
                    :class="amount===amt ? 'nova-amt--on' : 'nova-amt--off'"
                    style="padding:7px 4px;border-radius:10px;border:none;outline:none;
                           font-size:11px;font-weight:700;cursor:pointer;
                           transition:all 0.15s ease;text-align:center;">
                    {{formatPreset(amt)}}
                  </button>
                </div>

                <!-- K input — glass surface, inset top-highlight -->
                <div style="position:relative;margin-bottom:12px;">
                  <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);
                               font-size:11px;font-weight:700;color:rgba(100,116,139,0.85);">K</span>
                  <input
                    v-model.number="amount"
                    type="number"
                    placeholder="အနည်းဆုံး:3,000 ~ အများဆုံး:1,000,000"
                    class="nova-input"
                    style="width:100%;padding:10px 12px 10px 26px;border-radius:12px;
                           border:none;outline:none;font-size:11px;box-sizing:border-box;
                           background:rgba(255,255,255,0.06);
                           box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),inset 0 -1px 0 rgba(0,0,0,0.2);
                           color:rgba(226,232,240,0.9);" />
                </div>

                <!-- Bonus card — glass surface -->
                <div style="border-radius:14px;overflow:hidden;margin-bottom:14px;
                            background:rgba(234,179,8,0.07);
                            box-shadow:inset 0 1px 0 rgba(255,255,255,0.08),0 2px 10px rgba(0,0,0,0.25);">
                  <div style="padding:8px 12px;display:flex;align-items:center;gap:6px;
                              border-bottom:1px solid rgba(255,255,255,0.05);">
                    <span style="font-size:12px;">🎁</span>
                    <span style="font-size:11px;font-weight:700;color:rgba(253,224,71,0.88);">
                      အားပြည့်သွင်းရန်ကမ်းလှမ်းချက်
                    </span>
                  </div>
                  <div style="padding:8px 12px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:5px;">
                      <div style="display:flex;align-items:center;gap:6px;">
                        <span style="font-size:11px;">🎁</span>
                        <span style="font-size:11px;font-weight:600;color:rgba(253,224,71,0.8);">
                          ဘောနပ် {{bonusPercent}}%
                        </span>
                      </div>
                      <span style="font-size:11px;font-weight:800;color:#fde047;">
                        +{{bonusAmount.toLocaleString()}} Ks
                      </span>
                    </div>
                    <div style="height:1px;background:rgba(255,255,255,0.05);margin-bottom:5px;"></div>
                    <div style="display:flex;justify-content:space-between;align-items:center;">
                      <span style="font-size:11px;color:rgba(148,163,184,0.7);">စုစုပေါင်း</span>
                      <span style="font-size:15px;font-weight:900;color:#fde047;">
                        {{totalAmount.toLocaleString()}} Ks
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              <!-- ══ STEP 2 ══ -->
              <div v-else-if="step===2">

                <!-- Summary row -->
                <div style="display:flex;align-items:center;gap:8px;margin-bottom:14px;
                            padding:8px 12px;border-radius:12px;
                            background:rgba(255,255,255,0.05);
                            box-shadow:inset 0 1px 0 rgba(255,255,255,0.1);">
                  <div style="width:24px;height:24px;border-radius:7px;overflow:hidden;
                              display:flex;align-items:center;justify-content:center;flex-shrink:0;"
                    :style="{background:selectedMethod?.iconBg}">
                    <img v-if="selectedMethod?.img" :src="selectedMethod.img" style="width:18px;height:18px;object-fit:contain;"/>
                    <span v-else style="font-size:10px;font-weight:900;" :style="{color:selectedMethod?.iconColor}">
                      {{selectedMethod?.iconText}}
                    </span>
                  </div>
                  <span style="font-size:12px;font-weight:600;color:rgba(203,213,225,0.9);">{{selectedMethod?.label}}</span>
                  <span style="margin-left:auto;font-size:12px;font-weight:900;color:#67e8f9;">
                    {{amount.toLocaleString()}} Ks
                  </span>
                </div>

                <p class="nova-label">ငွေလွှဲပေးရမည့် အကောင့်</p>

                <!-- Recipient card — glass surface tiles -->
                <div style="border-radius:14px;overflow:hidden;margin-bottom:12px;
                            background:rgba(255,255,255,0.05);
                            box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),0 2px 10px rgba(0,0,0,0.3);">
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;">
                    <div>
                      <p style="font-size:9px;color:rgba(100,116,139,0.8);margin-bottom:2px;">လက်ခံသူ</p>
                      <p style="font-size:12px;font-weight:600;color:rgba(226,232,240,0.95);">{{recipientName}}</p>
                    </div>
                    <button @click="copyText(recipientName)" class="nova-copy-btn">
                      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                      </svg>
                      Copy
                    </button>
                  </div>
                  <div style="height:1px;background:rgba(255,255,255,0.05);"></div>
                  <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;">
                    <div>
                      <p style="font-size:9px;color:rgba(100,116,139,0.8);margin-bottom:2px;">ဖုန်းနံပါတ်</p>
                      <p style="font-family:monospace;font-size:17px;font-weight:900;
                                letter-spacing:0.25em;color:#e2e8f0;">{{recipientAccount}}</p>
                    </div>
                    <button @click="copyText(recipientAccount)" class="nova-copy-btn">
                      <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                 background:rgba(16,185,129,0.12);color:#6ee7b7;
                                 box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);">
                      ✅ ကူးယူပြီးပါပြီ
                    </span>
                  </div>
                </Transition>

                <p class="nova-label">ပြေစာနောက် ၅ လုံး</p>
                <input
                  v-model="slip"
                  maxlength="5"
                  type="text"
                  inputmode="numeric"
                  placeholder="X  X  X  X  X"
                  class="nova-input"
                  style="width:100%;padding:10px;border-radius:12px;border:none;outline:none;
                         font-family:monospace;font-size:16px;font-weight:900;
                         text-align:center;letter-spacing:0.4em;
                         background:rgba(255,255,255,0.06);
                         box-shadow:inset 0 1px 0 rgba(255,255,255,0.1),inset 0 -1px 0 rgba(0,0,0,0.2);
                         color:#e2e8f0;margin-bottom:10px;box-sizing:border-box;" />

                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;padding:0 2px;">
                  <span style="font-size:11px;color:rgba(100,116,139,0.8);">သွင်းမည့်ပမာဏ</span>
                  <span style="font-size:12px;font-weight:900;color:#67e8f9;">{{amount.toLocaleString()}} Ks</span>
                </div>

              </div>
            </div><!-- /scroll body -->

            <!-- ── Sticky CTA at bottom (always visible) ── -->
            <div style="flex-shrink:0;padding:10px 16px 20px;">
              <!-- Step 1 CTA -->
              <button v-if="step===1"
                @click="nextStep"
                :disabled="!method||!amount||amount<=0"
                class="nova-cta"
                style="width:100%;padding:12px;border-radius:99px;border:none;outline:none;
                       font-size:13px;font-weight:700;letter-spacing:0.04em;cursor:pointer;
                       transition:all 0.2s ease;">
                ယခု ငွေသွင်းမည်
              </button>
              <!-- Step 2 CTA -->
              <button v-else-if="step===2"
                @click="submitDeposit"
                :disabled="slip.length<5"
                class="nova-cta nova-cta--confirm"
                style="width:100%;padding:12px;border-radius:99px;border:none;outline:none;
                       font-size:13px;font-weight:700;letter-spacing:0.04em;cursor:pointer;
                       transition:all 0.2s ease;">
                အတည်ပြုမည် ✓
              </button>
            </div>

          </div><!-- /content layer -->
        </div><!-- /sheet -->
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
  { key:'kpay',   label:'KBZ Pay',  popular:true,  img:'/images/payments/kpay.png',  iconBg:'rgba(37,99,235,0.25)',   activeColor:'#93c5fd' },
  { key:'wave',   label:'WavePay',  popular:false, img:'/images/payments/wave.png',  iconBg:'rgba(5,150,105,0.22)',   activeColor:'#6ee7b7' },
  { key:'usdt',   label:'USDT',     popular:false, img:null, iconText:'₮',            iconBg:'rgba(34,197,94,0.22)',   iconColor:'#4ade80',  activeColor:'#4ade80' },
  { key:'uabpay', label:'UAB Pay',  popular:false, img:null, iconText:'U',            iconBg:'rgba(139,92,246,0.22)', iconColor:'#c084fc',  activeColor:'#c084fc' },
]

const selectedMethod = computed(() => paymentMethods.find(p => p.key === method.value))
const recipientName = ref('')
const recipientAccount = ref('')

async function fetchPaymentSettings() {
  const keys = ['wave_recipient_name','wave_recipient_account','kpay_recipient_name','kpay_recipient_account',
                 'usdt_recipient_name','usdt_recipient_account','uabpay_recipient_name','uabpay_recipient_account']
  const { data, error } = await supabase.from('system_settings').select('key, value').in('key', keys)
  const s = {}
  if (data && !error) data.forEach(r => { s[r.key] = r.value })
  const m = method.value
  recipientName.value    = s[`${m}_recipient_name`]    || 'Ma Khaing Zin Moe'
  recipientAccount.value = s[`${m}_recipient_account`] || '9446323509'
}

watch(method, fetchPaymentSettings)
watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) { step.value = 1; amount.value = 5000; slip.value = ''; fetchPaymentSettings() }
})

const bonusPercent = 70
const bonusAmount  = computed(() => Math.round(amount.value * bonusPercent / 100))
const totalAmount  = computed(() => amount.value + bonusAmount.value)

function formatPreset(n) {
  if (n >= 1000000) return (n / 1000000) + 'M'
  if (n >= 1000)    return (n / 1000) + 'K'
  return n.toLocaleString()
}

const close     = () => emit('update:modelValue', false)
const nextStep  = () => { if (!method.value || amount.value <= 0) return; step.value = 2 }
const copyText  = async (text) => {
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
/* Sheet slide-up */
.nova-modal-enter-active { animation: sheetUp 0.28s cubic-bezier(0.22,1,0.36,1); }
.nova-modal-leave-active { animation: sheetUp 0.18s cubic-bezier(0.55,0,1,0.45) reverse; }
@keyframes sheetUp {
  from { transform:translateY(100%); }
  to   { transform:translateY(0); }
}

/* Toast fade */
.toast-enter-active { transition:all 0.2s ease; }
.toast-leave-active { transition:all 0.12s ease; }
.toast-enter-from   { opacity:0; transform:translateY(4px); }
.toast-leave-to     { opacity:0; }

/* Orb drift animations */
@keyframes orbA { from{transform:translate(0,0) scale(1);}  to{transform:translate(-18px,14px) scale(1.08);} }
@keyframes orbB { from{transform:translate(0,0) scale(1);}  to{transform:translate(14px,-18px) scale(1.06);} }
@keyframes orbC { from{transform:translate(0,0) scale(1);}  to{transform:translate(-10px,12px) scale(1.1);}  }

/* Section label */
.nova-label {
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(100,116,139,0.8);
  margin-bottom: 7px;
}

/* Icon button (header) */
.nova-icon-btn {
  width: 28px; height: 28px;
  border-radius: 8px;
  border: none; outline: none;
  background: rgba(255,255,255,0.06);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
  color: rgba(148,163,184,0.8);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background 0.15s;
}
.nova-icon-btn:hover { background: rgba(255,255,255,0.1); }

/* Payment tiles — glass surface, NO border outline */
.nova-tile--off {
  background: rgba(255,255,255,0.06);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12), 0 2px 6px rgba(0,0,0,0.3);
  color: rgba(203,213,225,0.85);
}
.nova-tile--off:hover {
  background: rgba(255,255,255,0.09);
}
.nova-tile--on {
  background: rgba(6,182,212,0.15);
  box-shadow: inset 0 1px 0 rgba(0,220,255,0.3), 0 0 16px rgba(6,182,212,0.25);
}
.nova-tile:active { transform: scale(0.97); }

/* Amount buttons — glass surface, NO border */
.nova-amt--off {
  background: rgba(255,255,255,0.06);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.11), 0 1px 4px rgba(0,0,0,0.25);
  color: rgba(203,213,225,0.85);
}
.nova-amt--on {
  background: rgba(6,182,212,0.8);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 10px rgba(6,182,212,0.4);
  color: #fff;
}
.nova-amt:hover { filter: brightness(1.1); }
.nova-amt:active { transform: scale(0.95); }

/* Input — glass surface */
.nova-input::placeholder { color: rgba(100,116,139,0.55); }
.nova-input:focus {
  box-shadow: inset 0 1px 0 rgba(0,220,255,0.25),
              inset 0 -1px 0 rgba(0,0,0,0.2),
              0 0 0 2px rgba(6,182,212,0.15) !important;
}

/* Copy button — glass chip */
.nova-copy-btn {
  display: flex; align-items: center; gap: 4px;
  font-size: 10px; font-weight: 600;
  padding: 4px 10px; border-radius: 8px; border: none; outline: none;
  cursor: pointer; transition: all 0.15s;
  background: rgba(255,255,255,0.07);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
  color: rgba(148,163,184,0.9);
}
.nova-copy-btn:hover  { background: rgba(255,255,255,0.11); }
.nova-copy-btn:active { transform: scale(0.95); }

/* CTA button — full-width pill, no hard border */
.nova-cta {
  background: rgba(51,65,85,0.9);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.14), 0 3px 12px rgba(0,0,0,0.4);
  color: rgba(226,232,240,0.92);
}
.nova-cta:hover { background: rgba(71,85,105,0.95); }
.nova-cta:active { transform: scale(0.98); }
.nova-cta:disabled { opacity:0.3; cursor:not-allowed; }

.nova-cta--confirm {
  background: rgba(5,150,105,0.85);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.18), 0 3px 14px rgba(16,185,129,0.3);
  color: #fff;
}
.nova-cta--confirm:hover { background: rgba(4,120,87,0.9); }

/* Scrollbar */
.nova-scroll::-webkit-scrollbar { width: 2px; }
.nova-scroll::-webkit-scrollbar-track { background: transparent; }
.nova-scroll::-webkit-scrollbar-thumb { background: rgba(100,116,139,0.25); border-radius: 10px; }
</style>
