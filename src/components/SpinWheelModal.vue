<template>
  <Teleport to="body">
    <Transition name="sw-fade">
      <div v-if="modelValue" class="sw-overlay" @click.self="close">

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
                  class="sw-win-coins" alt=""
                  @error="e=>e.target.style.display='none'"
                />
              </div>
              <button class="sw-win-btn" @click="dismissWin">
                သူငယ်ချင်းများကိုဖိတ်ကြားသည်, အနိုင်ဘောနပ်ဒ
              </button>
            </div>
          </div>
        </Transition>

        <!-- ══ CARD ══ -->
        <div class="sw-card">

          <!-- TICKER -->
          <div class="sw-ticker">
            <div class="sw-ticker-track">
              <span v-for="(w,i) in [...winners,...winners]" :key="i" class="sw-tick-item">
                🔊 {{ w.user }} ကံစမ်းမဲ အနိုင်ဘောနပ်ဒ <b class="sw-tick-amt">{{ w.amount }}</b>&nbsp;&nbsp;&nbsp;
              </span>
            </div>
          </div>

          <!-- HEADER ROW (? and icon) -->
          <div class="sw-header-row">
            <button class="sw-hdr-btn">?</button>
            <button class="sw-hdr-btn">⚙</button>
          </div>

          <!-- BALANCE -->
          <div class="sw-bal-wrap">
            <div class="sw-bal-num">{{ displayBalance }}</div>
            <div class="sw-bal-bar-bg">
              <div class="sw-bal-bar" :style="{width:balancePct+'%'}"></div>
            </div>
          </div>

          <!-- WHEEL -->
          <div class="sw-wheel-area">
            <!-- SVG spinning wheel -->
            <div
              class="sw-wheel-spin"
              :style="{
                transform:`rotate(${wheelRot}deg)`,
                transition: isSpinning
                  ? 'transform 3.8s cubic-bezier(0.17,0.67,0.12,0.99)'
                  : 'none'
              }"
            >
              <svg class="sw-wheel-svg" viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="gRing" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stop-color="#F5D060"/>
                    <stop offset="55%"  stop-color="#D48A0C"/>
                    <stop offset="100%" stop-color="#9A5E00"/>
                  </radialGradient>
                  <radialGradient id="gCenter" cx="50%" cy="50%" r="50%">
                    <stop offset="0%"   stop-color="#A050FF"/>
                    <stop offset="100%" stop-color="#5B1FA0"/>
                  </radialGradient>
                </defs>
                <!-- Gold ring border -->
                <circle cx="130" cy="130" r="128" fill="url(#gRing)"/>
                <!-- Segments -->
                <path v-for="(seg,i) in segments" :key="'s'+i"
                  :d="segPath(i)" :fill="seg.color" stroke="#9B3FEF" stroke-width="1"/>
                <!-- Separator lines -->
                <line v-for="i in 8" :key="'l'+i"
                  x1="130" y1="130"
                  :x2="130+122*Math.cos(((i-1)*45-90)*Math.PI/180)"
                  :y2="130+122*Math.sin(((i-1)*45-90)*Math.PI/180)"
                  stroke="#7A29CC" stroke-width="1.5"/>
                <!-- Segment labels + coin icon -->
                <g v-for="(seg,i) in segments" :key="'g'+i"
                   :transform="`rotate(${i*45+22.5},130,130)`">
                  <image
                    href="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/download.png?tr=f-auto"
                    x="114" y="64" width="32" height="26"/>
                  <text x="130" y="55" text-anchor="middle"
                        font-size="10" fill="white" font-weight="700"
                        style="font-family:sans-serif">{{ seg.label }}</text>
                </g>
                <!-- Center circle -->
                <circle cx="130" cy="130" r="46" fill="white"/>
                <circle cx="130" cy="130" r="43" fill="url(#gCenter)"/>
                <text x="130" y="125" text-anchor="middle" font-size="15"
                      fill="#FFD700" font-weight="800" style="font-family:sans-serif">
                  x{{ spinCount }}
                </text>
                <text x="130" y="140" text-anchor="middle" font-size="11"
                      fill="white" style="font-family:sans-serif">အလကားဆဲ</text>
                <text x="130" y="158" text-anchor="middle" font-size="19">👆</text>
              </svg>
            </div>

            <!-- Ring frame overlay (mix-blend-mode: screen knocks out black) -->
            <img
              src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/xkyd_zp_03_2.avif?tr=f-auto"
              class="sw-ring-img" alt=""
              @error="e=>e.target.style.display='none'"
            />

            <!-- Pointer at top -->
            <div class="sw-pointer">▼</div>

            <!-- Invisible click zone on wheel center -->
            <div class="sw-center-hit" @click="doSpin" :title="isSpinning?'':'လှည့်ရန် နှိပ်ပါ'"></div>
          </div>

          <!-- SCROLLABLE LOWER CONTENT -->
          <div class="sw-lower">

            <!-- RED BANNER -->
            <div class="sw-banner">
              ဘောနပ်ကို ရလူရနှင် {{ requirement.toLocaleString() }} သာ လိုအပ်ပါ...
            </div>

            <!-- INVITE + VOUCHER -->
            <div class="sw-invite">သူငယ်ချင်းများကိုဖိတ်ကြားသည်, အ...</div>
            <div class="sw-code-row">
              <span class="sw-code-lbl">ဗိတ်စကုဒ်</span>
              <span class="sw-code-val">{{ voucherCode }}</span>
              <button class="sw-copy-btn" @click="copyCode">{{ codeCopied?'✓':'📋' }}</button>
              <span class="sw-code-sep">|</span>
              <span class="sw-code-r">ကျွန်မ် လက်အောင်ငွေသား</span>
            </div>

            <!-- TASKS -->
            <div class="sw-sec-hd">→ အလုပ်များပြည်ဖြောက်ရန်အတွက် အခဲ့ထိ ←</div>
            <div v-for="(task,i) in tasks" :key="i" class="sw-task">
              <img
                src="https://ik.imagekit.io/rbok01qam/Custom%20icons%20img/xkyd_zpcs.avif?tr=f-auto"
                class="sw-task-icon" alt=""
                @error="e=>e.target.style.display='none'"
              />
              <div class="sw-task-mid">
                <span class="sw-task-badge">+1ဆ</span>
                <span class="sw-task-desc">{{ task.desc }}</span>
                <span v-if="task.timer" class="sw-task-timer">{{ task.timer }}</span>
              </div>
              <div class="sw-task-act">
                <span v-if="task.done" class="sw-task-ok">✓</span>
                <button v-else-if="task.btnText" class="sw-task-btn">{{ task.btnText }}</button>
              </div>
            </div>

            <!-- SPIN BUTTON -->
            <button class="sw-spin-btn" :disabled="isSpinning||spinCount<=0" @click="doSpin">
              <span v-if="isSpinning">🎰 လှည့်နေသည်...</span>
              <span v-else-if="spinCount>0">🎯 လှည့်ပါ ({{ spinCount }} ကြိမ် ကျန်)</span>
              <span v-else>🔒 ကြိုးများပြည့်ပြီ</span>
            </button>
            <!-- Cooldown countdown -->
            <div v-if="!isSpinning && spinCount <= 0 && nextSpinCountdown" class="sw-cooldown-wrap">
              <svg width="13" height="13" fill="none" stroke="rgba(255,200,50,0.8)" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path stroke-linecap="round" d="M12 7v5l3 3"/></svg>
              <span class="sw-cooldown-label">နောက်တစ်ကြိမ် spin ရနိုင်သည် ─</span>
              <span class="sw-cooldown-time">{{ nextSpinCountdown }}</span>
            </div>

            <!-- HISTORY -->
            <div class="sw-sec-hd">→ ငါ်မှတ်တမ်း ←</div>
            <div v-if="!spinHistory.length" class="sw-hist-empty">မှတ်တမ်းမရှိသေးပါ</div>
            <div v-for="(h,i) in spinHistory" :key="i" class="sw-hist-row">
              <span class="sw-hist-dt">{{ h.date }}</span>
              <span class="sw-hist-txt">နေတိုင်း အကောင်ဝင်ပြီး မဲအရေစတ...</span>
            </div>

            <div style="height:16px"></div>
          </div><!-- /sw-lower -->

        </div><!-- /sw-card -->

        <!-- CLOSE BUTTON (outside card) -->
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
  { label:'0-6,000', value:6000, color:'#6920C8', prob:5  },
  { label:'4,000',   value:4000, color:'#8840EE', prob:8  },
  { label:'1,500',   value:1500, color:'#6920C8', prob:20 },
  { label:'2,000',   value:2000, color:'#8840EE', prob:15 },
  { label:'1,500',   value:1500, color:'#6920C8', prob:20 },
  { label:'5,000',   value:5000, color:'#8840EE', prob:7  },
  { label:'2,000',   value:2000, color:'#6920C8', prob:15 },
  { label:'100',     value:100,  color:'#8840EE', prob:10 },
]

