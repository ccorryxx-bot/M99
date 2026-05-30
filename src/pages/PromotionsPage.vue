<template>
  <div class="promo-root">
    <!-- orb bg -->
    <div class="bg-orb bg-orb--1"></div>
    <div class="bg-orb bg-orb--2"></div>

    <!-- ══ HEADER ══ -->
    <header class="promo-header">
      <button @click="$router.back()" class="promo-icon-btn">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <!-- Scrollable filter tabs -->
      <div class="tabs-scroll">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="tab-btn"
          :class="{ active: activeTab === tab.key }"
          @click="activeTab = tab.key"
        >{{ tab.label }}</button>
      </div>
    </header>

    <!-- ══ PROMO CARDS ══ -->
    <div class="cards-list">
      <template v-if="filteredCards.length">
        <div
          v-for="card in filteredCards"
          :key="card.id"
          class="promo-card"
        >
          <!-- card gradient bg -->
          <div class="card-bg"></div>

          <!-- shimmer overlay -->
          <div class="card-shimmer"></div>

          <!-- content layer -->
          <div class="card-content">
            <!-- brand row -->
            <div class="card-brand">
              <span class="brand-dot"></span>
              <span class="brand-dot"></span>
              <span class="brand-dot"></span>
            </div>
            <!-- title + desc -->
            <div class="card-text-wrap">
              <p class="card-title">{{ card.title }}</p>
              <p v-if="card.subtitle" class="card-sub">{{ card.subtitle }}</p>
              <p v-if="card.amount" class="card-amount">{{ card.amount }}</p>
            </div>
            <!-- tag -->
            <span class="card-tag">{{ tabLabel(card.tab) }}</span>
          </div>

          <!-- right image (url provided later) -->
          <div class="card-img-wrap">
            <img v-if="card.img" :src="card.img" class="card-img" />
            <div v-else class="card-img-placeholder"></div>
          </div>
        </div>
      </template>

      <!-- empty state -->
      <div v-else class="empty-state">
        <p class="empty-icon">📭</p>
        <p class="empty-text">ပရိုမိုးရှင်း မရှိသေးပါ</p>
      </div>

      <!-- Referral strip -->
      <div class="referral-strip">
        <div class="referral-left">
          <p class="ref-title">Referral Code</p>
          <p class="ref-code">{{ referralCode }}</p>
        </div>
        <button @click="copyReferral" class="ref-copy-btn">
          {{ copied ? '✓ ကူးပြီး' : 'ကူးယူ' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const storedUsername = localStorage.getItem('sb_username') || 'YOURNAME'
const referralCode = computed(() => storedUsername.toUpperCase())
const copied = ref(false)
const copyReferral = () => {
  const link = `https://novabett.vercel.app/?ref=${referralCode.value}`
  navigator.clipboard?.writeText(link).then(() => {
    copied.value = true
    setTimeout(() => copied.value = false, 2000)
  })
}

const tabs = [
  { key: 'all',     label: 'ဖြစ်ရပ်များ' },
  { key: 'mission', label: 'တာဝန်' },
  { key: 'vip',     label: 'VIP' },
  { key: 'reward',  label: 'ဆုလာဘ်' },
  { key: 'history', label: 'သမိုင်း' },
]
const activeTab = ref('all')

const tabLabel = (key) => tabs.find(t => t.key === key)?.label || ''

// promo cards — user will supply img urls later
const promoCards = ref([
  {
    id: 1, tab: 'all',
    title: 'ဝင်ငွေ ကူးပြောင်း Code',
    subtitle: 'ထည့်ပြီးအပိုဆုကြေးရယူလိုက်ပါ',
    amount: '', img: '',
  },
  {
    id: 2, tab: 'all',
    title: 'နေ့စဉ် ဘောနပ်',
    subtitle: 'နှစ်ကြိမ် တိုင်း ရပါတယ်',
    amount: '', img: '',
  },
  {
    id: 3, tab: 'mission',
    title: 'ဆုကြေး ငွေကို (၂၀၀၀) ချဲ့',
    subtitle: 'လဆဉ် 6, 16, 26 ရက်',
    amount: '', img: '',
  },
  {
    id: 4, tab: 'reward',
    title: 'လျှော်မှတ် ဘောနပ် မိမိ',
    subtitle: '',
    amount: '6,666,666', img: '',
  },
  {
    id: 5, tab: 'vip',
    title: 'VIP တိုးတက်မှု ဆုလာဘ်',
    subtitle: 'VIP Level ပိုမြင့်လေ ဆုပိုကြီးလေ',
    amount: '', img: '',
  },
])

const filteredCards = computed(() =>
  activeTab.value === 'all'
    ? promoCards.value
    : promoCards.value.filter(c => c.tab === activeTab.value)
)
</script>

<style scoped>
/* ── Root ── */
.promo-root {
  min-height: 100dvh;
  background: linear-gradient(160deg, #08102a 0%, #0d1a36 20%, #0c1828 40%, #091420 60%, #07101a 80%, #050c14 100%);
  color: #fff;
  overscroll-behavior: contain;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  overflow-x: hidden;
  padding-bottom: 80px;
}

/* bg orbs */
.bg-orb { position: fixed; border-radius: 50%; pointer-events: none; z-index: 0; }
.bg-orb--1 { width: 320px; height: 320px; top: -60px; left: -80px; background: radial-gradient(circle, rgba(34,197,94,0.11) 0%, transparent 70%); animation: orb1 14s ease-in-out infinite; }
.bg-orb--2 { width: 300px; height: 300px; top: 40%; right: -100px; background: radial-gradient(circle, rgba(56,189,248,0.09) 0%, transparent 70%); animation: orb2 18s ease-in-out infinite; }
@keyframes orb1 { 0%,100%{transform:translate(0,0);}50%{transform:translate(10px,-16px);} }
@keyframes orb2 { 0%,100%{transform:translate(0,0);}50%{transform:translate(-12px,14px);} }

/* ── Header ── */
.promo-header {
  position: sticky; top: 0; z-index: 30;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: transparent;
}
.promo-icon-btn {
  flex-shrink: 0;
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 12px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.13);
  box-shadow: 0 2px 10px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.1);
  backdrop-filter: blur(12px);
  color: #fff;
  cursor: pointer;
  transition: transform 0.12s, background 0.12s;
}
.promo-icon-btn:active { transform: scale(0.88); background: rgba(255,255,255,0.14); }

/* tabs */
.tabs-scroll {
  display: flex;
  align-items: center;
  gap: 4px;
  overflow-x: auto;
  scrollbar-width: none;
  flex: 1;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 10px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08);
  padding: 4px 6px;
}
.tabs-scroll::-webkit-scrollbar { display: none; }
.tab-btn {
  flex-shrink: 0;
  padding: 5px 12px;
  border-radius: 8px;
  font-size: 12px; font-weight: 700;
  color: rgba(255,255,255,0.5);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.15s, background 0.15s;
  white-space: nowrap;
  font-family: inherit;
}
.tab-btn.active {
  color: #22d3ee;
  background: rgba(34,211,238,0.12);
  border-radius: 8px;
  text-shadow: 0 0 8px rgba(34,211,238,0.5);
}

