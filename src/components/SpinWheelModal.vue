<template>
  <Teleport to="body">
    <Transition name="sw-fade">
      <div v-if="modelValue" class="sw-overlay">

        <!-- ══ WIN RESULT OVERLAY ══ -->
        <Transition name="sw-pop">
          <div v-if="winResult !== null" class="sw-win-overlay" @click.stop>
            <div class="sw-win-box">
              <button class="sw-win-close" @click="dismissWin">✕</button>
              <div class="sw-win-title">အခမ်ဆုကြေးငွေ</div>
              <div class="sw-win-amount">{{ winResult.toLocaleString('en', {minimumFractionDigits:2}) }}</div>
              <div class="sw-win-prog-wrap">
                <div class="sw-win-prog-bar" style="width:55%"></div>
              </div>
              <div class="sw-win-sub">ရလူနှင် {{ requirement.toLocaleString() }} ကုန်သောသည်</div>
              <div class="sw-win-chest-wrap">
                <div class="sw-win-glow"></div>
                <span class="sw-win-chest-emoji">🎁</span>
                <img
                  src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/download.png?tr=f-auto"
                  class="sw-win-coins"
                  alt="coins"
                  @error="e => e.target.style.display='none'"
                />
              </div>
              <button class="sw-win-btn" @click="dismissWin">
                သူငယ်ချင်းများကိုဖိတ်ကြားသည်, အနိုင်ဘောနပ်ဒ
              </button>
            </div>
          </div>
        </Transition>

        <!-- ══ MAIN PANEL ══ -->
        <div class="sw-panel">

          <!-- TOP TICKER -->
          <div class="sw-ticker">
            <div class="sw-ticker-track">
              <span v-for="(w, i) in [...winners,...winners]" :key="i" class="sw-tick-item">
                🔊 {{ w.user }} ကံစမ်းမဲ အနိုင်ဘောနပ်ဒ <b class="sw-tick-amt">{{ w.amount }}</b>&nbsp;&nbsp;&nbsp;&nbsp;
              </span>
            </div>
          </div>

          <!-- BALANCE -->
          <div class="sw-balance-sec">
            <div class="sw-bal-num">{{ displayBalance }}</div>
            <div class="sw-bal-bar-wrap">
              <div class="sw-bal-bar" :style="{width: balancePct+'%'}"></div>
            </div>
          </div>

          <!-- WHEEL AREA -->
          <div class="sw-wheel-area">
            <!-- SVG Wheel spins inside -->
            <div
              class="sw-wheel-wrap"
              :style="{
                transform: `rotate(${wheelRot}deg)`,
                transition: isSpinning ? 'transform 3.8s cubic-bezier(0.17,0.67,0.12,0.99)' : 'none'
              }"
            >
              <svg class="sw-wheel-svg" viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">
                <!-- Outer gold ring -->
                <circle cx="130" cy="130" r="128" fill="url(#goldRing)" />
                <circle cx="130" cy="130" r="122" fill="url(#goldRing2)" />
                <!-- Segments -->
                <path v-for="(seg,i) in segments" :key="'s'+i"
                  :d="segPath(i)"
                  :fill="seg.color"
                  stroke="#9B4DEB"
                  stroke-width="1"
                />
                <!-- Segment content (coin + label) — each rotated to its own position -->
                <g v-for="(seg,i) in segments" :key="'c'+i"
                   :transform="`rotate(${i*45+22.5}, 130, 130)`">
                  <image
                    href="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/download.png?tr=f-auto"
                    x="113" y="62" width="34" height="28"
                    style="image-rendering:crisp-edges"
                  />
                  <text x="130" y="54" text-anchor="middle" font-size="10.5"
                        fill="white" font-weight="bold"
                        style="font-family:sans-serif">{{ seg.label }}</text>
                </g>
                <!-- Inner separator lines -->
                <line v-for="i in 8" :key="'l'+i"
                  :x1="130" :y1="130"
                  :x2="130 + 122 * Math.cos(((i-1)*45 - 90) * Math.PI/180)"
                  :y2="130 + 122 * Math.sin(((i-1)*45 - 90) * Math.PI/180)"
                  stroke="#7A29CC" stroke-width="1.5" />
                <!-- Center circle -->
                <circle cx="130" cy="130" r="46" fill="url(#centerGrad)" />
                <circle cx="130" cy="130" r="43" fill="url(#centerInner)" />
                <text x="130" y="124" text-anchor="middle" font-size="15"
                      fill="#FFD700" font-weight="bold" style="font-family:sans-serif">x10</text>
                <text x="130" y="140" text-anchor="middle" font-size="11.5"
                      fill="white" style="font-family:sans-serif">အလကား</text>
                <text x="130" y="158" text-anchor="middle" font-size="20">👆</text>
                <!-- Defs -->
                <defs>
                  <radialGradient id="goldRing" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#F5D060"/>
                    <stop offset="60%" stop-color="#D4880C"/>
                    <stop offset="100%" stop-color="#A86000"/>
                  </radialGradient>
                  <radialGradient id="goldRing2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#F0C040"/>
                    <stop offset="100%" stop-color="#C07010"/>
                  </radialGradient>
                  <linearGradient id="centerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#FFFFFF"/>
                    <stop offset="100%" stop-color="#E0D0FF"/>
                  </linearGradient>
                  <radialGradient id="centerInner" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="#8B3FEE"/>
                    <stop offset="100%" stop-color="#5B1FA0"/>
                  </radialGradient>
                </defs>
              </svg>
            </div>

            <!-- Outer ring frame image — overlaid with screen blend to knock out black -->
            <img
              src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/xkyd_zp_03_2.avif?tr=f-auto"
              class="sw-ring-img"
              alt=""
              @error="e => e.target.style.display='none'"
            />

            <!-- Pointer triangle at top -->
            <div class="sw-pointer">▼</div>

            <!-- Click overlay on center to spin -->
            <div class="sw-center-click" @click="doSpin"></div>
          </div>

          <!-- RED PROGRESS BANNER -->
          <div class="sw-banner">
            <span class="sw-ban-txt">ဘောနပ်ကို ရလူရနှင် {{ requirement.toLocaleString() }} သာ လိုအပ်ပါ...</span>
          </div>

          <!-- INVITE ROW -->
          <div class="sw-invite-row">
            <span class="sw-invite-txt">သူငယ်ချင်းများကိုဖိတ်ကြားသည်, အ...</span>
          </div>

          <!-- VOUCHER CODE ROW -->
          <div class="sw-code-row">
            <div class="sw-code-left">
              <span class="sw-code-lbl">ဗိတ်စကုဒ်</span>
              <span class="sw-code-val">{{ voucherCode }}</span>
              <button class="sw-copy-btn" @click="copyCode" :class="{copied: codeCopied}">
                {{ codeCopied ? '✓' : '📋' }}
              </button>
            </div>
            <div class="sw-code-divider">|</div>
            <div class="sw-code-right">ကျွန်မ် လက်အောင်ငွေသား</div>
          </div>

          <!-- TASKS / CONDITIONS -->
          <div class="sw-tasks-sec">
            <div class="sw-sec-title">→ အလုပ်များပြည်ဖြောက်ရန်အတွက် အခဲ့ထိ ←</div>
            <div v-for="(task, i) in tasks" :key="i" class="sw-task-row">
              <div class="sw-task-left">
                <span class="sw-task-wheel-icon">🎰</span>
                <div class="sw-task-body">
                  <span class="sw-task-badge">+1ဆ</span>
                  <span class="sw-task-desc">{{ task.desc }}</span>
                  <span v-if="task.timer" class="sw-task-timer">{{ task.timer }}</span>
                </div>
              </div>
              <div class="sw-task-right">
                <span v-if="task.done" class="sw-task-check">✓</span>
                <button v-else-if="task.btnText" class="sw-task-btn" @click="task.onAction">{{ task.btnText }}</button>
              </div>
            </div>
          </div>

          <!-- SPIN HISTORY -->
          <div class="sw-hist-sec">
            <div class="sw-sec-title">→ ငါ်မှတ်တမ်း ←</div>
            <div v-if="spinHistory.length === 0" class="sw-hist-empty">မှတ်တမ်းမရှိသေးပါ</div>
            <div v-for="(h, i) in spinHistory" :key="i" class="sw-hist-row">
              <span class="sw-hist-date">{{ h.date }}</span>
              <span class="sw-hist-desc">နေတိုင်း အကောင်ဝင်ပြီး မဲအရေစတ...</span>
            </div>
          </div>

          <!-- SPIN BUTTON -->
          <div class="sw-spin-btn-wrap">
            <button
              class="sw-spin-btn"
              :disabled="isSpinning || spinCount <= 0"
              @click="doSpin"
            >
              <span v-if="isSpinning">🎰 လှည့်နေသည်...</span>
              <span v-else-if="spinCount > 0">🎯 လှည့်ပါ ({{ spinCount }} ကြိမ် ကျန်)</span>
              <span v-else>ကြိုးများပြည့်သောအခါ</span>
            </button>
          </div>

          <div style="height:80px"></div>
        </div>

        <!-- CLOSE BUTTON -->
        <button class="sw-close-btn" @click="close">✕</button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/supabase.js'