function segPath(i) {
  const cx=130, cy=130, r=121
  const s = (i*45-90)*Math.PI/180
  const e = ((i+1)*45-90)*Math.PI/180
  return `M${cx} ${cy}L${(cx+r*Math.cos(s)).toFixed(1)} ${(cy+r*Math.sin(s)).toFixed(1)}A${r} ${r} 0 0 1 ${(cx+r*Math.cos(e)).toFixed(1)} ${(cy+r*Math.sin(e)).toFixed(1)}Z`
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
const voucherCode = ref('2C328BF09')

// ── Cooldown Countdown ─────────────────────────────────────────────────────────
const nextSpinCountdown = ref('')
let countdownTimer = null
function startCountdown() {
  clearInterval(countdownTimer)
  countdownTimer = setInterval(() => {
    const now = new Date()
    const midnight = new Date()
    midnight.setHours(24, 0, 0, 0)
    const diff = midnight - now
    if (diff <= 0) {
      clearInterval(countdownTimer)
      // New day — give 1 free spin
      localStorage.setItem(LS_CNT, '1')
      localStorage.setItem(LS_DATE, new Date().toLocaleDateString('en-CA'))
      spinCount.value = 1
      nextSpinCountdown.value = ''
      return
    }
    const h = String(Math.floor(diff / 3600000)).padStart(2,'0')
    const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2,'0')
    const s = String(Math.floor((diff % 60000) / 1000)).padStart(2,'0')
    nextSpinCountdown.value = `${h}:${m}:${s}`
  }, 1000)
}