/* ── Cards list ── */
.cards-list {
  position: relative; z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 6px 0 10px;
}

/* ── Promo card ── */
.promo-card {
  position: relative;
  width: 100%;
  height: 170px;
  overflow: hidden;
  border-radius: 0;
  cursor: pointer;
  transition: transform 0.12s;
}
.promo-card:active { transform: scale(0.985); }

.card-bg {
  position: absolute; inset: 0;
  background: linear-gradient(130deg, #0891b2 0%, #06b6d4 35%, #0e7490 60%, #164e63 100%);
}
.card-shimmer {
  position: absolute; inset: 0;
  background: linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.08) 45%, transparent 60%);
  background-size: 200% 100%;
  animation: shimmer 4s linear infinite;
}
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

.card-content {
  position: absolute; inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 12px 14px;
  z-index: 2;
}
.card-brand {
  display: flex;
  align-items: center;
  gap: 5px;
}
.brand-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.85);
  box-shadow: 0 0 4px rgba(255,255,255,0.6);
}
.brand-dot:first-child { width: 22px; border-radius: 4px; }

.card-text-wrap {
  flex: 1;
  display: flex; flex-direction: column; justify-content: flex-end;
  padding-right: 120px;
}
.card-title {
  font-size: 16px; font-weight: 900;
  color: #fff;
  text-shadow: 0 1px 6px rgba(0,0,0,0.45);
  line-height: 1.3;
}
.card-sub {
  font-size: 12px;
  color: rgba(255,255,255,0.8);
  margin-top: 3px;
  line-height: 1.4;
}
.card-amount {
  font-size: 22px; font-weight: 900;
  color: #fde047;
  text-shadow: 0 0 12px rgba(253,224,71,0.6);
  margin-top: 2px;
}
.card-tag {
  display: inline-block;
  font-size: 9px; font-weight: 800;
  color: rgba(255,255,255,0.6);
  background: rgba(0,0,0,0.2);
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: 4px;
  padding: 1px 5px;
  align-self: flex-start;
}

/* right image area */
.card-img-wrap {
  position: absolute;
  right: 0; top: 0; bottom: 0;
  width: 140px;
  z-index: 1;
  display: flex; align-items: flex-end; justify-content: center;
}
.card-img {
  width: 100%; height: 100%;
  object-fit: cover;
  object-position: center top;
}
.card-img-placeholder {
  width: 100%; height: 100%;
  background: linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.04) 100%);
}

/* ── Empty state ── */
.empty-state {
  display: flex; flex-direction: column; align-items: center;
  padding: 60px 20px;
  gap: 10px;
}
.empty-icon { font-size: 40px; }
.empty-text { color: rgba(255,255,255,0.4); font-size: 13px; }

/* ── Referral strip ── */
.referral-strip {
  margin: 10px 12px 0;
  display: flex; align-items: center; justify-content: space-between;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  padding: 12px 14px;
  backdrop-filter: blur(8px);
}
.referral-left { display: flex; flex-direction: column; gap: 2px; }
.ref-title { font-size: 11px; color: rgba(255,255,255,0.5); font-weight: 600; }
.ref-code { font-size: 15px; font-weight: 900; color: #22d3ee; letter-spacing: 0.05em; }
.ref-copy-btn {
  padding: 7px 16px;
  border-radius: 10px;
  background: rgba(34,211,238,0.15);
  border: 1px solid rgba(34,211,238,0.3);
  color: #22d3ee;
  font-size: 12px; font-weight: 800;
  cursor: pointer;
  transition: background 0.12s, transform 0.1s;
  font-family: inherit;
}
.ref-copy-btn:active { transform: scale(0.92); background: rgba(34,211,238,0.25); }
</style>
