    <div class="nova-app">

      <!-- ══ BACKGROUND ORBS ══ -->
      <div class="nova-bg-orb nova-bg-orb--1"></div>
      <div class="nova-bg-orb nova-bg-orb--2"></div>
      <div class="nova-bg-orb nova-bg-orb--3"></div>

      <!-- ══ HEADER ══ -->
      <header class="nova-header">
        <div class="nova-brand-wrap">
          <div class="nova-brand"><img src="https://ik.imagekit.io/rbok01qam/Brand%20Logo%20/IMG_20260605_215459.png?tr=f-auto" alt="NovaBett" style="height:34px;width:auto;object-fit:contain;display:block;" /></div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <template v-if="!isLoggedIn">
            <button @click="openAuth('login')" class="glass-btn-auth" style="height:32px;padding:0 12px;font-size:11px;">လောဂ်အင်</button>
            <button @click="openAuth('register')" class="glass-btn-auth glass-btn-auth--primary" style="height:32px;padding:0 12px;font-size:11px;">မှတ်ပုံတင်ပါ</button>
          </template>
          <template v-else>
            <button @click="toggleLanguage" class="glass-btn-sm" style="color:rgba(20,184,166,0.9);font-size:11px;font-weight:700;padding:5px 10px;">{{ currentLang === 'en' ? '🇲🇲 မြန်မာ' : '🇬🇧 EN' }}</button>
          </template>
        </div>
      </header>

      <!-- Search -->
      <div class="nova-search-bar">
        <input v-model="searchQuery" type="text" placeholder="ဂိမ်းရှာပါ..." class="nova-input" style="padding-left:36px;" />
        <svg style="position:absolute;left:26px;top:50%;transform:translateY(-50%);" width="15" height="15" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <button @click="activeCategory='fav'" style="position:absolute;right:26px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:2px;-webkit-tap-highlight-color:transparent;">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </button>
      </div>

      <!-- MAIN LAYOUT -->
      <div style="display:flex;height:calc(100% - 90px);overflow:hidden;position:relative;">

        <!-- SIDEBAR -->
        <aside class="nova-sidebar">
          <nav class="nova-nav">
            <button v-for="cat in categories" :key="cat" @click="activeCategory = cat" :class="{ active: activeCategory === cat }" class="nova-nav-btn">
              {{ cat }}
            </button>
          </nav>
        </aside>

        <!-- CONTENT AREA -->
        <main class="nova-content">

          <!-- HOT GAMES HEADER -->
          <div class="hot-games-header">
            <div class="hot-games-title">
              <span class="hot-icon">🔥</span>
              <h2>{{ currentLang === 'en' ? 'Hot Games' : 'ရဲ့မ်း ဂိမ်းများ' }}</h2>
            </div>
            <a href="#" class="view-all-link">{{ currentLang === 'en' ? 'View All' : 'အားလုံးကြည့်ရှုပါ' }} →</a>
          </div>

          <!-- CAROUSEL/SLIDER FOR HOT GAMES -->
          <div class="carousel-container">
            <button @click="prevSlide" class="carousel-btn carousel-btn-prev">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <div class="carousel-viewport">
              <div class="carousel-track" :style="{ transform: `translateX(${-currentSlide * 260}px)` }">
                <div v-for="(game, idx) in hotGames" :key="idx" class="carousel-card">
                  <div class="carousel-img-wrapper">
                    <img :src="game.image" :alt="game.name" loading="lazy" />
                    <div class="carousel-overlay">
                      <button class="btn-play">▶</button>
                    </div>
                  </div>
                  <p class="carousel-name">{{ game.name }}</p>
                </div>
              </div>
            </div>
            <button @click="nextSlide" class="carousel-btn carousel-btn-next">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>

          <!-- GAMES GRID -->
          <div class="games-grid">
            <div v-for="game in filteredGames" :key="game.id" class="game-card" @click="selectGame(game)">
              <div class="game-card-image">
                <img :src="game.image" :alt="game.name" loading="lazy" />
                <div class="game-card-overlay">
                  <button class="btn-play-game">▶</button>
                </div>
              </div>
              <div class="game-card-info">
                <h3>{{ game.name }}</h3>
                <p class="game-rating">
                  <span>⭐ {{ game.rating }}</span>
                  <span>({{ game.players }})</span>
                </p>
              </div>
            </div>
          </div>

        </main>

      </div>

      <!-- GAME MODAL -->
      <div v-if="selectedGame" class="modal-overlay" @click="closeModal">
        <div class="modal-content" @click.stop>
          <button class="modal-close-btn" @click="closeModal">×</button>
          <div class="modal-body">
            <img :src="selectedGame.image" :alt="selectedGame.name" class="modal-image" />
            <div class="modal-info">
              <h2>{{ selectedGame.name }}</h2>
              <p class="modal-desc">{{ selectedGame.description }}</p>
              <div class="modal-stats">
                <div class="stat">
                  <span class="stat-label">{{ currentLang === 'en' ? 'Rating' : 'အဆင့်သတ်မှတ်ခြင်း' }}</span>
                  <span class="stat-value">{{ selectedGame.rating }} ⭐</span>
                </div>
                <div class="stat">
                  <span class="stat-label">{{ currentLang === 'en' ? 'Players' : 'ကစားသမား' }}</span>
                  <span class="stat-value">{{ selectedGame.players }}</span>
                </div>
              </div>
              <button class="btn-play-now">{{ currentLang === 'en' ? 'Play Now' : 'ယခုကစားပါ' }}</button>
            </div>
          </div>
        </div>
      </div>

      <!-- AUTH MODAL -->
      <div v-if="showAuthModal" class="modal-overlay" @click="closeAuth">
        <div class="modal-content" @click.stop style="max-width:400px;">
          <button class="modal-close-btn" @click="closeAuth">×</button>
          <div class="auth-form">
            <h2>{{ authMode === 'login' ? (currentLang === 'en' ? 'Sign In' : 'ဝင်ရောက်ပါ') : (currentLang === 'en' ? 'Create Account' : 'အကောင့်ဖန်တီးပါ') }}</h2>
            <input v-if="authMode === 'register'" v-model="authForm.username" type="text" :placeholder="currentLang === 'en' ? 'Username' : 'အသုံးပြုသူအမည်'" class="nova-input" />
            <input v-model="authForm.email" type="email" :placeholder="currentLang === 'en' ? 'Email' : 'အီးမေးလ်' class="nova-input" />
            <input v-model="authForm.password" type="password" :placeholder="currentLang === 'en' ? 'Password' : 'စကားဝှက်' class="nova-input" />
            <button @click="submitAuth" class="btn-auth-submit">{{ authMode === 'login' ? (currentLang === 'en' ? 'Sign In' : 'ဝင်ရောက်ပါ') : (currentLang === 'en' ? 'Create Account' : 'အကောင့်ဖန်တီးပါ') }}</button>
            <p style="text-align:center;margin-top:12px;color:rgba(255,255,255,0.6);font-size:12px;">
              <template v-if="authMode === 'login'">
                {{ currentLang === 'en' ? "Don't have an account?" : 'အကောင့်မရှိသေးပါသလား?' }}
                <button @click="authMode = 'register'" style="background:none;border:none;color:rgba(20,184,166,0.9);cursor:pointer;font-weight:700;">{{ currentLang === 'en' ? 'Sign Up' : 'မှတ်ပုံတင်ပါ' }}</button>
              </template>
              <template v-else>
                {{ currentLang === 'en' ? 'Already have an account?' : 'ပြီးသားအကောင့်ရှိပါသလား?' }}
                <button @click="authMode = 'login'" style="background:none;border:none;color:rgba(20,184,166,0.9);cursor:pointer;font-weight:700;">{{ currentLang === 'en' ? 'Sign In' : 'ဝင်ရောက်ပါ' }}</button>
              </template>
            </p>
          </div>
        </div>
      </div>

    </div>

