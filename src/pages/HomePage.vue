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
          <svg width="18" height="18" fill="currentColor" style="color:rgba(255,255,255,0.3);transition:color 0.2s;" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        </button>
      </div>

      <!-- Hot Games Header Section -->
      <div class="hot-games-header">
        <h2 style="font-size:13px;font-weight:700;color:rgba(20,184,166,1);text-transform:uppercase;letter-spacing:0.5px;margin:0;padding:0 24px;">🔥 ဒ၀စြဋ္ဌ ကစ်မ်းများ</h2>
      </div>

      <!-- Hot Games Carousel -->
      <div class="hot-games-carousel">
        <div v-for="game in hotGames" :key="game.id" class="game-card game-card--hot" @click="selectGame(game)">
          <div class="game-card-bg">
            <div class="game-card-overlay"></div>
            <img :src="game.image" :alt="game.name" style="width:100%;height:100%;object-fit:cover;" />
          </div>
          <div class="game-card-content">
            <div class="game-card-title">{{ game.name }}</div>
            <div class="game-card-provider" style="font-size:10px;color:rgba(20,184,166,0.8);">{{ game.provider }}</div>
          </div>
        </div>
      </div>

      <!-- Categories -->
      <div class="categories-wrapper">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          :class="['category-btn', { active: activeCategory === cat }]"
          style="text-transform:capitalize;"
        >
          {{ getCategoryLabel(cat) }}
        </button>
      </div>

      <!-- Games Grid -->
      <div class="games-grid">
        <div v-for="game in filteredGames" :key="game.id" class="game-card" @click="selectGame(game)">
          <div class="game-card-bg">
            <div class="game-card-overlay"></div>
            <img :src="game.image" :alt="game.name" style="width:100%;height:100%;object-fit:cover;" />
          </div>
          <div class="game-card-content">
            <div class="game-card-title">{{ game.name }}</div>
            <div class="game-card-provider">{{ game.provider }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Auth Modal -->
    <transition name="fade">
      <div v-if="showAuthModal" class="auth-modal-overlay" @click="closeAuth">
        <div class="auth-modal" @click.stop>
          <button class="auth-modal-close" @click="closeAuth">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
          <h2 v-if="authMode === 'login'" style="color:rgba(255,255,255,0.95);margin:0 0 20px 0;text-align:center;font-size:18px;font-weight:700;">လောဂ်အင်ကျေးဇူးပြု၍</h2>
          <h2 v-else style="color:rgba(255,255,255,0.95);margin:0 0 20px 0;text-align:center;font-size:18px;font-weight:700;">အကောင်တင်မှတ်ပုံတင်ပါ</h2>
          
          <div v-if="authMode === 'login'">
            <input v-model="loginForm.email" type="email" placeholder="အီမေးလ်" class="nova-input" />
            <input v-model="loginForm.password" type="password" placeholder="စကားဝှက်" class="nova-input" style="margin-top:12px;" />
            <button @click="handleLogin" class="glass-btn-auth glass-btn-auth--primary" style="width:100%;margin-top:20px;height:40px;">လောဂ်အင်ကျေးဇူးပြု၍</button>
            <div style="text-align:center;margin-top:12px;font-size:12px;color:rgba(255,255,255,0.6);">
              အကောင်းမြင်သည်နည်း
              <button @click="authMode='register'" style="background:none;border:none;color:rgba(20,184,166,0.9);cursor:pointer;font-weight:700;">မှတ်ပုံတင်ပါ</button>
            </div>
          </div>

          <div v-else>
            <input v-model="registerForm.email" type="email" placeholder="အီမေးလ်" class="nova-input" />
            <input v-model="registerForm.password" type="password" placeholder="စကားဝှက်" class="nova-input" style="margin-top:12px;" />
            <input v-model="registerForm.confirmPassword" type="password" placeholder="စကားဝှက်အတည်ပြုကြည့်ရှုပါ" class="nova-input" style="margin-top:12px;" />
            <button @click="handleRegister" class="glass-btn-auth glass-btn-auth--primary" style="width:100%;margin-top:20px;height:40px;">မှတ်ပုံတင်ပါ</button>
            <div style="text-align:center;margin-top:12px;font-size:12px;color:rgba(255,255,255,0.6);">
              အကောင်းမြင်သည်နည်း
              <button @click="authMode='login'" style="background:none;border:none;color:rgba(20,184,166,0.9);cursor:pointer;font-weight:700;">လောဂ်အင်ကျေးဇူးပြု၍</button>
            </div>
          </div>
        </div>
      </div>
    </transition>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      isLoggedIn: false,
      currentLang: 'mm',
      searchQuery: '',
      activeCategory: 'all',
      showAuthModal: false,
      authMode: 'login',
      loginForm: {
        email: '',
        password: ''
      },
      registerForm: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      categories: ['all', 'slots', 'table', 'live', 'sports'],
      games: [
        { id: 1, name: 'Dragon Fortune', provider: 'PragmaticPlay', image: 'https://via.placeholder.com/200x280?text=Dragon+Fortune', category: 'slots' },
        { id: 2, name: 'Sweet Bonanza', provider: 'PragmaticPlay', image: 'https://via.placeholder.com/200x280?text=Sweet+Bonanza', category: 'slots' },
        { id: 3, name: 'Blackjack Pro', provider: 'Evolution', image: 'https://via.placeholder.com/200x280?text=Blackjack+Pro', category: 'table' },
        { id: 4, name: 'Roulette Master', provider: 'Evolution', image: 'https://via.placeholder.com/200x280?text=Roulette+Master', category: 'table' },
        { id: 5, name: 'Live Baccarat', provider: 'Evolution', image: 'https://via.placeholder.com/200x280?text=Live+Baccarat', category: 'live' },
        { id: 6, name: 'Football Betting', provider: 'SBTech', image: 'https://via.placeholder.com/200x280?text=Football+Betting', category: 'sports' },
        { id: 7, name: 'Book of Dead', provider: 'PragmaticPlay', image: 'https://via.placeholder.com/200x280?text=Book+of+Dead', category: 'slots' },
        { id: 8, name: 'Starburst', provider: 'NetEnt', image: 'https://via.placeholder.com/200x280?text=Starburst', category: 'slots' },
        { id: 9, name: 'Texas Hold Em', provider: 'Evolution', image: 'https://via.placeholder.com/200x280?text=Texas+Hold+Em', category: 'table' },
        { id: 10, name: 'Basketball Betting', provider: 'SBTech', image: 'https://via.placeholder.com/200x280?text=Basketball+Betting', category: 'sports' },
        { id: 11, name: 'Gates of Olympus', provider: 'PragmaticPlay', image: 'https://via.placeholder.com/200x280?text=Gates+of+Olympus', category: 'slots' },
        { id: 12, name: 'Pragmatic Live', provider: 'PragmaticPlay', image: 'https://via.placeholder.com/200x280?text=Pragmatic+Live', category: 'live' }
      ],
      hotGames: [
        { id: 1, name: 'Dragon Fortune', provider: 'PragmaticPlay', image: 'https://via.placeholder.com/300x200?text=Dragon+Fortune' },
        { id: 2, name: 'Sweet Bonanza', provider: 'PragmaticPlay', image: 'https://via.placeholder.com/300x200?text=Sweet+Bonanza' },
        { id: 7, name: 'Book of Dead', provider: 'PragmaticPlay', image: 'https://via.placeholder.com/300x200?text=Book+of+Dead' }
      ]
    }
  },
  computed: {
    filteredGames() {
      if (this.activeCategory === 'fav') {
        return this.games.slice(0, 6);
      }
      if (this.activeCategory === 'all') {
        return this.games.filter(g => {
          const matchesSearch = g.name.toLowerCase().includes(this.searchQuery.toLowerCase());
          return matchesSearch;
        });
      }
      return this.games.filter(g => g.category === this.activeCategory && g.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    }
  },
  methods: {
    openAuth(mode) {
      this.authMode = mode;
      this.showAuthModal = true;
    },
    closeAuth() {
      this.showAuthModal = false;
      this.loginForm = { email: '', password: '' };
      this.registerForm = { email: '', password: '', confirmPassword: '' };
    },
    handleLogin() {
      if (this.loginForm.email && this.loginForm.password) {
        this.isLoggedIn = true;
        this.closeAuth();
      }
    },
    handleRegister() {
      if (this.registerForm.email && this.registerForm.password && this.registerForm.password === this.registerForm.confirmPassword) {
        this.isLoggedIn = true;
        this.closeAuth();
      }
    },
    toggleLanguage() {
      this.currentLang = this.currentLang === 'en' ? 'mm' : 'en';
    },
    selectGame(game) {
      console.log('Game selected:', game);
      this.$emit('game-selected', game);
    },
    getCategoryLabel(cat) {
      const labels = {
        all: 'အားလုံး',
        slots: 'စလော့ต်စ်',
        table: 'စားပွဲ',
        live: 'တွင်ခိုင်း',
        sports: 'ကစ်လုံး',
        fav: '၎င်း၏နောက်တစ်ခု'
      };
      return labels[cat] || cat;
    }
  }
}
</script>