const props = defineProps({ modelValue: Boolean })
const emit  = defineEmits(['update:modelValue'])

// ── Segments ──────────────────────────────────────────────────────────────────
const segments = [
  { label: '0-6,000', value: 6000, color: '#6920C8', prob: 5 },
  { label: '4,000',   value: 4000, color: '#8840EE', prob: 8 },
  { label: '1,500',   value: 1500, color: '#6920C8', prob: 20 },
  { label: '2,000',   value: 2000, color: '#8840EE', prob: 15 },
  { label: '1,500',   value: 1500, color: '#6920C8', prob: 20 },
  { label: '5,000',   value: 5000, color: '#8840EE', prob: 7 },
  { label: '2,000',   value: 2000, color: '#6920C8', prob: 15 },
  { label: '100',     value: 100,  color: '#8840EE', prob: 10 },
]

function segPath(i) {
  const cx = 130, cy = 130, r = 121
  const s = (i * 45 - 90) * Math.PI / 180
  const e = ((i + 1) * 45 - 90) * Math.PI / 180
  return `M ${cx} ${cy} L ${(cx + r * Math.cos(s)).toFixed(2)} ${(cy + r * Math.sin(s)).toFixed(2)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(e)).toFixed(2)} ${(cy + r * Math.sin(e)).toFixed(2)} Z`
}

