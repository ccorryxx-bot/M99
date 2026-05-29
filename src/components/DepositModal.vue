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
            <!-- Base gradient matching nova-app -->
            <div style="position:absolute;inset:0;background:linear-gradient(160deg,#08102a 0%,#0d1a36 25%,#0c1828 50%,#091420 75%,#07101a 100%);"></div>
            <!-- Orb 1: green top-left (same as homepage orb-1) -->
            <div style="position:absolute;top:-60px;left:-60px;width:280px;height:280px;
                        border-radius:50%;pointer-events:none;
                        background:radial-gradient(circle,rgba(34,197,94,0.22) 0%,rgba(34,197,94,0.07) 50%,transparent 70%);
                        animation:orbA 12s ease-in-out infinite;"></div>
            <!-- Orb 2: indigo/sky top-right (same as homepage orb-2) -->
            <div style="position:absolute;top:15%;right:-70px;width:300px;height:300px;
                        border-radius:50%;pointer-events:none;
                        background:radial-gradient(circle,rgba(99,102,241,0.22) 0%,rgba(56,189,248,0.1) 45%,transparent 70%);
                        animation:orbB 16s ease-in-out infinite;"></div>
            <!-- Orb 3: purple/pink bottom-left (same as homepage orb-3) -->
            <div style="position:absolute;bottom:40px;left:-20px;width:220px;height:220px;
                        border-radius:50%;pointer-events:none;
                        background:radial-gradient(circle,rgba(168,85,247,0.18) 0%,rgba(236,72,153,0.08) 50%,transparent 70%);
                        animation:orbC 14s ease-in-out infinite;"></div>
          </div>

          <!-- Content above background -->
          <div style="position:relative;z-index:1;display:flex;flex-direction:column;height:100%;">

            <!-- ── Header ── -->
            <div style="flex-shrink:0;padding:14px 16px 10px;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">
                <button v-if="step===2" @click="step=1" class="nova-icon-btn">
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                <div v-else style="width:26px;"></div>

                <span style="font-size:13px;font-weight:700;color:rgba(226,232,240,0.95);letter-spacing:0.05em;">
                  ငွေသွင်းရန်
                </span>

                <button @click="close" class="nova-icon-btn">
                  <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
              <div style="height:1px;background:rgba(255,255,255,0.07);"></div>
            </div>

            <!-- ── Scrollable body ── -->
            <div style="flex:1;overflow-y:auto;padding:0 16px;" class="nova-scroll">

              <!-- ══ STEP 1 ══ -->
              <div v-if="step===1">

                <!-- Payment method label -->
                <p style="font-size:11px;color:rgba(156,163,175,0.75);margin:0 0 8px 0;">
                  ငွေပေးချေနည်းလမ်း
                </p>

                <!-- 2×2 Payment grid — picture-2 style: dark card + thin border -->
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
                             white-space:nowrap;box-shadow:0 1px 6px rgba(249,115,22,0.55);">
                      လူကြိုက်များ
                    </span>

                    <div style="width:28px;height:28px;border-radius:8px;flex-shrink:0;
                                display:flex;align-items:center;justify-content:center;overflow:hidden;"
                      :style="{background:pm.iconBg}">
                      <img v-if="pm.img" :src="pm.img" style="width:22px;height:22px;object-fit:contain;"/>
                      <span v-else style="font-size:12px;font-weight:900;" :style="{color:pm.iconColor}">{{pm.iconText}}</span>
                    </div>

                    <span style="font-size:12px;font-weight:600;"
                      :style="method===pm.key ? {color:'#e2e8f0'} : {color:'rgba(148,163,184,0.85)'}">
                      {{pm.label}}
                    </span>
                  </button>
                </div>

                <!-- Amount label -->
                <p style="font-size:11px;color:rgba(156,163,175,0.75);margin:0 0 8px 0;">
                  သွင်းမည့်ပမာဏ
                </p>

                <!-- 4×2 Amount grid — dark buttons, full number format -->
                <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;margin-bottom:8px;">
                  <button
                    v-for="amt in amountPresets"
                    :key="amt"
                    @click="amount=amt"
                    class="nova-amt-btn"
                    :class="amount===amt ? 'nova-amt-active' : 'nova-amt-idle'"
                    style="padding:8px 2px;border-radius:10px;border:none;outline:none;
                           font-size:11px;font-weight:700;cursor:pointer;
                           transition:all 0.15s ease;text-align:center;">
                    {{formatAmt(amt)}}
                  </button>
                </div>

                <!-- K input -->
                <div style="position:relative;margin-bottom:12px;">
                  <span style="position:absolute;left:12px;top:50%;transform:translateY(-50%);
                               font-size:11px;font-weight:700;color:rgba(156,163,175,0.6);">K</span>
                  <input
                    v-model.number="amount"
                    type="number"
                    :placeholder="'အနည်းဆုံး: 3,000 ~ အများဆုံး: 1,000,000'"
                    style="width:100%;padding:9px 12px 9px 26px;border-radius:11px;
                           border:none;outline:none;font-size:11px;box-sizing:border-box;
                           background:rgba(255,255,255,0.06);
                           box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);
                           color:rgba(226,232,240,0.9);
                           caret-color:#22c55e;"
                    class="nova-input" />
                </div>

                <!-- Bonus section -->
                <div style="border-radius:13px;overflow:hidden;margin-bottom:14px;
                            background:rgba(234,179,8,0.06);
                            box-shadow:inset 0 1px 0 rgba(255,255,255,0.07),0 2px 8px rgba(0,0,0,0.3);">
                  <div style="display:flex;align-items:center;gap:6px;padding:8px 12px;
                              border-bottom:1px solid rgba(255,255,255,0.05);">
                    <span style="font-size:12px;">🎁</span>
                    <span style="font-size:11px;font-weight:700;color:rgba(253,224,71,0.85);">
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
                      <span style="font-size:11px;color:rgba(148,163,184,0.65);">စုစုပေါင်း</span>
                      <span style="font-size:16px;font-weight:900;color:#fde047;">
                        {{totalAmount.toLocaleString()}} Ks
                      </span>
                    </div>
                  </div>
                </div>

              </div><!-- /step 1 -->

              <!-- ══ STEP 2 ══ -->
              <div v-else-if="step===2">

                <!-- Method summary -->
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
                      <p style="font-size:9px;color:rgba(107,114,128,0.85);margin:0 0 2px 0;">လက်ခံသူ</p>
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
                      <p style="font-size:9px;color:rgba(107,114,128,0.85);margin:0 0 2px 0;">ဖုန်းနံပါတ်</p>
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
                         font-family:monospace;font-size:17px;font-weight:900;
                         text-align:center;letter-spacing:0.45em;
                         background:rgba(255,255,255,0.06);
                         box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);
                         color:#e2e8f0;margin-bottom:10px;box-sizing:border-box;
                         caret-color:#22c55e;" />

                <div style="display:flex;justify-content:space-between;margin-bottom:10px;padding:0 2px;">
                  <span style="font-size:11px;color:rgba(107,114,128,0.8);">သွင်းမည့်ပမာဏ</span>
                  <span style="font-size:12px;font-weight:900;color:#22c55e;">{{amount.toLocaleString()}} Ks</span>
                </div>
              </div><!-- /step 2 -->

            </div><!-- /scroll body -->

            <!-- ── Sticky bottom CTA ── -->
            <div style="flex-shrink:0;padding:8px 16px 24px;">
              <button v-if="step===1"
                @click="nextStep"
                :disabled="!method||!amount||amount<=0"
                class="nova-cta"
                style="width:100%;padding:12px;border-radius:99px;border:none;outline:none;
                       font-size:13px;font-weight:700;letter-spacing:0.04em;cursor:pointer;">
                ယခု ငွေသွင်းမည်
              </button>
              <button v-else-if="step===2"
                @click="submitDeposit"
                :disabled="slip.length<5"
                class="nova-cta nova-cta--green"
                style="width:100%;padding:12px;border-radius:99px;border:none;outline:none;
                       font-size:13px;font-weight:700;letter-spacing:0.04em;cursor:pointer;">
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
  { key:'kpay',   label:'KBZ Pay',  popular:true,  img:'/images/payments/kpay.png',  iconBg:'rgba(37,99,235,0.28)',   activeColor:'#93c5fd' },
  { key:'wave',   label:'WavePay',  popular:false, img:'/images/payments/wave.png',  iconBg:'rgba(5,150,105,0.25)',   activeColor:'#6ee7b7' },
  { key:'usdt',   label:'USDT',     popular:false, img:null, iconText:'₮',            iconBg:'rgba(34,197,94,0.25)',   iconColor:'#4ade80',  activeColor:'#4ade80' },
  { key:'uabpay', label:'UAB Pay',  popular:false, img:null, iconText:'U',            iconBg:'rgba(139,92,246,0.25)', iconColor:'#c084fc',  activeColor:'#c084fc' },
]