<script setup>
import { ref, computed, onMounted } from 'vue'

const isLoggedIn = ref(false)
const showAuthModal = ref(false)
const authMode = ref('login')
const currentLang = ref('en')
const searchQuery = ref('')
const activeCategory = ref('All')
const selectedGame = ref(null)
const currentSlide = ref(0)

const authForm = ref({
  username: '',
  email: '',
  password: ''
})

const categories = ref(['All', 'Popular', 'Newest', 'Trending', 'Sports'])

const hotGames = ref([
  { name: 'Sweet Dreams', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/sweet_dreams.png?tr=f-auto,w-260' },
  { name: 'Temple Run', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/temple_run.jpg?tr=f-auto,w-260' },
  { name: 'Diamond Quest', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/diamond_quest.jpg?tr=f-auto,w-260' },
  { name: 'Flappy Bird', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/flappy_bird.jpg?tr=f-auto,w-260' },
  { name: 'Fruit Ninja', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/fruit_ninja.jpg?tr=f-auto,w-260' },
  { name: 'Candy Match', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/candy_match.png?tr=f-auto,w-260' },
  { name: 'Space Shooter', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/space_shooter.jpg?tr=f-auto,w-260' },
  { name: 'Puzzle Master', image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/puzzle_master.jpg?tr=f-auto,w-260' }
])

const allGames = ref([
  {
    id: 1,
    name: 'Sweet Dreams',
    image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/sweet_dreams.png?tr=f-auto,w-400',
    rating: 4.8,
    players: '1.2M',
    description: 'Join millions of players in this addictive candy-matching adventure. Swap and match colorful candies to complete levels and unlock sweet rewards!',
    category: 'Popular'
  },
  {
    id: 2,
    name: 'Temple Run',
    image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/temple_run.jpg?tr=f-auto,w-400',
    rating: 4.7,
    players: '890K',
    description: 'Run through ancient temples, dodge obstacles, and collect treasures. How far can you go?',
    category: 'Popular'
  },
  {
    id: 3,
    name: 'Diamond Quest',
    image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/diamond_quest.jpg?tr=f-auto,w-400',
    rating: 4.6,
    players: '756K',
    description: 'Explore mysterious caves and find precious diamonds. Uncover the secrets hidden underground!',
    category: 'Newest'
  },
  {
    id: 4,
    name: 'Flappy Bird',
    image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/flappy_bird.jpg?tr=f-auto,w-400',
    rating: 4.5,
    players: '2.1M',
    description: 'Simple yet challenging! Tap to fly and avoid the pipes. Can you beat your high score?',
    category: 'Popular'
  },
  {
    id: 5,
    name: 'Fruit Ninja',
    image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/fruit_ninja.jpg?tr=f-auto,w-400',
    rating: 4.9,
    players: '1.5M',
    description: 'Slice fruits with precision and earn high scores. Watch out for bombs!',
    category: 'Trending'
  },
  {
    id: 6,
    name: 'Candy Match',
    image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/candy_match.png?tr=f-auto,w-400',
    rating: 4.7,
    players: '980K',
    description: 'Addictive matching game with hundreds of levels. Sweet rewards await!',
    category: 'Popular'
  },
  {
    id: 7,
    name: 'Space Shooter',
    image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/space_shooter.jpg?tr=f-auto,w-400',
    rating: 4.8,
    players: '650K',
    description: 'Defend the galaxy from alien invaders. Upgrade your weapons and dominate the leaderboard!',
    category: 'Trending'
  },
  {
    id: 8,
    name: 'Puzzle Master',
    image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/puzzle_master.jpg?tr=f-auto,w-400',
    rating: 4.6,
    players: '521K',
    description: 'Challenge your mind with brain-teasing puzzles. Hundreds of levels to solve!',
    category: 'Newest'
  },
  {
    id: 9,
    name: 'Soccer Legend',
    image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/soccer_legend.jpg?tr=f-auto,w-400',
    rating: 4.7,
    players: '1.1M',
    description: 'Build your dream team and compete in online matches. Be a soccer champion!',
    category: 'Sports'
  },
  {
    id: 10,
    name: 'Basketball Pro',
    image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/basketball_pro.jpg?tr=f-auto,w-400',
    rating: 4.8,
    players: '890K',
    description: 'Master your shooting skills and win tournaments. Become a basketball superstar!',
    category: 'Sports'
  },
  {
    id: 11,
    name: 'Tennis Masters',
    image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/tennis_masters.jpg?tr=f-auto,w-400',
    rating: 4.6,
    players: '425K',
    description: 'Compete with players worldwide in thrilling tennis matches!',
    category: 'Sports'
  },
  {
    id: 12,
    name: 'Racing Rush',
    image: 'https://ik.imagekit.io/rbok01qam/games/2024-10/racing_rush.jpg?tr=f-auto,w-400',
    rating: 4.9,
    players: '1.3M',
    description: 'High-speed racing action with multiple vehicles and tracks. Race against friends!',
    category: 'Trending'
  }
])

const filteredGames = computed(() => {
  let games = allGames.value
  
  if (activeCategory.value !== 'All') {
    games = games.filter(g => g.category === activeCategory.value)
  }
  
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    games = games.filter(g => g.name.toLowerCase().includes(query))
  }
  
  return games
})

const openAuth = (mode) => {
  authMode.value = mode
  showAuthModal.value = true
}

const closeAuth = () => {
  showAuthModal.value = false
  authForm.value = { username: '', email: '', password: '' }
}

const submitAuth = () => {
  if (authForm.value.email && authForm.value.password) {
    isLoggedIn.value = true
    closeAuth()
  }
}

const toggleLanguage = () => {
  currentLang.value = currentLang.value === 'en' ? 'my' : 'en'
}

const selectGame = (game) => {
  selectedGame.value = game
}

const closeModal = () => {
  selectedGame.value = null
}

const nextSlide = () => {
  if (currentSlide.value < hotGames.value.length - 1) {
    currentSlide.value++
  }
}

const prevSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--
  }
}

onMounted(() => {
  console.log('HomePage mounted')
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.nova-app {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1a1f35 50%, #0d1420 100%);
  color: rgba(255, 255, 255, 0.9);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* ══ BACKGROUND ORBS ══ */
.nova-bg-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.15;
  pointer-events: none;
}

.nova-bg-orb--1 {
  width: 300px;
  height: 300px;
  background: rgba(20, 184, 166, 0.5);
  top: 5%;
  left: 10%;
}

.nova-bg-orb--2 {
  width: 250px;
  height: 250px;
  background: rgba(99, 102, 241, 0.4);
  top: 60%;
  right: 15%;
}

.nova-bg-orb--3 {
  width: 200px;
  height: 200px;
  background: rgba(139, 92, 246, 0.3);
  bottom: 10%;
  left: 5%;
}

/* ══ HEADER ══ */
.nova-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(20, 184, 166, 0.1);
  z-index: 100;
  gap: 12px;
}

.nova-brand-wrap {
  display: flex;
  align-items: center;
}

.nova-brand {
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 18px;
  color: rgba(20, 184, 166, 0.9);
  text-decoration: none;
}

.glass-btn-auth {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-family: inherit;
}

.glass-btn-auth:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.9);
}

.glass-btn-auth--primary {
  background: rgba(20, 184, 166, 0.2);
  border: 1px solid rgba(20, 184, 166, 0.4);
  color: rgba(20, 184, 166, 0.9);
}

.glass-btn-auth--primary:hover {
  background: rgba(20, 184, 166, 0.3);
  border-color: rgba(20, 184, 166, 0.6);
}

.glass-btn-sm {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-family: inherit;
}

.glass-btn-sm:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.25);
}

/* ══ SEARCH BAR ══ */
.nova-search-bar {
  position: relative;
  margin: 12px 20px 0;
  padding-bottom: 12px;
}

.nova-input {
  width: 100%;
  padding: 10px 16px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.9);
  font-size: 13px;
  font-family: inherit;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.nova-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(20, 184, 166, 0.5);
  box-shadow: 0 0 0 3px rgba(20, 184, 166, 0.1);
}

.nova-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

/* ══ MAIN LAYOUT ══ */
.nova-content {
  flex: 1;
  overflow-y: auto;
  padding: 12px 20px;
  scrollbar-width: thin;
  scrollbar-color: rgba(20, 184, 166, 0.3) transparent;
}

.nova-content::-webkit-scrollbar {
  width: 8px;
}

.nova-content::-webkit-scrollbar-track {
  background: transparent;
}

.nova-content::-webkit-scrollbar-thumb {
  background: rgba(20, 184, 166, 0.3);
  border-radius: 4px;
}

.nova-content::-webkit-scrollbar-thumb:hover {
  background: rgba(20, 184, 166, 0.5);
}

/* ══ SIDEBAR ══ */
.nova-sidebar {
  width: 140px;
  background: rgba(15, 23, 42, 0.5);
  border-right: 1px solid rgba(20, 184, 166, 0.1);
  padding: 12px 0;
  overflow-y: auto;
  overflow-x: hidden;
}

.nova-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 8px;
}

