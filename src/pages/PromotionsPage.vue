<template>
  <div class="promo-root">
    <!-- bg orbs -->
    <div class="bg-orb bg-orb--1"></div>
    <div class="bg-orb bg-orb--2"></div>
    <div class="bg-orb bg-orb--3"></div>

    <!-- ══ HEADER ══ -->
    <header class="promo-header">
      <button @click="$router.back()" class="promo-back-btn">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <!-- Horizontal scrollable top tabs -->
      <div class="promo-top-tabs">
        <button
          v-for="tab in topTabs"
          :key="tab.key"
          class="promo-top-tab"
          :class="{ 'promo-top-tab--active': activeTopTab === tab.key }"
          @click="activeTopTab = tab.key"
        >{{ tab.label }}</button>
      </div>
    </header>

    <!-- ══ BODY ══ -->
    <div class="promo-body">

      <!-- Left Sidebar -->
      <aside class="promo-sidebar">
        <button
          v-for="cat in sideCategories"
          :key="cat.key"
          class="promo-cat-btn"
          :class="{ 'promo-cat-btn--active': activeCat === cat.key }"
          @click="activeCat = cat.key"
        >
          <span class="promo-cat-icon">
            <component :is="cat.icon" />
          </span>
          <span class="promo-cat-label">{{ cat.label }}</span>
        </button>
      </aside>

      <!-- Right Cards Area -->
      <main class="promo-cards-area">
        <template v-if="visibleCards.length">
          <div
            v-for="card in visibleCards"
            :key="card.id"
            class="promo-card"
          >
            <!-- Glass layers -->
            <div class="promo-card-glass"></div>
            <div class="promo-card-shimmer"></div>

            <!-- Content -->
            <div class="promo-card-inner">
              <!-- Brand tag -->
              <div class="promo-card-brand">
                <img
                  src="https://ik.imagekit.io/tdpebgueq/Brand%20Name%20Logo/IMG_20260602_154542.png?tr=f-auto"
                  alt="iW99"
                  class="promo-brand-logo"
                />
                <div class="promo-brand-dots">
                  <span></span><span></span><span></span>
                </div>
              </div>

              <!-- Title & Subtitle -->
              <div class="promo-card-text">
                <p class="promo-card-title">{{ card.title }}</p>
                <p v-if="card.subtitle" class="promo-card-sub">{{ card.subtitle }}</p>
                <p v-if="card.amount" class="promo-card-amount">{{ card.amount }}</p>
              </div>

              <!-- Category badge -->
              <span class="promo-card-badge">{{ tabLabel(card.tab) }}</span>
            </div>

            <!-- Image placeholder -->
            <div class="promo-card-img-wrap">
              <img v-if="card.img" :src="card.img" class="promo-card-img" />
              <div v-else class="promo-card-img-ph">
                <svg width="32" height="32" fill="none" stroke="rgba(255,255,255,0.2)" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="3" stroke-width="1.5"/>
                  <circle cx="8.5" cy="8.5" r="1.5" stroke-width="1.5"/>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 15l-5-5L5 21"/>
                </svg>
              </div>
            </div>
          </div>
        </template>

        <!-- Empty state -->
        <div v-else class="promo-empty">
          <div class="promo-empty-icon">
            <svg width="40" height="40" fill="none" stroke="rgba(255,255,255,0.2)" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
          </div>
          <p class="promo-empty-text">ပရိုမိုးရှင်း မရှိသေးပါ</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue'

// ── Top Tabs ──────────────────────────────────────────────────
const topTabs = [
  { key: 'events',  label: 'ဖြစ်ရပ်များ' },
  { key: 'mission', label: 'တာဝန်' },
  { key: 'vvip',    label: 'VVIP' },
  { key: 'reward',  label: 'ဆုလာဘ်' },
  { key: 'history', label: 'သမိုင်း' },
]
const activeTopTab = ref('events')