// ── Computed ───────────────────────────────────────────────────────────────────
const displayBalance = computed(() => balance.value.toLocaleString('en',{minimumFractionDigits:2}))
const balancePct     = computed(() => Math.min((balance.value/10000)*100,100))

// ── Fake winners ticker ────────────────────────────────────────────────────────
const winners = [
  {user:'4959****1515',amount:'2,762.04'},
  {user:'6887****1345',amount:'2,028.00'},
  {user:'7312****8821',amount:'5,430.00'},
  {user:'9901****4456',amount:'1,500.00'},
  {user:'1234****7890',amount:'4,000.00'},
  {user:'5566****2233',amount:'3,750.50'},
]

// ── Tasks ──────────────────────────────────────────────────────────────────────
const tasks = computed(() => [
  { desc:'နေ့ဝင်ငင်ရောက်ပါ!! အလကားဆဲ', timer:'20:00:42', done:true, btnText:'' },
  { desc:'ထိရောက်သော လဲပြောင်းမူတစ်ခုစီတင် 1 လ...', done:false, btnText:'အသေးစိတ်' },
  { desc:'ထုံနောကတ ≥50,000', done:false, btnText:'အပင်ဒေ' },
  { desc:'နေဝဉ် တရားဝင်လောင်းကြေးများ ≥100,000', done:false, btnText:'မိမြ' },
])

// ── Init ───────────────────────────────────────────────────────────────────────
const LS_DATE='iw99_spin_date', LS_CNT='iw99_spin_cnt', LS_HIST='iw99_spin_hist'

function initState() {
  const today = new Date().toLocaleDateString('en-CA')
  if (localStorage.getItem(LS_DATE) !== today) {
    localStorage.setItem(LS_DATE, today)
    localStorage.setItem(LS_CNT, '1')
    spinCount.value = 1
    nextSpinCountdown.value = ''
    clearInterval(countdownTimer)
  } else {
    spinCount.value = parseInt(localStorage.getItem(LS_CNT)||'0')
    if (spinCount.value <= 0) startCountdown()
  }
  try { spinHistory.value = JSON.parse(localStorage.getItem(LS_HIST)||'[]') } catch { spinHistory.value=[] }
}

