<template>
  <div class="hp-root">

    <!-- ══ HEADER ══ -->
    <header class="hp-header">
      <button class="hp-hamburger" @click="openAuth('login')">
        <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
          <rect y="0"   width="20" height="2.8" rx="1.4" fill="#4ade80"/>
          <rect y="6.6" width="15" height="2.8" rx="1.4" fill="#4ade80"/>
          <rect y="13.2" width="20" height="2.8" rx="1.4" fill="#4ade80"/>
        </svg>
      </button>

      <div class="hp-brand">
        <img src="https://ik.imagekit.io/m4n2fghhp/Oracle%20-%20GMB/b313ae60-ae49-43b3-b4c1-36b25eb5f4e5.svg?tr=f-auto" alt="M99" class="hp-logo" />
      </div>

      <div class="hp-hdr-btns">
        <button class="hp-btn-solid" @click="openAuth('login')">လောဂ်အင်</button>
        <button class="hp-btn-outline" @click="openAuth('register')">မတ်ပုံတင်မယ်</button>
      </div>
    </header>

    <!-- ══ BANNER CAROUSEL ══ -->
    <div class="hp-banner-root">
      <div class="hp-banner-track" :style="{ transform: `translateX(${-bannerIdx * 100}%)` }">
        <div v-for="(b, i) in banners" :key="i" class="hp-banner-item">
          <img :src="b" alt="banner" class="hp-banner-img" loading="lazy" />
        </div>
      </div>

      <!-- touch swipe -->
      <div
        class="hp-swipe-layer"
        @touchstart.passive="onTouchStart"
        @touchend.passive="onTouchEnd"
      ></div>

      <div class="hp-banner-dots">
        <span
          v-for="(_, i) in banners" :key="i"
          class="hp-bdot"
          :class="{ active: i === bannerIdx }"
          @click="bannerIdx = i"
        ></span>
      </div>
    </div>

    <!-- ══ TOOLBAR (below banner) ══ -->
    <div class="hp-toolbar">
      <button class="hp-tb-btn" :class="{ muted: isMuted }" @click="isMuted = !isMuted">
        <svg width="17" height="17" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
          <template v-if="!isMuted">
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke-linecap="round"/>
          </template>
          <template v-else>
            <line x1="23" y1="9" x2="17" y2="15" stroke-linecap="round"/>
            <line x1="17" y1="9" x2="23" y2="15" stroke-linecap="round"/>
          </template>
        </svg>
      </button>
      <div class="hp-tb-spacer"></div>
      <button class="hp-tb-mail" @click="goInbox">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.75)" stroke-width="2">
          <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" stroke-linecap="round" stroke-linejoin="round"/>
          <rect x="3" y="6" width="18" height="13" rx="2"/>
        </svg>
        <span v-if="unreadCount > 0" class="hp-mail-badge">{{ unreadCount }}</span>
      </button>
    </div>

    <!-- ══ CATEGORY SCROLL ══ -->
    <div class="hp-cats-bar">
      <div class="hp-cats-inner">
        <button
          v-for="c in categories"
          :key="c.id"
          class="hp-cat-btn"
          :class="{ active: activeCategory === c.id }"
          @click="activeCategory = c.id"
        >
          <span class="hp-cat-ic" v-html="c.svg"></span>
          <span class="hp-cat-lbl">{{ c.label }}</span>
        </button>
      </div>
    </div>

    <!-- ══ SEARCH ROW ══ -->
    <div class="hp-search-row">
      <div class="hp-search-field">
        <input
          v-model="searchQ"
          class="hp-search-inp"
          type="text"
          placeholder="ရှာပါ..."
        />
        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="rgba(255,255,255,0.35)" stroke-width="2" class="hp-search-ic">
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.35-4.35" stroke-linecap="round"/>
        </svg>
      </div>
      <button class="hp-star-toggle" @click="activeCategory = activeCategory === 'fav' ? 'all' : 'fav'">
        <svg width="22" height="22" viewBox="0 0 24 24"
          :fill="activeCategory === 'fav' ? '#fbbf24' : 'none'"
          :stroke="activeCategory === 'fav' ? '#fbbf24' : 'rgba(255,255,255,0.45)'"
          stroke-width="1.8">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      </button>
    </div>

    <!-- ══ SCROLLABLE BODY ══ -->
    <div class="hp-body">

      <!-- Section header -->
      <div class="hp-sec-hdr">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="#f97316">
          <path d="M12 2s-5 6-5 11a5 5 0 0010 0c0-5-5-11-5-11zm0 14a3 3 0 01-3-3c0-2 1.2-4.2 3-6.5 1.8 2.3 3 4.5 3 6.5a3 3 0 01-3 3z"/>
        </svg>
        <span class="hp-sec-title">{{ sectionTitle }}</span>
      </div>

      <!-- Games 3-col grid -->
      <div class="hp-grid" v-if="visibleGames.length">
        <div
          v-for="g in visibleGames"
          :key="g.id"
          class="hp-gc"
          @click="selectGame(g)"
        >
          <div class="hp-gc-img-wrap">
            <img :src="g.image" :alt="g.name" class="hp-gc-img" loading="lazy" />

            <!-- star button -->
            <button class="hp-gc-star" @click.stop="toggleFav(g.id)">
              <svg width="12" height="12" viewBox="0 0 24 24"
                :fill="favSet.has(g.id) ? '#fbbf24' : 'none'"
                :stroke="favSet.has(g.id) ? '#fbbf24' : 'rgba(255,255,255,0.7)'"
                stroke-width="2.2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
            </button>

            <!-- provider -->
            <div class="hp-gc-prov">{{ g.provider }}</div>
          </div>
          <p class="hp-gc-name">{{ g.name }}</p>
        </div>
      </div>

      <div v-else class="hp-empty">
        <svg width="38" height="38" fill="none" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <p>ဂိမ်းမတွေ့ပါ</p>
      </div>

    </div>

    <!-- ══ GAME DETAIL MODAL ══ -->
    <Transition name="hp-fade">
      <div v-if="selectedGame" class="hp-overlay" @click.self="selectedGame = null">
        <div class="hp-modal">
          <button class="hp-modal-x" @click="selectedGame = null">
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" d="M18 6 6 18M6 6l12 12"/></svg>
          </button>
          <img :src="selectedGame.image" :alt="selectedGame.name" class="hp-modal-img"/>
          <h3 class="hp-modal-name">{{ selectedGame.name }}</h3>
          <span class="hp-modal-prov">{{ selectedGame.provider }}</span>
          <div class="hp-modal-row">
            <div class="hp-modal-stat"><b>{{ selectedGame.rating }}★</b><span>Rating</span></div>
            <div class="hp-modal-stat"><b>{{ selectedGame.players }}</b><span>Players</span></div>
          </div>
          <button class="hp-modal-play" @click="openAuth('login')">
            ▶ ယခုကစားပါ
          </button>
        </div>
      </div>
    </Transition>

    <!-- ══ AUTH MODAL — VAULT GLASS ══ -->
    <Transition name="hp-fade">
      <div v-if="authModal" class="hp-overlay" @click.self="authModal = false">
        <div class="hp-vault">
          <div class="hp-vault-sheen"></div>

          <div class="hp-vault-top">
            <div class="hp-vault-brand">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="10" width="16" height="10" rx="2.2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
              <span>VAULT ACCESS</span>
            </div>
            <button class="hp-vault-x" @click="authModal = false">
              <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" viewBox="0 0 24 24"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
          </div>

          <div class="hp-vault-tabs">
            <div class="hp-vault-pill" :class="authMode"></div>
            <button :class="['hp-vtab', authMode === 'login' ? 'on' : '']" @click="authMode = 'login'">လောဂ်အင်</button>
            <button :class="['hp-vtab', authMode === 'register' ? 'on' : '']" @click="authMode = 'register'">မှတ်ပုံတင်</button>
          </div>

          <div class="hp-vault-form">
            <div v-if="authMode === 'register'" class="hp-vinput-wrap">
              <svg class="hp-vinput-ic" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="3.3"/><path d="M5 20c0-3.6 3.1-6.2 7-6.2s7 2.6 7 6.2"/></svg>
              <input v-model="form.username" class="hp-vinput" type="text" placeholder="Username" />
            </div>
            <div class="hp-vinput-wrap">
              <svg class="hp-vinput-ic" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M16.7 8.6c2 1.3 3.1 3.1 3.1 5.2 0 3.6-3.5 6.4-7.8 6.4s-7.8-2.8-7.8-6.4c0-2.1 1.1-3.9 3.1-5.2"/><path d="M12 4.2v9"/></svg>
              <input v-model="form.phone" class="hp-vinput" type="text" :placeholder="authMode === 'register' ? 'ဖုန်းနံပါတ် / Email' : 'ဖုန်းနံပါတ် / Email'" />
            </div>
            <div class="hp-vinput-wrap">
              <svg class="hp-vinput-ic" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/></svg>
              <input v-model="form.password" class="hp-vinput" type="password" placeholder="Password" />
            </div>

            <p v-if="authErr" class="hp-verr">{{ authErr }}</p>

            <button class="hp-vsubmit" @click="doAuth" :disabled="authBusy">
              <span v-if="authBusy" class="hp-spin"></span>
              <svg v-else width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/></svg>
              {{ authBusy ? 'Loading...' : (authMode === 'login' ? 'ဝင်ရောက်ပါ' : 'မှတ်ပုံတင်ပါ') }}
            </button>

            <p class="hp-vault-foot">🔒 Secured · Encrypted Connection</p>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ══ TOAST ══ -->
    <Transition name="hp-toast-anim">
      <div v-if="toast.show" class="hp-toast" :class="'hp-toast--' + toast.type">{{ toast.msg }}</div>
    </Transition>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'