.nova-nav-btn {
  padding: 8px 12px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  transition: all 0.3s ease;
  font-family: inherit;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nova-nav-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.8);
}

.nova-nav-btn.active {
  background: rgba(20, 184, 166, 0.2);
  color: rgba(20, 184, 166, 0.9);
  border-left: 3px solid rgba(20, 184, 166, 0.9);
  padding-left: 9px;
}

/* ══ HOT GAMES HEADER ══ */
.hot-games-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  margin-top: 0;
}

.hot-games-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hot-games-title h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
}

.hot-icon {
  font-size: 24px;
  display: inline-block;
}

.view-all-link {
  color: rgba(20, 184, 166, 0.8);
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.view-all-link:hover {
  color: rgba(20, 184, 166, 0.95);
}

/* ══ CAROUSEL ══ */
.carousel-container {
  position: relative;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.carousel-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.7);
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  flex-shrink: 0;
}

.carousel-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
}

.carousel-viewport {
  flex: 1;
  overflow: hidden;
}

.carousel-track {
  display: flex;
  gap: 12px;
  transition: transform 0.3s ease;
}

.carousel-card {
  flex-shrink: 0;
  width: 240px;
}

.carousel-img-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(20, 184, 166, 0.1);
}

.carousel-img-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.carousel-img-wrapper:hover .carousel-overlay {
  background: rgba(0, 0, 0, 0.4);
}