<style scoped>
.nova-app {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #0f1535 50%, #0a0e27 100%);
  color: rgba(255, 255, 255, 0.95);
  overflow-x: hidden;
  padding-bottom: 40px;
}

/* ══ BACKGROUND ORBS ══ */
.nova-bg-orb {
  position: fixed;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.08;
  z-index: 0;
  pointer-events: none;
}

.nova-bg-orb--1 {
  width: 300px;
  height: 300px;
  background: rgba(20, 184, 166, 0.5);
  top: 10%;
  right: 10%;
  animation: float 20s ease-in-out infinite;
}

.nova-bg-orb--2 {
  width: 250px;
  height: 250px;
  background: rgba(59, 130, 246, 0.3);
  bottom: 20%;
  left: 5%;
  animation: float 25s ease-in-out infinite reverse;
}

.nova-bg-orb--3 {
  width: 200px;
  height: 200px;
  background: rgba(20, 184, 166, 0.3);
  top: 50%;
  left: 50%;
  animation: float 30s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, -30px); }
}

/* ══ HEADER ══ */
.nova-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: rgba(10, 14, 39, 0.8);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(20, 184, 166, 0.1);
  z-index: 1000;
}

.nova-brand-wrap {
  display: flex;
  align-items: center;
  height: 100%;
}

