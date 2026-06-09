<template>
  <Teleport to="body">
    <Transition name="pgp-slide">
      <div v-if="visible" class="pgp-root">

        <!-- ── Header ── -->
        <div class="pgp-header">
          <button class="pgp-back" @click="close">
            <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
          <div class="pgp-brand">
            <img :src="currentProv.logo" class="pgp-brand-img" :alt="currentProv.short"
              @error="e=>{e.target.style.display='none';e.target.nextSibling.style.display='flex'}"/>
            <span class="pgp-brand-fallback" style="display:none">{{ currentProv.short }}</span>
          </div>
          <!-- ── Provider Picker Trigger ── -->
          <button class="pgp-picker-btn" @click="showProvPicker=!showProvPicker">
            <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" style="margin-bottom:1px;">
              <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
              <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
            </svg>
            <span>ရွေးချယ်ပါ</span>
          </button>
          <button class="pgp-srch-toggle" @click="toggleSearch">
            <svg v-if="!searchOpen" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.2" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="m21 21-4.35-4.35"/>
            </svg>
            <svg v-else width="17" height="17" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- ── Provider Picker Overlay ── -->
        <Transition name="pgp-picker-anim">
          <div v-if="showProvPicker" class="pgp-picker-overlay" @click.self="showProvPicker=false">
            <div class="pgp-picker-sheet">

              <!-- Row 1: Providers (4 cards) — vertical -->
              <div class="pgp-ps-section-label">PROVIDER</div>
              <div class="pgp-ps-grid4">
                <button v-for="p in sidebarProvs" :key="p.key"
                  :class="['pgp-ps-card', 'pgp-ps-card--prov', activeSideProv===p.key && 'pgp-ps-card--on']"
                  @click="pickProvider(p.key)">
                  <img :src="p.logo" :alt="p.short" class="pgp-ps-prov-logo"
                    @error="e=>e.target.style.display='none'" loading="lazy"/>
                  <span class="pgp-ps-name">{{ p.short }}</span>
                  <span class="pgp-ps-count">{{ games.filter(g=>g.provider_code===p.key).length }}</span>
                </button>
              </div>

              <div class="pgp-ps-divider"></div>

              <!-- Row 2: Categories (4 cards) — horizontal icon+label -->
              <div class="pgp-ps-section-label">အမျိုးအစား</div>
              <div class="pgp-ps-grid4">
                <button v-for="c in pickerCats" :key="c.key"
                  class="pgp-ps-card pgp-ps-card--cat"
                  @click="pickCategory(c.key)">
                  <!-- Hot: fire SVG -->
                  <template v-if="c.key==='hot'">
                    <svg class="pgp-ps-cat-icon" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="fg1" x1="10" y1="22" x2="10" y2="0" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stop-color="#ef4444"/>
                          <stop offset="55%" stop-color="#f97316"/>
                          <stop offset="100%" stop-color="#fbbf24"/>
                        </linearGradient>
                      </defs>
                      <path d="M10 0.5C10 0.5 7.5 5 7.5 9C7.5 9 5.5 7 5.5 5C5.5 5 2.5 8.5 2.5 12.5C2.5 17 6 21 10 21C14 21 17.5 17 17.5 12.5C17.5 9.5 15.5 7 13.5 5C13.5 7 12.5 9 10.5 10C10.5 10 11 5.5 10 0.5Z" fill="url(#fg1)"/>
                      <path d="M10 13C10 13 8.5 12.2 8.5 10.5C8.5 10.5 7.5 11.5 7.5 13C7.5 14.4 8.6 15.5 10 15.5C11.4 15.5 12.5 14.4 12.5 13C12.5 11.5 11 10.5 11 10.5C11 12 10 13 10 13Z" fill="#fef08a"/>
                    </svg>
                  </template>
                  <!-- Others: image with fallback -->
                  <template v-else>
                    <div class="pgp-ps-cat-icon pgp-ps-cat-icon--img">
                      <img :src="c.img" :alt="c.label" class="pgp-ps-cat-img"
                        @error="e=>e.target.style.display='none'" loading="lazy"/>
                    </div>
                  </template>
                  <span class="pgp-ps-cat-label">{{ c.label }}</span>
                </button>
              </div>

              <div class="pgp-ps-divider"></div>

              <!-- Row 3: Filters (2 wide cards) — horizontal icon+label -->
              <div class="pgp-ps-grid2">
                <button v-for="f in pickerFilters" :key="f.id"
                  :class="['pgp-ps-card', 'pgp-ps-card--filter', activeTab===f.id && 'pgp-ps-card--on']"
                  @click="pickFilter(f.id)">
                  <!-- Star SVG for popular -->
                  <template v-if="f.id==='popular'">
                    <svg class="pgp-ps-filter-icon" viewBox="0 0 20 20" fill="none">
                      <path d="M10 2l2.39 4.84L18 7.64l-4 3.9.94 5.5L10 14.4l-4.94 2.64.94-5.5-4-3.9 5.61-.8L10 2z" fill="#f5c842" stroke="#f5c842" stroke-width="0.5" stroke-linejoin="round"/>
                    </svg>
                  </template>
                  <!-- Grid SVG for all -->
                  <template v-else>
                    <svg class="pgp-ps-filter-icon" viewBox="0 0 20 20" fill="none" stroke="rgba(255,255,255,0.75)" stroke-width="1.6">
                      <rect x="2" y="2" width="7" height="7" rx="1.5"/><rect x="11" y="2" width="7" height="7" rx="1.5"/>
                      <rect x="2" y="11" width="7" height="7" rx="1.5"/><rect x="11" y="11" width="7" height="7" rx="1.5"/>
                    </svg>
                  </template>
                  <span class="pgp-ps-filter-label">{{ f.label }}</span>
                </button>
              </div>

            </div>
          </div>
        </Transition>

        <!-- ── Search ── -->
        <Transition name="pgp-srch-anim">
          <div v-if="searchOpen" class="pgp-srch-wrap">
            <svg width="13" height="13" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2" viewBox="0 0 24 24" class="pgp-srch-icon">
              <circle cx="11" cy="11" r="7"/><path stroke-linecap="round" d="m21 21-4.35-4.35"/>
            </svg>
            <input ref="searchInputRef" v-model="searchQ" class="pgp-srch-input" placeholder="ဂိမ်းရှာပါ..."/>
          </div>
        </Transition>

        <!-- ── Filter Tabs ── -->
        <div class="pgp-tabs-wrap">
          <button v-for="tab in filterTabs" :key="tab.id"
            :class="['pgp-tab', activeTab===tab.id&&'pgp-tab--on']"
            @click="setTab(tab.id)">
            {{ tab.label }}
          </button>
        </div>

        <!-- ── Body ── -->
        <div class="pgp-body">

          <!-- Left Sidebar -->
          <div class="pgp-sidebar">
            <button v-for="prov in sidebarProvs" :key="prov.key"
              :class="['pgp-sid', activeSideProv===prov.key&&'pgp-sid--on']"
              @click="setSideProv(prov.key)">
              <img :src="prov.logo" class="pgp-sid-img" :alt="prov.short"
                @error="e=>e.target.style.display='none'" loading="lazy"/>
              <span class="pgp-sid-label">{{ prov.short }}</span>
            </button>
          </div>

          <!-- Main Content -->
          <div class="pgp-main" ref="mainRef">

            <!-- Empty -->
            <div v-if="pagedGames.length===0" class="pgp-empty">
              <svg width="48" height="48" fill="none" viewBox="0 0 48 48" style="opacity:0.25;margin-bottom:10px;">
                <rect x="6" y="10" width="36" height="30" rx="5" stroke="white" stroke-width="2"/>
                <path d="M16 20h16M16 27h10" stroke="white" stroke-width="2" stroke-linecap="round"/>
              </svg>
              <p>ဂိမ်းမတွေ့ပါ</p>
            </div>

            <!-- Grid -->
            <div v-else class="pgp-grid">
              <div v-for="game in pagedGames" :key="game.id"
                class="pgp-card" @click="handleGame(game)">
                <div class="pgp-card-img-wrap">
                  <img :src="game.image_url" class="pgp-card-img" :alt="game.game_name"
                    @error="e=>e.target.style.display='none'" loading="lazy"/>
                  <div class="pgp-card-grad"></div>
                  <span class="pgp-card-badge">{{ game.provider_code?.toUpperCase() }}</span>
                  <button class="pgp-card-fav" :class="favs.has(game.id)&&'pgp-card-fav--on'"
                    @click.stop="toggleFav(game.id)">
                    <svg width="10" height="10" viewBox="0 0 24 24" :fill="favs.has(game.id)?'currentColor':'none'" stroke="currentColor" stroke-width="2">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                  </button>
                  <div class="pgp-card-name">{{ game.game_name }}</div>
                </div>
              </div>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages>1" class="pgp-pager">
              <button class="pgp-pg" @click="goPage(currentPage-1)" :disabled="currentPage===1">‹</button>
              <template v-for="p in pageNums" :key="p">
                <button v-if="p!=='...'" class="pgp-pg" :class="currentPage===p&&'pgp-pg--on'" @click="goPage(p)">{{ p }}</button>
                <span v-else class="pgp-pg-dot">…</span>
              </template>
              <button class="pgp-pg" @click="goPage(currentPage+1)" :disabled="currentPage===totalPages">›</button>
            </div>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  modelValue: Boolean,
  initialProvider: { type: String, default: 'jili' },
  games: { type: Array, default: () => [] }
})
const emit = defineEmits(['update:modelValue', 'open-game', 'open-category'])