.btn-play {
  width: 50px;
  height: 50px;
  background: rgba(20, 184, 166, 0.8);
  border: none;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.btn-play:hover {
  background: rgba(20, 184, 166, 0.95);
  transform: scale(1.1);
}

.carousel-name {
  margin: 8px 0 0 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ══ GAMES GRID ══ */
.games-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.game-card {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(20, 184, 166, 0.1);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.game-card:hover {
  border-color: rgba(20, 184, 166, 0.3);
  background: rgba(255, 255, 255, 0.08);
  transform: translateY(-4px);
}

.game-card-image {
  position: relative;
  width: 100%;
  padding-bottom: 100%;
  overflow: hidden;
  background: rgba(20, 184, 166, 0.1);
}

.game-card-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.game-card:hover .game-card-image img {
  transform: scale(1.05);
}

.game-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s ease;
}

.game-card:hover .game-card-overlay {
  background: rgba(0, 0, 0, 0.4);
}

.btn-play-game {
  width: 40px;
  height: 40px;
  background: rgba(20, 184, 166, 0.8);
  border: none;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  opacity: 0;
}

.game-card:hover .btn-play-game {
  opacity: 1;
  transform: scale(1.1);
}

.btn-play-game:hover {
  background: rgba(20, 184, 166, 0.95);
}

.game-card-info {
  padding: 8px;
}

.game-card-info h3 {
  margin: 0 0 4px 0;
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.game-rating {
  margin: 0;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

/* ══ MODAL OVERLAY ══ */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: linear-gradient(135deg, #1a1f35 0%, #0f172a 100%);
  border: 1px solid rgba(20, 184, 166, 0.2);
  border-radius: 16px;
  padding: 20px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.modal-close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: rgba(255, 255, 255, 0.8);
  width: 32px;
  height: 32px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.modal-close-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
}

.modal-body {
  display: flex;
  gap: 20px;
}

.modal-image {
  width: 150px;
  height: 150px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
}

.modal-info {
  flex: 1;
}

.modal-info h2 {
  margin: 0 0 8px 0;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.95);
}

.modal-desc {
  margin: 0 0 12px 0;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 1.5;
}

.modal-stats {
  display: flex;
  gap: 12px;
  margin: 12px 0;
}

.stat {
  flex: 1;
  background: rgba(20, 184, 166, 0.1);
  border: 1px solid rgba(20, 184, 166, 0.2);
  padding: 8px;
  border-radius: 8px;
}

.stat-label {
  display: block;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 4px;
}

.stat-value {
  display: block;
  font-size: 14px;
  font-weight: 700;
  color: rgba(20, 184, 166, 0.9);
}

.btn-play-now {
  width: 100%;
  padding: 10px;
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.8), rgba(20, 184, 166, 0.6));
  border: 1px solid rgba(20, 184, 166, 0.5);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 12px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.btn-play-now:hover {
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.95), rgba(20, 184, 166, 0.75));
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(20, 184, 166, 0.2);
}