.nova-brand {
  display: flex;
  align-items: center;
  height: 100%;
}

.glass-btn-auth {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(20, 184, 166, 0.3);
  color: rgba(20, 184, 166, 0.9);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
}

.glass-btn-auth:hover {
  background: rgba(20, 184, 166, 0.1);
  border-color: rgba(20, 184, 166, 0.6);
  color: rgba(20, 184, 166, 1);
}

.glass-btn-auth--primary {
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.3) 0%, rgba(20, 184, 166, 0.1) 100%);
  border-color: rgba(20, 184, 166, 0.6);
  color: rgba(20, 184, 166, 1);
}

.glass-btn-auth--primary:hover {
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.4) 0%, rgba(20, 184, 166, 0.2) 100%);
  border-color: rgba(20, 184, 166, 0.8);
}

.glass-btn-sm {
  background: transparent;
  border: 1px solid rgba(20, 184, 166, 0.3);
  color: rgba(20, 184, 166, 0.8);
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 11px;
  cursor: pointer;
  transition: all 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.glass-btn-sm:hover {
  background: rgba(20, 184, 166, 0.1);
  border-color: rgba(20, 184, 166, 0.6);
  color: rgba(20, 184, 166, 1);
}

/* ══ SEARCH BAR ══ */
.nova-search-bar {
  position: fixed;
  top: 70px;
  left: 24px;
  right: 24px;
  height: 40px;
  display: flex;
  align-items: center;
  z-index: 100;
  margin-bottom: 20px;
}

.nova-input {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(20, 184, 166, 0.2);
  border-radius: 8px;
  padding: 0 12px;
  color: rgba(255, 255, 255, 0.95);
  font-size: 12px;
  outline: none;
  transition: all 0.2s ease;
}

.nova-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.nova-input:focus {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(20, 184, 166, 0.5);
  box-shadow: 0 0 10px rgba(20, 184, 166, 0.15);
}

/* ══ HOT GAMES HEADER ══ */
.hot-games-header {
  margin-top: 130px;
  padding-top: 20px;
  border-top: 1px solid rgba(20, 184, 166, 0.1);
}

/* ══ HOT GAMES CAROUSEL ══ */
.hot-games-carousel {
  display: flex;
  gap: 16px;
  padding: 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.hot-games-carousel::-webkit-scrollbar {
  display: none;
}

.game-card--hot {
  flex: 0 0 280px;
  height: 160px;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
}

.game-card--hot:hover {
  transform: scale(1.02);
}

.game-card--hot .game-card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  background: linear-gradient(to top, rgba(10, 14, 39, 0.95), transparent);
}

/* ══ CATEGORIES ══ */
.categories-wrapper {
  display: flex;
  gap: 12px;
  padding: 0 24px 20px 24px;
  overflow-x: auto;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}

.categories-wrapper::-webkit-scrollbar {
  display: none;
}

.category-btn {
  flex-shrink: 0;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(20, 184, 166, 0.2);
  color: rgba(255, 255, 255, 0.7);
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  -webkit-tap-highlight-color: transparent;
}

.category-btn:hover {
  background: rgba(20, 184, 166, 0.1);
  border-color: rgba(20, 184, 166, 0.4);
  color: rgba(20, 184, 166, 0.9);
}

.category-btn.active {
  background: linear-gradient(135deg, rgba(20, 184, 166, 0.3) 0%, rgba(20, 184, 166, 0.1) 100%);
  border-color: rgba(20, 184, 166, 0.6);
  color: rgba(20, 184, 166, 1);
}

/* ══ GAMES GRID ══ */
.games-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 0 24px 40px 24px;
}