// ── State ──────────────────────────────────────────────────────────────────────
const wheelRot    = ref(0)
const isSpinning  = ref(false)
const winResult   = ref(null)
const codeCopied  = ref(false)
const spinCount   = ref(1)
const spinHistory = ref([])
const balance     = ref(0)
const requirement = ref(3035)

// ── Balance ────────────────────────────────────────────────────────────────────
const displayBalance = computed(() =>
  balance.value.toLocaleString('en', { minimumFractionDigits: 2 })
)
const balancePct = computed(() =>
  Math.min((balance.value / 10000) * 100, 100)
)

async function fetchBalance() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return
  const { data } = await supabase
    .from('wallets')
    .select('balance')
    .eq('user_id', session.user.id)
    .single()
  if (data) balance.value = parseFloat(data.balance) || 0
}

// ── Voucher code ───────────────────────────────────────────────────────────────
const voucherCode = ref('000000000')

async function initVoucherCode() {
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) return
  const uid = session.user.id
  voucherCode.value = uid.replace(/-/g, '').slice(0, 9).toUpperCase()
}

async function copyCode() {
  try {
    await navigator.clipboard.writeText(voucherCode.value)
  } catch {
    // fallback
  }
  codeCopied.value = true
  setTimeout(() => (codeCopied.value = false), 2000)
}