async function fetchBalance() {
  const {data:{session}} = await supabase.auth.getSession()
  if (!session) return
  const {data} = await supabase.from('wallets').select('balance').eq('user_id',session.user.id).single()
  if (data) balance.value = parseFloat(data.balance)||0
  voucherCode.value = session.user.id.replace(/-/g,'').slice(0,9).toUpperCase()
}

// ── Spin ───────────────────────────────────────────────────────────────────────
function pickIdx() {
  const total = segments.reduce((s,x)=>s+x.prob,0)
  let r = Math.random()*total
  for (let i=0;i<segments.length;i++) { r-=segments[i].prob; if(r<=0) return i }
  return segments.length-1
}

function doSpin() {
  if (isSpinning.value || spinCount.value<=0) return
  const idx = pickIdx()
  const stopAngle = (360-((idx*45+22.5)%360))%360
  const currMod   = wheelRot.value%360
  const delta     = (stopAngle-currMod+360)%360
  const extra     = (Math.floor(Math.random()*4)+6)*360
  isSpinning.value = true
  wheelRot.value  = wheelRot.value + extra + (delta||360)
  spinCount.value--
  localStorage.setItem(LS_CNT, String(spinCount.value))
  if (spinCount.value <= 0) startCountdown()

  setTimeout(() => {
    isSpinning.value = false
    const prize = segments[idx].value
    const entry = {
      date: new Date().toLocaleString('sv').replace('T',' '),
      prize,
    }
    spinHistory.value.unshift(entry)
    if (spinHistory.value.length>20) spinHistory.value.length=20
    localStorage.setItem(LS_HIST, JSON.stringify(spinHistory.value))
    if (prize>0) winResult.value = prize
  }, 4100)
}

function dismissWin() { winResult.value = null }
function close() { if (!isSpinning.value) emit('update:modelValue', false) }
async function copyCode() {
  try { await navigator.clipboard.writeText(voucherCode.value) } catch {}
  codeCopied.value=true; setTimeout(()=>codeCopied.value=false, 1800)
}

onMounted(() => { initState(); fetchBalance() })
onUnmounted(() => { clearInterval(countdownTimer) })
</script>

<style scoped>
/* ══ OVERLAY ══════════════════════════════════════════════════════════ */
.sw-overlay {
  position: fixed; inset: 0; z-index: 9000;
  background: rgba(8,4,24,0.88);
  display: flex; flex-direction: column;
  align-items: center; justify-content: flex-start;
  overflow-y: auto; padding: 18px 0 70px;
}
.sw-fade-enter-active,.sw-fade-leave-active{transition:opacity .22s}
.sw-fade-enter-from,.sw-fade-leave-to{opacity:0}