@media (min-width: 768px) {
  .games-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 1024px) {
  .games-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.game-card {
  aspect-ratio: 3/4;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(20, 184, 166, 0.1);
}

.game-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(20, 184, 166, 0.2);
}

.game-card-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: rgba(20, 30, 55, 0.5);
}

.game-card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(10, 14, 39, 0.6) 100%);
  z-index: 2;
}

.game-card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  z-index: 3;
}

.game-card-title {
  font-size: 13px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 4px;
}

.game-card-provider {
  font-size: 11px;
  color: rgba(20, 184, 166, 0.7);
  font-weight: 500;
}

/* ══ AUTH MODAL ══ */
.auth-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
}

.auth-modal {
  position: relative;
  background: linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(15, 21, 53, 0.95) 100%);
  border: 1px solid rgba(20, 184, 166, 0.2);
  border-radius: 16px;
  padding: 32px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 20px 60px rgba(20, 184, 166, 0.1);
}

.auth-modal-close {
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  -webkit-tap-highlight-color: transparent;
}

.auth-modal-close:hover {
  color: rgba(255, 255, 255, 0.9);
}

.auth-modal .nova-input {
  width: 100%;
  margin-bottom: 16px;
  box-sizing: border-box;
}

/* ══ TRANSITIONS ══ */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>