const PER_PAGE = 36
const FAV_KEY    = 'iw99_favs'
const RECENT_KEY = 'iw99_recent'

const visible        = ref(false)
const searchOpen     = ref(false)
const searchQ        = ref('')
const searchInputRef = ref(null)
const activeTab      = ref('all')
const activeSideProv = ref(props.initialProvider)
const currentPage    = ref(1)
const mainRef        = ref(null)
const showProvPicker = ref(false)

// ── Favourites ──
const favs = ref(new Set(JSON.parse(localStorage.getItem(FAV_KEY) || '[]')))
function toggleFav(id) {
  const s = new Set(favs.value)
  s.has(id) ? s.delete(id) : s.add(id)
  favs.value = s
  localStorage.setItem(FAV_KEY, JSON.stringify([...s]))
}

// ── Recent ──
function addRecent(id) {
  let list = JSON.parse(localStorage.getItem(RECENT_KEY) || '[]')
  list = [id, ...list.filter(x => x !== id)].slice(0, 72)
  localStorage.setItem(RECENT_KEY, JSON.stringify(list))
}
function getRecentIds() {
  return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]')
}

// ── Providers ──
const sidebarProvs = [
  { key:'pp',   logo:'https://ik.imagekit.io/tdpebgueq/Home%20Page%20_icons_linces%20logo/a04d3bed-f475-42eb-9f35-4f9802068315.png?tr=f-auto', short:'PP' },
  { key:'jili', logo:'https://ik.imagekit.io/tdpebgueq/Home%20Page%20_icons_linces%20logo/40_N_JILI_LOGO.avif', short:'JILI' },
  { key:'jdb',  logo:'https://ik.imagekit.io/tdpebgueq/Home%20Page%20_icons_linces%20logo/f519ade7-dd80-4235-a650-3d8744d5795c.png?tr=f-auto', short:'JDB' },
  { key:'pg',   logo:'https://ik.imagekit.io/tdpebgueq/Home%20Page%20_icons_linces%20logo/3b38cced-f446-4727-ab37-879557be37cb.png?tr=f-auto', short:'PG' },
]
const currentProv = computed(() => sidebarProvs.find(p => p.key === activeSideProv.value) || sidebarProvs[1])

