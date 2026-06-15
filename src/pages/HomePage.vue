<template>
  <div class="hp-root">

    <!-- ══ HEADER ══ -->
    <header class="hp-header">
      <button class="hp-hamburger" @click="openAuth('login')">
        <svg width="18" height="14" fill="none" viewBox="0 0 18 14">
          <rect x="0" y="0" width="18" height="2.5" rx="1.25" fill="#4ade80"/>
          <rect x="0" y="5.5" width="14" height="2.5" rx="1.25" fill="#4ade80"/>
          <rect x="0" y="11" width="18" height="2.5" rx="1.25" fill="#4ade80"/>
        </svg>
      </button>
      <div class="hp-brand">
        <span class="hp-brand-arrow">⇒</span>
        <span class="hp-brand-iw">iW</span><span class="hp-brand-bet">BET</span>
        <span class="hp-brand-domain">iwbet.com</span>
      </div>
      <div class="hp-header-actions">
        <button class="hp-btn-login" @click="openAuth('login')">လောဂ်အင်</button>
        <button class="hp-btn-register" @click="openAuth('register')">မတ်ပုံတင်မယ်</button>
      </div>
    </header>

    <!-- ══ BANNER CAROUSEL ══ -->
    <div class="hp-banner-wrap">
      <div class="hp-banner-track" :style="{ transform: `translateX(${-bannerIdx * 100}%)` }">
        <div v-for="(b, i) in banners" :key="i" class="hp-banner-slide">
          <img :src="b" alt="banner" class="hp-banner-img" loading="lazy" />
        </div>
      </div>
      <div class="hp-dots">
        <span v-for="(b, i) in banners" :key="i" class="hp-dot" :class="{ active: i === bannerIdx }" @click="bannerIdx = i"></span>
      </div>
    </div>

    <!-- ══ BANNER TOOLBAR ══ -->
    <div class="hp-toolbar">
      <button class="hp-tool-btn">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.6)" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke-linecap="round"/>
        </svg>
      </button>
      <div style="flex:1"></div>
      <button class="hp-tool-btn hp-tool-mail">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.7)" stroke-width="2">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- ══ CATEGORY TABS ══ -->
    <div class="hp-cats-wrap">
      <div class="hp-cats">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="hp-cat"
          :class="{ active: activeCategory === cat.id }"
          @click="activeCategory = cat.id"
        >
          <span class="hp-cat-icon" v-html="cat.icon"></span>
          <span class="hp-cat-label">{{ cat.label }}</span>
        </button>
      </div>
    </div>

    <!-- ══ SEARCH BAR ══ -->
    <div class="hp-search-row">
      <div class="hp-search-box">
        <svg width="15" height="15" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="2" viewBox="0 0 24 24" style="flex-shrink:0;">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input v-model="searchQuery" class="hp-search-input" placeholder="ရှာပါ..." />
      </div>
      <button class="hp-fav-btn" @click="activeCategory = activeCategory === 'fav' ? 'all' : 'fav'">
        <svg width="20" height="20" viewBox="0 0 24 24" :fill="activeCategory === 'fav' ? '#fbbf24' : 'none'" :stroke="activeCategory === 'fav' ? '#fbbf24' : 'rgba(255,255,255,0.4)'" stroke-width="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </button>
    </div>

    <!-- ══ SCROLLABLE CONTENT ══ -->
    <div class="hp-scroll-area">

      <!-- HOT GAMES SECTION -->
      <div class="hp-section-hdr">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#f97316" style="flex-shrink:0;">
          <path d="M12 2C12 2 7 8 7 13a5 5 0 0010 0c0-5-5-11-5-11zm0 15a3 3 0 01-3-3c0-2.5 1.5-5 3-7 1.5 2 3 4.5 3 7a3 3 0 01-3 3z"/>
        </svg>
        <span class="hp-section-title">{{ currentCategoryLabel }}</span>
      </div>

      <!-- GAMES GRID -->
      <div class="hp-games-grid" v-if="filteredGames.length">
        <div
          v-for="game in filteredGames"
          :key="game.id"
          class="hp-game-card"
          @click="selectGame(game)"
        >
          <div class="hp-game-img-wrap">
            <img :src="game.image" :alt="game.name" class="hp-game-img" loading="lazy" />
            <button class="hp-star-btn" @click.stop="toggleFav(game.id)" :class="{ starred: favorites.has(game.id) }">
              <svg width="13" height="13" viewBox="0 0 24 24" :fill="favorites.has(game.id) ? '#fbbf24' : 'none'" :stroke="favorites.has(game.id) ? '#fbbf24' : 'rgba(255,255,255,0.6)'" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </button>
            <div class="hp-provider-badge">{{ game.provider }}</div>
          </div>
          <p class="hp-game-name">{{ game.name }}</p>
        </div>
      </div>
      <div v-else class="hp-empty">
        <svg width="40" height="40" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <p>ဂိမ်းမတွေ့ပါ</p>
      </div>

    </div>

    <!-- ══ GAME LAUNCH MODAL ══ -->
    <Transition name="modal-fade">
      <div v-if="selectedGame" class="hp-modal-overlay" @click.self="selectedGame = null">
        <div class="hp-modal">
          <button class="hp-modal-close" @click="selectedGame = null">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <img :src="selectedGame.image" :alt="selectedGame.name" class="hp-modal-img" />
          <h3 class="hp-modal-name">{{ selectedGame.name }}</h3>
          <p class="hp-modal-provider">{{ selectedGame.provider }}</p>
          <div class="hp-modal-stats">
            <div class="hp-modal-stat"><span class="sval">{{ selectedGame.rating }}★</span><span class="slbl">Rating</span></div>
            <div class="hp-modal-stat"><span class="sval">{{ selectedGame.players }}</span><span class="slbl">Players</span></div>
          </div>
          <button class="hp-modal-play" @click="requireLogin">ယခုကစားပါ</button>
        </div>
      </div>
    </Transition>

    <!-- ══ AUTH MODAL ══ -->
    <Transition name="modal-fade">
      <div v-if="showAuthModal" class="hp-modal-overlay" @click.self="showAuthModal = false">
        <div class="hp-modal hp-auth-modal">
          <button class="hp-modal-close" @click="showAuthModal = false">
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <div class="hp-auth-tabs">
            <button :class="['hp-auth-tab', authMode === 'login' ? 'active' : '']" @click="authMode = 'login'">လောဂ်အင်</button>
            <button :class="['hp-auth-tab', authMode === 'register' ? 'active' : '']" @click="authMode = 'register'">မှတ်ပုံတင်</button>
          </div>
          <div class="hp-auth-form">
            <input v-if="authMode === 'register'" v-model="authForm.username" class="hp-auth-input" type="text" placeholder="Username" />
            <input v-model="authForm.phone" class="hp-auth-input" type="text" :placeholder="authMode === 'register' ? 'ဖုန်းနံပါတ်' : 'Email / Phone'" />
            <input v-model="authForm.password" class="hp-auth-input" type="password" placeholder="Password" />
            <p v-if="authErr" class="hp-auth-err">{{ authErr }}</p>
            <button class="hp-auth-submit" @click="submitAuth" :disabled="authLoading">
              <span v-if="authLoading" class="hp-spin"></span>
              {{ authLoading ? '...' : (authMode === 'login' ? 'ဝင်ရောက်ပါ' : 'မှတ်ပုံတင်ပါ') }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ══ TOAST ══ -->
    <Transition name="toast-up">
      <div v-if="toast.show" class="hp-toast" :class="toast.type">{{ toast.msg }}</div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '@/supabase'

// ── Auth ───────────────────────────────────────────────────────────
const showAuthModal = ref(false)
const authMode = ref('login')
const authLoading = ref(false)
const authErr = ref('')
const authForm = ref({ username: '', phone: '', password: '' })

const openAuth = (mode) => {
  authMode.value = mode
  authErr.value = ''
  authForm.value = { username: '', phone: '', password: '' }
  showAuthModal.value = true
}

async function submitAuth() {
  const { phone, password, username } = authForm.value
  if (!phone || !password) { authErr.value = 'အချက်အလက်ထည့်ပါ'; return }
  authLoading.value = true; authErr.value = ''
  try {
    const email = phone.includes('@') ? phone : phone + '@novabett.internal'
    if (authMode.value === 'register') {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { username: username || phone } } })
      if (error) throw error
      showToast('မှတ်ပုံတင်ပြီးပါပြီ', 'success')
      showAuthModal.value = false
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      showToast('ဝင်ရောက်ပြီးပါပြီ', 'success')
      showAuthModal.value = false
    }
  } catch (e) {
    authErr.value = e.message || 'Error'
  } finally {
    authLoading.value = false
  }
}

