<template>
  <div class="promo-root">
    <div class="bg-orb bg-orb--1"></div>
    <div class="bg-orb bg-orb--2"></div>

    <!-- HEADER -->
    <header class="promo-header">
      <button @click="$router.back()" class="promo-back-btn">
        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>
      <div class="promo-top-tabs">
        <button
          v-for="tab in topTabs" :key="tab.key"
          class="promo-top-tab" :class="{ active: activeTopTab === tab.key }"
          @click="activeTopTab = tab.key"
        >{{ tab.label }}</button>
      </div>
    </header>

    <!-- BODY -->
    <div class="promo-body">

      <!-- Left Sidebar -->
      <aside class="promo-sidebar">
        <button
          v-for="cat in sideCategories" :key="cat.key"
          class="promo-cat-btn" :class="{ active: activeCat === cat.key }"
          @click="activeCat = cat.key"
          :title="cat.label"
        >
          <svg v-if="cat.key === 'all'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
            <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
          </svg>
          <svg v-if="cat.key === 'discount'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/>
            <line x1="7" y1="7" x2="7.01" y2="7"/>
          </svg>
          <svg v-if="cat.key === 'history'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="12 8 12 12 14.5 14.5"/>
            <path d="M3.05 11a9 9 0 1 0 .5-4H1"/><polyline points="1 2 1 7 6 7"/>
          </svg>
          <svg v-if="cat.key === 'refill'" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
          </svg>
          <span class="cat-label">{{ cat.label }}</span>
        </button>
      </aside>

      <!-- Cards -->
      <main class="promo-cards-area">
        <!-- ဖြစ်ရပ်များ tab → show all 6 images, scroll through -->
        <template v-if="activeTopTab === 'events'">
          <div v-for="card in allCards" :key="card.id" class="promo-card">
            <img :src="card.img" :alt="card.title" class="promo-card-img" loading="lazy" />
          </div>
        </template>

        <!-- Other tabs → empty for now -->
        <div v-else class="promo-empty">
          <svg width="38" height="38" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
          </svg>
          <p class="promo-empty-text">မကြာမီ ဆောင်ရွက်ပေးမည်</p>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const topTabs = [
  { key: 'events',  label: 'ဖြစ်ရပ်များ' },
  { key: 'mission', label: 'တာဝန်' },
  { key: 'vvip',    label: 'VIP' },
  { key: 'reward',  label: 'ဆုလာဘ်' },
  { key: 'history', label: 'သမိုင်း' },
]
const activeTopTab = ref('events')

const sideCategories = [
  { key: 'all',      label: 'အားလုံး'  },
  { key: 'discount', label: 'လျော့ဈေး' },
  { key: 'history',  label: 'သမိုင်း'  },
  { key: 'refill',   label: 'အားဖြည့်' },
]
const activeCat = ref('all')