// ── Picker Categories ──
const pickerCats = [
  { key:'hot',     img: null, label:'Hot' },
  { key:'arcade',  img: 'https://ik.imagekit.io/rbok01qam/Cactheory%20imag/6852101165dd4643a1ec3adee41f5913.jpg?tr=f-auto', label:'Arcade' },
  { key:'live',    img: 'https://ik.imagekit.io/tdpebgueq/Provider%20label%20icons%20/Screenshot_2026-06-04-01-03-25-338_mark.via.gp_1780511848574edit.jpg?tr=f-auto', label:'Live Casino' },
  { key:'fishing', img: 'https://ik.imagekit.io/tdpebgueq/Provider%20label%20icons%20/Screenshot_2026-06-04-01-02-57-533_mark.via.gp_1780511863896edit.jpg?tr=f-auto', label:'ငါးဖမ်း' },
]

// ── Picker Filters ──
const pickerFilters = [
  { id:'popular', label:'လူကြိုက်များ' },
  { id:'all',     label:'အားလုံး' },
]

// ── Tabs ──
const filterTabs = [
  { id:'all',     label:'အားလုံး' },
  { id:'popular', label:'နာမည်ကြီး' },
  { id:'recent',  label:'မကြာသေးမီက' },
  { id:'fav',     label:'စုဆောင်းထားသော' },
]