function requireLogin() {
  selectedGame.value = null
  openAuth('login')
}

// ── Toast ──────────────────────────────────────────────────────────
const toast = ref({ show: false, msg: '', type: '' })
let toastTimer = null
function showToast(msg, type = 'info') {
  toast.value = { show: true, msg, type }
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.value.show = false }, 2500)
}

// ── Banner ─────────────────────────────────────────────────────────
const bannerIdx = ref(0)
const banners = ref([
  'https://ik.imagekit.io/rbok01qam/banners/banner1.jpg?tr=f-auto,w-800',
  'https://ik.imagekit.io/rbok01qam/banners/banner2.jpg?tr=f-auto,w-800',
  'https://ik.imagekit.io/rbok01qam/banners/banner3.jpg?tr=f-auto,w-800',
  'https://ik.imagekit.io/rbok01qam/banners/banner4.jpg?tr=f-auto,w-800',
  'https://ik.imagekit.io/rbok01qam/banners/banner5.jpg?tr=f-auto,w-800',
])
let bannerTimer = null
onMounted(() => {
  bannerTimer = setInterval(() => {
    bannerIdx.value = (bannerIdx.value + 1) % banners.value.length
  }, 3500)
})
onUnmounted(() => {
  clearInterval(bannerTimer)
  clearTimeout(toastTimer)
})