/* ══ WIN OVERLAY ══════════════════════════════════════════════════════ */
.sw-win-overlay {
  position: fixed; inset: 0; z-index: 9200;
  display: flex; align-items: center; justify-content: center;
  background: rgba(8,4,24,0.82);
}
.sw-win-box {
  background: linear-gradient(155deg,#3D1A82,#1F0C50);
  border: 1px solid rgba(180,120,255,.35);
  border-radius: 18px; width: min(82vw,320px);
  padding: 24px 18px 18px; text-align: center; position: relative;
}
.sw-win-close {
  position:absolute;top:10px;right:12px;
  background:rgba(255,255,255,.15);border:none;color:white;
  width:24px;height:24px;border-radius:50%;cursor:pointer;font-size:12px;
}
.sw-win-title{color:rgba(255,255,255,.85);font-size:13px;margin-bottom:6px}
.sw-win-amount{
  font-size:30px;font-weight:800;
  background:linear-gradient(135deg,#FFE566,#FFB800);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  margin-bottom:6px;
}
.sw-win-prog-wrap{height:4px;background:rgba(255,255,255,.12);border-radius:3px;margin:0 8px 3px}
.sw-win-prog-bar{height:100%;background:linear-gradient(90deg,#22C55E,#16A34A);border-radius:3px}
.sw-win-sub{font-size:10px;color:rgba(255,255,255,.5);margin-bottom:12px}
.sw-win-chest-wrap{position:relative;height:120px;display:flex;align-items:center;justify-content:center;margin-bottom:8px}
.sw-win-glow{position:absolute;inset:0;background:radial-gradient(circle at 50% 60%,rgba(255,200,50,.35) 0%,transparent 65%)}
.sw-win-chest-emoji{font-size:62px;position:absolute;top:2px}
.sw-win-coins{width:110px;position:absolute;bottom:0;mix-blend-mode:screen;filter:drop-shadow(0 3px 8px rgba(255,180,0,.5))}
.sw-win-btn{
  width:100%;background:linear-gradient(135deg,#8B3FF5,#5B1FA0);
  border:none;color:#cce4ff;border-radius:20px;
  padding:9px 14px;font-size:11.5px;cursor:pointer;font-family:inherit;
}
.sw-pop-enter-active{animation:sw-pop-in .28s ease}
.sw-pop-leave-active{animation:sw-pop-in .18s ease reverse}
@keyframes sw-pop-in{from{transform:scale(.75);opacity:0}to{transform:scale(1);opacity:1}}

/* ══ CARD ═════════════════════════════════════════════════════════════ */
.sw-card {
  width: min(92vw, 390px);
  background: linear-gradient(180deg,#2A1268 0%,#1F0C55 60%,#221060 100%);
  border-radius: 16px; overflow: hidden;
  flex-shrink: 0;
}

/* ══ TICKER ═══════════════════════════════════════════════════════════ */
.sw-ticker{
  overflow:hidden;white-space:nowrap;
  background:rgba(255,255,255,.06);
  padding:5px 0;
}
.sw-ticker-track{
  display:inline-flex;
  animation:sw-marquee 24s linear infinite;
}
.sw-tick-item{font-size:11.5px;color:rgba(255,255,255,.8);padding:0 4px}
.sw-tick-amt{color:#FFD700;font-weight:700}
@keyframes sw-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ══ HEADER ROW ═══════════════════════════════════════════════════════ */
.sw-header-row{
  display:flex;justify-content:flex-end;gap:6px;
  padding:4px 10px 0;
}
.sw-hdr-btn{
  background:rgba(255,255,255,.12);border:none;color:rgba(255,255,255,.7);
  width:22px;height:22px;border-radius:50%;cursor:pointer;font-size:11px;
}

/* ══ BALANCE ══════════════════════════════════════════════════════════ */
.sw-bal-wrap{text-align:center;padding:6px 20px 4px}
.sw-bal-num{
  font-size:32px;font-weight:800;
  background:linear-gradient(135deg,#FFE566,#FFA800);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
}
.sw-bal-bar-bg{height:4px;background:rgba(255,255,255,.12);border-radius:2px;margin:4px 30px 0}
.sw-bal-bar{height:100%;background:linear-gradient(90deg,#22C55E,#16A34A);border-radius:2px;transition:width 1s}

/* ══ WHEEL AREA ═══════════════════════════════════════════════════════ */
.sw-wheel-area{
  position:relative;
  width:min(88vw,330px);
  margin:6px auto 0;
  aspect-ratio:1;
}
.sw-wheel-spin{
  position:absolute;
  inset:10%;
  border-radius:50%;
  transform-origin:center;
  will-change:transform;
}
.sw-wheel-svg{width:100%;height:100%;display:block}

.sw-ring-img{
  position:absolute;inset:0;width:100%;height:100%;
  pointer-events:none;mix-blend-mode:screen;
}
.sw-pointer{
  position:absolute;top:-2px;left:50%;
  transform:translateX(-50%);
  color:#FFD700;font-size:18px;z-index:5;pointer-events:none;
  filter:drop-shadow(0 1px 3px rgba(0,0,0,.9));
}
.sw-center-hit{
  position:absolute;top:50%;left:50%;
  transform:translate(-50%,-50%);
  width:22%;height:22%;border-radius:50%;
  cursor:pointer;z-index:10;
}

/* ══ LOWER CONTENT ════════════════════════════════════════════════════ */
.sw-lower{padding:0 12px 0}

/* Red banner */
.sw-banner{
  background:linear-gradient(90deg,#C82020,#E03030);
  border-radius:6px;padding:6px 10px;
  font-size:11.5px;color:white;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  margin-bottom:7px;
}

/* Invite + code */
.sw-invite{font-size:11.5px;color:rgba(255,255,255,.7);margin-bottom:5px}
.sw-code-row{
  display:flex;align-items:center;gap:5px;flex-wrap:wrap;
  background:rgba(255,255,255,.07);border-radius:7px;
  padding:6px 10px;margin-bottom:8px;
}
.sw-code-lbl{font-size:10.5px;color:rgba(255,255,255,.5)}
.sw-code-val{font-size:12px;color:white;font-weight:700;letter-spacing:1px}
.sw-copy-btn{background:none;border:none;cursor:pointer;font-size:13px;padding:0 2px}
.sw-code-sep{color:rgba(255,255,255,.2);font-size:14px}
.sw-code-r{font-size:10.5px;color:rgba(255,255,255,.5)}

/* Section header */
.sw-sec-hd{
  text-align:center;font-size:12px;color:rgba(255,255,255,.65);
  padding:6px 0 5px;
}

/* Tasks */
.sw-task{
  display:flex;align-items:center;gap:7px;
  background:rgba(255,255,255,.06);border-radius:9px;
  padding:7px 9px;margin-bottom:5px;
}
.sw-task-icon{width:26px;height:26px;object-fit:contain;flex-shrink:0}
.sw-task-mid{flex:1;display:flex;flex-wrap:wrap;align-items:center;gap:4px}
.sw-task-badge{
  background:linear-gradient(135deg,#8B3FF5,#5B1FA0);
  color:white;font-size:9.5px;font-weight:700;
  padding:2px 5px;border-radius:9px;flex-shrink:0;
}
.sw-task-desc{font-size:11px;color:rgba(255,255,255,.8)}
.sw-task-timer{font-size:10.5px;color:#FFD700;font-weight:600}
.sw-task-act{flex-shrink:0}
.sw-task-ok{color:#22C55E;font-size:15px;font-weight:700}
.sw-task-btn{
  background:linear-gradient(135deg,#8B3FF5,#5B1FA0);
  border:none;color:white;border-radius:14px;
  padding:4px 10px;font-size:10.5px;cursor:pointer;font-family:inherit;
  white-space:nowrap;
}

/* Spin button */
.sw-spin-btn{
  display:block;width:100%;
  background:linear-gradient(135deg,#A855F7,#7C3AED);
  border:none;border-radius:12px;color:white;
  font-size:13.5px;font-weight:700;cursor:pointer;
  padding:11px;margin:8px 0;font-family:inherit;
  box-shadow:0 3px 14px rgba(124,58,237,.45);
  transition:filter .15s,transform .1s;
}
.sw-spin-btn:hover:not(:disabled){filter:brightness(1.1);transform:translateY(-1px)}
.sw-spin-btn:disabled{opacity:.45;cursor:not-allowed}

/* History */
.sw-hist-empty{text-align:center;color:rgba(255,255,255,.3);font-size:12px;padding:12px 0}
.sw-hist-row{
  display:flex;gap:8px;padding:6px 8px;
  background:rgba(255,255,255,.04);border-radius:7px;margin-bottom:4px;
}
.sw-hist-dt{font-size:11px;color:rgba(255,255,255,.5);flex-shrink:0;white-space:nowrap}
.sw-hist-txt{font-size:11px;color:rgba(255,255,255,.65)}

/* ══ COOLDOWN ════════════════════════════════════════════════════════ */
.sw-cooldown-wrap{
  display:flex;align-items:center;justify-content:center;gap:5px;
  padding:6px 10px;margin:0 0 6px;
  background:rgba(255,200,50,0.07);border-radius:8px;
  border:1px solid rgba(255,200,50,0.2);
}
.sw-cooldown-label{font-size:11px;color:rgba(255,200,50,0.75)}
.sw-cooldown-time{font-size:13px;font-weight:800;color:#FFD700;font-variant-numeric:tabular-nums;letter-spacing:0.5px}

/* ══ CLOSE BUTTON ═════════════════════════════════════════════════════ */
.sw-close-btn{
  margin-top:14px;
  width:44px;height:44px;border-radius:50%;
  background:rgba(255,255,255,.12);
  border:1.5px solid rgba(255,255,255,.22);
  color:white;font-size:16px;cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;
  transition:background .18s;
}
.sw-close-btn:hover{background:rgba(255,255,255,.2)}
</style>
