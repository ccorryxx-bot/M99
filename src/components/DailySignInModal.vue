<template>
  <Teleport to="body">
    <Transition name="dsi-slide">
      <div v-if="visible" class="dsi-root">

        <!-- HEADER -->
        <header class="dsi-header">
          <button @click="close" class="dsi-back-btn">
            <svg width="18" height="18" fill="none" stroke="rgba(255,255,255,0.85)" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <span class="dsi-header-title">နေ့စဉ်ဆိုင်းအပ်</span>
          <div style="width:34px;"></div>
        </header>

        <!-- BODY -->
        <div class="dsi-body">

          <!-- YELLOW MAIN CARD -->
          <div class="dsi-card">

            <!-- Card Header -->
            <div class="dsi-card-header">
              <div class="dsi-card-title-wrap">
                <div class="dsi-card-title">နေ့စဉ် လောင်အင်းလုပ်၍</div>
                <div class="dsi-card-subtitle">ဆုကြေး မပြတ် ရရှိနိုင်...</div>
              </div>
              <img src="https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760107731.png?updatedAt=1780760988859&tr=f-auto"
                class="dsi-card-img" alt="" @error="e=>e.target.style.display='none'"/>
            </div>

            <!-- Stats bar -->
            <div class="dsi-stats-bar">
              <span class="dsi-stats-left">
                <span class="dsi-stats-num">{{ streakDays }}</span>
                <span class="dsi-stats-txt"> ရက်အတွင်း ဝင်ရောက်ခဲ့သည်။</span>
              </span>
              <span class="dsi-stats-right">
                <span style="font-size:10px;color:rgba(255,255,255,0.7);">ရရှိသည်: </span>
                <span class="dsi-stats-earn">{{ earnedTotal.toFixed(2) }}</span>
                <button @click="refreshStats" class="dsi-refresh-btn" :class="{spinning: refreshing}">
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5" stroke-linecap="round">
                    <polyline points="23 4 23 10 17 10"/>
                    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                  </svg>
                </button>
              </span>
            </div>

            <!-- Reward list -->
            <div class="dsi-rewards-wrap">
              <div v-for="(day, idx) in rewards" :key="idx" class="dsi-reward-row">
                <!-- Timeline -->
                <div class="dsi-timeline">
                  <div class="dsi-tl-line dsi-tl-line--top" v-if="idx > 0"></div>
                  <div class="dsi-tl-dot" :class="getDotClass(idx)">{{ idx + 1 }}</div>
                  <div class="dsi-tl-line dsi-tl-line--bot" v-if="idx < rewards.length - 1"></div>
                </div>
                <!-- Icon -->
                <div class="dsi-reward-icon">
                  <svg width="22" height="22" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <ellipse cx="18" cy="28" rx="10" ry="4" fill="rgba(245,158,11,0.18)"/>
                    <rect x="10" y="14" width="16" height="14" rx="3" fill="#92400e"/>
                    <rect x="10" y="14" width="16" height="14" rx="3" fill="url(#bg-bag)" opacity="0.9"/>
                    <rect x="12" y="12" width="12" height="5" rx="2.5" fill="#b45309"/>
                    <rect x="14" y="9" width="8" height="5" rx="2.5" fill="#d97706"/>
                    <path d="M18 17v4M16 19h4" stroke="rgba(255,255,255,0.55)" stroke-width="1.4" stroke-linecap="round"/>
                    <defs>
                      <linearGradient id="bg-bag" x1="10" y1="14" x2="26" y2="28" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" stop-color="#f59e0b"/>
                        <stop offset="100%" stop-color="#b45309"/>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <!-- Info -->
                <div class="dsi-reward-info">
                  <div class="dsi-reward-label">{{ idx + 1 }} တွင် လက်မှတ်ထိုးဝင်ခြင်း ဆုလာဘ်</div>
                  <div class="dsi-reward-amt">{{ day.amount.toFixed(2) }}</div>
                </div>
                <!-- Button -->
                <div class="dsi-reward-btn-wrap">
                  <button v-if="getRowState(idx) === 'claim'"
                    @click="claimBonus(idx)"
                    :disabled="claiming"
                    class="dsi-claim-btn">
                    {{ claiming ? '...' : 'အကောင်ဝင်ပါ!' }}
                  </button>
                  <button v-else-if="getRowState(idx) === 'claimed'"
                    class="dsi-done-btn" disabled>
                    <svg width="11" height="11" fill="none" stroke="rgba(74,222,128,0.9)" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                    ရပြီး
                  </button>
                  <button v-else class="dsi-locked-btn" disabled>
                    နေ့ {{ idx + 1 }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Bottom progress -->
            <div class="dsi-card-bottom">
              <span class="dsi-bottom-left">ဒေါ်မြည်သင်းရန် လိုအပ်ပါသည်</span>
              <span class="dsi-bottom-right">အလောင်းအစားများ {{ claimedCount }}/{{ rewards.length }}</span>
            </div>
            <div class="dsi-progress-bar-wrap">
              <div class="dsi-progress-label">{{ earnedTotal.toFixed(0) }}/{{ maxEarnable.toFixed(0) }}</div>
              <div class="dsi-progress-track">
                <div class="dsi-progress-fill" :style="{width: progressPct + '%'}"></div>
              </div>
            </div>
          </div>

          <!-- EVENT TIME SECTION -->
          <div class="dsi-section">
            <div class="dsi-section-badge">ဖြစ်စဉ် အချိန် (UTC+6.5)</div>
            <div class="dsi-time-row">
              <span class="dsi-time-text">21/02/2026 00:00:00 - 02/03/2036 23:59:59</span>
            </div>
          </div>

          <!-- RULES SECTION -->
          <div class="dsi-section">
            <div class="dsi-section-badge">ပါဝင်မှုအခြေအနေများ</div>
            <div class="dsi-rules">
              <p>1. ကင်တမ်ပါအလုပ်ပါများအားလုးကို ပြးမြောက်ရန် လိုအပ်သည် - ပထမဆုံး အားပြည့်ဝင်ပြည်ပြသ!!!</p>
              <div class="dsi-rule-divider"></div>
              <div class="dsi-section-badge" style="margin-bottom:8px;">လုပ်ဆောင်ချက်ဖော်ပြချက်</div>
              <p>1. နေ့စဉ် ငွေသွင်းမှု တစ်ရာဝင်ကရောက်ကြောင်းသည် သတ်မှတ်ချက်နှင့် ကိုက်ညီမှာ Attendance ပြုလုပ် နိုင်မည်ဖြစ်ပါသည်။ အောင်မြင်ပါက သက်ဆိုင်ရာ ဆုကြေး ရရှိ အရရှိပါသည်</p>
              <p>2. အောက်ပါလပေင်ဖောင်းများတွင် လောင်းကမ်းသော တရားဝင်ပါဝင်မည် ဖြစ်သည် - အလောင်းအစားများ ပြုလုပ်ကို ကန့်သတ်မည်ဖြစ်ပြောသည်ဖြင့် ဆုကြေးကို ၁ဝ မိနစ်အကြတင်တင် ၁ဝ မိနစ်ကြာ ၅ ပြန်လည်မမလှုပ်ပေမည် ဖြစ်ပြီး မောင်ဆုံးထဲ ဆိုင်ဖတ်ခပေးမပေမည်ဖြစ်ရန်</p>
              <p>3. ဤလုပ်ငန်းများသည် ဆုဆောင်းထားသော (Cumulative) Attendance လုပ်ငန်းများ ဖြစ်သည်ဟ။ အကယ်၍ ကြားဖြတ်ဆုရရှိပါက ရက်အရေအတွင် ဆက်ကလကတ်ဆောင်သည်မည်ကိုချ ဆက်လက်ဆောင်ငွေသည်များကို ဖြစ်မည်</p>
              <p>4. အကယ်၍ ဆောင်ရပ် Attendance ရက်ပေါင်းများ</p>
            </div>
          </div>

          <div style="height:24px;"></div>
        </div>

        <!-- Close button -->
        <button @click="close" class="dsi-close-btn">
          <svg width="20" height="20" fill="none" stroke="rgba(255,255,255,0.7)" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>

        <!-- Toast -->
        <Transition name="dsi-toast">
          <div v-if="toastMsg" class="dsi-toast">{{ toastMsg }}</div>
        </Transition>

      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import { supabase } from '@/supabase'

const props = defineProps({ modelValue: Boolean })
const emit  = defineEmits(['update:modelValue'])

const visible   = ref(false)
const refreshing = ref(false)
const claiming   = ref(false)
const toastMsg   = ref('')
let toastTimer   = null

const streakDays  = ref(0)
const earnedTotal = ref(0)
const claimedDays = ref([])

const rewards = [
  { amount: 200 },
  { amount: 400 },
  { amount: 600 },
  { amount: 800 },
  { amount: 1000 },
  { amount: 1200 },
  { amount: 1400 },
  { amount: 1600 },
  { amount: 1800 },
  { amount: 2000 },
]

const maxEarnable  = computed(() => rewards.reduce((s, r) => s + r.amount, 0))
const claimedCount = computed(() => claimedDays.value.length)
const progressPct  = computed(() =>
  maxEarnable.value > 0 ? Math.min((earnedTotal.value / maxEarnable.value) * 100, 100) : 0
)

const STREAK_KEY    = 'iw99_daily_streak'
const CLAIMED_KEY   = 'iw99_daily_claimed'
const LAST_DATE_KEY = 'iw99_daily_last_date'

function todayStr() {
  return new Date().toISOString().slice(0, 10)
}

function loadState() {
  try {
    const streak  = parseInt(localStorage.getItem(STREAK_KEY) || '0')
    const claimed = JSON.parse(localStorage.getItem(CLAIMED_KEY) || '[]')
    const lastDate = localStorage.getItem(LAST_DATE_KEY) || ''
    streakDays.value  = streak
    claimedDays.value = claimed
    earnedTotal.value = claimed.reduce((s, idx) => s + (rewards[idx]?.amount || 0), 0)
    return { streak, claimed, lastDate }
  } catch { return { streak: 0, claimed: [], lastDate: '' } }
}

function getRowState(idx) {
  if (claimedDays.value.includes(idx)) return 'claimed'
  if (idx === claimedDays.value.length) return 'claim'
  return 'locked'
}

function getDotClass(idx) {
  if (claimedDays.value.includes(idx)) return 'dsi-tl-dot--done'
  if (idx === claimedDays.value.length) return 'dsi-tl-dot--active'
  return 'dsi-tl-dot--locked'
}

async function claimBonus(idx) {
  if (claiming.value) return

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) { showToast('ဝင်ရောက်ပါ'); return }

  const lastDate = localStorage.getItem(LAST_DATE_KEY) || ''
  const today    = todayStr()
  if (lastDate === today) { showToast('ယနေ့ ဆိုင်းအပ်ပြီးပါပြီ'); return }

  claiming.value = true
  try {
    await new Promise(r => setTimeout(r, 600))
    const newClaimed = [...claimedDays.value, idx]
    const newStreak  = newClaimed.length
    const newEarned  = newClaimed.reduce((s, i) => s + (rewards[i]?.amount || 0), 0)

    localStorage.setItem(CLAIMED_KEY,   JSON.stringify(newClaimed))
    localStorage.setItem(STREAK_KEY,    String(newStreak))
    localStorage.setItem(LAST_DATE_KEY, today)

    claimedDays.value = newClaimed
    streakDays.value  = newStreak
    earnedTotal.value = newEarned

    showToast(`🎉 ဆုလာဘ် ${rewards[idx].amount.toFixed(0)} MMK ရရှိပါပြီ!`)
  } catch (e) {
    showToast('Error: ' + e.message)
  } finally {
    claiming.value = false
  }
}