const selectedMethod = computed(() => paymentMethods.find(p => p.key === method.value))
const recipientName = ref('')
const recipientAccount = ref('')

async function fetchPaymentSettings() {
  const keys = ['wave_recipient_name','wave_recipient_account','kpay_recipient_name','kpay_recipient_account',
                 'usdt_recipient_name','usdt_recipient_account','uabpay_recipient_name','uabpay_recipient_account']
  const { data, error } = await supabase.from('system_settings').select('key,value').in('key',keys)
  const s = {}
  if (data && !error) data.forEach(r => { s[r.key]=r.value })
  const m = method.value
  recipientName.value    = s[`${m}_recipient_name`]    || 'Ma Khaing Zin Moe'
  recipientAccount.value = s[`${m}_recipient_account`] || '9446323509'
}

watch(method, fetchPaymentSettings)
watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) { step.value=1; amount.value=5000; slip.value=''; fetchPaymentSettings() }
})

const bonusPercent = 70
const bonusAmount  = computed(() => Math.round(amount.value * bonusPercent / 100))
const totalAmount  = computed(() => amount.value + bonusAmount.value)

function formatAmt(n) {
  if (n >= 1000000) return (n/1000000).toLocaleString() + ',000,000'
  return n.toLocaleString()
}

const close    = () => emit('update:modelValue', false)
const nextStep = () => { if (!method.value || amount.value <= 0) return; step.value = 2 }
const copyText = async (text) => {
  try { await navigator.clipboard.writeText(text); copied.value=true; setTimeout(()=>{copied.value=false},1500) }
  catch { prompt('Copy manually:', text) }
}
const submitDeposit = () => {
  if (slip.value.length !== 5) return
  emit('submit', { method:method.value, amount:amount.value, slip:slip.value })
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

/* Orbs — same timing as homepage */
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

/* Payment buttons — picture-2 style */
.nova-pm-btn { user-select:none; }
.nova-pm-idle {
  background:rgba(255,255,255,0.05);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.09), 0 1px 4px rgba(0,0,0,0.3);
}
.nova-pm-idle:hover { background:rgba(255,255,255,0.08); }
.nova-pm-active {
  background:rgba(255,255,255,0.09);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.15),
             inset 0 0 0 1px rgba(34,197,94,0.35),
             0 0 12px rgba(34,197,94,0.15);
}
.nova-pm-btn:active { transform:scale(0.97); }