// ── Watchers ──
watch(() => props.modelValue, val => {
  visible.value = val
  if (val) {
    activeSideProv.value = props.initialProvider || 'jili'
    activeTab.value  = 'all'
    searchQ.value    = ''
    searchOpen.value = false
    currentPage.value = 1
    nextTick(() => mainRef.value?.scrollTo(0, 0))
  }
})

watch(searchQ, () => { currentPage.value = 1 })

// ── Actions ──
function close() { emit('update:modelValue', false) }
function setTab(id) { activeTab.value = id; currentPage.value = 1; mainRef.value?.scrollTo(0, 0) }
function setSideProv(key) { activeSideProv.value = key; activeTab.value = 'all'; searchQ.value = ''; currentPage.value = 1; mainRef.value?.scrollTo(0, 0) }
function pickProvider(key) { setSideProv(key); showProvPicker.value = false }
function pickCategory(key) { showProvPicker.value = false; emit('open-category', key) }
function pickFilter(id) { setTab(id); showProvPicker.value = false }
function goPage(p) {
  const t = totalPages.value
  currentPage.value = Math.max(1, Math.min(t, p))
  nextTick(() => mainRef.value?.scrollTo({ top: 0, behavior: 'smooth' }))
}
function toggleSearch() {
  searchOpen.value = !searchOpen.value
  if (searchOpen.value) nextTick(() => searchInputRef.value?.focus())
  else { searchQ.value = ''; currentPage.value = 1 }
}

function handleGame(game) {
  addRecent(game.id)
  emit('open-game', game)
}

// ── Filtered Games ──
const filteredGames = computed(() => {
  let g = props.games.filter(x => x.provider_code === activeSideProv.value)

  if (activeTab.value === 'popular') {
    g = [...g].sort((a, b) => (b.play_count || 0) - (a.play_count || 0))
  } else if (activeTab.value === 'recent') {
    const ids = getRecentIds()
    const map = new Map(props.games.map(x => [x.id, x]))
    g = ids.map(id => map.get(id)).filter(x => x && x.provider_code === activeSideProv.value)
  } else if (activeTab.value === 'fav') {
    g = g.filter(x => favs.value.has(x.id))
  }

  if (searchQ.value.trim()) {
    const q = searchQ.value.trim().toLowerCase()
    g = g.filter(x => x.game_name?.toLowerCase().includes(q))
  }
  return g
})

const totalPages  = computed(() => Math.max(1, Math.ceil(filteredGames.value.length / PER_PAGE)))
const pagedGames  = computed(() => {
  const s = (currentPage.value - 1) * PER_PAGE
  return filteredGames.value.slice(s, s + PER_PAGE)
})

const pageNums = computed(() => {
  const total = totalPages.value, cur = currentPage.value
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = []
  if (cur > 3) { pages.push(1); if (cur > 4) pages.push('...') }
  for (let i = Math.max(1, cur - 1); i <= Math.min(total, cur + 1); i++) pages.push(i)
  if (cur < total - 2) { if (cur < total - 3) pages.push('...'); pages.push(total) }
  return pages
})
</script>

<style scoped>
/* ── Root ── */
.pgp-root {
  position: fixed; inset: 0; z-index: 1200;
  background: #07091b;
  display: flex; flex-direction: column;
  overflow: hidden;
}