function refreshStats() {
  refreshing.value = true
  loadState()
  setTimeout(() => { refreshing.value = false }, 700)
}

function showToast(msg) {
  toastMsg.value = msg
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toastMsg.value = '' }, 2500)
}

function close() { emit('update:modelValue', false) }

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    loadState()
    history.pushState({ dsiModal: true }, '')
    window.addEventListener('popstate', handlePop)
  } else {
    window.removeEventListener('popstate', handlePop)
  }
})

function handlePop() {
  if (!visible.value) return
  emit('update:modelValue', false)
}

onMounted(() => { loadState() })
</script>

<style scoped>
.dsi-root {
  position: fixed; inset: 0; z-index: 9000;
  background: #3d4187;
  display: flex; flex-direction: column;
  overflow: hidden;
  height: 100vh; height: 100dvh;
}

/* Transition */
.dsi-slide-enter-active,
.dsi-slide-leave-active { transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.dsi-slide-enter-from,
.dsi-slide-leave-to   { transform: translateX(100%); }
.dsi-slide-enter-to,
.dsi-slide-leave-from { transform: translateX(0); }

/* Header */
.dsi-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 10px 12px; height: 48px; flex-shrink: 0;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  background: rgba(20,22,60,0.6);
}
.dsi-back-btn {
  width: 34px; height: 34px; background: none; border: none;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  -webkit-tap-highlight-color: transparent;
}
.dsi-header-title {
  font-size: 13px; font-weight: 700; color: #fff;
}

