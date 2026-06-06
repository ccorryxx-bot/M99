<template>
  <div class="promo-root">
    <div class="bg-orb bg-orb--1"></div>
    <div class="bg-orb bg-orb--2"></div>

    <!-- ══ HEADER ══ -->
    <header class="promo-header">
      <button @click="$router.back()" class="promo-back-btn">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <div class="promo-top-tabs">
        <button
          v-for="tab in topTabs"
          :key="tab.key"
          class="promo-top-tab"
          :class="{ active: activeTopTab === tab.key }"
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
          :class="{ active: activeCat === cat.key }"
          @click="activeCat = cat.key"
        >
          <span class="cat-icon-wrap">
            <component :is="cat.icon" />
          </span>
          <span class="cat-label">{{ cat.label }}</span>
        </button>
      </aside>

      <!-- Cards -->
      <main class="promo-cards-area">
        <template v-if="visibleCards.length">
          <div
            v-for="card in visibleCards"
            :key="card.id"
            class="promo-card"
          >
            <img :src="card.img + '?tr=f-auto'" :alt="card.title" class="promo-card-img" />
          </div>
        </template>
        <div v-else class="promo-empty">
          <svg width="36" height="36" fill="none" stroke="rgba(255,255,255,0.18)" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
          </svg>
          <p class="promo-empty-text">ပရိုမိုးရှင်း မရှိသေးပါ</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue'

const topTabs = [
  { key: 'all',     label: 'ဖြစ်ရပ်များ' },
  { key: 'mission', label: 'တာဝန်' },
  { key: 'vvip',    label: 'VIP' },
  { key: 'reward',  label: 'ဆုလာဘ်' },
  { key: 'history', label: 'သမိုင်း' },
]
const activeTopTab = ref('all')

const GridIcon = () => h('svg', { width:15, height:15, fill:'none', stroke:'currentColor', 'stroke-width':'2', viewBox:'0 0 24 24' }, [
  h('rect',{x:3,y:3,width:7,height:7,rx:1}), h('rect',{x:14,y:3,width:7,height:7,rx:1}),
  h('rect',{x:3,y:14,width:7,height:7,rx:1}), h('rect',{x:14,y:14,width:7,height:7,rx:1}),
])
const TagIcon = () => h('svg', { width:15, height:15, fill:'none', stroke:'currentColor', 'stroke-width':'2', viewBox:'0 0 24 24' }, [
  h('path',{'stroke-linecap':'round','stroke-linejoin':'round', d:'M7 7h.01M3 5l8.586 8.586a2 2 0 002.828 0l4.172-4.172a2 2 0 000-2.828L10 3H5a2 2 0 00-2 2z'}),
])
const ClockIcon = () => h('svg', { width:15, height:15, fill:'none', stroke:'currentColor', 'stroke-width':'2', viewBox:'0 0 24 24' }, [
  h('circle',{cx:12,cy:12,r:9}), h('path',{'stroke-linecap':'round','stroke-linejoin':'round',d:'M12 7v5l3 3'}),
])
const BoltIcon = () => h('svg', { width:15, height:15, fill:'none', stroke:'currentColor', 'stroke-width':'2', viewBox:'0 0 24 24' }, [
  h('path',{'stroke-linecap':'round','stroke-linejoin':'round', d:'M13 10V3L4 14h7v7l9-11h-7z'}),
])

const sideCategories = [
  { key:'all',      label:'အားလုံး',  icon:GridIcon  },
  { key:'discount', label:'လျော့ဈေး', icon:TagIcon   },
  { key:'history',  label:'သမိုင်း',  icon:ClockIcon },
  { key:'refill',   label:'အားဖြည့်', icon:BoltIcon  },
]
const activeCat = ref('all')