const router = useRouter()

// ── Auth ───────────────────────────────────────────────────────────
const authModal = ref(false)
const authMode  = ref('login')
const authBusy  = ref(false)
const authErr   = ref('')
const form = ref({ username: '', phone: '', password: '' })

function openAuth(mode) {
  authMode.value = mode
  authErr.value = ''
  form.value = { username: '', phone: '', password: '' }
  authModal.value = true
}

async function doAuth() {
  const { phone, password, username } = form.value
  if (!phone.trim() || !password.trim()) { authErr.value = 'အချက်အလက်ထည့်ပါ'; return }
  authBusy.value = true; authErr.value = ''
  try {
    const email = phone.includes('@') ? phone : phone + '@novabett.internal'
    if (authMode.value === 'register') {
      const { error } = await supabase.auth.signUp({ email, password, options: { data: { username: username || phone } } })
      if (error) throw error
      showToast('မှတ်ပုံတင်ပြီးပါပြီ ✓', 'success')
      authModal.value = false
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      showToast('ဝင်ရောက်ပြီးပါပြီ ✓', 'success')
      authModal.value = false
    }
  } catch(e) {
    authErr.value = e.message || 'Error'
  } finally {
    authBusy.value = false
  }
}

// ── Toast ──────────────────────────────────────────────────────────
const toast = ref({ show: false, msg: '', type: 'info' })
let toastT = null
function showToast(msg, type = 'info') {
  toast.value = { show: true, msg, type }
  clearTimeout(toastT)
  toastT = setTimeout(() => { toast.value.show = false }, 2600)
}