// ── Side Categories ───────────────────────────────────────────
const GridIcon = () => h('svg', { width: 16, height: 16, fill: 'none', stroke: 'currentColor', 'stroke-width': '2', viewBox: '0 0 24 24' }, [
  h('rect', { x: 3, y: 3, width: 7, height: 7, rx: 1 }),
  h('rect', { x: 14, y: 3, width: 7, height: 7, rx: 1 }),
  h('rect', { x: 3, y: 14, width: 7, height: 7, rx: 1 }),
  h('rect', { x: 14, y: 14, width: 7, height: 7, rx: 1 }),
])
const TagIcon = () => h('svg', { width: 16, height: 16, fill: 'none', stroke: 'currentColor', 'stroke-width': '2', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M7 7h.01M3 5l8.586 8.586a2 2 0 002.828 0l4.172-4.172a2 2 0 000-2.828L10 3H5a2 2 0 00-2 2v0z' }),
])
const ClockIcon = () => h('svg', { width: 16, height: 16, fill: 'none', stroke: 'currentColor', 'stroke-width': '2', viewBox: '0 0 24 24' }, [
  h('circle', { cx: 12, cy: 12, r: 9 }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M12 7v5l3 3' }),
])
const BoltIcon = () => h('svg', { width: 16, height: 16, fill: 'none', stroke: 'currentColor', 'stroke-width': '2', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M13 10V3L4 14h7v7l9-11h-7z' }),
])

const sideCategories = [
  { key: 'all',      label: 'အားလုံး',  icon: GridIcon },
  { key: 'discount', label: 'လျော့ဈေး', icon: TagIcon  },
  { key: 'history',  label: 'သမိုင်း',  icon: ClockIcon },
  { key: 'refill',   label: 'အားဖြည့်', icon: BoltIcon  },
]
const activeCat = ref('all')

// ── Promo Cards Data ──────────────────────────────────────────
const cards = ref([
  {
    id: 1,
    title: 'Exchange Code',
    subtitle: 'ထည်ပြီးအဝိုင်ဆုကြေးရယူလိုက်မှ',
    amount: '',
    tab: 'events',
    cat: 'all',
    img: ''
  },
  {
    id: 2,
    title: 'နေ့စဉ်ဘောနပ်',
    subtitle: '',
    amount: '',
    tab: 'events',
    cat: 'refill',
    img: ''
  },
  {
    id: 3,
    title: 'ဆုကြေးငွေသိန်း (၁၀၀၀) ချပ်',
    subtitle: 'လစဉ် 6, 16, 26 ရက် နေ့များတွင် တင်ဝင်မည်',
    amount: '',
    tab: 'events',
    cat: 'reward',
    img: ''
  },
  {
    id: 4,
    title: 'ပထမသမ်မင်မင်နိုင်မည်',
    subtitle: 'လျှပ်ပွတ်ဘောနပ်မိမိ',
    amount: '6,666,666',
    tab: 'vvip',
    cat: 'discount',
    img: ''
  },
  {
    id: 5,
    title: 'VVIP ဘောနပ်ရကျန်',
    subtitle: 'Exclusive rewards for top members',
    amount: '',
    tab: 'vvip',
    cat: 'all',
    img: ''
  },
  {
    id: 6,
    title: 'တာဝန်ကြီး ဆုကြေး',
    subtitle: 'Daily mission completion bonus',
    amount: '',
    tab: 'mission',
    cat: 'all',
    img: ''
  },
])

const tabLabel = (key) => topTabs.find(t => t.key === key)?.label || key

const visibleCards = computed(() => {
  return cards.value.filter(c => {
    const topMatch = activeTopTab.value === 'all' || c.tab === activeTopTab.value
    const catMatch = activeCat.value === 'all' || c.cat === activeCat.value
    return topMatch && catMatch
  })
})
</script>

<style scoped>
/* ── Root ── */
.promo-root {
  min-height: 100dvh;
  background: linear-gradient(160deg, #1a1c3a 0%, #2d3170 40%, #1a1c3a 100%);
  color: #fff;
  overscroll-behavior: contain;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* ── BG Orbs ── */
.bg-orb {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(1px);
}
.bg-orb--1 {
  width: 280px; height: 280px;
  top: -60px; left: -60px;
  background: radial-gradient(circle, rgba(99,102,241,0.22) 0%, transparent 70%);
  animation: orb-drift1 14s ease-in-out infinite;
}
.bg-orb--2 {
  width: 320px; height: 320px;
  top: 35%; right: -100px;
  background: radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%);
  animation: orb-drift2 18s ease-in-out infinite;
}
.bg-orb--3 {
  width: 200px; height: 200px;
  bottom: 80px; left: 10%;
  background: radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%);
  animation: orb-drift3 12s ease-in-out infinite;
}
@keyframes orb-drift1 { 0%,100%{transform:translate(0,0);}50%{transform:translate(14px,-20px);} }
@keyframes orb-drift2 { 0%,100%{transform:translate(0,0);}50%{transform:translate(-16px,18px);} }
@keyframes orb-drift3 { 0%,100%{transform:translate(0,0);}50%{transform:translate(10px,-14px);} }

/* ── Header ── */
.promo-header {
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  background: rgba(26, 28, 58, 0.75);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  flex-shrink: 0;
}
.promo-back-btn {
  width: 34px; height: 34px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.14);
  border-radius: 10px;
  color: rgba(255,255,255,0.8);
  cursor: pointer;
  flex-shrink: 0;
  transition: opacity 0.15s;
}
.promo-back-btn:active { opacity: 0.6; }

/* Top tabs scrollable */
.promo-top-tabs {
  display: flex;
  gap: 4px;
  overflow-x: auto;
  flex: 1;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  padding-right: 4px;
}
.promo-top-tabs::-webkit-scrollbar { display: none; }

.promo-top-tab {
  flex-shrink: 0;
  padding: 6px 14px;
  border-radius: 99px;
  font-size: 11.5px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.45);
  transition: all 0.18s;
  letter-spacing: 0.01em;
}
.promo-top-tab--active {
  background: rgba(34,197,94,0.18);
  border-color: rgba(34,197,94,0.5);
  color: #4ade80;
  box-shadow: 0 0 12px rgba(34,197,94,0.2);
}
.promo-top-tab:active { opacity: 0.7; }

