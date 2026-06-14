<template>
    <div class="nova-app">

      <!-- ══ HEADER ══ -->
      <header class="nova-header">
        <div class="nova-brand-wrap">
          <div class="nova-brand"><img src="https://ik.imagekit.io/rbok01qam/Brand%20Logo%20/IMG_20260605_215459.png?tr=f-auto" alt="NovaBett" style="height:34px;width:auto;object-fit:contain;display:block;" /></div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <template v-if="!isLoggedIn">
            <button @click="openAuth('login')" class="glass-btn-auth" style="height:32px;padding:0 13px;font-size:12px;">လောဂ်အင်</button>
            <button @click="openAuth('register')" class="glass-btn-auth glass-btn-auth--primary" style="height:32px;padding:0 13px;font-size:12px;">မှတ်ပုံတင်ပါ</button>
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
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </button>
      </div>

      <!-- Category Tabs -->
      <div class="nova-category-tabs">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="activeCategory = cat"
          :class="['nova-category-tab', { 'nova-category-tab--active': activeCategory === cat }]"
        >
          {{ getCategoryLabel(cat) }}
        </button>
      </div>

      <!-- Games Grid -->
      <div class="nova-games-grid">
        <template v-if="filteredGames.length > 0">
          <div
            v-for="game in filteredGames"
            :key="game.id"
            class="nova-game-card"
            @click="selectGame(game)"
          >
            <div class="nova-card-image-wrap">
              <img :src="game.image" :alt="game.name" class="nova-card-image" />
              <div class="nova-card-overlay">
                <button class="nova-play-btn">▶</button>
              </div>
              <div v-if="isFavorite(game.id)" class="nova-favorite-badge">♡</div>
            </div>
            <div class="nova-card-content">
              <h3 class="nova-card-title">{{ game.name }}</h3>
              <p class="nova-card-rating">{{ game.rating ? '⭐ ' + game.rating : 'N/A' }}</p>
            </div>
          </div>
        </template>
        <div v-else class="nova-empty-state">{{ emptyMessage }}</div>
      </div>

      <!-- Game Modal -->
      <div v-if="selectedGame" class="nova-modal-overlay" @click="closeGame">
        <div class="nova-modal" @click.stop>
          <button class="nova-modal-close" @click="closeGame">×</button>
          <img :src="selectedGame.image" :alt="selectedGame.name" class="nova-modal-image" />
          <h2 class="nova-modal-title">{{ selectedGame.name }}</h2>
          <p class="nova-modal-description">{{ selectedGame.description }}</p>
          <p class="nova-modal-rating">{{ selectedGame.rating ? '⭐ Rating: ' + selectedGame.rating : 'Rating: N/A' }}</p>
          <div style="display:flex;gap:8px;margin-top:16px;">
            <button @click="playGame" class="nova-btn nova-btn--primary" style="flex:1;">Play Now</button>
            <button @click="toggleFavorite" class="nova-btn" style="flex:1;">{{ isFavorite(selectedGame.id) ? '♡ Favorited' : '♢ Add to Favorites' }}</button>
          </div>
        </div>
      </div>

      <!-- Auth Modal -->
      <div v-if="authModal.isOpen" class="nova-modal-overlay" @click="closeAuth">
        <div class="nova-modal nova-modal--auth" @click.stop>
          <button class="nova-modal-close" @click="closeAuth">×</button>
          <h2>{{ authModal.mode === 'login' ? 'Login' : 'Register' }}</h2>
          
          <form @submit.prevent="handleAuth">
            <input
              v-if="authModal.mode === 'register'"
              v-model="authForm.email"
              type="email"
              placeholder="Email"
              class="nova-input"
              required
            />
            <input
              v-if="authModal.mode === 'register'"
              v-model="authForm.username"
              type="text"
              placeholder="Username"
              class="nova-input"
              required
            />
            <input
              v-model="authForm.password"
              type="password"
              placeholder="Password"
              class="nova-input"
              required
            />
            <button type="submit" class="nova-btn nova-btn--primary" style="width:100%;margin-top:12px;">{{ authModal.mode === 'login' ? 'Login' : 'Register' }}</button>
          </form>
          
          <div style="text-align:center;margin-top:16px;">
            <span style="font-size:12px;color:rgba(255,255,255,0.6);">
              {{ authModal.mode === 'login' ? "Don't have an account? " : 'Already have an account? ' }}
              <button @click="authModal.mode = authModal.mode === 'login' ? 'register' : 'login'" style="background:none;border:none;color:rgba(20,184,166,0.9);cursor:pointer;text-decoration:underline;font-size:12px;">{{ authModal.mode === 'login' ? 'Register' : 'Login' }}</button>
            </span>
          </div>
        </div>
      </div>

      <!-- FAB Menu -->
      <div class="nova-fab-container">
        <button class="nova-fab" @click="toggleFabMenu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
        </button>
        <template v-if="fabMenuOpen">
          <button class="nova-fab-menu-item" style="bottom:85px;" @click="openSettings">⚙</button>
          <button class="nova-fab-menu-item" style="bottom:145px;" @click="openAuth('login')">👤</button>
          <button class="nova-fab-menu-item" style="bottom:205px;" @click="goHome">🏠</button>
        </template>
      </div>

    </div>
  </template>

  <script setup>
    import { ref, computed, onMounted, reactive } from 'vue';

    const currentLang = ref('en');
    const searchQuery = ref('');
    const activeCategory = ref('all');
    const selectedGame = ref(null);
    const isLoggedIn = ref(false);
    const fabMenuOpen = ref(false);

    const authModal = reactive({
      isOpen: false,
      mode: 'login'
    });

    const authForm = reactive({
      email: '',
      username: '',
      password: ''
    });

    const categories = [
      'all',
      'sports',
      'casino',
      'live',
      'crash',
      'slots',
      'table',
      'fav'
    ];

    const games = [
      {
        id: 1,
        name: 'Football Match',
        category: 'sports',
        image: 'https://ik.imagekit.io/rbok01qam/FB_IMG_1717506437262.jpg',
        rating: 4.8,
        description: 'Live football streaming with betting options.'
      },
      {
        id: 2,
        name: 'European Roulette',
        category: 'casino',
        image: 'https://ik.imagekit.io/rbok01qam/11661343.jpg',
        rating: 4.6,
        description: 'Classic European roulette with live dealers.'
      },
      {
        id: 3,
        name: 'Live Baccarat',
        category: 'live',
        image: 'https://ik.imagekit.io/rbok01qam/2048x1152-baccarat-wallpaper-preview.jpg',
        rating: 4.7,
        description: 'Professional live baccarat experience.'
      },
      {
        id: 4,
        name: 'Crash Game',
        category: 'crash',
        image: 'https://ik.imagekit.io/rbok01qam/maxresdefault.jpg',
        rating: 4.5,
        description: 'High-speed crash game with multipliers.'
      },
      {
        id: 5,
        name: 'Lucky Spin Slots',
        category: 'slots',
        image: 'https://ik.imagekit.io/rbok01qam/1000_F_429857474_g3YoAMRtXEPVYyQfaHJN9lU2nL1kJ5D2.jpg',
        rating: 4.3,
        description: 'Exciting slot machine with big payouts.'
      },
      {
        id: 6,
        name: 'Blackjack Master',
        category: 'table',
        image: 'https://ik.imagekit.io/rbok01qam/Blackjack-Wallpaper.jpg',
        rating: 4.9,
        description: 'Professional blackjack with strategy guide.'
      },
      {
        id: 7,
        name: 'Tennis Championship',
        category: 'sports',
        image: 'https://ik.imagekit.io/rbok01qam/RF_LIFESTYLE_TENNIS.jpg',
        rating: 4.4,
        description: 'Live tennis betting with multiple options.'
      },
      {
        id: 8,
        name: 'Dragon Fire Slots',
        category: 'slots',
        image: 'https://ik.imagekit.io/rbok01qam/dragon-fire-slot.jpg',
        rating: 4.2,
        description: 'Dragon-themed slots with free spins.'
      }
    ];

    const favorites = ref(new Set());

    const getCategoryLabel = (cat) => {
      const labels = {
        all: currentLang.value === 'en' ? 'All Games' : 'အားလုံး',
        sports: currentLang.value === 'en' ? 'Sports' : 'အားကစ်',
        casino: currentLang.value === 'en' ? 'Casino' : 'ကာစီနို',
        live: currentLang.value === 'en' ? 'Live' : 'အသက်ဝင်',
        crash: currentLang.value === 'en' ? 'Crash' : 'ကျင့်နိုင်း',
        slots: currentLang.value === 'en' ? 'Slots' : 'စလော့ట်',
        table: currentLang.value === 'en' ? 'Table' : 'စားပွဲ',
        fav: currentLang.value === 'en' ? 'Favorites' : 'နှစ်သက်ခြင်း'
      };
      return labels[cat] || cat;
    };

    const filteredGames = computed(() => {
      let result = games;
      
      if (activeCategory.value !== 'all' && activeCategory.value !== 'fav') {
        result = result.filter(g => g.category === activeCategory.value);
      } else if (activeCategory.value === 'fav') {
        result = result.filter(g => favorites.value.has(g.id));
      }
      
      if (searchQuery.value) {
        result = result.filter(g => 
          g.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      
      return result;
    });

    const emptyMessage = computed(() => {
      if (activeCategory.value === 'fav' && favorites.value.size === 0) {
        return currentLang.value === 'en' ? 'No favorites yet' : 'နှစ်သက်သည့်အရာများမရှိသေးပါ';
      }
      return currentLang.value === 'en' ? 'No games found' : 'ဂိမ်းများမတွေ့ရှိပါ';
    });

    const selectGame = (game) => {
      selectedGame.value = game;
    };

    const closeGame = () => {
      selectedGame.value = null;
    };

    const playGame = () => {
      alert(`Playing: ${selectedGame.value.name}`);
      closeGame();
    };

    const toggleFavorite = () => {
      const id = selectedGame.value.id;
      if (favorites.value.has(id)) {
        favorites.value.delete(id);
      } else {
        favorites.value.add(id);
      }
    };

    const isFavorite = (id) => {
      return favorites.value.has(id);
    };

    const openAuth = (mode) => {
      authModal.isOpen = true;
      authModal.mode = mode;
    };

    const closeAuth = () => {
      authModal.isOpen = false;
      authForm.email = '';
      authForm.username = '';
      authForm.password = '';
    };

    const handleAuth = () => {
      if (authForm.password.length < 6) {
        alert(currentLang.value === 'en' ? 'Password must be at least 6 characters' : 'စကားဝှက်သည် အနည်းငယ်ဆိုလျှင် ၆ လုံးရှိရမည်');
        return;
      }
      isLoggedIn.value = true;
      closeAuth();
    };

    const toggleLanguage = () => {
      currentLang.value = currentLang.value === 'en' ? 'my' : 'en';
    };

    const toggleFabMenu = () => {
      fabMenuOpen.value = !fabMenuOpen.value;
    };

    const openSettings = () => {
      alert(currentLang.value === 'en' ? 'Settings feature coming soon' : '세팅 အင်္ဂါရပ် မကြေးမီ');
      toggleFabMenu();
    };

    const goHome = () => {
      activeCategory.value = 'all';
      searchQuery.value = '';
      selectedGame.value = null;
      toggleFabMenu();
    };

    onMounted(() => {
      // Initialize with some favorite games
      favorites.value.add(1);
      favorites.value.add(6);
    });
  </script>

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    .nova-app {
      width: 100%;
      min-height: 100vh;
      background: linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 50%, #16213e 100%);
      color: #fff;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      position: relative;
      overflow: hidden;
    }

    .nova-bg-orb {
      position: absolute;
      border-radius: 50%;
      opacity: 0.15;
      filter: blur(60px);
    }

    .nova-bg-orb--1 {
      width: 300px;
      height: 300px;
      background: rgba(20, 184, 166, 0.5);
      top: -100px;
      right: -50px;
      animation: float 8s ease-in-out infinite;
    }

    .nova-bg-orb--2 {
      width: 250px;
      height: 250px;
      background: rgba(99, 102, 241, 0.4);
      bottom: 10%;
      left: -30px;
      animation: float 10s ease-in-out infinite reverse;
    }

    .nova-bg-orb--3 {
      width: 200px;
      height: 200px;
      background: rgba(168, 85, 247, 0.3);
      bottom: 20%;
      right: 10%;
      animation: float 12s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translate(0, 0); }
      25% { transform: translate(20px, -20px); }
      50% { transform: translate(-10px, 10px); }
      75% { transform: translate(15px, 5px); }
    }

    .nova-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 20px;
      background: rgba(15, 15, 30, 0.4);
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(20, 184, 166, 0.1);
      position: relative;
      z-index: 10;
    }

    .nova-brand-wrap {
      display: flex;
      align-items: center;
    }

    .nova-brand {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
    }

    .glass-btn-auth,
    .glass-btn-auth--primary,
    .glass-btn-sm {
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(20, 184, 166, 0.3);
      color: rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      font-size: 12px;
    }

    .glass-btn-auth:hover,
    .glass-btn-auth--primary:hover,
    .glass-btn-sm:hover {
      background: rgba(20, 184, 166, 0.15);
      border-color: rgba(20, 184, 166, 0.6);
    }

    .glass-btn-auth--primary {
      background: rgba(20, 184, 166, 0.2);
      border-color: rgba(20, 184, 166, 0.5);
      color: rgba(20, 184, 166, 0.95);
    }

    .glass-btn-auth--primary:hover {
      background: rgba(20, 184, 166, 0.3);
    }

    .nova-search-bar {
      position: relative;
      margin: 16px 20px;
      display: flex;
      align-items: center;
    }

    .nova-input {
      width: 100%;
      padding: 10px 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(20, 184, 166, 0.2);
      border-radius: 8px;
      color: rgba(255, 255, 255, 0.9);
      font-size: 14px;
      transition: all 0.3s ease;
    }

    .nova-input::placeholder {
      color: rgba(255, 255, 255, 0.3);
    }

    .nova-input:focus {
      outline: none;
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(20, 184, 166, 0.5);
      box-shadow: 0 0 20px rgba(20, 184, 166, 0.1);
    }

    .nova-category-tabs {
      display: flex;
      gap: 8px;
      padding: 12px 20px;
      overflow-x: auto;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
    }

    .nova-category-tabs::-webkit-scrollbar {
      height: 2px;
    }

    .nova-category-tabs::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.05);
    }

    .nova-category-tabs::-webkit-scrollbar-thumb {
      background: rgba(20, 184, 166, 0.3);
      border-radius: 1px;
    }

    .nova-category-tab {
      flex-shrink: 0;
      padding: 8px 16px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(20, 184, 166, 0.2);
      border-radius: 20px;
      color: rgba(255, 255, 255, 0.7);
      cursor: pointer;
      transition: all 0.3s ease;
      white-space: nowrap;
      font-size: 13px;
      font-weight: 500;
    }

    .nova-category-tab:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(20, 184, 166, 0.4);
    }

    .nova-category-tab--active {
      background: rgba(20, 184, 166, 0.25);
      border-color: rgba(20, 184, 166, 0.6);
      color: rgba(20, 184, 166, 0.95);
    }

    .nova-games-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 12px;
      padding: 16px 20px;
      max-height: calc(100vh - 280px);
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .nova-games-grid::-webkit-scrollbar {
      width: 4px;
    }

    .nova-games-grid::-webkit-scrollbar-track {
      background: transparent;
    }

    .nova-games-grid::-webkit-scrollbar-thumb {
      background: rgba(20, 184, 166, 0.3);
      border-radius: 2px;
    }

    .nova-empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 60px 20px;
      color: rgba(255, 255, 255, 0.4);
      font-size: 14px;
    }

    .nova-game-card {
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .nova-card-image-wrap {
      position: relative;
      width: 100%;
      aspect-ratio: 1;
      border-radius: 12px;
      overflow: hidden;
      background: rgba(20, 184, 166, 0.1);
    }

    .nova-card-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .nova-game-card:hover .nova-card-image {
      transform: scale(1.08);
    }

    .nova-card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .nova-game-card:hover .nova-card-overlay {
      opacity: 1;
    }

    .nova-play-btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(20, 184, 166, 0.8);
      border: none;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .nova-play-btn:hover {
      background: rgba(20, 184, 166, 1);
      transform: scale(1.1);
    }

    .nova-favorite-badge {
      position: absolute;
      top: 6px;
      right: 6px;
      width: 24px;
      height: 24px;
      background: rgba(239, 68, 68, 0.8);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }

    .nova-card-content {
      padding: 8px 0;
    }

    .nova-card-title {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .nova-card-rating {
      font-size: 11px;
      color: rgba(255, 255, 255, 0.5);
    }

    .nova-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      backdrop-filter: blur(4px);
    }

    .nova-modal {
      background: linear-gradient(135deg, rgba(20, 30, 50, 0.95) 0%, rgba(30, 40, 60, 0.95) 100%);
      border: 1px solid rgba(20, 184, 166, 0.3);
      border-radius: 16px;
      padding: 24px;
      max-width: 500px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
    }

    .nova-modal--auth {
      max-width: 380px;
    }

    .nova-modal-close {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 32px;
      height: 32px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(20, 184, 166, 0.2);
      border-radius: 50%;
      color: #fff;
      font-size: 24px;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .nova-modal-close:hover {
      background: rgba(20, 184, 166, 0.2);
      border-color: rgba(20, 184, 166, 0.5);
    }

    .nova-modal-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      border-radius: 12px;
      margin-bottom: 16px;
    }

    .nova-modal-title {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 12px;
    }

    .nova-modal-description {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 12px;
      line-height: 1.5;
    }

    .nova-modal-rating {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.6);
      margin-bottom: 16px;
    }

    .nova-modal h2 {
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .nova-modal form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .nova-btn {
      padding: 10px 16px;
      background: rgba(255, 255, 255, 0.08);
      border: 1px solid rgba(20, 184, 166, 0.3);
      color: rgba(255, 255, 255, 0.9);
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
      font-size: 14px;
    }

    .nova-btn:hover {
      background: rgba(20, 184, 166, 0.15);
      border-color: rgba(20, 184, 166, 0.6);
    }

    .nova-btn--primary {
      background: rgba(20, 184, 166, 0.25);
      border-color: rgba(20, 184, 166, 0.5);
      color: rgba(20, 184, 166, 0.95);
    }

    .nova-btn--primary:hover {
      background: rgba(20, 184, 166, 0.35);
      border-color: rgba(20, 184, 166, 0.7);
    }

    .nova-fab-container {
      position: fixed;
      bottom: 16px;
      right: 16px;
      z-index: 50;
    }

    .nova-fab {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: rgba(20, 184, 166, 0.25);
      border: 1px solid rgba(20, 184, 166, 0.5);
      color: rgba(20, 184, 166, 0.95);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      transition: all 0.3s ease;
    }

    .nova-fab:hover {
      background: rgba(20, 184, 166, 0.35);
      transform: scale(1.1);
    }

    .nova-fab-menu-item {
      position: absolute;
      right: 0;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(20, 184, 166, 0.2);
      border: 1px solid rgba(20, 184, 166, 0.4);
      color: rgba(255, 255, 255, 0.9);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      transition: all 0.3s ease;
      animation: slideUp 0.3s ease forwards;
    }

    .nova-fab-menu-item:hover {
      background: rgba(20, 184, 166, 0.3);
      transform: scale(1.1);
    }

    @keyframes slideUp {
      from {
        opacity: 0;
        transform: translate(0, 20px);
      }
      to {
        opacity: 1;
        transform: translate(0, 0);
      }
    }

    @media (max-width: 768px) {
      .nova-games-grid {
        grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
        gap: 10px;
        padding: 12px 16px;
      }

      .nova-modal {
        width: 95%;
        padding: 20px;
      }

      .nova-header {
        padding: 10px 16px;
      }

      .glass-btn-auth,
      .glass-btn-auth--primary,
      .glass-btn-sm {
        padding: 6px 12px;
        font-size: 11px;
      }

      .nova-search-bar {
        margin: 12px 16px;
      }

      .nova-category-tabs {
        padding: 10px 16px;
        gap: 6px;
      }
    }

    .nova-fab-stack { bottom: 75px; right: 6px; }
    .nova-fab-stack-left { bottom: 75px; left: 6px; }
  </style>