// ── Banner ─────────────────────────────────────────────────────────
const bannerIdx  = ref(0)
const isMuted    = ref(false)
const unreadCount = ref(0)
const touchStartX = ref(0)

const banners = [
  '/images/banners/banner1.jpg',
  '/images/banners/banner2.jpg',
  '/images/banners/banner3.jpg',
  '/images/banners/banner4.jpg',
  '/images/banners/banner5.jpg',
]

function onTouchStart(e) { touchStartX.value = e.touches[0].clientX }
function onTouchEnd(e) {
  const dx = e.changedTouches[0].clientX - touchStartX.value
  if (dx < -40) bannerIdx.value = Math.min(bannerIdx.value + 1, banners.length - 1)
  if (dx >  40) bannerIdx.value = Math.max(bannerIdx.value - 1, 0)
}

let bannerTimer = null
onMounted(() => {
  bannerTimer = setInterval(() => {
    bannerIdx.value = (bannerIdx.value + 1) % banners.length
  }, 4000)
})
onUnmounted(() => {
  clearInterval(bannerTimer)
  clearTimeout(toastT)
})

function goInbox() { router.push('/account') }

// ── Categories ─────────────────────────────────────────────────────
const activeCategory = ref('all')

const categories = [
  {
    id: 'all', label: 'အားလုံး',
    svg: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="7" height="7" rx="1.5"/>
      <rect x="14" y="3" width="7" height="7" rx="1.5"/>
      <rect x="3" y="14" width="7" height="7" rx="1.5"/>
      <rect x="14" y="14" width="7" height="7" rx="1.5"/>
    </svg>`
  },
  {
    id: 'hot', label: 'ဟောဂိမ်းများ',
    svg: `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2s-5 6-5 11a5 5 0 0010 0c0-5-5-11-5-11zm0 14a3 3 0 01-3-3c0-2 1.2-4.2 3-6.5 1.8 2.3 3 4.5 3 6.5a3 3 0 01-3 3z"/>
    </svg>`
  },
  {
    id: 'slots', label: 'စလော',
    svg: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="4" width="20" height="13" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
      <circle cx="7" cy="10.5" r="2" fill="currentColor" stroke="none"/>
      <circle cx="12" cy="10.5" r="2" fill="currentColor" stroke="none"/>
      <circle cx="17" cy="10.5" r="2" fill="currentColor" stroke="none"/>
    </svg>`
  },
  {
    id: 'live', label: 'စလော',
    svg: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
    </svg>`
  },
  {
    id: 'fish', label: 'ငါးပမ်း',
    svg: `<svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 12s4-7 10-7c4 0 7 2.5 8 5l2 2-2 2c-1 2.5-4 5-8 5-6 0-10-7-10-7zm14 0a4 4 0 11-8 0 4 4 0 018 0z" opacity="0.9"/>
      <circle cx="17" cy="12" r="1.2"/>
    </svg>`
  },
  {
    id: 'table', label: 'ငါးပမ်း',
    svg: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="2" y="7" width="20" height="14" rx="2"/>
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
      <line x1="12" y1="12" x2="12" y2="16"/>
      <line x1="10" y1="14" x2="14" y2="14"/>
    </svg>`
  },
  {
    id: 'sports', label: 'ရုပ်ရှင်',
    svg: `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="23 7 16 12 23 17 23 7"/>
      <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>`
  },
]