/* ── Body layout ── */
.promo-body {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  position: relative;
  z-index: 1;
}

/* ── Left Sidebar ── */
.promo-sidebar {
  width: 72px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 6px;
  background: rgba(255,255,255,0.03);
  border-right: 1px solid rgba(255,255,255,0.06);
  overflow-y: auto;
  scrollbar-width: none;
}
.promo-sidebar::-webkit-scrollbar { display: none; }

.promo-cat-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  padding: 10px 4px;
  border-radius: 12px;
  cursor: pointer;
  border: 1px solid transparent;
  background: transparent;
  color: rgba(255,255,255,0.35);
  transition: all 0.18s;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  width: 100%;
}
.promo-cat-btn--active {
  background: rgba(34,197,94,0.14);
  border-color: rgba(34,197,94,0.4);
  color: #4ade80;
  box-shadow: 0 0 10px rgba(34,197,94,0.15);
}
.promo-cat-btn:active { opacity: 0.65; }
.promo-cat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  border-radius: 10px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  transition: background 0.18s, border-color 0.18s;
}
.promo-cat-btn--active .promo-cat-icon {
  background: rgba(34,197,94,0.12);
  border-color: rgba(34,197,94,0.3);
}
.promo-cat-label {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-align: center;
  line-height: 1.2;
  color: inherit;
}

/* ── Cards Area ── */
.promo-cards-area {
  flex: 1;
  min-width: 0;
  overflow-y: auto;
  padding: 10px 10px 96px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}
.promo-cards-area::-webkit-scrollbar { width: 2px; }
.promo-cards-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }

/* ── Promo Card ── */
.promo-card {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  height: 110px;
  flex-shrink: 0;
  cursor: pointer;
  transition: transform 0.15s, box-shadow 0.15s;
  -webkit-tap-highlight-color: transparent;
}
.promo-card:active { transform: scale(0.97); }

/* Glass base */
.promo-card-glass {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(255,255,255,0.12) 0%,
    rgba(255,255,255,0.06) 40%,
    rgba(59,130,246,0.15) 100%
  );
  backdrop-filter: blur(16px) saturate(180%);
  -webkit-backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(255,255,255,0.18);
  border-radius: 16px;
}

/* Shimmer sweep */
.promo-card-shimmer {
  position: absolute;
  inset: 0;
  border-radius: 16px;
  background: linear-gradient(
    110deg,
    transparent 25%,
    rgba(255,255,255,0.07) 50%,
    transparent 75%
  );
  background-size: 200% 100%;
  animation: shimmer-sweep 3.5s ease-in-out infinite;
  pointer-events: none;
}
@keyframes shimmer-sweep {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Inner content */
.promo-card-inner {
  position: relative;
  z-index: 2;
  padding: 12px 100px 12px 13px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

/* Brand row */
.promo-card-brand {
  display: flex;
  align-items: center;
  gap: 6px;
}
.promo-brand-logo {
  height: 18px;
  width: auto;
  object-fit: contain;
  filter: brightness(1.1);
}
.promo-brand-dots {
  display: flex;
  gap: 3px;
  align-items: center;
}
.promo-brand-dots span {
  width: 5px; height: 5px;
  border-radius: 50%;
  display: block;
}
.promo-brand-dots span:nth-child(1) { background: #facc15; }
.promo-brand-dots span:nth-child(2) { background: #fb923c; }
.promo-brand-dots span:nth-child(3) { background: #f87171; }

/* Card text */
.promo-card-text { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 2px; }
.promo-card-title {
  font-size: 14px;
  font-weight: 900;
  color: #fff;
  line-height: 1.25;
  text-shadow: 0 1px 8px rgba(0,0,0,0.6);
  letter-spacing: 0.01em;
}
.promo-card-sub {
  font-size: 10px;
  color: rgba(255,255,255,0.72);
  font-weight: 500;
  line-height: 1.4;
}
.promo-card-amount {
  font-size: 20px;
  font-weight: 900;
  color: #fde68a;
  text-shadow: 0 0 16px rgba(253,230,138,0.6);
  letter-spacing: 0.02em;
}

/* Badge */
.promo-card-badge {
  align-self: flex-start;
  font-size: 8px;
  font-weight: 800;
  padding: 2px 7px;
  border-radius: 99px;
  background: rgba(34,197,94,0.2);
  border: 1px solid rgba(34,197,94,0.4);
  color: #4ade80;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

/* Card image area */
.promo-card-img-wrap {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100px;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.promo-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0 16px 16px 0;
}
.promo-card-img-ph {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.04);
  border-left: 1px solid rgba(255,255,255,0.08);
  border-radius: 0 16px 16px 0;
}

/* ── Empty State ── */
.promo-empty {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 20px;
}
.promo-empty-icon {
  width: 72px; height: 72px;
  border-radius: 50%;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
}
.promo-empty-text {
  font-size: 13px;
  color: rgba(255,255,255,0.3);
  font-weight: 500;
}

/* ── Desktop ── */
@media (min-width: 768px) {
  .promo-sidebar { width: 80px; }
}
</style>