/* ── Slide transition ── */
.pgp-slide-enter-active { animation: pgp-in 0.28s cubic-bezier(0.22,1,0.36,1); }
.pgp-slide-leave-active { animation: pgp-in 0.2s cubic-bezier(0.55,0,1,0.45) reverse; }
@keyframes pgp-in { from { transform: translateX(100%); } to { transform: translateX(0); } }

/* ── Header ── */
.pgp-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 12px 14px 10px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  flex-shrink: 0; background: #0e1032;
  padding-top: calc(12px + env(safe-area-inset-top, 0px));
}
.pgp-back {
  width: 34px; height: 34px; border-radius: 10px; border: none;
  background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.85);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0; -webkit-tap-highlight-color: transparent;
}
.pgp-back:active { opacity: 0.6; }
.pgp-brand {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 6px;
  height: 34px;
}
.pgp-brand-img { height: 28px; width: auto; max-width: 120px; object-fit: contain; filter: brightness(1.1); }
.pgp-brand-fallback {
  font-size: 15px; font-weight: 800; color: #fff; letter-spacing: 0.04em;
  display: flex; align-items: center;
}
.pgp-srch-toggle {
  width: 34px; height: 34px; border-radius: 10px; border: none;
  background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.8);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; flex-shrink: 0; -webkit-tap-highlight-color: transparent;
}
.pgp-srch-toggle:active { opacity: 0.6; }

/* ── Provider Picker Button ── */
.pgp-picker-btn {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 2px; padding: 4px 8px; border-radius: 10px; border: 1px solid rgba(245,200,66,0.35);
  background: rgba(245,200,66,0.1); color: rgba(245,200,66,0.9);
  cursor: pointer; flex-shrink: 0; -webkit-tap-highlight-color: transparent;
  font-size: 9px; font-weight: 800; letter-spacing: 0.02em; height: 34px;
  min-width: 58px; transition: background 0.15s;
}
.pgp-picker-btn:active { background: rgba(245,200,66,0.2); }

/* ── Provider Picker Overlay ── */
.pgp-picker-overlay {
  position: absolute; inset: 0; z-index: 50;
  background: rgba(8,6,26,0.78);
  display: flex; flex-direction: column; align-items: stretch;
}
.pgp-picker-sheet {
  background: #0a0c22;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  padding: 12px 10px 14px;
  margin-top: calc(57px + env(safe-area-inset-top, 0px));
  border-radius: 0 0 18px 18px;
  box-shadow: 0 6px 28px rgba(0,0,0,0.6);
}

/* Section label */
.pgp-ps-section-label {
  font-size: 8.5px; font-weight: 800; color: rgba(255,255,255,0.32);
  text-transform: uppercase; letter-spacing: 0.12em; margin-bottom: 6px;
}

/* 4-column grid */
.pgp-ps-grid4 {
  display: grid; grid-template-columns: repeat(4,1fr); gap: 5px;
  margin-bottom: 2px;
}

/* 2-column grid */
.pgp-ps-grid2 {
  display: grid; grid-template-columns: repeat(2,1fr); gap: 5px;
}

/* Base card — solid layered, NO glass */
.pgp-ps-card {
  display: flex; align-items: center; justify-content: center;
  border-radius: 10px;
  background: #1c2060;
  border: 1.5px solid rgba(255,255,255,0.09);
  cursor: pointer; -webkit-tap-highlight-color: transparent;
  transition: all 0.14s;
}
.pgp-ps-card:active { transform: scale(0.93); }

/* Active state */
.pgp-ps-card--on {
  background: rgba(245,200,66,0.14);
  border-color: rgba(245,200,66,0.7);
  box-shadow: inset 0 0 0 1px rgba(245,200,66,0.2);
}