/* Body */
.dsi-body {
  flex: 1; overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  padding: 12px 12px 80px;
}
.dsi-body::-webkit-scrollbar { width: 2px; }
.dsi-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

/* ── Main yellow card ── */
.dsi-card {
  border-radius: 14px;
  background: linear-gradient(145deg, #f59e0b, #d97706);
  padding: 1px;
  box-shadow: 0 4px 24px rgba(245,158,11,0.3), 0 0 0 1px rgba(245,158,11,0.2);
  margin-bottom: 10px;
}

.dsi-card-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 14px 8px;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  border-radius: 13px 13px 0 0;
}
.dsi-card-title-wrap { flex: 1; }
.dsi-card-title {
  font-size: 13px; font-weight: 900; color: #1a0a00;
  line-height: 1.3; letter-spacing: 0.01em;
}
.dsi-card-subtitle {
  font-size: 11px; color: rgba(26,10,0,0.75); font-weight: 600; margin-top: 2px;
}
.dsi-card-img {
  width: 52px; height: 52px; object-fit: contain; flex-shrink: 0;
  border-radius: 8px; margin-left: 8px;
}

/* Stats bar */
.dsi-stats-bar {
  display: flex; align-items: center; justify-content: space-between;
  padding: 7px 14px;
  background: rgba(26,10,0,0.15);
  font-size: 11px;
}
.dsi-stats-left { color: rgba(26,10,0,0.8); font-weight: 600; }
.dsi-stats-num  { font-size: 14px; font-weight: 900; color: #1a0a00; }
.dsi-stats-txt  { color: rgba(26,10,0,0.75); }
.dsi-stats-right { display: flex; align-items: center; gap: 4px; }
.dsi-stats-earn { font-size: 13px; font-weight: 900; color: #1a0a00; }
.dsi-refresh-btn {
  background: rgba(26,10,0,0.15); border: none; border-radius: 50%;
  width: 22px; height: 22px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  color: rgba(26,10,0,0.7);
  -webkit-tap-highlight-color: transparent;
}
.dsi-refresh-btn.spinning svg { animation: dsi-spin 0.7s linear infinite; }
@keyframes dsi-spin { to { transform: rotate(360deg); } }

/* Rewards wrap */
.dsi-rewards-wrap {
  background: #2a2d6e;
  margin: 0;
  padding: 4px 0;
}

.dsi-reward-row {
  display: flex; align-items: center;
  padding: 7px 12px 7px 8px;
  gap: 8px;
  position: relative;
}
.dsi-reward-row:not(:last-child) {
  border-bottom: 1px solid rgba(255,255,255,0.04);
}

/* Timeline */
.dsi-timeline {
  width: 28px; flex-shrink: 0;
  display: flex; flex-direction: column;
  align-items: center;
  position: relative;
  align-self: stretch;
}
.dsi-tl-dot {
  width: 22px; height: 22px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 10px; font-weight: 900;
  position: relative; z-index: 1; flex-shrink: 0;
}
.dsi-tl-dot--active {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: #1a0a00;
  box-shadow: 0 0 8px rgba(245,158,11,0.6);
}
.dsi-tl-dot--done {
  background: rgba(74,222,128,0.25);
  border: 1.5px solid rgba(74,222,128,0.6);
  color: #4ade80;
}
.dsi-tl-dot--locked {
  background: rgba(255,255,255,0.06);
  border: 1.5px solid rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.35);
}
.dsi-tl-line {
  flex: 1; width: 2px;
  background: rgba(255,255,255,0.1);
  min-height: 6px;
}
.dsi-tl-line--top { order: -1; }
.dsi-tl-line--bot { order: 1; }

/* Icon */
.dsi-reward-icon {
  width: 34px; height: 34px; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  background: rgba(245,158,11,0.1);
  border-radius: 8px;
  border: 1px solid rgba(245,158,11,0.2);
}

/* Info */
.dsi-reward-info { flex: 1; min-width: 0; }
.dsi-reward-label {
  font-size: 10.5px; color: rgba(255,255,255,0.85); font-weight: 600;
  line-height: 1.3; margin-bottom: 2px;
}
.dsi-reward-amt {
  font-size: 13px; font-weight: 900;
  color: #f59e0b;
}

/* Buttons */
.dsi-claim-btn {
  flex-shrink: 0;
  padding: 6px 12px; border-radius: 99px;
  background: linear-gradient(135deg, #22c55e, #16a34a);
  color: #fff; font-size: 11px; font-weight: 700;
  border: none; cursor: pointer;
  box-shadow: 0 2px 8px rgba(34,197,94,0.4);
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
}
.dsi-claim-btn:disabled { opacity: 0.6; }
.dsi-done-btn {
  flex-shrink: 0;
  padding: 6px 10px; border-radius: 99px;
  background: rgba(74,222,128,0.1);
  border: 1.5px solid rgba(74,222,128,0.4);
  color: rgba(74,222,128,0.9); font-size: 10px; font-weight: 700;
  display: flex; align-items: center; gap: 3px;
  white-space: nowrap;
}
.dsi-locked-btn {
  flex-shrink: 0;
  padding: 5px 10px; border-radius: 8px;
  background: rgba(255,255,255,0.06);
  border: 1.5px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.35); font-size: 11px; font-weight: 600;
  white-space: nowrap;
}

/* Card bottom */
.dsi-card-bottom {
  display: flex; align-items: center; justify-content: space-between;
  padding: 8px 14px 4px;
  background: #2a2d6e;
}
.dsi-bottom-left { font-size: 10px; color: rgba(255,255,255,0.55); }
.dsi-bottom-right { font-size: 10px; color: rgba(255,255,255,0.55); }

.dsi-progress-bar-wrap {
  padding: 4px 14px 12px;
  background: #2a2d6e;
  border-radius: 0 0 13px 13px;
}
.dsi-progress-label {
  font-size: 10px; color: #f59e0b; font-weight: 700; margin-bottom: 4px;
}
.dsi-progress-track {
  height: 5px; border-radius: 99px;
  background: rgba(255,255,255,0.1);
  overflow: hidden;
}
.dsi-progress-fill {
  height: 100%; border-radius: 99px;
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
  transition: width 0.5s ease;
}

/* Sections */
.dsi-section {
  background: #2a2d6e;
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 10px;
}
.dsi-section-badge {
  display: inline-block;
  padding: 4px 12px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border-radius: 99px;
  font-size: 11px; font-weight: 700; color: #1a0a00;
  margin-bottom: 10px;
}
.dsi-time-row {
  padding: 8px 12px;
  background: rgba(255,255,255,0.04);
  border-radius: 8px;
}
.dsi-time-text { font-size: 11px; color: rgba(255,255,255,0.7); }

.dsi-rules { padding-top: 4px; }
.dsi-rules p {
  font-size: 10.5px; color: rgba(255,255,255,0.72);
  line-height: 1.65; margin: 0 0 8px 0;
}
.dsi-rule-divider {
  height: 1px; background: rgba(255,255,255,0.07);
  margin: 10px 0;
}

/* Close button */
.dsi-close-btn {
  position: absolute; bottom: 16px; left: 50%;
  transform: translateX(-50%);
  width: 44px; height: 44px; border-radius: 50%;
  background: rgba(255,255,255,0.1);
  border: 1.5px solid rgba(255,255,255,0.2);
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.15s;
}
.dsi-close-btn:active { background: rgba(255,255,255,0.18); }

/* Toast */
.dsi-toast {
  position: absolute; bottom: 80px; left: 50%; transform: translateX(-50%);
  background: rgba(30,35,90,0.95); border: 1px solid rgba(245,158,11,0.4);
  color: #fff; font-size: 12px; font-weight: 600;
  padding: 10px 18px; border-radius: 99px; white-space: nowrap;
  box-shadow: 0 4px 16px rgba(0,0,0,0.4);
}
.dsi-toast-enter-active, .dsi-toast-leave-active { transition: opacity 0.3s, transform 0.3s; }
.dsi-toast-enter-from, .dsi-toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(8px); }
</style>