// ── Search ─────────────────────────────────────────────────────────
const searchQ = ref('')

const sectionTitle = computed(() => {
  if (searchQ.value.trim()) return 'ရှာဖွေမှုရလဒ်'
  return categories.find(c => c.id === activeCategory.value)?.label || 'ဟောဂိမ်းများ'
})

// ── Favorites ──────────────────────────────────────────────────────
const favSet = ref(new Set(JSON.parse(localStorage.getItem('hp_fav') || '[]')))
function toggleFav(id) {
  const s = new Set(favSet.value)
  s.has(id) ? s.delete(id) : s.add(id)
  favSet.value = s
  localStorage.setItem('hp_fav', JSON.stringify([...s]))
}

// ── Games ──────────────────────────────────────────────────────────
const selectedGame = ref(null)
function selectGame(g) { selectedGame.value = g }

const allGames = [
  { id:1,  name:'Jelly Express',       provider:'PRAGMATIC PLAY', cat:'hot',    rating:4.8, players:'1.2M', image:'https://cdn.jsdelivr.net/gh/ccorryxx-bot/game-assets@main/pp/00ab11e01d9f85c9b74e0e52233e9a85.jpg' },
  { id:2,  name:'Gates of Olympus',    provider:'PRAGMATIC PLAY', cat:'hot',    rating:4.9, players:'2.1M', image:'https://cdn.jsdelivr.net/gh/ccorryxx-bot/game-assets@main/pp/045f290df6c578256adb632ea1da485f.jpg' },
  { id:3,  name:'Lucky Neko',          provider:'PG SOFT',        cat:'hot',    rating:4.7, players:'980K', image:'https://cdn.jsdelivr.net/gh/ccorryxx-bot/game-assets@main/pg/028879b1f9f5eec605528b06dbeb9e2d.jpg' },
  { id:4,  name:'Zeus vs Hades',       provider:'PRAGMATIC PLAY', cat:'hot',    rating:4.8, players:'1.5M', image:'https://cdn.jsdelivr.net/gh/ccorryxx-bot/game-assets@main/pp/04e9ce4628bf5032d5f003343df6b8d4.jpg' },
  { id:5,  name:'Starlight Princess',  provider:'PRAGMATIC PLAY', cat:'hot',    rating:4.9, players:'1.8M', image:'https://cdn.jsdelivr.net/gh/ccorryxx-bot/game-assets@main/pp/0518b5e45a9953982e1c1e77206c2755.jpg' },
  { id:6,  name:'Sugar Rush',          provider:'PRAGMATIC PLAY', cat:'slots',  rating:4.7, players:'890K', image:'https://cdn.jsdelivr.net/gh/ccorryxx-bot/game-assets@main/pp/058e47691b7ce09959a73ca237523e4c.jpg' },
  { id:7,  name:'Mahjong Ways',        provider:'PG SOFT',        cat:'slots',  rating:4.8, players:'756K', image:'https://cdn.jsdelivr.net/gh/ccorryxx-bot/game-assets@main/pg/028bd89b2120e880bcf1968c37277460.jpg' },
  { id:8,  name:'Wild Bandito',        provider:'PRAGMATIC PLAY', cat:'slots',  rating:4.6, players:'620K', image:'https://cdn.jsdelivr.net/gh/ccorryxx-bot/game-assets@main/pp/05a9876c537ff79898d661c5c01c5f9d.jpg' },
  { id:9,  name:'Baccarat Deluxe',     provider:'EVOLUTION',      cat:'live',   rating:4.9, players:'3.2M', image:'https://cdn.jsdelivr.net/gh/ccorryxx-bot/game-assets@main/jili/0074a83d2b9d825f796e9b62a9431a16.jpg' },
  { id:10, name:'Lightning Roulette',  provider:'EVOLUTION',      cat:'live',   rating:4.8, players:'2.8M', image:'https://cdn.jsdelivr.net/gh/ccorryxx-bot/game-assets@main/jili/007f5afeab86a47d96038324438c0c1f.jpg' },
  { id:11, name:'Fishing War',         provider:'JDB',            cat:'fish',   rating:4.6, players:'650K', image:'https://cdn.jsdelivr.net/gh/ccorryxx-bot/game-assets@main/jdb/89e967a8336fb8caad2c1b6d735588fe.jpg' },
  { id:12, name:'Ocean King',          provider:'JDB',            cat:'fish',   rating:4.7, players:'520K', image:'https://cdn.jsdelivr.net/gh/ccorryxx-bot/game-assets@main/jdb/3d97f2073a05873b428be0ff20df724c.jpg' },
]