// All 6 images — always shown together under ဖြစ်ရပ်များ tab
const allCards = ref([
  { id:1, title:'Exchange Code',   img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780759978456.png?updatedAt=1780760966566&tr=f-auto' },
  { id:2, title:'နေ့စဉ်ဘောနပ်',  img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760107731.png?updatedAt=1780760988859&tr=f-auto' },
  { id:3, title:'ဆုကြေးငွေချပ်', img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760192895.png?updatedAt=1780761005943&tr=f-auto' },
  { id:4, title:'VVIP ဘောနပ်',    img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760302584.png?updatedAt=1780761039585&tr=f-auto' },
  { id:5, title:'တာဝန်ဆုကြေး',   img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760367968.png?updatedAt=1780761073668&tr=f-auto' },
  { id:6, title:'ဘောနပ်မိမိ',    img:'https://ik.imagekit.io/rbok01qam/Promotion%20page%20imags/1780760452860.png?updatedAt=1780761090851&tr=f-auto' },
])
</script>

<style scoped>
.promo-root {
  min-height: 100dvh;
  background: linear-gradient(160deg, #16183a 0%, #252870 50%, #16183a 100%);
  color: #fff;
  display: flex; flex-direction: column;
  overscroll-behavior: contain;
  -webkit-tap-highlight-color: transparent;
  position: relative; overflow: hidden;
}
.bg-orb { position:fixed; border-radius:50%; pointer-events:none; z-index:0; }
.bg-orb--1 { width:240px;height:240px;top:-50px;left:-50px;background:radial-gradient(circle,rgba(99,102,241,0.2) 0%,transparent 70%);animation:orb1 14s ease-in-out infinite; }
.bg-orb--2 { width:280px;height:280px;bottom:50px;right:-80px;background:radial-gradient(circle,rgba(34,197,94,0.1) 0%,transparent 70%);animation:orb2 18s ease-in-out infinite; }
@keyframes orb1 { 0%,100%{transform:translate(0,0);}50%{transform:translate(12px,-18px);} }
@keyframes orb2 { 0%,100%{transform:translate(0,0);}50%{transform:translate(-14px,16px);} }

/* Header */
.promo-header {
  position: sticky; top: 0; z-index: 30;
  display: flex; align-items: stretch; gap: 6px;
  padding: 10px 10px 0;
  background: rgba(22,24,58,0.88);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.07);
  flex-shrink: 0;
}
.promo-back-btn {
  width: 32px; height: 32px; align-self: center;
  display: flex; align-items: center; justify-content: center;
  background: rgba(255,255,255,0.07); border: none;
  border-radius: 9px; color: rgba(255,255,255,0.7);
  cursor: pointer; flex-shrink: 0; transition: opacity 0.15s;
}
.promo-back-btn:active { opacity: 0.5; }
.promo-top-tabs {
  display: flex; overflow-x: auto; flex: 1;
  scrollbar-width: none; -webkit-overflow-scrolling: touch;
}
.promo-top-tabs::-webkit-scrollbar { display: none; }
.promo-top-tab {
  flex-shrink: 0; padding: 10px 13px 9px;
  font-size: 12px; font-weight: 600; white-space: nowrap;
  cursor: pointer; background: none; border: none;
  color: rgba(255,255,255,0.35);
  border-bottom: 2px solid transparent;
  transition: color 0.18s, border-color 0.18s;
}
.promo-top-tab.active { color: #4ade80; border-bottom-color: #4ade80; font-weight: 700; }
.promo-top-tab:active { opacity: 0.6; }

/* Body */
.promo-body {
  display: flex; flex: 1; min-height: 0;
  position: relative; z-index: 1; overflow: hidden;
}

/* Sidebar */
.promo-sidebar {
  width: 58px; flex-shrink: 0;
  display: flex; flex-direction: column;
  gap: 0; padding: 8px 4px;
  background: rgba(0,0,0,0.22);
  border-right: 1px solid rgba(255,255,255,0.05);
  overflow-y: auto; scrollbar-width: none;
}
.promo-sidebar::-webkit-scrollbar { display: none; }
.promo-cat-btn {
  display: flex; flex-direction: column;
  align-items: center; gap: 3px;
  padding: 9px 2px;
  border-radius: 10px; cursor: pointer; border: none;
  background: transparent; color: rgba(255,255,255,0.32);
  transition: all 0.16s;
  -webkit-tap-highlight-color: transparent;
  user-select: none; width: 100%;
}
.promo-cat-btn.active {
  background: #0d9488; color: #fff;
  box-shadow: 0 3px 12px rgba(13,148,136,0.45);
}
.promo-cat-btn:not(.active):active { background: rgba(255,255,255,0.06); }
.cat-label {
  font-size: 8px; font-weight: 700;
  text-align: center; line-height: 1.2; white-space: nowrap;
}

/* Cards */
.promo-cards-area {
  flex: 1; min-width: 0; overflow-y: auto;
  padding: 10px 8px 96px;
  display: flex; flex-direction: column; gap: 9px;
  -webkit-overflow-scrolling: touch; overscroll-behavior: contain;
}
.promo-cards-area::-webkit-scrollbar { width: 2px; }
.promo-cards-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.07); border-radius:10px; }
.promo-card {
  border-radius: 14px; overflow: hidden; flex-shrink: 0; cursor: pointer;
  box-shadow: 0 4px 18px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.07);
  transition: transform 0.13s; -webkit-tap-highlight-color: transparent;
  background: rgba(255,255,255,0.04);
}
.promo-card:active { transform: scale(0.975); }
.promo-card-img { width:100%; display:block; border-radius:14px; object-fit:cover; }

/* Empty */
.promo-empty {
  flex:1; display:flex; flex-direction:column;
  align-items:center; justify-content:center; gap:12px; padding:60px 0;
}
.promo-empty-text { font-size:12px; color:rgba(255,255,255,0.25); font-weight:500; }

@media (min-width: 768px) { .promo-sidebar { width: 66px; } }
</style>