// ── Ticker winners (fake recent data) ─────────────────────────────────────────
const winners = [
  { user: '4959****1515', amount: '2,762.04' },
  { user: '6887****1345', amount: '2,028.00' },
  { user: '7312****8821', amount: '5,430.00' },
  { user: '9901****4456', amount: '1,500.00' },
  { user: '1234****7890', amount: '4,000.00' },
  { user: '5566****2233', amount: '3,750.50' },
]

// ── Spin count (localStorage) ──────────────────────────────────────────────────
const LS_SPIN_COUNT = 'iw99_spin_count'
const LS_SPIN_DATE  = 'iw99_spin_date'
const LS_SPIN_HIST  = 'iw99_spin_hist'

function initSpinCount() {
  const today = new Date().toLocaleDateString('en-CA')
  const lastDate = localStorage.getItem(LS_SPIN_DATE)
  if (lastDate !== today) {
    // New day — reset to 1 free spin
    localStorage.setItem(LS_SPIN_DATE, today)
    localStorage.setItem(LS_SPIN_COUNT, '1')
    spinCount.value = 1
  } else {
    spinCount.value = parseInt(localStorage.getItem(LS_SPIN_COUNT) || '0')
  }
  // Load history
  try {
    spinHistory.value = JSON.parse(localStorage.getItem(LS_SPIN_HIST) || '[]')
  } catch { spinHistory.value = [] }
}

// ── Tasks / Conditions ─────────────────────────────────────────────────────────
const tasks = computed(() => {
  const today  = new Date().toLocaleDateString('en-CA')
  const spDate = localStorage.getItem(LS_SPIN_DATE)
  const done1  = spDate === today && parseInt(localStorage.getItem(LS_SPIN_COUNT) || '0') < 1
  return [
    {
      desc: 'နေ့ဝင်ငင်ရောက်ပါ!! အလကား',
      timer: '20:00:42',
      done: done1,
      btnText: null,
      onAction: null,
    },
    {
      desc: 'ထိရောက်သော လဲပြောင်းမူတစ်ခုစီတင် 1 လ...',
      done: false,
      btnText: 'ဖိတ်ကြားပါ',
      onAction: () => {},
    },
    {
      desc: 'ထုံနောကတ ≥50,000',
      done: false,
      btnText: 'အပင်ဒေ',
      onAction: () => {},
    },
    {
      desc: 'နေဝဉ် တရားဝင်လောင်းကြေးများ ≥100,000',
      done: false,
      btnText: 'မိမြ',
      onAction: () => {},
    },
  ]
})

// ── Spin logic ─────────────────────────────────────────────────────────────────
function pickSegmentIndex() {
  const total = segments.reduce((s, x) => s + x.prob, 0)
  let r = Math.random() * total
  for (let i = 0; i < segments.length; i++) {
    r -= segments[i].prob
    if (r <= 0) return i
  }
  return segments.length - 1
}

function doSpin() {
  if (isSpinning.value || spinCount.value <= 0) return

  const targetIdx = pickSegmentIndex()

  // Calculate final rotation angle so targetIdx segment faces the top pointer
  // Segment i center is at angle: (i*45 + 22.5 - 90) from 3 o'clock = (i*45 - 67.5) degrees
  // When wheel rotates by R, segment i faces top when:
  //   (i*45 + 22.5) + R ≡ 0 (mod 360)  [in SVG coords, 0° at top after -90 offset]
  //   R = -(i*45 + 22.5) mod 360
  const stopAngle = (360 - ((targetIdx * 45 + 22.5) % 360)) % 360
  const currentMod = wheelRot.value % 360
  const delta = (stopAngle - currentMod + 360) % 360
  const extraSpins = (Math.floor(Math.random() * 4) + 6) * 360

  isSpinning.value = true
  wheelRot.value = wheelRot.value + extraSpins + (delta === 0 ? 360 : delta)

  // Deduct spin
  spinCount.value--
  localStorage.setItem(LS_SPIN_COUNT, String(spinCount.value))

  // After spin ends
  setTimeout(() => {
    isSpinning.value = false
    const prize = segments[targetIdx].value

    // Save history
    const entry = {
      date: new Date().toLocaleString('en-CA', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      }).replace(',', ''),
      prize,
    }
    spinHistory.value.unshift(entry)
    if (spinHistory.value.length > 20) spinHistory.value = spinHistory.value.slice(0, 20)
    localStorage.setItem(LS_SPIN_HIST, JSON.stringify(spinHistory.value))

    if (prize > 0) {
      winResult.value = prize
    }
  }, 4000)
}