const visibleGames = computed(() => {
  let list = allGames
  if (activeCategory.value === 'fav') {
    list = list.filter(g => favSet.value.has(g.id))
  } else if (activeCategory.value !== 'all') {
    list = list.filter(g => g.cat === activeCategory.value)
  }
  if (searchQ.value.trim()) {
    const q = searchQ.value.toLowerCase()
    list = list.filter(g => g.name.toLowerCase().includes(q) || g.provider.toLowerCase().includes(q))
  }
  return list
})
</script>

<style scoped>
/* ─────────────────── ROOT ─────────────────── */
.hp-root {
  min-height: 100vh;
  background: #17192e;
  color: #fff;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
}

/* ─────────────────── HEADER ─────────────────── */
.hp-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  background: #1d2145;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  position: sticky;
  top: 0;
  z-index: 100;
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
  align-items: center;
  flex: 1;
}
.hp-logo { height: 28px; width: auto; object-fit: contain; display: block; }

.hp-hdr-btns { display: flex; gap: 6px; flex-shrink: 0; }
.hp-btn-solid {
  background: #4ade80;
  border: none;
  border-radius: 6px;
  color: #0f1a10;
  font-size: 11px;
  font-weight: 800;
  padding: 7px 13px;
  cursor: pointer;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.15s;
}
.hp-btn-solid:hover { opacity: 0.85; }
.hp-btn-outline {
  background: transparent;
  border: 1.5px solid #4ade80;
  border-radius: 6px;
  color: #4ade80;
  font-size: 11px;
  font-weight: 700;
  padding: 6px 12px;
  cursor: pointer;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.15s;
}
.hp-btn-outline:hover { background: rgba(74,222,128,0.08); }

/* ─────────────────── BANNER ─────────────────── */
.hp-banner-root {
  position: relative;
  overflow: hidden;
  flex-shrink: 0;
  background: #0d1020;
}
.hp-banner-track {
  display: flex;
  transition: transform 0.45s cubic-bezier(0.4, 0, 0.2, 1);
}
.hp-banner-item { flex-shrink: 0; width: 100%; }
.hp-banner-img {
  width: 100%;
  aspect-ratio: 16 / 6.5;
  object-fit: cover;
  display: block;
}
.hp-swipe-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  cursor: grab;
}
.hp-banner-dots {
  position: absolute;
  bottom: 9px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  z-index: 3;
}
.hp-bdot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: rgba(255,255,255,0.3);
  cursor: pointer;
  transition: all 0.25s;
}
.hp-bdot.active {
  background: #4ade80;
  width: 20px;
  border-radius: 4px;
}