/* Amount buttons */
.nova-amt-btn { user-select:none; }
.nova-amt-idle {
  background:rgba(255,255,255,0.05);
  color:rgba(203,213,225,0.85);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.08);
}
.nova-amt-active {
  background:rgba(6,182,212,0.85);
  color:#fff;
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.25), 0 2px 10px rgba(6,182,212,0.4);
}
.nova-amt-btn:hover { filter:brightness(1.12); }
.nova-amt-btn:active { transform:scale(0.95); }

/* Input */
.nova-input::placeholder { color:rgba(107,114,128,0.5); }
.nova-input:focus { box-shadow:inset 0 1px 0 rgba(34,197,94,0.3), 0 0 0 1.5px rgba(34,197,94,0.2) !important; }

/* Copy button */
.nova-copy-btn {
  display:flex;align-items:center;gap:4px;
  font-size:10px;font-weight:600;padding:4px 9px;border-radius:7px;
  border:none;outline:none;cursor:pointer;
  background:rgba(255,255,255,0.07);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.1);
  color:rgba(148,163,184,0.9);
  transition:all 0.15s;
}
.nova-copy-btn:hover { background:rgba(255,255,255,0.11); }
.nova-copy-btn:active { transform:scale(0.95); }

/* CTA pill */
.nova-cta {
  background:rgba(30,41,59,0.95);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.12), 0 3px 10px rgba(0,0,0,0.4);
  color:rgba(226,232,240,0.9);
  transition:all 0.2s;
}
.nova-cta:hover { background:rgba(51,65,85,0.95); }
.nova-cta:active { transform:scale(0.98); }
.nova-cta:disabled { opacity:0.3;cursor:not-allowed; }

.nova-cta--green {
  background:rgba(5,150,105,0.9);
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.18), 0 3px 12px rgba(34,197,94,0.3);
  color:#fff;
}
.nova-cta--green:hover { background:rgba(4,120,87,0.95); }

/* Scrollbar */
.nova-scroll::-webkit-scrollbar { width:2px; }
.nova-scroll::-webkit-scrollbar-track { background:transparent; }
.nova-scroll::-webkit-scrollbar-thumb { background:rgba(100,116,139,0.25);border-radius:10px; }
</style>