// ── Categories ─────────────────────────────────────────────────────
const activeCategory = ref('all')
const categories = [
  { id: 'all',     label: 'အားလုံး',     icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>' },
  { id: 'hot',     label: 'ဟောဂိမ်းများ', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C12 2 7 8 7 13a5 5 0 0010 0c0-5-5-11-5-11z"/></svg>' },
  { id: 'slots',   label: 'စလော',        icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/><circle cx="7" cy="10" r="2"/><circle cx="12" cy="10" r="2"/><circle cx="17" cy="10" r="2"/></svg>' },
  { id: 'live',    label: 'စလော',        icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>' },
  { id: 'fish',    label: 'ငါးပမ်း',     icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12c3-5 8-5 10 0s7 5 9 0"/><circle cx="18" cy="12" r="1" fill="currentColor"/></svg>' },
  { id: 'sports',  label: 'အားကစား',     icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>' },
  { id: 'fav',     label: 'နှစ်သက်',    icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' },
]

const currentCategoryLabel = computed(() => {
  if (searchQuery.value.trim()) return 'ရှာဖွေမှုရလဒ်'
  return categories.find(c => c.id === activeCategory.value)?.label || 'ဟောဂိမ်းများ'
})

// ── Search ─────────────────────────────────────────────────────────
const searchQuery = ref('')

// ── Favorites ─────────────────────────────────────────────────────
const favorites = ref(new Set(JSON.parse(localStorage.getItem('hp_favs') || '[]')))
function toggleFav(id) {
  const next = new Set(favorites.value)
  next.has(id) ? next.delete(id) : next.add(id)
  favorites.value = next
  localStorage.setItem('hp_favs', JSON.stringify([...next]))
}

// ── Games ─────────────────────────────────────────────────────────
const selectedGame = ref(null)

const allGames = ref([
  { id: 1,  name: 'Jelly Express',         provider: 'PRAGMATIC PLAY', category: 'hot',    rating: 4.8, players: '1.2M', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/sweet_dreams.png?tr=f-auto,w-400' },
  { id: 2,  name: 'Gates of Olympus',      provider: 'PRAGMATIC PLAY', category: 'hot',    rating: 4.9, players: '2.1M', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/diamond_quest.jpg?tr=f-auto,w-400' },
  { id: 3,  name: 'Lucky Neko',            provider: 'PG SOFT',        category: 'hot',    rating: 4.7, players: '980K', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/flappy_bird.jpg?tr=f-auto,w-400' },
  { id: 4,  name: 'Zeus vs Hades',         provider: 'PRAGMATIC PLAY', category: 'hot',    rating: 4.8, players: '1.5M', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/temple_run.jpg?tr=f-auto,w-400' },
  { id: 5,  name: 'Starlight Princess',    provider: 'PRAGMATIC PLAY', category: 'slots',  rating: 4.9, players: '1.8M', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/candy_match.png?tr=f-auto,w-400' },
  { id: 6,  name: 'Sugar Rush',            provider: 'PRAGMATIC PLAY', category: 'slots',  rating: 4.7, players: '890K', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/fruit_ninja.jpg?tr=f-auto,w-400' },
  { id: 7,  name: 'Mahjong Ways',          provider: 'PG SOFT',        category: 'slots',  rating: 4.8, players: '756K', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/space_shooter.jpg?tr=f-auto,w-400' },
  { id: 8,  name: 'Baccarat Deluxe',       provider: 'EVOLUTION',      category: 'live',   rating: 4.9, players: '3.2M', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/puzzle_master.jpg?tr=f-auto,w-400' },
  { id: 9,  name: 'Lightning Roulette',    provider: 'EVOLUTION',      category: 'live',   rating: 4.8, players: '2.8M', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/soccer_legend.jpg?tr=f-auto,w-400' },
  { id: 10, name: 'Fishing War',           provider: 'JDB',            category: 'fish',   rating: 4.6, players: '650K', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/basketball_pro.jpg?tr=f-auto,w-400' },
  { id: 11, name: 'Ocean King',            provider: 'JDB',            category: 'fish',   rating: 4.7, players: '520K', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/tennis_masters.jpg?tr=f-auto,w-400' },
  { id: 12, name: 'Premier League',        provider: 'SBOBET',         category: 'sports', rating: 4.8, players: '1.1M', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/racing_rush.jpg?tr=f-auto,w-400' },
])

const filteredGames = computed(() => {
  let list = allGames.value
  if (activeCategory.value === 'fav') {
    list = list.filter(g => favorites.value.has(g.id))
  } else if (activeCategory.value !== 'all') {
    list = list.filter(g => g.category === activeCategory.value)
  }
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    list = list.filter(g => g.name.toLowerCase().includes(q) || g.provider.toLowerCase().includes(q))
  }
  return list
})
</script>

<style scoped>
/* ── Root ── */
.hp-root {
  min-height: 100vh;
  background: #161b2e;
  color: #fff;
  font-family: system-ui, -apple-system, sans-serif;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* ── Header ── */
.hp-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #1a2040;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  position: sticky;
  top: 0;
  z-index: 50;
  flex-shrink: 0;
}
.hp-hamburger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
}
.hp-brand {
  display: flex;
  align-items: baseline;
  gap: 1px;
  flex: 1;
}
.hp-brand-arrow {
  font-size: 13px;
  color: #4ade80;
  margin-right: 2px;
  font-weight: 900;
}
.hp-brand-iw {
  font-size: 20px;
  font-weight: 900;
  font-style: italic;
  color: #4ade80;
  letter-spacing: -0.5px;
}
.hp-brand-bet {
  font-size: 20px;
  font-weight: 900;
  font-style: italic;
  color: #fff;
  letter-spacing: -0.5px;
}
.hp-brand-domain {
  font-size: 8px;
  color: rgba(255,255,255,0.35);
  margin-left: 4px;
  align-self: flex-end;
  margin-bottom: 2px;
}
.hp-header-actions {
  display: flex;
  gap: 6px;
  flex-shrink: 0;
}
.hp-btn-login {
  background: transparent;
  border: 1.5px solid #4ade80;
  color: #4ade80;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.15s;
}
.hp-btn-login:hover { background: rgba(74,222,128,0.1); }
.hp-btn-register {
  background: transparent;
  border: 1.5px solid #4ade80;
  color: #4ade80;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.15s;
}
.hp-btn-register:hover { background: rgba(74,222,128,0.1); }

/* ── Banner ── */
.hp-banner-wrap {
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  background: #0f1422;
}
.hp-banner-track {
  display: flex;
  transition: transform 0.45s cubic-bezier(0.4,0,0.2,1);
}
.hp-banner-slide {
  flex-shrink: 0;
  width: 100%;
}
.hp-banner-img {
  width: 100%;
  aspect-ratio: 16 / 7;
  object-fit: cover;
  display: block;
}
.hp-dots {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
}
.hp-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  cursor: pointer;
  transition: all 0.2s;
}
.hp-dot.active {
  background: #4ade80;
  width: 18px;
  border-radius: 3px;
}

/* ── Toolbar ── */
.hp-toolbar {
  display: flex;
  align-items: center;
  padding: 6px 14px;
  background: #1a2040;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-shrink: 0;
}
.hp-tool-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
}
.hp-tool-mail {
  background: rgba(255,255,255,0.05);
  border-radius: 6px;
  padding: 5px 8px;
}

/* ── Categories ── */
.hp-cats-wrap {
  background: #1a2040;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-shrink: 0;
}
.hp-cats {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 6px 8px;
  gap: 4px;
}
.hp-cats::-webkit-scrollbar { display: none; }
.hp-cat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 6px 10px;
  border-radius: 8px;
  border: none;
  background: transparent;
  color: rgba(255,255,255,0.45);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.15s;
  font-family: inherit;
}
.hp-cat-icon { display: flex; align-items: center; justify-content: center; }
.hp-cat-label { font-size: 9.5px; font-weight: 600; letter-spacing: 0.01em; }
.hp-cat.active {
  background: rgba(74,222,128,0.15);
  color: #4ade80;
  border: 1px solid rgba(74,222,128,0.3);
}
.hp-cat:hover:not(.active) {
  color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.04);
}

/* ── Search ── */
.hp-search-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px 8px;
  background: #161b2e;
  flex-shrink: 0;
}
.hp-search-box {
  flex: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 8px 12px;
}
.hp-search-input {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: rgba(255,255,255,0.9);
  font-size: 13px;
  font-family: inherit;
}
.hp-search-input::placeholder { color: rgba(255,255,255,0.28); }
.hp-fav-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
}

/* ── Scroll area ── */
.hp-scroll-area {
  flex: 1;
  overflow-y: auto;
  padding: 0 0 90px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.1) transparent;
}
.hp-scroll-area::-webkit-scrollbar { width: 3px; }
.hp-scroll-area::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }

/* ── Section header ── */
.hp-section-hdr {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 12px 14px 8px;
}
.hp-section-title {
  font-size: 14px;
  font-weight: 800;
  color: rgba(255,255,255,0.92);
  letter-spacing: 0.02em;
}

/* ── Games Grid ── */
.hp-games-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 0 10px 12px;
}
.hp-game-card {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.hp-game-img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  background: #0f1422;
}
.hp-game-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}
.hp-game-card:hover .hp-game-img { transform: scale(1.04); }
.hp-star-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0,0,0,0.55);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  -webkit-tap-highlight-color: transparent;
  z-index: 2;
  transition: background 0.15s;
}
.hp-star-btn:hover { background: rgba(0,0,0,0.75); }
.hp-star-btn.starred { background: rgba(251,191,36,0.2); }
.hp-provider-badge {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px 6px 5px;
  background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 100%);
  font-size: 7.5px;
  font-weight: 700;
  color: rgba(255,255,255,0.75);
  letter-spacing: 0.04em;
  text-align: center;
  line-height: 1;
}
.hp-game-name {
  font-size: 9.5px;
  color: rgba(255,255,255,0.7);
  text-align: center;
  margin: 5px 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 2px;
}

/* ── Empty ── */
.hp-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 50px 20px;
  color: rgba(255,255,255,0.25);
  font-size: 12px;
}

/* ── Modal ── */
.hp-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  backdrop-filter: blur(4px);
}
.hp-modal {
  background: #1e2540;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 20px;
  width: 100%;
  max-width: 320px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.hp-modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255,255,255,0.08);
  border: none;
  border-radius: 8px;
  color: rgba(255,255,255,0.7);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.hp-modal-img {
  width: 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
}
.hp-modal-name {
  font-size: 16px;
  font-weight: 800;
  color: #fff;
  margin: 0;
  text-align: center;
}
.hp-modal-provider {
  font-size: 10px;
  color: rgba(74,222,128,0.9);
  font-weight: 700;
  margin: 0;
  letter-spacing: 0.06em;
}
.hp-modal-stats {
  display: flex;
  gap: 16px;
}
.hp-modal-stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
}
.sval { font-size: 14px; font-weight: 800; color: #fbbf24; }
.slbl { font-size: 9px; color: rgba(255,255,255,0.4); }
.hp-modal-play {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #4ade80, #22c55e);
  border: none;
  border-radius: 10px;
  color: #000;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  letter-spacing: 0.03em;
  transition: opacity 0.15s;
}
.hp-modal-play:hover { opacity: 0.9; }

/* ── Auth Modal ── */
.hp-auth-modal { gap: 0; }
.hp-auth-tabs {
  display: flex;
  width: 100%;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}
.hp-auth-tab {
  flex: 1;
  background: none;
  border: none;
  color: rgba(255,255,255,0.4);
  font-size: 13px;
  font-weight: 700;
  padding: 10px;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.15s;
  font-family: inherit;
  -webkit-tap-highlight-color: transparent;
}
.hp-auth-tab.active {
  color: #4ade80;
  border-bottom-color: #4ade80;
}
.hp-auth-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.hp-auth-input {
  width: 100%;
  box-sizing: border-box;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 9px;
  padding: 11px 14px;
  font-size: 13px;
  color: #fff;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s;
}
.hp-auth-input:focus { border-color: rgba(74,222,128,0.5); }
.hp-auth-input::placeholder { color: rgba(255,255,255,0.28); }
.hp-auth-err {
  font-size: 11px;
  color: #f87171;
  margin: 0;
  text-align: center;
}
.hp-auth-submit {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #4ade80, #22c55e);
  border: none;
  border-radius: 10px;
  color: #000;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: inherit;
  transition: opacity 0.15s;
  margin-top: 4px;
}
.hp-auth-submit:disabled { opacity: 0.6; cursor: not-allowed; }
.hp-spin {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(0,0,0,0.3);
  border-top-color: #000;
  border-radius: 50%;
  animation: spin 0.7s linear infinite;
  display: inline-block;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* ── Toast ── */
.hp-toast {
  position: fixed;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  padding: 9px 20px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 700;
  z-index: 9999;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.4);
}
.hp-toast.success { background: rgba(21,128,61,0.95); color: #fff; border: 1px solid rgba(74,222,128,0.4); }
.hp-toast.error   { background: rgba(185,28,28,0.95); color: #fff; border: 1px solid rgba(248,113,113,0.4); }
.hp-toast.info    { background: rgba(15,23,42,0.95);  color: #fff; border: 1px solid rgba(255,255,255,0.15); }

/* ── Transitions ── */
.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.22s; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.toast-up-enter-active, .toast-up-leave-active { transition: all 0.25s; }
.toast-up-enter-from, .toast-up-leave-to { opacity: 0; transform: translateX(-50%) translateY(10px); }
</style>