/* ─────────────────── TOOLBAR ─────────────────── */
.hp-toolbar {
  display: flex;
  align-items: center;
  padding: 5px 14px 5px;
  background: #1d2145;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-shrink: 0;
  min-height: 36px;
}
.hp-tb-spacer { flex: 1; }
.hp-tb-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: rgba(255,255,255,0.55);
  display: flex;
  align-items: center;
  border-radius: 6px;
  -webkit-tap-highlight-color: transparent;
  transition: color 0.15s;
}
.hp-tb-btn.muted { color: rgba(255,255,255,0.2); }
.hp-tb-btn:hover { color: rgba(255,255,255,0.8); }
.hp-tb-mail {
  position: relative;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 8px;
  padding: 5px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
}
.hp-mail-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 14px;
  height: 14px;
  border-radius: 7px;
  background: #ef4444;
  color: #fff;
  font-size: 8px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 3px;
  border: 1.5px solid #1d2145;
}

/* ─────────────────── CATEGORIES ─────────────────── */
.hp-cats-bar {
  background: #1d2145;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-shrink: 0;
}
.hp-cats-inner {
  display: flex;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 5px 8px 6px;
  gap: 3px;
}
.hp-cats-inner::-webkit-scrollbar { display: none; }
.hp-cat-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 6px 11px;
  border-radius: 8px;
  border: 1px solid transparent;
  background: transparent;
  color: rgba(255,255,255,0.42);
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  -webkit-tap-highlight-color: transparent;
  transition: all 0.15s;
  font-family: inherit;
}
.hp-cat-ic { display: flex; align-items: center; justify-content: center; width: 17px; height: 17px; }
.hp-cat-lbl { font-size: 9px; font-weight: 600; line-height: 1; }
.hp-cat-btn.active {
  background: rgba(74,222,128,0.14);
  border-color: rgba(74,222,128,0.35);
  color: #4ade80;
}
.hp-cat-btn:not(.active):hover {
  color: rgba(255,255,255,0.7);
  background: rgba(255,255,255,0.04);
}

/* ─────────────────── SEARCH ─────────────────── */
.hp-search-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 14px 8px;
  background: #17192e;
  flex-shrink: 0;
}
.hp-search-field {
  flex: 1;
  display: flex;
  align-items: center;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 8px;
  padding: 8px 10px;
  gap: 6px;
}
.hp-search-inp {
  flex: 1;
  background: none;
  border: none;
  outline: none;
  color: rgba(255,255,255,0.88);
  font-size: 13px;
  font-family: inherit;
  min-width: 0;
}
.hp-search-inp::placeholder { color: rgba(255,255,255,0.25); }
.hp-search-ic { flex-shrink: 0; }
.hp-star-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  display: flex;
  align-items: center;
  -webkit-tap-highlight-color: transparent;
  flex-shrink: 0;
}

/* ─────────────────── BODY ─────────────────── */
.hp-body {
  flex: 1;
  overflow-y: auto;
  padding-bottom: 86px;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,0.08) transparent;
}
.hp-body::-webkit-scrollbar { width: 3px; }
.hp-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 3px; }

/* ─────────────────── SECTION HEADER ─────────────────── */
.hp-sec-hdr {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 11px 14px 8px;
}
.hp-sec-title {
  font-size: 14px;
  font-weight: 800;
  color: rgba(255,255,255,0.92);
  letter-spacing: 0.02em;
}

/* ─────────────────── GAMES GRID ─────────────────── */
.hp-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
  padding: 0 10px 10px;
}
.hp-gc { cursor: pointer; -webkit-tap-highlight-color: transparent; }
.hp-gc-img-wrap {
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  background: #0d1020;
}
.hp-gc-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}
.hp-gc:hover .hp-gc-img { transform: scale(1.04); }

.hp-gc-star {
  position: absolute;
  top: 5px;
  right: 5px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(0,0,0,0.52);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.15s;
}
.hp-gc-star:hover { background: rgba(0,0,0,0.75); }