/* ── Provider card (vertical) ── */
.pgp-ps-card--prov {
  flex-direction: column; gap: 3px;
  padding: 7px 3px 6px; min-height: 54px;
}
.pgp-ps-prov-logo {
  height: 18px; width: auto; max-width: 52px; object-fit: contain;
}
.pgp-ps-name {
  font-size: 9px; font-weight: 800; color: rgba(255,255,255,0.8);
  letter-spacing: 0.03em; text-align: center; line-height: 1;
}
.pgp-ps-card--on .pgp-ps-name { color: #f5c842; }
.pgp-ps-count {
  font-size: 7.5px; font-weight: 600; color: rgba(255,255,255,0.32);
}
.pgp-ps-card--on .pgp-ps-count { color: rgba(245,200,66,0.6); }

/* ── Category card (vertical with larger icon) ── */
.pgp-ps-card--cat {
  flex-direction: column; gap: 4px;
  padding: 7px 3px 6px; min-height: 58px;
}
.pgp-ps-cat-icon {
  width: 26px; height: 26px; flex-shrink: 0;
}
.pgp-ps-cat-icon--img {
  border-radius: 6px; overflow: hidden;
}
.pgp-ps-cat-img {
  width: 100%; height: 100%; object-fit: cover; display: block;
}
.pgp-ps-cat-label {
  font-size: 8px; font-weight: 800; color: rgba(255,255,255,0.78);
  text-align: center; line-height: 1.2; letter-spacing: 0.02em;
}
.pgp-ps-card--cat.pgp-ps-card--on .pgp-ps-cat-label { color: #f5c842; }

/* ── Filter card (horizontal) ── */
.pgp-ps-card--filter {
  flex-direction: row; gap: 6px;
  padding: 10px 10px; min-height: 38px;
}
.pgp-ps-filter-icon {
  width: 16px; height: 16px; flex-shrink: 0;
}
.pgp-ps-filter-label {
  font-size: 10px; font-weight: 800; color: rgba(255,255,255,0.78);
  letter-spacing: 0.02em;
}
.pgp-ps-card--filter.pgp-ps-card--on .pgp-ps-filter-label { color: #f5c842; }
.pgp-ps-card--filter.pgp-ps-card--on .pgp-ps-filter-icon path { fill: #f5c842; }

/* Divider */
.pgp-ps-divider {
  height: 1px; background: rgba(255,255,255,0.06);
  margin: 9px 0 8px;
}

/* ── Picker animation ── */
.pgp-picker-anim-enter-active { transition: all 0.2s cubic-bezier(0.22,1,0.36,1); }
.pgp-picker-anim-leave-active { transition: all 0.15s ease; }
.pgp-picker-anim-enter-from, .pgp-picker-anim-leave-to { opacity: 0; transform: translateY(-10px); }

/* ── Search ── */
.pgp-srch-wrap {
  position: relative; padding: 8px 14px; flex-shrink: 0;
  background: #0e1032; border-bottom: 1px solid rgba(255,255,255,0.07);
}
.pgp-srch-icon { position: absolute; left: 26px; top: 50%; transform: translateY(-50%); pointer-events: none; }
.pgp-srch-input {
  width: 100%; box-sizing: border-box;
  padding: 9px 12px 9px 32px;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.13);
  border-radius: 10px; font-size: 13px; color: #fff; outline: none;
  caret-color: #f5c842;
}
.pgp-srch-input::placeholder { color: rgba(255,255,255,0.28); }
.pgp-srch-anim-enter-active { transition: all 0.2s ease; }
.pgp-srch-anim-leave-active { transition: all 0.15s ease; }
.pgp-srch-anim-enter-from, .pgp-srch-anim-leave-to { opacity: 0; transform: translateY(-8px); }

/* ── Tabs ── */
.pgp-tabs-wrap {
  display: flex; gap: 7px; padding: 10px 14px 9px; flex-shrink: 0;
  background: #07091b; border-bottom: 1px solid rgba(255,255,255,0.07);
  overflow-x: auto; -webkit-overflow-scrolling: touch;
}
.pgp-tabs-wrap::-webkit-scrollbar { display: none; }
.pgp-tab {
  flex-shrink: 0; padding: 6px 14px; border-radius: 8px; border: none;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.55); font-size: 11px; font-weight: 700;
  cursor: pointer; -webkit-tap-highlight-color: transparent;
  transition: all 0.15s;
}
.pgp-tab--on {
  background: rgba(245,200,66,0.15); border-color: rgba(245,200,66,0.6);
  color: #f5c842;
}
.pgp-tab:active { opacity: 0.7; }

/* ── Body ── */
.pgp-body {
  display: flex; flex: 1; overflow: hidden;
}

/* ── Sidebar ── */
.pgp-sidebar {
  width: 64px; flex-shrink: 0;
  background: #0e1032; border-right: 1px solid rgba(255,255,255,0.08);
  display: flex; flex-direction: column; gap: 6px;
  padding: 10px 6px; overflow-y: auto; -webkit-overflow-scrolling: touch;
}
.pgp-sidebar::-webkit-scrollbar { display: none; }
.pgp-sid {
  display: flex; flex-direction: column; align-items: center; gap: 4px;
  padding: 8px 4px; border-radius: 10px; border: 1.5px solid transparent;
  background: rgba(255,255,255,0.05); cursor: pointer;
  -webkit-tap-highlight-color: transparent; transition: all 0.15s;
}
.pgp-sid--on {
  background: rgba(245,200,66,0.15); border-color: rgba(245,200,66,0.55);
}
.pgp-sid:active { opacity: 0.7; }
.pgp-sid-img { width: 36px; height: 28px; object-fit: contain; display: block; }
.pgp-sid-label {
  font-size: 9px; font-weight: 800; color: rgba(255,255,255,0.55);
  letter-spacing: 0.03em; text-align: center; line-height: 1;
}
.pgp-sid--on .pgp-sid-label { color: #f5c842; }

/* ── Main ── */
.pgp-main {
  flex: 1; overflow-y: auto; -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain; padding: 10px 10px 100px;
}
.pgp-main::-webkit-scrollbar { display: none; }

/* ── Grid ── */
.pgp-grid {
  display: grid; grid-template-columns: repeat(3,1fr); gap: 7px;
}
.pgp-card {
  cursor: pointer; -webkit-tap-highlight-color: transparent;
  border-radius: 10px; overflow: hidden;
}
.pgp-card:active { opacity: 0.82; transform: scale(0.97); }
.pgp-card-img-wrap {
  position: relative; aspect-ratio: 3/4; background: #111327;
  border-radius: 10px; overflow: hidden;
}
.pgp-card-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.pgp-card-grad {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(6,8,24,0.92) 0%, rgba(6,8,24,0.25) 40%, transparent 100%);
}
.pgp-card-badge {
  position: absolute; top: 4px; left: 4px;
  font-size: 7px; font-weight: 800; color: #fff;
  background: rgba(0,0,0,0.55); padding: 2px 5px; border-radius: 4px;
  letter-spacing: 0.04em;
}
.pgp-card-fav {
  position: absolute; top: 4px; right: 4px;
  width: 20px; height: 20px; border-radius: 5px; border: none;
  background: rgba(0,0,0,0.4); color: rgba(255,255,255,0.45);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; padding: 0;
  -webkit-tap-highlight-color: transparent;
}
.pgp-card-fav--on { color: #f43f5e; background: rgba(0,0,0,0.6); }
.pgp-card-name {
  position: absolute; bottom: 0; left: 0; right: 0; z-index: 2;
  font-size: 9px; font-weight: 700; color: rgba(255,255,255,0.92);
  padding: 4px 5px 6px; text-align: center;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}

/* ── Empty ── */
.pgp-empty {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 60px 20px;
  color: rgba(255,255,255,0.3); font-size: 12px;
}

/* ── Pagination ── */
.pgp-pager {
  display: flex; justify-content: center; align-items: center; gap: 6px;
  padding: 16px 0 10px; flex-wrap: wrap;
}
.pgp-pg {
  min-width: 32px; height: 32px; padding: 0 6px; border-radius: 8px; border: none;
  background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12);
  color: rgba(255,255,255,0.65); font-size: 12px; font-weight: 700;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
  -webkit-tap-highlight-color: transparent; transition: all 0.15s;
}
.pgp-pg:disabled { opacity: 0.3; cursor: not-allowed; }
.pgp-pg:active:not(:disabled) { opacity: 0.7; }
.pgp-pg--on {
  background: #f5c842; border-color: #f5c842; color: #07091b;
}
.pgp-pg-dot {
  color: rgba(255,255,255,0.35); font-size: 12px; padding: 0 2px;
}
</style>