function dismissWin() {
  winResult.value = null
}

// ── Open / Close ───────────────────────────────────────────────────────────────
function close() {
  if (isSpinning.value) return
  emit('update:modelValue', false)
}

onMounted(() => {
  initSpinCount()
  fetchBalance()
  initVoucherCode()
})
</script>

<style scoped>
/* ══ OVERLAY ══════════════════════════════════════════════════════════ */
.sw-overlay {
  position: fixed; inset: 0; z-index: 9000;
  background: rgba(10, 5, 30, 0.96);
  display: flex; flex-direction: column; align-items: center;
  overflow: hidden;
}

/* ══ FADE TRANSITION ══ */
.sw-fade-enter-active, .sw-fade-leave-active { transition: opacity .25s; }
.sw-fade-enter-from, .sw-fade-leave-to { opacity: 0; }

/* ══ WIN OVERLAY ══════════════════════════════════════════════════════ */
.sw-win-overlay {
  position: absolute; inset: 0; z-index: 200;
  display: flex; align-items: center; justify-content: center;
  background: rgba(10,5,35,0.85);
}
.sw-win-box {
  background: linear-gradient(160deg, #3D1A82, #1F0C50);
  border: 1.5px solid rgba(180,120,255,0.4);
  border-radius: 20px;
  width: min(84vw, 340px);
  padding: 28px 20px 22px;
  text-align: center;
  position: relative;
}
.sw-win-close {
  position: absolute; top: 12px; right: 14px;
  background: rgba(255,255,255,0.15); border: none; color: white;
  width: 26px; height: 26px; border-radius: 50%; cursor: pointer; font-size: 13px;
}
.sw-win-title {
  color: white; font-size: 15px; margin-bottom: 8px; opacity: 0.9;
}
.sw-win-amount {
  font-size: 34px; font-weight: 800;
  background: linear-gradient(135deg, #FFE566, #FFB800);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  margin-bottom: 8px;
}
.sw-win-prog-wrap {
  height: 5px; background: rgba(255,255,255,0.15); border-radius: 3px; margin: 0 10px 4px;
}
.sw-win-prog-bar {
  height: 100%; background: linear-gradient(90deg, #22C55E, #16A34A); border-radius: 3px;
  transition: width 0.8s ease;
}
.sw-win-sub { font-size: 11px; color: rgba(255,255,255,0.55); margin-bottom: 14px; }
.sw-win-chest-wrap {
  position: relative; height: 140px;
  display: flex; align-items: center; justify-content: center; margin-bottom: 10px;
}
.sw-win-glow {
  position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 60%, rgba(255,200,50,0.35) 0%, transparent 70%);
}
.sw-win-chest-emoji { font-size: 72px; position: absolute; top: 0; }
.sw-win-coins {
  width: 130px; position: absolute; bottom: 0;
  filter: drop-shadow(0 4px 12px rgba(255,180,0,0.6));
  mix-blend-mode: screen;
}
.sw-win-btn {
  background: linear-gradient(135deg, #8B3FF5, #5B1FA0);
  border: none; color: #cce4ff; border-radius: 22px;
  padding: 10px 18px; font-size: 12px; cursor: pointer; width: 100%;
  font-family: inherit;
}
.sw-win-btn:hover { filter: brightness(1.15); }

.sw-pop-enter-active { animation: sw-pop-in .3s ease; }
.sw-pop-leave-active { animation: sw-pop-in .2s ease reverse; }
@keyframes sw-pop-in {
  from { transform: scale(0.75); opacity: 0; }
  to   { transform: scale(1);    opacity: 1; }
}

/* ══ PANEL ════════════════════════════════════════════════════════════ */
.sw-panel {
  width: 100%; max-width: 430px;
  height: 100%; overflow-y: auto; overflow-x: hidden;
  background: linear-gradient(180deg, #2A1266 0%, #1A0B45 40%, #22105A 100%);
  position: relative;
  scrollbar-width: none;
}
.sw-panel::-webkit-scrollbar { display: none; }

/* ══ TICKER ═══════════════════════════════════════════════════════════ */
.sw-ticker {
  overflow: hidden; white-space: nowrap;
  background: rgba(255,255,255,0.07);
  padding: 7px 0; border-bottom: 1px solid rgba(255,255,255,0.06);
}
.sw-ticker-track {
  display: inline-flex;
  animation: sw-marquee 26s linear infinite;
}
.sw-tick-item { font-size: 12.5px; color: rgba(255,255,255,0.8); padding: 0 6px; }
.sw-tick-amt  { color: #FFD700; font-weight: 700; }
@keyframes sw-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* ══ BALANCE ══════════════════════════════════════════════════════════ */
.sw-balance-sec { text-align: center; padding: 14px 20px 8px; }
.sw-bal-num {
  font-size: 36px; font-weight: 800;
  background: linear-gradient(135deg, #FFE566, #FFA800);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  letter-spacing: -0.5px;
}
.sw-bal-bar-wrap {
  height: 5px; background: rgba(255,255,255,0.12);
  border-radius: 3px; margin: 6px 30px 0;
}
.sw-bal-bar {
  height: 100%; background: linear-gradient(90deg, #22C55E, #16A34A);
  border-radius: 3px; transition: width 1s ease;
}

/* ══ WHEEL AREA ═══════════════════════════════════════════════════════ */
.sw-wheel-area {
  position: relative;
  width: min(88vw, 340px);
  margin: 10px auto 0;
  aspect-ratio: 1;
}
.sw-wheel-wrap {
  position: absolute;
  inset: 12%;
  border-radius: 50%;
  transform-origin: center center;
  will-change: transform;
  cursor: pointer;
}
.sw-wheel-svg { width: 100%; height: 100%; display: block; }

.sw-ring-img {
  position: absolute; inset: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  mix-blend-mode: screen;
}
.sw-pointer {
  position: absolute; top: 0; left: 50%;
  transform: translateX(-50%) translateY(-2px);
  color: #FFD700; font-size: 22px;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.8));
  z-index: 5; pointer-events: none;
}
.sw-center-click {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  width: 23%; height: 23%;
  border-radius: 50%;
  cursor: pointer; z-index: 10;
}

/* ══ RED BANNER ═══════════════════════════════════════════════════════ */
.sw-banner {
  margin: 4px 16px 0;
  background: linear-gradient(90deg, #C82020, #E03030);
  border-radius: 6px; padding: 7px 12px;
  overflow: hidden;
}
.sw-ban-txt { font-size: 12px; color: white; white-space: nowrap; }

/* ══ INVITE ROW ═══════════════════════════════════════════════════════ */
.sw-invite-row { padding: 8px 16px; }
.sw-invite-txt { font-size: 12.5px; color: rgba(255,255,255,0.7); }

/* ══ CODE ROW ═════════════════════════════════════════════════════════ */
.sw-code-row {
  margin: 0 16px 10px;
  background: rgba(255,255,255,0.07);
  border-radius: 8px; padding: 8px 12px;
  display: flex; align-items: center; gap: 8px;
}
.sw-code-left { display: flex; align-items: center; gap: 6px; flex: 1; }
.sw-code-lbl  { font-size: 11.5px; color: rgba(255,255,255,0.55); }
.sw-code-val  { font-size: 13px; color: white; font-weight: 600; letter-spacing: 1px; }
.sw-copy-btn  {
  background: none; border: none; cursor: pointer; font-size: 14px;
  padding: 2px 4px; border-radius: 4px; transition: background .2s;
}
.sw-copy-btn:hover { background: rgba(255,255,255,0.1); }
.sw-copy-btn.copied { color: #22C55E; }
.sw-code-divider { color: rgba(255,255,255,0.2); font-size: 16px; }
.sw-code-right { font-size: 11.5px; color: rgba(255,255,255,0.55); }

/* ══ TASKS ════════════════════════════════════════════════════════════ */
.sw-tasks-sec { margin: 0 16px 12px; }
.sw-sec-title {
  font-size: 13px; color: rgba(255,255,255,0.7);
  text-align: center; padding: 8px 0;
}
.sw-task-row {
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(255,255,255,0.06);
  border-radius: 10px; padding: 9px 12px; margin-bottom: 7px;
}
.sw-task-left { display: flex; align-items: center; gap: 8px; flex: 1; }
.sw-task-wheel-icon { font-size: 18px; }
.sw-task-body { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; }
.sw-task-badge {
  background: linear-gradient(135deg, #8B3FF5, #5B1FA0);
  color: white; font-size: 10px; font-weight: 700;
  padding: 2px 6px; border-radius: 10px;
}
.sw-task-desc { font-size: 12px; color: rgba(255,255,255,0.8); }
.sw-task-timer { font-size: 11px; color: #FFD700; font-weight: 600; }
.sw-task-right { flex-shrink: 0; }
.sw-task-check { color: #22C55E; font-size: 18px; font-weight: 700; }
.sw-task-btn {
  background: linear-gradient(135deg, #8B3FF5, #5B1FA0);
  border: none; color: white; border-radius: 16px;
  padding: 5px 14px; font-size: 12px; cursor: pointer;
  font-family: inherit; white-space: nowrap;
}
.sw-task-btn:hover { filter: brightness(1.15); }

/* ══ HISTORY ══════════════════════════════════════════════════════════ */
.sw-hist-sec { margin: 0 16px 12px; }
.sw-hist-empty { text-align: center; color: rgba(255,255,255,0.35); font-size: 13px; padding: 16px 0; }
.sw-hist-row {
  display: flex; gap: 10px; padding: 8px 12px;
  background: rgba(255,255,255,0.04);
  border-radius: 8px; margin-bottom: 5px;
}
.sw-hist-date { font-size: 12px; color: rgba(255,255,255,0.55); flex-shrink: 0; }
.sw-hist-desc { font-size: 12px; color: rgba(255,255,255,0.7); }

/* ══ SPIN BUTTON ══════════════════════════════════════════════════════ */
.sw-spin-btn-wrap { padding: 0 16px 10px; }
.sw-spin-btn {
  width: 100%; padding: 14px;
  background: linear-gradient(135deg, #A855F7, #7C3AED);
  border: none; border-radius: 14px; color: white;
  font-size: 15px; font-weight: 700; cursor: pointer;
  font-family: inherit; letter-spacing: 0.3px;
  box-shadow: 0 4px 20px rgba(124,58,237,0.5);
  transition: filter .2s, transform .1s;
}
.sw-spin-btn:hover:not(:disabled) { filter: brightness(1.12); transform: translateY(-1px); }
.sw-spin-btn:disabled { opacity: 0.5; cursor: not-allowed; }

/* ══ CLOSE BUTTON ═════════════════════════════════════════════════════ */
.sw-close-btn {
  position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
  z-index: 9100;
  width: 48px; height: 48px; border-radius: 50%;
  background: rgba(255,255,255,0.12);
  border: 1.5px solid rgba(255,255,255,0.25);
  color: white; font-size: 18px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  backdrop-filter: blur(4px);
  transition: background .2s;
}
.sw-close-btn:hover { background: rgba(255,255,255,0.2); }
</style>