.hp-gc-prov {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 18px 5px 5px;
  background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 100%);
  font-size: 7px;
  font-weight: 800;
  color: rgba(255,255,255,0.72);
  letter-spacing: 0.05em;
  text-align: center;
  line-height: 1;
  text-transform: uppercase;
}
.hp-gc-name {
  font-size: 9.5px;
  color: rgba(255,255,255,0.65);
  text-align: center;
  margin: 5px 0 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0 3px;
}

/* ─────────────────── EMPTY ─────────────────── */
.hp-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 55px 20px;
  color: rgba(255,255,255,0.22);
  font-size: 12px;
}

/* ─────────────────── MODAL ─────────────────── */
.hp-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  z-index: 1000;
  backdrop-filter: blur(5px);
}
.hp-modal {
  background: #1e2540;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 18px;
  padding: 22px 20px;
  width: 100%;
  max-width: 300px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.hp-modal-x {
  position: absolute;
  top: 13px;
  right: 13px;
  background: rgba(255,255,255,0.08);
  border: none;
  border-radius: 8px;
  color: rgba(255,255,255,0.65);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}
.hp-modal-img { width: 110px; height: 110px; border-radius: 12px; object-fit: cover; }
.hp-modal-name { font-size: 16px; font-weight: 800; color: #fff; margin: 0; text-align: center; }
.hp-modal-prov { font-size: 9px; font-weight: 700; color: #4ade80; letter-spacing: 0.07em; margin: 0; }
.hp-modal-row { display: flex; gap: 18px; }
.hp-modal-stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.hp-modal-stat b { font-size: 14px; font-weight: 800; color: #fbbf24; }
.hp-modal-stat span { font-size: 9px; color: rgba(255,255,255,0.38); }
.hp-modal-play {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #4ade80, #22c55e);
  border: none;
  border-radius: 10px;
  color: #052e10;
  font-size: 13px;
  font-weight: 800;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  letter-spacing: 0.03em;
  transition: opacity 0.15s;
  margin-top: 3px;
}
.hp-modal-play:hover { opacity: 0.88; }

/* ─────────────────── AUTH MODAL — VAULT GLASS ─────────────────── */
.hp-vault {
  --vg-accent: #4D6FFF;
  --vg-accent-2: #8FE3FF;
  --vg-text: #F5F7FF;
  --vg-text-dim: rgba(245,247,255,0.55);
  --vg-error: #FF6B81;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  padding: 22px 18px 20px;
  border-radius: 22px;
  background: linear-gradient(160deg, #12153c 0%, #1c1660 100%);
  border: 1px solid rgba(255,255,255,0.14);
  box-shadow: 0 24px 60px rgba(8,6,32,0.55), inset 0 1px 0 rgba(255,255,255,0.08);
  backdrop-filter: blur(18px) saturate(160%);
  display: flex;
  flex-direction: column;
  gap: 0;
}
.hp-vault-sheen {
  position: absolute;
  top: -45%; left: -25%;
  width: 150%; height: 90%;
  background: linear-gradient(120deg, rgba(255,255,255,0.10), rgba(255,255,255,0) 55%);
  transform: rotate(-8deg);
  pointer-events: none;
}
.hp-vault-top {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}
.hp-vault-brand {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--vg-accent-2);
  font-family: 'Sora', system-ui, sans-serif;
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.12em;
}
.hp-vault-x {
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px;
  color: var(--vg-text-dim);
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  -webkit-tap-highlight-color: transparent;
}
.hp-vault-x:active { background: rgba(255,255,255,0.16); color: #fff; }
.hp-vault-tabs {
  position: relative;
  z-index: 1;
  display: flex;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 12px;
  padding: 3px;
  margin-bottom: 14px;
}
.hp-vault-pill {
  position: absolute;
  top: 3px; left: 3px;
  width: calc(50% - 3px);
  height: calc(100% - 6px);
  border-radius: 9px;
  background: linear-gradient(135deg, var(--vg-accent), #2F4BD6);
  box-shadow: 0 2px 14px rgba(77,111,255,0.45);
  transition: transform 0.28s cubic-bezier(.4,0,.2,1);
}
.hp-vault-pill.register { transform: translateX(100%); }
.hp-vtab {
  flex: 1;
  position: relative;
  z-index: 2;
  background: none;
  border: none;
  padding: 9px 0;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--vg-text-dim);
  cursor: pointer;
  font-family: inherit;
  transition: color 0.2s;
  -webkit-tap-highlight-color: transparent;
}
.hp-vtab.on { color: #fff; }
.hp-vault-form {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 9px;
}
.hp-vinput-wrap { position: relative; display: flex; align-items: center; }
.hp-vinput-ic {
  position: absolute;
  left: 13px;
  color: var(--vg-text-dim);
  pointer-events: none;
}
.hp-vinput {
  width: 100%;
  box-sizing: border-box;
  background: rgba(255,255,255,0.045);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 11px;
  padding: 12px 13px 12px 37px;
  font-size: 13px;
  color: var(--vg-text);
  outline: none;
  font-family: inherit;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.18);
  transition: border-color 0.15s, background 0.15s;
}
.hp-vinput:focus { border-color: var(--vg-accent); background: rgba(77,111,255,0.08); }
.hp-vinput::placeholder { color: rgba(245,247,255,0.28); }
.hp-verr {
  font-size: 11px;
  color: var(--vg-error);
  background: rgba(255,107,129,0.1);
  border: 1px solid rgba(255,107,129,0.25);
  border-radius: 8px;
  padding: 7px 10px;
  margin: 0;
  text-align: center;
}
.hp-vsubmit {
  width: 100%;
  margin-top: 4px;
  padding: 13px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, var(--vg-accent), #2F4BD6);
  color: #fff;
  font-size: 13.5px;
  font-weight: 800;
  letter-spacing: 0.02em;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  cursor: pointer;
  font-family: inherit;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 26px rgba(77,111,255,0.4);
  transition: transform 0.12s;
  -webkit-tap-highlight-color: transparent;
}
.hp-vsubmit::after {
  content: '';
  position: absolute;
  top: 0; left: -60%;
  width: 40%; height: 100%;
  background: linear-gradient(120deg, transparent, rgba(255,255,255,0.35), transparent);
  transform: skewX(-20deg);
  animation: hp-vshimmer 2.8s ease-in-out infinite;
}
.hp-vsubmit:active { transform: scale(0.98); }
.hp-vsubmit:disabled { opacity: 0.5; cursor: not-allowed; }
.hp-vsubmit:disabled::after { animation: none; }
@keyframes hp-vshimmer { 0%,30% { left: -60%; } 70%,100% { left: 130%; } }
.hp-vault-foot {
  margin: 8px 0 0;
  font-size: 9.5px;
  text-align: center;
  color: rgba(245,247,255,0.3);
  letter-spacing: 0.02em;
}
.hp-vault-x:focus-visible, .hp-vtab:focus-visible, .hp-vsubmit:focus-visible, .hp-vinput:focus-visible {
  outline: 2px solid var(--vg-accent-2);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .hp-vsubmit::after { animation: none; }
  .hp-vault-pill { transition: none; }
}
.hp-spin {
  width: 13px;
  height: 13px;
  border: 2px solid rgba(255,255,255,0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: hpspin 0.65s linear infinite;
  display: inline-block;
}
@keyframes hpspin { to { transform: rotate(360deg); } }

/* ─────────────────── TOAST ─────────────────── */
.hp-toast {
  position: fixed;
  bottom: 78px;
  left: 50%;
  transform: translateX(-50%);
  padding: 9px 22px;
  border-radius: 99px;
  font-size: 12px;
  font-weight: 700;
  z-index: 9999;
  white-space: nowrap;
  pointer-events: none;
  box-shadow: 0 4px 20px rgba(0,0,0,0.45);
}
.hp-toast--success { background: rgba(21,128,61,0.96); color: #fff; border: 1px solid rgba(74,222,128,0.4); }
.hp-toast--error   { background: rgba(185,28,28,0.96); color: #fff; border: 1px solid rgba(248,113,113,0.4); }
.hp-toast--info    { background: rgba(15,23,42,0.96);  color: #fff; border: 1px solid rgba(255,255,255,0.12); }

/* ─────────────────── TRANSITIONS ─────────────────── */
.hp-fade-enter-active, .hp-fade-leave-active { transition: opacity 0.22s ease; }
.hp-fade-enter-from,   .hp-fade-leave-to     { opacity: 0; }
.hp-toast-anim-enter-active, .hp-toast-anim-leave-active { transition: all 0.25s ease; }
.hp-toast-anim-enter-from, .hp-toast-anim-leave-to { opacity: 0; transform: translateX(-50%) translateY(10px); }
</style>