const cards = ref([
  { id:1, title:'Exchange Code',    tab:'all',     cat:'all',      img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780759978456.png?updatedAt=1780760966566' },
  { id:2, title:'နေ့စဉ်ဘောနပ်',    tab:'all',     cat:'refill',   img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760107731.png?updatedAt=1780760988859' },
  { id:3, title:'ဆုကြေးငွေချပ်',   tab:'reward',  cat:'all',      img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760192895.png?updatedAt=1780761005943' },
  { id:4, title:'VVIP ဘောနပ်',     tab:'vvip',    cat:'discount', img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760302584.png?updatedAt=1780761039585' },
  { id:5, title:'တာဝန်ဆုကြေး',     tab:'mission', cat:'all',      img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760367968.png?updatedAt=1780761073668' },
  { id:6, title:'ဘောနပ်မိမိ',      tab:'reward',  cat:'all',      img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760452860.png?updatedAt=1780761090851' },
])

const visibleCards = computed(() =>
  cards.value.filter(c =>
    (activeTopTab.value === 'all' || c.tab === activeTopTab.value) &&
    (activeCat.value === 'all'   || c.cat === activeCat.value)
  )
)
</script>

<style scoped>
/* ── Root ── */
.promo-root {
  min-height: 100dvh;
  background: linear-gradient(160deg, #16183a 0%, #252870 50%, #16183a 100%);
  color: #fff;
  display: flex;
  flex-direction: column;
  overscroll-behavior: contain;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  overflow: hidden;
}

/* Orbs */
.bg-orb { position:fixed; border-radius:50%; pointer-events:none; z-index:0; }
.bg-orb--1 { width:260px;height:260px;top:-60px;left:-50px;background:radial-gradient(circle,rgba(99,102,241,0.2) 0%,transparent 70%);animation:orb1 14s ease-in-out infinite; }
.bg-orb--2 { width:300px;height:300px;bottom:60px;right:-80px;background:radial-gradient(circle,rgba(34,197,94,0.1) 0%,transparent 70%);animation:orb2 18s ease-in-out infinite; }
@keyframes orb1 { 0%,100%{transform:translate(0,0);}50%{transform:translate(12px,-18px);} }
@keyframes orb2 { 0%,100%{transform:translate(0,0);}50%{transform:translate(-14px,16px);} }

/* ── Header ── */
.promo-header {
  position: sticky; top: 0; z-index: 30;
  display: flex; align-items: center; gap: 8px;
  padding: 10px 10px 0;
  background: rgba(22,24,58,0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  flex-shrink: 0;
}
.promo-back-btn {
  width: 32px; height: 32px;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.07);
  border: none;
  border-radius: 9px;
  color: rgba(255,255,255,0.75);
  cursor: pointer; flex-shrink: 0;
  transition: opacity 0.15s;
}
.promo-back-btn:active { opacity: 0.55; }

/* Top tabs */
.promo-top-tabs {
  display: flex; gap: 0;
  overflow-x: auto; flex: 1;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}
.promo-top-tabs::-webkit-scrollbar { display: none; }

.promo-top-tab {
  flex-shrink: 0;
  padding: 10px 14px 9px;
  font-size: 12px; font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  background: none; border: none;
  color: rgba(255,255,255,0.38);
  border-bottom: 2px solid transparent;
  transition: color 0.18s, border-color 0.18s;
  letter-spacing: 0.01em;
}
.promo-top-tab.active {
  color: #4ade80;
  border-bottom-color: #4ade80;
  font-weight: 700;
}
.promo-top-tab:active { opacity: 0.65; }

/* ── Body ── */
.promo-body {
  display: flex; flex: 1; min-height: 0;
  position: relative; z-index: 1;
  overflow: hidden;
}

/* ── Left Sidebar ── */
.promo-sidebar {
  width: 76px; flex-shrink: 0;
  display: flex; flex-direction: column;
  gap: 6px; padding: 12px 6px;
  background: rgba(0,0,0,0.18);
  border-right: 1px solid rgba(255,255,255,0.05);
  overflow-y: auto; scrollbar-width: none;
}
.promo-sidebar::-webkit-scrollbar { display: none; }

.promo-cat-btn {
  display: flex; flex-direction: column;
  align-items: center; gap: 5px;
  padding: 10px 6px;
  border-radius: 12px;
  cursor: pointer; border: none;
  background: transparent;
  color: rgba(255,255,255,0.38);
  transition: all 0.18s;
  -webkit-tap-highlight-color: transparent;
  user-select: none; width: 100%;
}
.promo-cat-btn.active {
  background: #14b8a6;
  color: #fff;
  box-shadow: 0 4px 14px rgba(20,184,166,0.4);
}
.promo-cat-btn:active { opacity: 0.65; }

.cat-icon-wrap {
  display: flex; align-items: center; justify-content: center;
  width: 34px; height: 34px;
  border-radius: 10px;
  background: rgba(255,255,255,0.07);
  transition: background 0.18s;
}
.promo-cat-btn.active .cat-icon-wrap {
  background: rgba(255,255,255,0.18);
}
.cat-label {
  font-size: 9px; font-weight: 700;
  text-align: center; line-height: 1.2;
  letter-spacing: 0.01em;
}

/* ── Cards Area ── */
.promo-cards-area {
  flex: 1; min-width: 0;
  overflow-y: auto;
  padding: 10px 10px 96px;
  display: flex; flex-direction: column; gap: 10px;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
}
.promo-cards-area::-webkit-scrollbar { width: 2px; }
.promo-cards-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius:10px; }

/* ── Promo Card ── */
.promo-card {
  border-radius: 14px;
  overflow: hidden;
  flex-shrink: 0;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0,0,0,0.45), 0 0 0 1px rgba(255,255,255,0.08);
  transition: transform 0.14s, box-shadow 0.14s;
  -webkit-tap-highlight-color: transparent;
  background: rgba(255,255,255,0.05);
}
.promo-card:active {
  transform: scale(0.97);
  box-shadow: 0 2px 10px rgba(0,0,0,0.4);
}
.promo-card-img {
  width: 100%;
  display: block;
  border-radius: 14px;
  object-fit: cover;
}

/* ── Empty ── */
.promo-empty {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 12px; padding: 60px 0;
}
.promo-empty-text {
  font-size: 12px; color: rgba(255,255,255,0.25); font-weight: 500;
}

/* Desktop */
@media (min-width: 768px) {
  .promo-sidebar { width: 84px; }
}
</style>
