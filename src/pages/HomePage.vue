<template>
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
            <button @click="openAuth('login')" class="glass-btn-auth glass-btn-auth--primary" style="height:32px;padding:0 12px;font-size:11px;">လောဂ်အင်</button>
            <button @click="openAuth('register')" class="glass-btn-auth" style="height:32px;padding:0 12px;font-size:11px;">မှတ်ပုံတင်ပါ</button>
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
        <button @click="activeCategory='fav'" style="position:absolute;right:26px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;padding:2px;-webkit-tap-highlight-color:transparent;"><svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M12 2c4.418 0 8 3.582 8 8s-3.582 8-8 8-8-3.582-8-8 3.582-8 8-8m0 4v8m4-4h-8"/></svg></button>
      </div>

      <!-- CATEGORY TABS -->
      <div class="category-tabs">
        <button v-for="cat in ['live','fav','all']" :key="cat" @click="activeCategory=cat" :class="['cat-btn', activeCategory===cat?'active':'']" :style="{color: activeCategory===cat?'rgba(20,184,166,0.95)':'rgba(255,255,255,0.5)'}">
          {{ cat === 'live' ? '🔴 ' + (currentLang === 'en' ? 'Live' : 'လက်ခြင်း') : cat === 'fav' ? '❤️ ' + (currentLang === 'en' ? 'Favorites' : 'အကြိုက်သည့်') : currentLang === 'en' ? 'All' : 'အားလုံး' }}
        </button>
      </div>

      <!-- GAMES GRID -->
      <div v-if="filteredGames.length" class="games-grid" style="margin-top:20px;">
        <div v-for="game in filteredGames" :key="game.id" class="game-card" @click="openGameModal(game)" style="cursor:pointer;">
          <div style="position:relative;width:100%;aspect-ratio:16/9;border-radius:8px;overflow:hidden;background:rgba(20,184,166,0.1);">
            <img :src="game.image" :alt="game.name" style="width:100%;height:100%;object-fit:cover;" />
            <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(0,0,0,0.5) 0%,rgba(0,0,0,0) 100%);" />
          </div>
          <div style="padding:12px 8px;">
            <div style="font-weight:600;font-size:13px;color:rgba(255,255,255,0.95);margin-bottom:4px;line-height:1.2;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">{{ game.name }}</div>
            <div style="font-size:12px;color:rgba(20,184,166,0.8);">{{ game.players }} players</div>
          </div>
        </div>
      </div>

      <!-- EMPTY STATE -->
      <div v-else style="text-align:center;padding:60px 20px;color:rgba(255,255,255,0.5);">
        <div style="font-size:48px;margin-bottom:16px;">🎮</div>
        <div style="font-size:16px;">{{ currentLang === 'en' ? 'No games available' : 'ဂိမ်းများမရှိသေးပါ' }}</div>
      </div>

      <!-- GAME MODAL -->
      <div v-if="selectedGame" class="modal-overlay" @click="selectedGame=null" style="position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px;">
        <div class="modal-content" @click.stop style="background:linear-gradient(135deg,rgba(15,23,42,0.95) 0%,rgba(20,30,50,0.95) 100%);border:1px solid rgba(20,184,166,0.2);border-radius:12px;padding:24px;max-width:400px;width:100%;max-height:90vh;overflow-y:auto;box-shadow:0 20px 60px rgba(0,0,0,0.8);">
          <div style="position:relative;width:100%;aspect-ratio:16/9;border-radius:8px;overflow:hidden;margin-bottom:20px;">
            <img :src="selectedGame.image" :alt="selectedGame.name" style="width:100%;height:100%;object-fit:cover;" />
          </div>
          <h2 style="color:rgba(255,255,255,0.95);margin-bottom:12px;font-size:20px;">{{ selectedGame.name }}</h2>
          <p style="color:rgba(255,255,255,0.7);margin-bottom:16px;line-height:1.5;font-size:14px;">{{ selectedGame.description }}</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:20px;">
            <div style="background:rgba(20,184,166,0.1);border:1px solid rgba(20,184,166,0.3);border-radius:8px;padding:12px;text-align:center;">
              <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-bottom:4px;">{{ currentLang === 'en' ? 'Players' : 'ကစ်သမားများ' }}</div>
              <div style="font-size:18px;font-weight:600;color:rgba(20,184,166,0.9);">{{ selectedGame.players }}</div>
            </div>
            <div style="background:rgba(20,184,166,0.1);border:1px solid rgba(20,184,166,0.3);border-radius:8px;padding:12px;text-align:center;">
              <div style="font-size:12px;color:rgba(255,255,255,0.6);margin-bottom:4px;">{{ currentLang === 'en' ? 'Status' : 'အခြေအနေ' }}</div>
              <div style="font-size:14px;font-weight:600;color:rgba(34,197,94,0.9);">{{ selectedGame.status }}</div>
            </div>
          </div>
          <div style="display:flex;gap:12px;">
            <button @click="selectedGame=null" class="glass-btn" style="flex:1;height:44px;border-radius:8px;border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.05);color:rgba(20,184,166,0.9);font-weight:600;cursor:pointer;">{{ currentLang === 'en' ? 'Close' : 'ပိတ်မည်' }}</button>
            <button @click="playGame(selectedGame)" class="glass-btn-auth glass-btn-auth--primary" style="flex:1;height:44px;border-radius:8px;background:rgba(20,184,166,0.9);color:#0f1729;font-weight:600;cursor:pointer;">{{ currentLang === 'en' ? 'Play Now' : 'အခုစတင်ပါ' }}</button>
          </div>
        </div>
      </div>

      <!-- AUTH MODAL -->
      <div v-if="authModal.show" class="modal-overlay" @click="closeAuth" style="position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);z-index:1001;display:flex;align-items:center;justify-content:center;padding:16px;">
        <div class="modal-content" @click.stop style="background:linear-gradient(135deg,rgba(15,23,42,0.97) 0%,rgba(20,30,50,0.97) 100%);border:1px solid rgba(20,184,166,0.2);border-radius:12px;padding:32px;max-width:380px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.9);">
          <div style="text-align:center;margin-bottom:24px;">
            <div style="font-size:32px;margin-bottom:12px;">{{ authModal.mode === 'login' ? '🔐' : '✨' }}</div>
            <h2 style="color:rgba(255,255,255,0.95);font-size:20px;margin:0;margin-bottom:8px;">{{ authModal.mode === 'login' ? (currentLang === 'en' ? 'Welcome Back' : 'ပြန်လည်ကြိုဆိုပါသည်') : (currentLang === 'en' ? 'Create Account' : 'အကောင်တည်ဆောက်ပါ') }}</h2>
            <p style="color:rgba(255,255,255,0.5);font-size:14px;margin:0;">{{ authModal.mode === 'login' ? (currentLang === 'en' ? 'Sign in to your account' : 'သင့်အကောင်တွင် ဆိုင်းအင်ပါ') : (currentLang === 'en' ? 'Join our gaming community' : 'ကျွန်ုပ်တို့၏ဂိမ်းကွန်ယူနિတီတွင်ပါဝင်ပါ') }}</p>
          </div>

          <form @submit.prevent="submitAuth" style="display:flex;flex-direction:column;gap:16px;">
            <div>
              <label style="display:block;color:rgba(255,255,255,0.7);font-size:13px;margin-bottom:6px;font-weight:500;">{{ currentLang === 'en' ? 'Email' : 'အီမေလ်' }}</label>
              <input v-model="authForm.email" type="email" placeholder="you@example.com" class="nova-input" style="width:100%;height:44px;padding:0 14px;border-radius:8px;border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.05);color:rgba(255,255,255,0.9);font-size:14px;" required />
            </div>

            <div>
              <label style="display:block;color:rgba(255,255,255,0.7);font-size:13px;margin-bottom:6px;font-weight:500;">{{ currentLang === 'en' ? 'Password' : 'စကားဝှက်' }}</label>
              <input v-model="authForm.password" type="password" :placeholder="currentLang === 'en' ? 'Enter password' : 'စကားဝှက်ထည့်သွင်းပါ'" class="nova-input" style="width:100%;height:44px;padding:0 14px;border-radius:8px;border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.05);color:rgba(255,255,255,0.9);font-size:14px;" required />
            </div>

            <div v-if="authModal.mode === 'register'">
              <label style="display:block;color:rgba(255,255,255,0.7);font-size:13px;margin-bottom:6px;font-weight:500;">{{ currentLang === 'en' ? 'Confirm Password' : 'စကားဝှက်အတည်းပြုပါ' }}</label>
              <input v-model="authForm.confirmPassword" type="password" :placeholder="currentLang === 'en' ? 'Confirm password' : 'စကားဝှက်အတည်းပြုပါ'" class="nova-input" style="width:100%;height:44px;padding:0 14px;border-radius:8px;border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.05);color:rgba(255,255,255,0.9);font-size:14px;" required />
            </div>

            <button type="submit" class="glass-btn-auth glass-btn-auth--primary" style="height:44px;border-radius:8px;background:rgba(20,184,166,0.9);color:#0f1729;font-weight:600;cursor:pointer;border:none;font-size:16px;">{{ authModal.mode === 'login' ? (currentLang === 'en' ? 'Sign In' : 'ဆိုင်းအင်') : (currentLang === 'en' ? 'Create Account' : 'အကောင်တည်ဆောက်ပါ') }}</button>
          </form>

          <div style="text-align:center;margin-top:20px;color:rgba(255,255,255,0.6);font-size:13px;">
            {{ authModal.mode === 'login' ? (currentLang === 'en' ? 'No account?' : 'အကောင်မရှိသေးပါ?') : (currentLang === 'en' ? 'Have an account?' : 'အကောင်ရှိပြီးသားလား?') }}
            <button @click="authModal.mode = authModal.mode === 'login' ? 'register' : 'login'" style="background:none;border:none;color:rgba(20,184,166,0.9);cursor:pointer;text-decoration:underline;font-weight:600;">
              {{ authModal.mode === 'login' ? (currentLang === 'en' ? 'Sign up' : 'မှတ်ပုံတင်ပါ') : (currentLang === 'en' ? 'Sign in' : 'ဆိုင်းအင်ပါ') }}
            </button>
          </div>
        </div>
      </div>

      <!-- INSTALL MODALS -->
      <div v-if="showAndroidInstallModal" class="modal-overlay" @click="showAndroidInstallModal=false" style="position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);z-index:1002;display:flex;align-items:center;justify-content:center;padding:16px;">
        <div class="modal-content" @click.stop style="background:linear-gradient(135deg,rgba(15,23,42,0.97) 0%,rgba(20,30,50,0.97) 100%);border:1px solid rgba(20,184,166,0.2);border-radius:12px;padding:32px;max-width:380px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.9);text-align:center;">
          <div style="font-size:48px;margin-bottom:16px;">📱</div>
          <h2 style="color:rgba(255,255,255,0.95);font-size:20px;margin:0;margin-bottom:12px;">{{ currentLang === 'en' ? 'Install App' : 'အက်ပ်ထည့်သွင်းပါ' }}</h2>
          <p style="color:rgba(255,255,255,0.6);margin-bottom:24px;line-height:1.5;">{{ currentLang === 'en' ? 'Get instant access to all games with our Android app.' : 'ကျွန်ုပ်တို့၏ Android အက်ပ်ကို အသုံးပြု၍ ဂိမ်းများအားလုံးသို့ ချက်ချင်း ဆက်သွယ်ပါ။' }}</p>
          <div style="display:flex;gap:12px;">
            <button @click="showAndroidInstallModal=false" class="glass-btn" style="flex:1;height:44px;border-radius:8px;border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.05);color:rgba(20,184,166,0.9);font-weight:600;cursor:pointer;">{{ currentLang === 'en' ? 'Later' : 'နောက်ပိုင်းမှ' }}</button>
            <button @click="installAndroidApp()" class="glass-btn-auth glass-btn-auth--primary" style="flex:1;height:44px;border-radius:8px;background:rgba(20,184,166,0.9);color:#0f1729;font-weight:600;cursor:pointer;">{{ currentLang === 'en' ? 'Install' : 'ထည့်သွင်းပါ' }}</button>
          </div>
        </div>
      </div>

      <div v-if="showIosInstallModal" class="modal-overlay" @click="showIosInstallModal=false" style="position:fixed;inset:0;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);z-index:1002;display:flex;align-items:center;justify-content:center;padding:16px;">
        <div class="modal-content" @click.stop style="background:linear-gradient(135deg,rgba(15,23,42,0.97) 0%,rgba(20,30,50,0.97) 100%);border:1px solid rgba(20,184,166,0.2);border-radius:12px;padding:32px;max-width:380px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,0.9);text-align:center;">
          <div style="font-size:48px;margin-bottom:16px;">🍎</div>
          <h2 style="color:rgba(255,255,255,0.95);font-size:20px;margin:0;margin-bottom:12px;">{{ currentLang === 'en' ? 'Add to Home Screen' : 'ပင်မစာမျက်နှာသို့ထည့်သွင်းပါ' }}</h2>
          <p style="color:rgba(255,255,255,0.6);margin-bottom:24px;line-height:1.5;">{{ currentLang === 'en' ? 'Install our web app for iOS. Tap Share → Add to Home Screen.' : 'iOS အတွက် ကျွန်ုပ်တို့၏ ဝဘ်အက်ပ်ကို ထည့်သွင်းပါ။ မျှဝေမည် → ပင်မစာမျက်နှာသို့ ထည့်သွင်းမည် ကို တို့ပါ။' }}</p>
          <div style="display:flex;gap:12px;">
            <button @click="showIosInstallModal=false" class="glass-btn" style="flex:1;height:44px;border-radius:8px;border:1px solid rgba(20,184,166,0.3);background:rgba(20,184,166,0.05);color:rgba(20,184,166,0.9);font-weight:600;cursor:pointer;">{{ currentLang === 'en' ? 'Later' : 'နောက်ပိုင်းမှ' }}</button>
            <button @click="showIosInstallModal=false" class="glass-btn-auth glass-btn-auth--primary" style="flex:1;height:44px;border-radius:8px;background:rgba(20,184,166,0.9);color:#0f1729;font-weight:600;cursor:pointer;">{{ currentLang === 'en' ? 'Got It' : 'နားလည်ပြီ' }}</button>
          </div>
        </div>
      </div>

    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const isLoggedIn = ref(false);
  const currentLang = ref('en');
  const searchQuery = ref('');
  const activeCategory = ref('live');
  const selectedGame = ref(null);
  const showAndroidInstallModal = ref(false);
  const showIosInstallModal = ref(false);
  
  const authModal = ref({ show: false, mode: 'login' });
  const authForm = ref({ email: '', password: '', confirmPassword: '' });
  
  const games = ref([
    { id: 1, name: 'အုပ်စုကိုက်ကဲ့သည့်ရိုးရာ', category: 'live', image: 'https://via.placeholder.com/400x225?text=Dragon+Legends', description: 'An epic fantasy adventure awaits!', players: '12.5K', status: 'Live' },
    { id: 2, name: 'အီလက်ထရောနစ်အားကစ်ခြင်း', category: 'live', image: 'https://via.placeholder.com/400x225?text=Thunder+Clash', description: 'Fast-paced combat game.', players: '8.3K', status: 'Live' },
    { id: 3, name: 'အင်္ဂလိပ်စာ', category: 'all', image: 'https://via.placeholder.com/400x225?text=Puzzle+Quest', description: 'Challenge your mind with puzzles.', players: '5.2K', status: 'Coming Soon' },
    { id: 4, name: 'အီလက်ထရောနစ်အားကစ်ခြင်း', category: 'all', image: 'https://via.placeholder.com/400x225?text=Racing+Revolution', description: 'Experience high-speed racing.', players: '10.1K', status: 'Live' },
  ]);
  
  const filteredGames = computed(() => {
    let result = games.value;
    
    if (activeCategory.value !== 'all') {
      result = result.filter(game => game.category === activeCategory.value);
    }
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(game => game.name.toLowerCase().includes(query) || game.description.toLowerCase().includes(query));
    }
    
    return result;
  });
  
  const openAuth = (mode) => {
    authModal.value = { show: true, mode };
  };
  
  const closeAuth = () => {
    authModal.value = { show: false, mode: 'login' };
    authForm.value = { email: '', password: '', confirmPassword: '' };
  };
  
  const submitAuth = () => {
    if (authModal.value.mode === 'register' && authForm.value.password !== authForm.value.confirmPassword) {
      alert(currentLang.value === 'en' ? 'Passwords do not match!' : 'စကားဝှက်များကိုက်ညီမှုမရှိပါ!');
      return;
    }
    isLoggedIn.value = true;
    closeAuth();
  };
  
  const toggleLanguage = () => {
    currentLang.value = currentLang.value === 'en' ? 'my' : 'en';
  };
  
  const openGameModal = (game) => {
    selectedGame.value = game;
  };
  
  const playGame = (game) => {
    alert(currentLang.value === 'en' ? `Starting ${game.name}...` : `${game.name} စတင်နေပါသည်...`);
    selectedGame.value = null;
  };
  
  const installAndroidApp = () => {
    window.location.href = 'https://play.google.com/store/apps/details?id=com.novabett.app';
    showAndroidInstallModal.value = false;
  };
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  .nova-app {
    min-height: 100vh;
    background: linear-gradient(135deg, #0f1729 0%, #1a1f3a 50%, #0d1525 100%);
    color: #fff;
    position: relative;
    overflow-x: hidden;
    padding: 0;
  }
  
  /* Background Orbs */
  .nova-bg-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.15;
    pointer-events: none;
    z-index: -1;
  }
  
  .nova-bg-orb--1 {
    width: 400px;
    height: 400px;
    background: rgba(20, 184, 166, 0.4);
    top: -100px;
    right: -100px;
    animation: float 15s ease-in-out infinite;
  }
  
  .nova-bg-orb--2 {
    width: 300px;
    height: 300px;
    background: rgba(139, 92, 246, 0.3);
    bottom: 100px;
    left: -50px;
    animation: float 20s ease-in-out infinite reverse;
  }
  
  .nova-bg-orb--3 {
    width: 250px;
    height: 250px;
    background: rgba(59, 130, 246, 0.25);
    bottom: 20%;
    right: 5%;
    animation: float 25s ease-in-out infinite;
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-30px); }
  }
  
  /* Header */
  .nova-header {
    padding: 16px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(20, 184, 166, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
  }
  
  .nova-brand-wrap {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .nova-brand {
    font-size: 24px;
    font-weight: 700;
    background: linear-gradient(135deg, rgba(20, 184, 166, 0.9), rgba(34, 197, 94, 0.9));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .nova-brand img {
    max-height: 32px;
    width: auto;
  }
  
  /* Button Styles */
  .glass-btn, .glass-btn-auth, .glass-btn-sm {
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    font-size: 12px;
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .glass-btn:hover, .glass-btn-auth:hover, .glass-btn-sm:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
  }
  
  .glass-btn-auth--primary {
    background: linear-gradient(135deg, rgba(20, 184, 166, 0.9), rgba(16, 185, 129, 0.9));
    border-color: rgba(20, 184, 166, 0.5);
    color: #0f1729;
  }
  
  .glass-btn-auth--primary:hover {
    background: linear-gradient(135deg, rgba(20, 184, 166, 1), rgba(16, 185, 129, 1));
    border-color: rgba(20, 184, 166, 0.8);
    box-shadow: 0 0 20px rgba(20, 184, 166, 0.4);
  }
  
  .glass-btn-sm {
    padding: 6px 12px;
    font-size: 11px;
  }
  
  /* Search Bar */
  .nova-search-bar {
    position: relative;
    margin: 20px;
    margin-bottom: 0;
  }
  
  .nova-input {
    width: 100%;
    padding: 12px 36px;
    border-radius: 8px;
    border: 1px solid rgba(20, 184, 166, 0.3);
    background: rgba(20, 184, 166, 0.05);
    color: rgba(255, 255, 255, 0.9);
    font-size: 14px;
    transition: all 0.3s ease;
  }
  
  .nova-input:focus {
    outline: none;
    border-color: rgba(20, 184, 166, 0.6);
    background: rgba(20, 184, 166, 0.1);
    box-shadow: 0 0 20px rgba(20, 184, 166, 0.2);
  }
  
  .nova-input::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
  
  /* Category Tabs */
  .category-tabs {
    display: flex;
    gap: 12px;
    padding: 16px 20px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    margin: 0;
  }
  
  .cat-btn {
    padding: 8px 16px;
    border-radius: 20px;
    border: 1px solid rgba(20, 184, 166, 0.3);
    background: transparent;
    color: rgba(255, 255, 255, 0.5);
    cursor: pointer;
    white-space: nowrap;
    font-weight: 600;
    font-size: 13px;
    transition: all 0.3s ease;
  }
  
  .cat-btn.active {
    background: rgba(20, 184, 166, 0.2);
    border-color: rgba(20, 184, 166, 0.6);
  }
  
  /* Games Grid */
  .games-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 16px;
    padding: 0 20px;
    margin-bottom: 40px;
  }
  
  .game-card {
    border-radius: 8px;
    overflow: hidden;
    background: rgba(20, 30, 50, 0.4);
    border: 1px solid rgba(20, 184, 166, 0.1);
    transition: all 0.3s ease;
  }
  
  .game-card:hover {
    border-color: rgba(20, 184, 166, 0.4);
    background: rgba(20, 30, 50, 0.6);
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(20, 184, 166, 0.15);
  }
  
  /* Modal */
  .modal-overlay {
    animation: fadeIn 0.3s ease;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .modal-content {
    animation: slideUp 0.3s ease;
  }
  
  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  /* Responsive */
  @media (max-width: 768px) {
    .games-grid {
      grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
      gap: 12px;
      padding: 0 16px;
    }
    
    .nova-header {
      padding: 12px 16px;
    }
  }
  
  @media (max-width: 480px) {
    .games-grid {
      grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
      gap: 10px;
      padding: 0 12px;
    }
  }
  
  /* FAB Stack Positioning */
  .nova-fab {
    position: fixed;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: linear-gradient(135deg, rgba(20, 184, 166, 0.9), rgba(16, 185, 129, 0.9));
    bottom: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(20, 184, 166, 0.3);
    cursor: pointer;
    z-index: 50;
    transition: all 0.3s ease;
  }
  
  .nova-fab:hover {
    transform: scale(1.1);
    box-shadow: 0 8px 30px rgba(20, 184, 166, 0.5);
  }
  
  .nova-fab-stack {
    position: fixed;
    bottom: 75px;
    right: 6px;
  }
  
  .nova-fab-stack-left {
    bottom: 75px;
    left: 6px;
  }
  </style>