/* ══ AUTH FORM ══ */
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.auth-form h2 {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: rgba(255, 255, 255, 0.95);
}

.btn-auth-submit {
  padding: 10px;
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.8), rgba(20, 184, 166, 0.6));
  border: 1px solid rgba(20, 184, 166, 0.5);
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 13px;
  transition: all 0.3s ease;
  font-family: inherit;
}

.btn-auth-submit:hover {
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.95), rgba(20, 184, 166, 0.75));
  transform: translateY(-2px);
}

/* ══ RESPONSIVE ══ */
@media (max-width: 768px) {
  .nova-sidebar {
    width: auto;
    height: 60px;
    border-right: none;
    border-bottom: 1px solid rgba(20, 184, 166, 0.1);
    padding: 0 12px;
  }

  .nova-nav {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
  }

  .games-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  .modal-body {
    flex-direction: column;
    align-items: center;
  }

  .modal-image {
    width: 200px;
    height: 200px;
  }

  .carousel-card {
    width: 180px;
  }
}

@media (max-width: 480px) {
  .nova-header {
    padding: 10px 12px;
  }

  .nova-search-bar {
    margin: 8px 12px 0;
  }

  .nova-content {
    padding: 8px 12px;
  }

  .hot-games-title h2 {
    font-size: 16px;
  }

  .carousel-card {
    width: 140px;
  }

  .games-grid {
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 8px;
  }

  .game-card-info {
    padding: 6px;
  }

  .game-card-info h3 {
    font-size: 10px;
  }

  .game-rating {
    font-size: 10px;
  }

  .modal-content {
    padding: 16px;
  }

  .modal-body {
    gap: 12px;
  }

  .modal-image {
    width: 140px;
    height: 140px;
  }

  .nova-brand {
    font-size: 14px;
  }

  .glass-btn-auth,
  .glass-btn-auth--primary {
    height: 28px;
    padding: 0 10px;
    font-size: 10px;
  }

  .carousel-btn {
    width: 36px;
    height: 36px;
  }

  .carousel-btn svg {
    width: 18px;
    height: 18px;
  }

  .modal-close-btn {
    width: 28px;
    height: 28px;
    font-size: 20px;
  }

  .nova-fab-stack { bottom: 75px; right: 6px; }
  .nova-fab-stack-left { bottom: 75px; left: 6px; }
}
</style>
